import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import React, { useEffect, useState } from "react";

const Widget = ({ init, style, minWidth, minHeight, idx, children }) => {
  const [disableDrag, setDisableDrag] = useState(false);

  const [widgetState, setWidgetState] = useState(init);
  const [widgetMinParams, setWidgetMinParams] = useState({
    width: minWidth,
    height: minHeight,
  });

  var lastX = window.innerWidth;
  var lastY = window.innerHeight;
  useEffect(() => {
    console.log("init init: ");
    console.log(
      "screenWidth — " + window.innerWidth,
      "screenHeight — " + window.innerHeight
    );
    console.log(
      "widgetWidth, widgetHeight: ",
      widgetState.width,
      widgetState.height
    );
    console.log(
      "widgetMinWidth — " + widgetMinParams.width,
      "widgetMinHeight — " + widgetMinParams.height
    );
    console.log("xPos, yPos: ", widgetState.pos.x, widgetState.pos.y);
  }, []);

  useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth && window.innerHeight) {
        const xScale = window.innerWidth / lastX;
        const yScale = window.innerHeight / lastY;
        console.log(
          "screenWidth — " + window.innerWidth,
          "screenHeight — " + window.innerHeight
        );
        console.log("xScale, yScale: ", xScale, yScale);
        setWidgetState((prev) => {
          let newWidth = xScale * prev.width;
          let newHeight = yScale * prev.height;
          let newX = xScale * prev.pos.x;
          let newY = yScale * prev.pos.y;
          console.log(
            "prevWidth, new, calculated: ",
            prev.width,
            newWidth,
            window.innerWidth - prev.pos.x
          );
          if (newWidth <= widgetMinParams.width) {
            newWidth = widgetMinParams.width;
            newX = prev.pos.x
          }
          if (newHeight <= widgetMinParams.height) {
            newHeight = widgetMinParams.height;
            newY = prev.pos.y
          }
          console.log(
            "prevWidth, newWidth(xScale * prevHeight): ",
            prev.width,
            newWidth
          );
          return {
            width: newWidth,
            height: newHeight,
            pos: {
              x: newX,
              y: newY
            },
          };
        });
      }
    };
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, [JSON.stringify([lastX, lastY])]);

  const handleStop = (e, { lastX, lastY }) => {
    setWidgetState((prev) => ({
      ...prev,
      pos: {
        x: lastX >= 0 ? lastX : 0,
        y: lastY > 0 ? lastY : 0,
      },
    }));
  };

  const onResizeWidget = (event, { element, size, handle }) => {
    setDisableDrag(true);
    setWidgetState((prev) => ({
      ...prev,
      width: size.width,
      height: size.height,
    }));
  };

  // handler для изменения минимальной ширины и высоты
  // const onChangeMin = (field, { target }) => {
  //   setWidgetMinParams((prev) => ({
  //     ...prev,
  //     [field]: Number(target.value),
  //   }));
  //   if (Number(target.value) > widgetState[field]) {
  //     setWidgetState((prev) => ({
  //       ...prev,
  //       [field]: Number(target.value),
  //     }));
  //   }
  // };

  const onResizeStop = () => {
    setDisableDrag(false);
  };
  return (
    <Draggable
      disabled={disableDrag}
      defaultPosition={{ x: init.pos.x, y: init.pos.y }}
      onDrag={() => console.log("onDrag")}
      position={widgetState.pos}
      onStop={handleStop}
    >
      <ResizableBox
        onResizeStop={onResizeStop}
        className="ttt"
        style={style}
        height={widgetState.height}
        width={widgetState.width}
        onResize={onResizeWidget}
        minConstraints={[widgetMinParams.width, widgetMinParams.height]}
        resizeHandles={["w", "n", "nw"]}
      >
        <div style={{ fontSize: "var(--step-3)" }}>fest -> Widget {idx}</div>
        <div style={{ fontSize: "var(--step-2)" }}>w: {widgetState.width}</div>
        <div style={{ fontSize: "var(--step-2)" }}>h: {widgetState.height}</div>
        <div style={{ fontSize: "var(--step-1)" }}>x: {widgetState.pos.x}</div>
        <div style={{ fontSize: "var(--step-1)" }}>y: {widgetState.pos.y}</div>
        {/*инпут для пинимальной высоты*/}
        {/*<div>*/}
        {/*  <span style={{ fontSize: "var(--step-0)" }}>min height: </span>*/}
        {/*  <input*/}
        {/*    style={{ fontSize: "var(--step-0)" }}*/}
        {/*    type={"number"}*/}
        {/*    onChange={(e) => onChangeMin("height", e)}*/}
        {/*    value={widgetMinParams.height}*/}
        {/*  />*/}
        {/*</div>*/}
        {/*иннуут для минимальной ширины*/}
        {/*<div>*/}
        {/*  <span style={{ fontSize: "var(--step-0)" }}>min width: </span>*/}
          {/*<input*/}
          {/*  style={{ fontSize: "var(--step-0)" }}*/}
          {/*  type={"number"}*/}
          {/*  onChange={(e) => onChangeMin("width", e)}*/}
          {/*  value={widgetMinParams.width}*/}
          {/*/>*/}
        {/*</div>*/}
        {children}
      </ResizableBox>
    </Draggable>
  );
};

export default Widget;
