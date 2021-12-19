// credit to https://gist.github.com/robinovitch61/483190546bf8f0617d2cd510f3b4b86d

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'

type Point = {
  x: number
  y: number
}

const ORIGIN = Object.freeze({ x: 0, y: 0 })

// adjust to device to avoid blur
const { devicePixelRatio: ratio = 1 } = window

function diffPoints(p1: Point, p2: Point) {
  return { x: p1.x - p2.x, y: p1.y - p2.y }
}

function addPoints(p1: Point, p2: Point) {
  return { x: p1.x + p2.x, y: p1.y + p2.y }
}

function scalePoint(p1: Point, scale: number) {
  return { x: p1.x / scale, y: p1.y / scale }
}

const ZOOM_SENSITIVITY = 500 // bigger for lower zoom per scroll

export const useCanvasCamera2D = (
  canvasRef: React.RefObject<HTMLCanvasElement> | null,
  canvasWidth: number = 0,
  canvasHeight: number = 0
) => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [scale, setScale] = useState<number>(1)
  const [offset, setOffset] = useState<Point>(ORIGIN)
  const [mousePos, setMousePos] = useState<Point>(ORIGIN)
  const [viewportTopLeft, setViewportTopLeft] = useState<Point>(ORIGIN)
  const isResetRef = useRef<boolean>(false)
  const lastMousePosRef = useRef<Point>(ORIGIN)
  const lastOffsetRef = useRef<Point>(ORIGIN)

  // reset
  const reset = useCallback(
    (context: CanvasRenderingContext2D) => {
      if (context && !isResetRef.current) {
        // adjust for device pixel density
        context.canvas.width = canvasWidth * ratio
        context.canvas.height = canvasHeight * ratio
        context.scale(ratio, ratio)
        setScale(1)

        // reset state and refs
        setContext(context)
        setOffset(ORIGIN)
        setMousePos(ORIGIN)
        setViewportTopLeft(ORIGIN)
        lastOffsetRef.current = ORIGIN
        lastMousePosRef.current = ORIGIN

        // this thing is so multiple resets in a row don't clear canvas
        isResetRef.current = true
      }
    },
    [canvasWidth, canvasHeight]
  )

  // functions for panning
  const mouseMove = useCallback(
    (event: MouseEvent) => {
      if (context) {
        const lastMousePos = lastMousePosRef.current
        const currentMousePos = { x: event.pageX, y: event.pageY } // use document so can pan off element
        lastMousePosRef.current = currentMousePos

        const mouseDiff = diffPoints(currentMousePos, lastMousePos)
        setOffset((prevOffset) => addPoints(prevOffset, mouseDiff))
      }
    },
    [context]
  )

  const mouseUp = useCallback(() => {
    document.removeEventListener('mousemove', mouseMove)
    document.removeEventListener('mouseup', mouseUp)
  }, [mouseMove])

  const startPan = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      document.addEventListener('mousemove', mouseMove)
      document.addEventListener('mouseup', mouseUp)
      lastMousePosRef.current = { x: event.pageX, y: event.pageY }
    },
    [mouseMove, mouseUp]
  )

  const getTransformedPoint = useCallback(
    (x, y) => {
      if (context) {
        const transform = context.getTransform()
        const transformedX = x - transform.e
        const transformedY = y - transform.f
        return {
          x: transformedX,
          y: transformedY
        }
      }
      return ORIGIN
    },
    [context]
  )

  // setup canvas and set context
  useLayoutEffect(() => {
    if (canvasRef?.current) {
      // get new drawing context
      const renderCtx = canvasRef.current.getContext('2d')

      if (renderCtx) {
        reset(renderCtx)
      }
    }
  }, [reset, canvasHeight, canvasWidth])

  // pan when offset or scale changes
  useLayoutEffect(() => {
    if (context && lastOffsetRef.current) {
      const offsetDiff = scalePoint(
        diffPoints(offset, lastOffsetRef.current),
        scale
      )
      context.translate(offsetDiff.x, offsetDiff.y)
      setViewportTopLeft((prevVal) => diffPoints(prevVal, offsetDiff))
      isResetRef.current = false
    }
  }, [context, offset, scale])

  // add event listener on canvas for mouse position
  useEffect(() => {
    const canvasElem = canvasRef?.current
    if (canvasElem === null) {
      return
    }

    function handleUpdateMouse(event: MouseEvent) {
      event.preventDefault()
      if (canvasRef?.current) {
        const viewportMousePos = { x: event.clientX, y: event.clientY }
        const topLeftCanvasPos = {
          x: canvasRef.current.offsetLeft,
          y: canvasRef.current.offsetTop
        }
        setMousePos(diffPoints(viewportMousePos, topLeftCanvasPos))
      }
    }

    if (canvasElem) {
      canvasElem.addEventListener('mousemove', handleUpdateMouse)
      canvasElem.addEventListener('wheel', handleUpdateMouse)
    }
    return () => {
      if (canvasElem) {
        canvasElem.removeEventListener('mousemove', handleUpdateMouse)
        canvasElem.removeEventListener('wheel', handleUpdateMouse)
      }
    }
  }, [])

  // add event listener on canvas for zoom
  useEffect(() => {
    const canvasElem = canvasRef?.current
    if (canvasElem === null) {
      return
    }

    // this is tricky. Update the viewport's "origin" such that
    // the mouse doesn't move during scale - the 'zoom point' of the mouse
    // before and after zoom is relatively the same position on the viewport
    function handleWheel(event: WheelEvent) {
      event.preventDefault()
      if (context) {
        const zoom = 1 - event.deltaY / ZOOM_SENSITIVITY
        const viewportTopLeftDelta = {
          x: (mousePos.x / scale) * (1 - 1 / zoom),
          y: (mousePos.y / scale) * (1 - 1 / zoom)
        }
        const newViewportTopLeft = addPoints(
          viewportTopLeft,
          viewportTopLeftDelta
        )

        context.translate(viewportTopLeft.x, viewportTopLeft.y)
        context.scale(zoom, zoom)
        context.translate(-newViewportTopLeft.x, -newViewportTopLeft.y)

        setViewportTopLeft(newViewportTopLeft)
        setScale(scale * zoom)
        isResetRef.current = false
      }
    }

    if (canvasElem) {
      canvasElem.addEventListener('wheel', handleWheel)
    }
    return () =>
      canvasElem && canvasElem.removeEventListener('wheel', handleWheel)
  }, [context, mousePos.x, mousePos.y, viewportTopLeft, scale])

  // update last offset
  useEffect(() => {
    lastOffsetRef.current = offset
  }, [offset])

  return {
    context,
    setContext,
    scale,
    setScale,
    offset,
    setOffset,
    mousePos,
    setMousePos,
    viewportTopLeft,
    setViewportTopLeft,
    isResetRef,
    lastMousePosRef,
    lastOffsetRef,
    startPan,
    reset,
    mouseMove,
    mouseUp,
    getTransformedPoint
  }
}

export default useCanvasCamera2D
