import React from "react";
import "./NavBar.css";
export default function NavBar() {
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
          <img
            alt=""
            className="img_src"
            src={require("../resources/pytorch.svg")}
          ></img>
        </div>
      </nav>
    </>
  );
}
