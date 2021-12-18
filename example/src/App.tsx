import React, { useLayoutEffect, useRef } from 'react'

import { useCanvasCamera2D } from 'use-canvas-camera2d'

const App = () => {
  const canvasWidth = 400
  const canvasHeight = 400

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { context, viewportTopLeft, scale, offset, startPan, reset } =
    useCanvasCamera2D(canvasRef, canvasWidth, canvasHeight)

  // draw
  useLayoutEffect(() => {
    if (context) {
      const squareSize = 20

      // clear canvas but maintain transform
      const storedTransform = context.getTransform()
      context.canvas.width = context?.canvas.width
      context.setTransform(storedTransform)

      context.fillRect(
        canvasWidth / 2 - squareSize / 2,
        canvasHeight / 2 - squareSize / 2,
        squareSize,
        squareSize
      )
      context.arc(viewportTopLeft.x, viewportTopLeft.y, 5, 0, 2 * Math.PI)
      context.fillStyle = 'red'
      context.fill()
    }
  }, [canvasWidth, canvasHeight, context, scale, offset, viewportTopLeft])

  return (
    <div>
      <canvas
        onMouseDown={startPan}
        ref={canvasRef}
        id='canvas'
        width={canvasWidth}
        height={canvasHeight}
      ></canvas>

      <button onClick={() => context && reset(context)}>reset</button>
    </div>
  )
}

export default App
