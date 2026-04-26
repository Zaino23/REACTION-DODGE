export default class InputHandler {
  constructor(canvas) {
        this.Rholding = false;
        this.Lholding = false;

        document.addEventListener('keydown', event => {
        if(event.key === 'ArrowLeft' || event.key === 'A' || event.key === 'a') this.Lholding = true;
        else if(event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {this.Rholding = true}
      });
        
        document.addEventListener('keyup', event => {
          if(event.key === 'ArrowLeft' || event.key === 'A' || event.key === 'a') this.Lholding = false;
          else if(event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {this.Rholding = false}
        })
    
    
      canvas.addEventListener('mousedown', event => {
        if(event.button === 0) this.Lholding = true; 
        else if(event.button === 2) this.Rholding = true; 
      })
      document.addEventListener('mouseup', event => {
        if(event.button === 0) this.Lholding = false;
        if(event.button === 2) this.Rholding = false;
      });
  }
  draw(player, canvas) {
      if(this.Lholding === true && player.x > 0){
        player.x -= 5;
      } else if(this.Rholding === true && player.x < canvas.width - 50) {
        player.x += 5;
    }
  }
}