class Paint {
  constructor(canvas, ctx, canvas2, ctx2) {
    this.canvas = canvas;
    this.canvas2 = canvas2;
    this.ctx = ctx;
    this.ctx2 = ctx2;
    this.rect = null;
    this.controls();
    this.setupInit();
    this.handelControls();
  }
  setupInit() {
    this.ctx.lineJoin = "round";
    this.ctx.lineCap = "round";
    this.lineWidthEle.value = 3;
    this.ctx.lineWidth = this.lineWidthEle.value;
    this.sizeElemVal.innerText = this.lineWidthEle.value;
    this.draw();
  }

  controls() {
    this.lineWidthEle = document.querySelector(".paint-size");
    this.sizeElemVal = document.querySelector(".paint-size-val");
    this.sizeElemVal.innerText = this.lineWidthEle.value;
    this.lineColorEle = document.querySelector("#color");
  }
  handelControls() {
    this.lineWidthEle.addEventListener("input", e => {
      this.sizeElemVal.innerText = e.target.value;
    });
    this.lineWidthEle.addEventListener("change", e => {
      this.ctx.lineWidth = e.target.value;
    });
    this.lineColorEle.addEventListener("change", e => {
      this.ctx.strokeStyle = e.target.value;
    });
    window.onresize = () => {
      this.setupInit();
    };
    const btnClear = document.querySelector('[data-js="clear"]');
    btnClear.addEventListener("click", () => {
      this.clearCanvas();
    });
    const btnSaveFile = document.querySelector('[data-js="saveFile"]');
    btnSaveFile.addEventListener("click", () => {
      this.saveCnavas();
    });
    const btnOpenFile = document.querySelector('[data-js="openFile"]');
    btnOpenFile.addEventListener("change", () => {
      this.openFile();
    });
    this.buttons = document.querySelectorAll(".btn");
    this.buttons.forEach(button => {
      button.addEventListener("click", e => {
        if (button.classList.contains("draw")) {
          button.classList.add("active");
          this.draw();
        } else if (button.classList.contains("drawLine")) {
          button.classList.add("active");
          this.drawLine();
        } else if (button.classList.contains("drawRect")) {
          button.classList.add("active");
          this.drawRectangel();
        } else if (button.classList.contains("drawCircel")) {
          button.classList.add("active");
          this.drawCircel();
        } else if (button.classList.contains("drawTriangel")) {
          button.classList.add("active");
          this.drawTriangel();
        } else if (button.classList.contains("fill")) {
          button.classList.add("active");
          this.fillElement();
        }
        for (const ele of this.buttons) {
          if (ele != e.currentTarget) {
            ele.classList.remove("active");
          }
        }
      });
    });
  }

  cursorStyle(style) {
    this.canvas.style.cursor = style;
  }

  positionStart(e) {
    this.rect = {};
    this.rect.x0 = e.offsetX;
    this.rect.y0 = e.offsetY;
  }
  positionEnd(e) {
    this.rect.x1 = e.offsetX;
    this.rect.y1 = e.offsetY;
  }
  positionMobileStart(e) {
    this.rect = {};
    this.rect.correction = this.canvas.getBoundingClientRect();
    this.rect.x0 = e.touches[0].pageX - this.rect.correction.x;
    this.rect.y0 = e.touches[0].pageY - this.rect.correction.y;
  }
  positionMobileEnd(e) {
    this.rect.x1 = e.touches[0].pageX - this.rect.correction.x;
    this.rect.y1 = e.touches[0].pageY - this.rect.correction.y;
  }
  draw() {
    this.cursorStyle("url('./img/Pencil.png') 2 29, auto");
    this.canvas.ontouchstart = ev => {
      this.positionMobileStart(ev);
      this.ctx.beginPath();
      this.ctx.moveTo(this.rect.x0, this.rect.y0);
    };
    this.canvas.onmousedown = ev => {
      this.positionStart(ev);
      this.ctx.beginPath();
      this.ctx.moveTo(this.rect.x0, this.rect.y0);
    };
    this.canvas.ontouchmove = ev => {
      ev.preventDefault();
      this.positionMobileEnd(ev);
      if (this.rect) {
        this.positionMobileEnd(ev);
        this.ctx.lineTo(this.rect.x1, this.rect.y1);
        this.ctx.stroke();
      }
    };
    this.canvas.onmousemove = ev => {
      if (this.rect) {
        this.positionEnd(ev);
        this.ctx.lineTo(this.rect.x1, this.rect.y1);
        this.ctx.stroke();
      }
    };
    this.canvas.onmouseup = ev => {
      this.ctx2.drawImage(this.canvas, 0, 0);
      this.rect = null;
    };
    this.canvas.ontouchend = ev => {
      this.ctx2.drawImage(this.canvas, 0, 0);
      this.rect = null;
    };
  }
  drawLine() {
    this.cursorStyle("crosshair");
    this.canvas.ontouchstart = ev => {
      this.positionMobileStart(ev);
    };
    this.canvas.onmousedown = ev => {
      this.positionStart(ev);
    };

    this.canvas.ontouchmove = ev => {
      ev.preventDefault();
      if (this.rect) {
        this.positionMobileEnd(ev);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.moveTo(this.rect.x0, this.rect.y0);
        this.ctx.lineTo(this.rect.x1, this.rect.y1);
        this.ctx.closePath();
        this.ctx.stroke();
      }
    };

    this.canvas.onmousemove = ev => {
      if (this.rect) {
        this.positionEnd(ev);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.moveTo(this.rect.x0, this.rect.y0);
        this.ctx.lineTo(this.rect.x1, this.rect.y1);
        this.ctx.closePath();
        this.ctx.stroke();
      }
    };

    this.canvas.ontouchend = ev => {
      this.ctx2.drawImage(this.canvas, 0, 0);
      this.rect = null;
    };

    this.canvas.onmouseup = ev => {
      this.ctx2.drawImage(this.canvas, 0, 0);
      this.rect = null;
    };
  }
  drawRectangel() {
    this.cursorStyle("crosshair");
    this.canvas.ontouchstart = ev => {
      this.positionMobileStart(ev);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
    };
    this.canvas.onmousedown = ev => {
      this.positionStart(ev);
      this.ctx.beginPath();
    };

    this.canvas.ontouchmove = ev => {
      ev.preventDefault();
      if (this.rect) {
        this.positionMobileEnd(ev);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.strokeRect(
          this.rect.x0,
          this.rect.y0,
          this.rect.x1 - this.rect.x0,
          this.rect.y1 - this.rect.y0
        );
        this.ctx.moveTo(this.rect.x0, this.rect.y0);
        this.ctx.lineTo(this.rect.x1, this.rect.y1);
        this.ctx.closePath();
      }
    };

    this.canvas.onmousemove = ev => {
      if (this.rect) {
        this.positionEnd(ev);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.strokeRect(
          this.rect.x0,
          this.rect.y0,
          this.rect.x1 - this.rect.x0,
          this.rect.y1 - this.rect.y0
        );
        this.ctx.moveTo(this.rect.x0, this.rect.y0);
        this.ctx.lineTo(this.rect.x1, this.rect.y1);
        this.ctx.closePath();
      }
    };

    this.canvas.ontouchend = ev => {
      this.ctx2.drawImage(this.canvas, 0, 0);
      this.rect = null;
    };

    this.canvas.onmouseup = ev => {
      this.ctx2.drawImage(this.canvas, 0, 0);
      this.rect = null;
    };
  }
  drawCircel() {
    this.cursorStyle("crosshair");

    this.canvas.ontouchstart = ev => {
      this.positionMobileStart(ev);
    };
    this.canvas.onmousedown = ev => {
      this.positionStart(ev);
    };

    this.canvas.ontouchmove = ev => {
      ev.preventDefault();
      if (this.rect) {
        this.positionMobileEnd(ev);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.arc(
          this.rect.x0,
          this.rect.y0,
          Math.abs(this.rect.x1 - this.rect.x0),
          0,
          2 * Math.PI
        );
        this.ctx.stroke();
        this.ctx.closePath();
      }
    };

    this.canvas.onmousemove = ev => {
      if (this.rect) {
        this.positionEnd(ev);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.arc(
          this.rect.x0,
          this.rect.y0,
          Math.abs(this.rect.x1 - this.rect.x0),
          0,
          2 * Math.PI
        );
        this.ctx.stroke();
        this.ctx.closePath();
      }
    };

    this.canvas.ontouchend = ev => {
      this.ctx2.drawImage(this.canvas, 0, 0);
      this.rect = null;
    };

    this.canvas.onmouseup = ev => {
      this.ctx2.drawImage(this.canvas, 0, 0);
      this.rect = null;
    };
  }

  drawTriangel() {
    this.cursorStyle("crosshair");
    this.canvas.ontouchstart = ev => {
      this.positionMobileStart(ev);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
    };
    this.canvas.onmousedown = ev => {
      this.positionStart(ev);
      this.ctx.beginPath();
    };

    this.canvas.ontouchmove = ev => {
      ev.preventDefault();
      if (this.rect) {
        this.positionMobileEnd(ev);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.moveTo(this.rect.x1, this.rect.y0);
        this.ctx.lineTo(this.rect.x0, this.rect.y0);
        this.ctx.lineTo(
          this.rect.x0 + (this.rect.x1 - this.rect.x0) * 0.5,
          this.rect.y1
        );
        this.ctx.closePath();
        this.ctx.stroke();
      }
    };

    this.canvas.onmousemove = ev => {
      if (this.rect) {
        this.positionEnd(ev);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.moveTo(this.rect.x1, this.rect.y0);
        this.ctx.lineTo(this.rect.x0, this.rect.y0);
        this.ctx.lineTo(
          this.rect.x0 + (this.rect.x1 - this.rect.x0) * 0.5,
          this.rect.y1
        );
        this.ctx.closePath();
        this.ctx.stroke();
      }
    };

    this.canvas.ontouchend = ev => {
      this.ctx2.drawImage(this.canvas, 0, 0);
      this.rect = null;
    };

    this.canvas.onmouseup = ev => {
      this.ctx2.drawImage(this.canvas, 0, 0);
      this.rect = null;
    };
  }
  fillElement() {
    this.canvas.style.cursor = "url('./img/Eraser.png') 2 27, auto";
    this.canvas.ontouchstart = ev => {
      this.positionMobileStart(ev);
      this.ctx.beginPath();
      this.ctx.moveTo(this.rect.x0, this.rect.y0);
    };
    this.canvas.onmousedown = ev => {
      this.positionStart(ev);
      this.ctx.strokeStyle = "rgb(173,216,230)";
      this.ctx.beginPath();
      this.ctx.moveTo(this.rect.x0, this.rect.y0);
    };
    this.canvas.ontouchmove = ev => {
      ev.preventDefault();
      this.positionMobileEnd(ev);
      this.ctx.strokeStyle = "rgb(173,216,230)";
      if (this.rect) {
        this.positionMobileEnd(ev);
        this.ctx.lineTo(this.rect.x1, this.rect.y1);
        this.ctx.stroke();
      }
    };
    this.canvas.onmousemove = ev => {
      if (this.rect) {
        this.positionEnd(ev);
        this.ctx.lineTo(this.rect.x1, this.rect.y1);
        this.ctx.stroke();
      }
    };
    this.canvas.onmouseup = ev => {
      this.ctx2.drawImage(this.canvas, 0, 0);
      this.ctx.strokeStyle = this.lineColorEle.value;
      this.rect = null;
    };
    this.canvas.ontouchend = ev => {
      this.ctx2.drawImage(this.canvas, 0, 0);
      this.ctx.strokeStyle = this.lineColorEle.value;
      this.rect = null;
    };
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx2.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  saveCnavas() {
    const file = this.canvas2
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const elem = document.createElement("a");
    elem.href = file;
    elem.download = "sample.png";
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }

  openFile() {
    let img = new Image();
   
    let reader = new FileReader();
    reader.onload = e => {
      img.src = e.target.result;
      img.onload = () => {
        var MAX_WIDTH = this.canvas2.width;
        var MAX_HEIGHT = this.canvas2.height;
        var width = img.width;
        var height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        console.log(width, height, img.width);

        this.ctx2.drawImage(img, 0, 0, width, height);
      };
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}
export default Paint;
