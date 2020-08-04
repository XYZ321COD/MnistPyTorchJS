// import React, { useState, useRef, useEffect } from "react";
import Chart from "chart.js";

function createChart(ctx2) {
  var chart = new Chart(ctx2, {
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
  return chart;
}

function setDataToChart(chart, data) {
  chart.data.datasets[0].data = data;
  chart.update();
}

function drawLineOnChart(ctx, xFrom, yFrom, xTo, yTo) {
  ctx.beginPath();
  ctx.moveTo(xFrom, yFrom);
  ctx.lineTo(xTo, yTo);
  ctx.strokeStyle = "black";
  ctx.lineCap = "round";
  ctx.lineWidth = 10;
  ctx.stroke();
}
export { createChart, setDataToChart, drawLineOnChart };
