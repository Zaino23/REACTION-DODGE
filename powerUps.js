import renderShop from "./shop.js";

const container = document.querySelector('.items');

export default class Invis {
  constructor() {
    this.sold = localStorage.getItem('sold-invis') === 'true' || false;
    this.active = false;
    this.timerId = null;
    this.countDownId = null;
    this.timeLeft = 3;
  }
  checker() {
    if(localStorage.getItem('sold-invis') === 'true') this.sold = true;
    else if(localStorage.getItem('sold-invis') === 'false') this.sold = false;
  }
  tryactivate(key) {
    if(key.toUpperCase() !== 'I') return;
    if(!this.sold || this.active) return;

    this.active = true;
    this.timeLeft = 3;

    this.countDownId = setInterval(() => {
      this.timeLeft --;
      if(this.timeLeft <= 0) {
        clearInterval(this.countDownId);
        this.countDownId = null
      }
    }, 1000)

    this.timerId = setTimeout(() => {
      this.active = false;
      this.timerId = null;
      this.sold = false;
      localStorage.setItem('sold-invis', false);
      container.innerHTML = '';
      renderShop(this);
      
    }, 3000);
  }
  drawTime(canvas, context) {
    if(!this.sold) return;
      context.save();
      context.globalAlpha = 0.5;
      context.fillStyle = 'red';
      context.strokeStyle = 'white';
      context.lineWidth = 1;
      context.font = '30px Impact';
      context.textAlign = 'center';

      if(!this.active) {
        context.fillText("PRESS (I) TO INVIS", canvas.width / 2, 100)
        context.strokeText("PRESS (I) TO INVIS", canvas.width / 2, 100)
      } else {
        context.fillText(`Time left:${this.timeLeft}`, canvas.width / 2, 100);
        context.strokeText(`Time left:${this.timeLeft}`, canvas.width / 2, 100);
    }
      context.restore();
  }
}