function clearCanvas(canvas) {
  const ctx = canvas.current.getContext("2d");
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function getImageFromCanvas(canvas) {
  const ctx = canvas.current.getContext("2d");
  ctx.drawImage(canvas.current, 0, 0, 28, 28);
  const scaled_image = ctx.getImageData(0, 0, 28, 28);
  return scaled_image;
}
export { clearCanvas, getImageFromCanvas };
