import React from "react";
import "./ResultCanvas.css";
export default function ResultCanvas(props) {
  return (
    <>
      <h3>
        {" "}
        <span class="badge badge-dark text2">Results</span>
      </h3>
      <canvas className="canvas3" ref={props.canvas2} />
    </>
  );
}
