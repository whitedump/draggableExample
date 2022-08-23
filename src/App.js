import React from "react";
import "./styles.css";
import "react-resizable/css/styles.css";
import Widget from "./Widget";

export default function App() {
  const widgets = [
    {
      init: {
        width: 500,
        height: 200,
        pos: {
          x: 600,
          y: 100,
        },
      },
      minHeight: 300,
      minWidth: 300,
      color: "pink",
    },
    {
      init: {
        width: 300,
        height: 300,
        pos: {
          x: 600,
          y: 300,
        },
      },
      minHeight: 300,
      minWidth: 300,
      color: "gray",
    },
    {
      init: {
        width: 300,
        height: 300,
        pos: {
          x: 0,
          y: 0,
        },
      },
      minHeight: 300,
      minWidth: 300,
      color: "blue",
    },
    {
      init: {
        width: 400,
        height: 400,
        pos: {
          x: 30,
          y: 30,
        },
      },
      minHeight: 300,
      minWidth: 300,
      color: "red",
    },
    {
      init: {
        width: 500,
        height: 500,
        pos: {
          x: 60,
          y: 60,
        },
      },
      minHeight: 300,
      minWidth: 300,
      color: "green",
    },
  ];

  return (
    <>
      {widgets.map(({ init, minHeight, minWidth, color }, i) => (
        <Widget
          idx={i}
          init={init}
          minWidth={minWidth}
          minHeight={minHeight}
          style={{ background: color }}
        >
          {/*fest -> Widget 1 / w: 300, h: 400 / x: 20, y: 20*/}
        </Widget>
      ))}
    </>
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
