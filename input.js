export default class InputHandler {
  constructor() {
    
      this.Rholding = false;
      this.Lholding = false;

      window.addEventListener('keydown', e => {
        switch(e.key.toUpperCase()) {
          case 'ARROWLEFT' : this.Lholding = true;
          break;
          case 'ARROWRIGHT' : this.Rholding = true;
          break;
          case 'A': this.Lholding = true;
          break;
          case 'D': this.Rholding = true;
          break;
        }
      });
      window.addEventListener('keyup', e => {
        switch(e.key.toUpperCase()) {
          case 'ARROWLEFT' : this.Lholding = false;
          break;
          case 'ARROWRIGHT' : this.Rholding = false;
          break;
          case 'A' : this.Lholding = false;
          break;
          case 'D' : this.Rholding = false;
          break;
        }
      })
      /*
      window.addEventListener('mousedown', e => {
        switch(e.button) {
          case 0 : this.Lholding = true;
          break;
          case 2 : this.Rholding = true;
          break;
        }
      })      
      window.addEventListener('mouseup', e => {
        switch(e.button) {
          case 0 : this.Lholding = false;
          break;
          case 2 : this.Rholding = false;
          break;
        }
      })
*/
      window.addEventListener('contextmenu', e => e.preventDefault());
  }
  draw(player, canvas) {
      if(this.Lholding === true && player.x > 0){
        player.x -= 10;
      } else if(this.Rholding === true && player.x < canvas.width - player.width) {
        player.x += 10;
    }
  }
}