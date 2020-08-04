import React, { useState, useRef, useEffect } from "react";
import { createChart } from "./components/Chart.js";
import NavBar from "./components/NavBar.js";
import PopOver from "./components/PopOver.js";
import DrawingCanvas from "./components/DrawingCanvas.js";
import ResultCanvas from "./components/ResultCanvas.js";

export default function App() {
  const canvas2 = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const ctx2 = canvas2.current.getContext("2d");
    var myChart = createChart(ctx2);
    setChart(myChart);
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <div class="container">
        <div class="row">
          <PopOver></PopOver>
        </div>
        <div class="row">
          <div class="col">
            <DrawingCanvas chart={chart}> </DrawingCanvas>
          </div>
          <div class="col">
            <ResultCanvas canvas2={canvas2}></ResultCanvas>
          </div>
        </div>
      </div>
    </>
  );
}
