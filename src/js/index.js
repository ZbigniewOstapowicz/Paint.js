import Paint from "./paint";
const canvas1 = document.querySelector('[data-js="canvas1"]');
const canvas2 = document.querySelector('[data-js="canvas2"]');
const content = document.querySelector('[data-js="content"]');

const ctx1 = canvas1.getContext("2d");
const ctx2 = canvas2.getContext("2d");
function canvasSize() {
  const paintBar = document.querySelector(".paint-bar");
  const paintBarHeight = paintBar.offsetHeight + 8;
  content.style.height = `${window.innerHeight - paintBarHeight}px`;
  canvas1.width = content.offsetWidth;
  canvas1.height = content.offsetHeight;
  canvas2.width = canvas1.width;
  canvas2.height = canvas1.height;
}
canvasSize();

window.addEventListener("resize", () => {
  canvasSize();
});
window.addEventListener("orientationchange", e => {
  canvasSize();
});


const CanPaint = new Paint(canvas1, ctx1, canvas2, ctx2);
CanPaint;
// CanPaint.draw();
