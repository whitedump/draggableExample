import React, {useEffect, useRef, useState} from "react";
import "./styles.css";
import Draggable from "react-draggable";
import {ResizableBox} from "react-resizable";
import "react-resizable/css/styles.css";
import AutoScale from './AutoScale'

export default function App() {
  const [disableDrag, setDisableDrag] = useState(false)
  const [defaultPos, setDefaultPos] = useState({
    x0: 20,
    y0: 20,
  })
  const [currentPos, setCurrentPos] = useState({
    x: 20,
    y: 20
  })
  const [widgetWidth, setWidgetWidth] = useState(1000);
  const [widgetHeight, setWidgetHeight] = useState(800);

  var lastX = window.innerWidth
  var lastY = window.innerHeight

  useEffect(() => {
    console.log('init data: ')
    console.log("screenWidth — " + window.innerWidth, "screenHeight — " + window.innerHeight)
    console.log('widgetWidth, widgetHeight: ', widgetWidth, widgetHeight)
    console.log('xPos, yPos: ', currentPos.x, currentPos.y)
  }, [])

  useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth && window.innerHeight) {
        const xScale = window.innerWidth / lastX
        const yScale = window.innerHeight / lastY
        console.log('WINDOW WIDTH BECOMES SMALLER!');
        console.log("screenWidth — " + window.innerWidth, "screenHeight — " + window.innerHeight)
        console.log('xScale, yScale: ', xScale, yScale)
        setWidgetWidth(prevWidth => {
          console.log('prevWidth, newWidth(xScale * prevHeight): ', prevWidth, xScale * prevWidth)
          return prevWidth * xScale
        })
        setWidgetHeight(prevHeight => {
          console.log('prevHeight, newHeight(yScale * prevHeight): ', prevHeight, yScale * prevHeight)
          return prevHeight * yScale
        })
        setCurrentPos(prev => {
          console.log('prevXPos, newXPos: ', prev.x, prev.x * xScale)
          console.log('prevYPos, newYPos: ', prev.y, prev.y * yScale)
          return {
            x: xScale * prev.x,
            y: yScale * prev.y
          }
        })
      }
    }
    window.addEventListener('resize', resizeHandler)
    return () => window.removeEventListener('resize', resizeHandler)
  }, [lastX, lastY])

  const handleStop = (e, {lastX, lastY}) => {
    setDefaultPos({
      x: lastX,
      y: lastY,
    })
    setCurrentPos({
      x: lastX,
      y: lastY
    })
  }

  const onResizeWidget = (event, {element, size, handle}) => {
    setDisableDrag(true)
    setWidgetWidth(size.width);
    setWidgetHeight(size.height);
  }

  const onResizeStop = () => {
    setDisableDrag(false)
  }

  return (
    <Draggable
      disabled={disableDrag}
      defaultPosition={{x: defaultPos.x0, y: defaultPos.y0}}
      onDrag={() => console.log("onDrag")}
      position={currentPos}
      onStop={handleStop}>

      <ResizableBox
        onResizeStop={onResizeStop}
        height={widgetHeight}
        width={widgetWidth}
        onResize={onResizeWidget}
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
