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
      // this.ctx.lineWidth=e.target.value;
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
        }
        for (const ele of this.buttons) {
          if (ele != e.currentTarget) {
            ele.classList.remove("active");
          }
        }
      });
    });
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
    this.canvas.ontouchstart = ev => {
      this.positionMobileStart(ev);
    };
    this.canvas.onmousedown = ev => {
      this.positionStart(ev);
      // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // this.ctx.beginPath();
    };

    this.canvas.ontouchmove = ev => {
      ev.preventDefault();
      if (this.rect) {
        this.positionMobileEnd(ev);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        // this.ctx.stroke(this.rect.x0, this.rect.y0,
        // this.rect.x1,this.rect.y1);
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
        // this.ctx.stroke(this.rect.x0, this.rect.y0,
        // this.rect.x1,this.rect.y1);
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
      // this.ctx.strokeRect(this.rect.x0, this.rect.y0,
      //     this.rect.x1 - this.rect.x0, this.rect.y1 - this.rect.y0);
      //   this.ctx.stroke();
      this.ctx2.drawImage(this.canvas, 0, 0);
      this.rect = null;
    };
  }
  drawRectangel() {
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
}
export default Paint;
