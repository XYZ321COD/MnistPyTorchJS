import React from "react";
import "./PopOver.css";
export default function PopOver() {
  return (
    <>
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
    </>
  );
}
