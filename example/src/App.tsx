import React, { useLayoutEffect, useRef, useState } from 'react'

import { useCanvasCamera2D } from 'use-canvas-camera2d'

const squareSize: number = 20

const App = () => {
  const canvasWidth = 400
  const canvasHeight = 400

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const {
    context,
    viewportTopLeft,
    scale,
    offset,
    startPan,
    reset,
    getTransformedPoint
  } = useCanvasCamera2D(canvasRef, canvasWidth, canvasHeight)

  const [centerRect, setCenterRect] = useState<any>({
    x: canvasWidth / 2 - squareSize / 2,
    y: canvasHeight / 2 - squareSize / 2,
    w: squareSize,
    h: squareSize,
    color: randomColor()
  })

  // draw
  useLayoutEffect(() => {
    if (context) {
      // clear canvas but maintain transform
      const storedTransform = context.getTransform()
      context.canvas.width = context?.canvas.width
      context.setTransform(storedTransform)

      context.fillStyle = centerRect.color
      context.fillRect(centerRect.x, centerRect.y, squareSize, squareSize)
      context.arc(viewportTopLeft.x, viewportTopLeft.y, 5, 0, 2 * Math.PI)
      context.fillStyle = 'red'
      context.fill()
    }
  }, [
    canvasWidth,
    canvasHeight,
    context,
    scale,
    offset,
    viewportTopLeft,
    centerRect.color,
    centerRect.x,
    centerRect.y
  ])

  return (
    <div>
      <button onClick={() => context && reset(context)}>Reset</button>

      <pre>scale: {scale}</pre>
      <pre>offset: {JSON.stringify(offset)}</pre>
      <pre>viewportTopLeft: {JSON.stringify(viewportTopLeft)}</pre>

      <canvas
        onMouseUp={(e) => {
          if (e.button === 0) {
            const mousePos = getTransformedPoint(
              e.nativeEvent.offsetX,
              e.nativeEvent.offsetY
            )

            // change center rect color if clicked
            if (
              mousePos.x >= centerRect.x &&
              mousePos.x <= centerRect.x + squareSize &&
              mousePos.y >= centerRect.y &&
              mousePos.y <= centerRect.y + squareSize
            ) {
              setCenterRect({
                ...centerRect,
                color: randomColor()
              })
            }
          }
        }}
        onMouseDown={(e) => {
          // only pan if middle mouse button
          if (e.button === 1) {
            startPan(e)
          }
        }}
        ref={canvasRef}
        id='canvas'
        width={canvasWidth}
        height={canvasHeight}
      ></canvas>
    </div>
  )
}

export default App

function randomColor() {
  return '#' + Math.random().toString(16).slice(2, 8)
}
