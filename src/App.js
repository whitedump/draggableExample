import React, {useEffect, useRef, useState} from "react";
import "./styles.css";
import Draggable from "react-draggable";
import {ResizableBox} from "react-resizable";
import "react-resizable/css/styles.css";

export default function App() {
  const [disableDrag, setDisableDrag] = useState(false)
  const [defaultPos, setDefaultPos] = useState({
    x0: 20,
    y0: 20,
  })

  const minHeight = 400;
  const minWidth = 400

  const [widgetState, setWidgetState] = useState({
    width: 600,
    height: 600,
    pos: {
      x: 20,
      y: 20
    }
  })

  var lastX = window.innerWidth
  var lastY = window.innerHeight

  useEffect(() => {
    console.log('init data: ')
    console.log("screenWidth — " + window.innerWidth, "screenHeight — " + window.innerHeight)
    console.log('widgetWidth, widgetHeight: ', widgetState.width, widgetState.height)
    console.log("widgetMinWidth — " + minWidth, "widgetMinHeight — " + minHeight)
    console.log('xPos, yPos: ', widgetState.pos.x, widgetState.pos.y)
  }, [])

  useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth && window.innerHeight) {
        const xScale = window.innerWidth / lastX
        const yScale = window.innerHeight / lastY
        console.log("screenWidth — " + window.innerWidth, "screenHeight — " + window.innerHeight)
        console.log('xScale, yScale: ', xScale, yScale)
        setWidgetState(prev => {
          let newWidth = xScale * prev.width
          let newHeight = yScale * prev.height
          if (newWidth < minWidth) {
            newWidth = minWidth
          }
          if (newWidth > window.innerWidth - prev.pos.x){
            newWidth =  prev.width
          }
          if (newHeight < minHeight) {
            newHeight = minHeight
          }
          if (newHeight > window.innerHeight - prev.pos.y){
            newWidth = prev.height
          }
          console.log('prevWidth, newWidth(xScale * prevHeight): ', prev.width, newWidth)
          console.log('prevHeight, newHeight(yScale * prevHeight): ', prev.height, newHeight)
          console.log('prevXPos, newXPos: ', prev.pos.x, prev.pos.x * xScale)
          console.log('prevYPos, newYPos: ', prev.pos.y, prev.pos.y * yScale)
          return {
            width: newWidth,
            height: newHeight,
            pos: {
              x: xScale * prev.pos.x,
              y: yScale * prev.pos.y
            }
          }
        })
      }
    }
    window.addEventListener('resize', resizeHandler)
    return () => window.removeEventListener('resize', resizeHandler)
  }, [JSON.stringify([lastX, lastY])])

  const handleStop = (e, {lastX, lastY}) => {
    setWidgetState(prev => ({
      ...prev,
      pos: {
        x: lastX,
        y: lastY,
      }
    }))
  }

  const onResizeWidget = (event, {element, size, handle}) => {
    setDisableDrag(true)
    setWidgetState(prev => ({
      ...prev,
      width: size.width,
      height: size.height
    }))
  }

  const onResizeStop = () => {
    setDisableDrag(false)
  }

  return (
    <Draggable
      disabled={disableDrag}
      defaultPosition={{x: defaultPos.x0, y: defaultPos.y0}}
      onDrag={() => console.log("onDrag")}
      position={widgetState.pos}
      onStop={handleStop}>

      <ResizableBox
        onResizeStop={onResizeStop}
        height={widgetState.height}
        width={widgetState.width}
        onResize={onResizeWidget}
        minConstraints={[minHeight, minHeight]}
        resizeHandles={["s", "w", "e", "n", "sw", "nw", "se", "ne"]}
      >
        <div className="ttt">test</div>
      </ResizableBox>
    </Draggable>
  );
}
// </div>

// <div
//   style={{ height: `${height}px`, width: `${width}px`}} >
// <div>
//   <AutoScale
//     maxHeight={400}
//     style={{
//       width: '80vw',
//       height: 400,
//       backgroundColor: 'silver',
//     }}
//   >
//     {({ getRef, scale }) => (
//       <div
//         ref={getRef}
//         style={{
//           width: 800,
//           height: 600,
//           backgroundColor: 'red',
//           transform: `scale(${scale})`,
//           transformOrigin: `0 0 0`,
//         }}
//           >


// {/*        </div>*/}
// {/*    )}*/}
// {/*  </AutoScale>*/}
// {/*</div>*/}
