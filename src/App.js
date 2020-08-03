import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import Chart from "chart.js";
import { Tensor, InferenceSession } from "onnxjs";
import model from "./onnx_model.onnx";

export default function App() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [mousedown, setMouseDown] = useState(false);
  const [chart, setChart] = useState(null);
  const canvas = useRef(null);
  const canvas2 = useRef(null);

  useEffect(() => {
    const ctx2 = canvas2.current.getContext("2d");
    var myChart = new Chart(ctx2, {
      type: "bar",
      data: {
        labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
        datasets: [
          {
            label: "Probability predictions",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            backgroundColor: [
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 159, 64, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
    setChart(myChart);
  }, []);

  async function buttonClick(e) {
    const ctx = canvas.current.getContext("2d");
    ctx.drawImage(canvas.current, 0, 0, 28, 28);
    const scaled_image = ctx.getImageData(0, 0, 28, 28);
    const sess = new InferenceSession();
    await sess.loadModel(model);
    const input = new Tensor(new Float32Array(scaled_image.data), "float32");
    const outputMap = await sess.run([input]);
    const outputTensor = outputMap.values().next().value;
    const predictions = outputTensor.data;
    chart.data.datasets[0].data = predictions;
    chart.update();
    return scaled_image;
  }
  function erase(e) {
    const ctx = canvas.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    chart.data.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    chart.update();
  }

  function handleMouseDown(e) {
    setCoords({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    window.alert("XD");

    setMouseDown(true);
  }

  function handleMouseUp(e) {
    setMouseDown(false);
  }

  function handleMove(e) {
    e.preventDefault();
    e.stopPropagation();

    if (mousedown) {
      const ctx = canvas.current.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      setCoords({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
      ctx.lineTo(coords.x, coords.y);
      ctx.strokeStyle = "black";
      ctx.lineCap = "round";
      ctx.lineWidth = 10;
      ctx.stroke();
    }
  }

  return (
    <>
      <div class="collapse" id="navbarToggleExternalContent">
        <div class="bg-dark p-4">
          <h4 class="text-white">
            Recognizing handwritten digits in real time.
          </h4>
          <span class="text-muted">
            This project was created using PyTorch, Onnxjs, React.
          </span>
          <br />
          <span class="text-muted">
            This is in-between project for object detection in real-time.
          </span>
        </div>
      </div>
      <nav class="navbar navbar-dark bg-dark sticky-top">
        <div
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggleExternalContent"
          aria-controls="navbarToggleExternalContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <img alt="" className="img_src" src={require("./pytorch.svg")}></img>
        </div>
      </nav>
      <div class="container">
        <div class="row">
          <button
            type="button"
            class="btn btn-lg btn-danger centered"
            data-placement="bottom"
            data-toggle="popover"
            title="How to?"
            data-content="Draw your digit inside the left canvas and click 'Feed image' to make neural-network predict given digit."
          >
            How this project works?
          </button>
        </div>
        <div class="row">
          <div class="col">
            <div class="row"></div>
            <div class="row">
              <canvas
                className="canvas2"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMove}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                onTouchMove={function (e) {
                  window.alert("XD");
                  var touch = e.touches[0];
                  var mouseEvent = new MouseEvent(
                    "mousemove",
                    {
                      clientX: touch.clientX,
                      clientY: touch.clientY,
                    },
                    false
                  );
                  canvas.dispatchEvent(mouseEvent);
                }}
                ref={canvas}
                width={207}
                height={207}
              />
            </div>
            <div class="row">
              <div class="btn-group" role="group">
                <button
                  type="button"
                  onClick={buttonClick}
                  class="btn btn-dark"
                >
                  Feed image
                </button>
                <button type="button" onClick={erase} class="btn btn-dark">
                  Erase image
                </button>
              </div>
            </div>
          </div>
          <div class="col">
            <h3>
              {" "}
              <span class="badge badge-dark text2">Results</span>
            </h3>
            <canvas className="canvas3" ref={canvas2} />
          </div>
        </div>
      </div>
    </>
  );
}
