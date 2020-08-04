import predict from "./Model.js";
import React, { useState, useRef } from "react";
import { setDataToChart, drawLineOnChart } from "./Chart.js";
import { clearCanvas, getImageFromCanvas } from "./Canvas.js";

import "./DrawingCanvas.css";

export default function DrawingCanvas(props) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [mousedown, setMouseDown] = useState(false);
  const canvas = useRef(null);

  // Mouse events
  function handleMouseDown(e) {
    setCoords({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    setMouseDown(true);
  }

  function handleMouseUp(e) {
    setMouseDown(false);
  }
  function handleMouseMove(e) {
    if (mousedown) {
      const ctx = canvas.current.getContext("2d");
      drawLineOnChart(
        ctx,
        coords.x,
        coords.y,
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY
      );
      setCoords({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    }
  }

  // Touch events
  function handleTouchEnd(e) {
    setCoords({
      x: e.touches[0].clientX - canvas.current.getBoundingClientRect().left,
      y: e.touches[0].clientY - canvas.current.getBoundingClientRect().top,
    });
  }

  function handleTouchMove(e) {
    const ctx = canvas.current.getContext("2d");
    drawLineOnChart(
      ctx,
      coords.x,
      coords.y,
      e.touches[0].clientX - canvas.current.getBoundingClientRect().left,
      e.touches[0].clientY - canvas.current.getBoundingClientRect().top
    );
    setCoords({
      x: e.touches[0].clientX - canvas.current.getBoundingClientRect().left,
      y: e.touches[0].clientY - canvas.current.getBoundingClientRect().top,
    });
  }

  // Button functions
  async function feedImage(e) {
    const scaled_image = getImageFromCanvas(canvas);
    const predictions = await predict(scaled_image);
    setDataToChart(props.chart, predictions);
  }

  function erase(e) {
    clearCanvas(canvas);
    setDataToChart(props.chart, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }

  return (
    <>
      <div class="column">
        <div class="row">
          <canvas
            className="canvas2"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchEnd}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleTouchMove}
            ref={canvas}
            width={207}
            height={207}
          />
        </div>
        <div class="row">
          <div class="btn-group buttonsgroup" role="group">
            <button type="button" onClick={feedImage} class="btn btn-dark">
              Feed image
            </button>
            <button type="button" onClick={erase} class="btn btn-dark">
              Erase image
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
