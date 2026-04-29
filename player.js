export default class Player {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.image = document.getElementById('blue-player');
      this.width = 41;
      this.height = 38;
      this.x = gameWidth / 2 - this.width / 2;
      this.y = gameHeight - this.height - 50; 
      this.frameX = 0;
      this.frameY = 0;
    }
    drawPlayer(context) {
      context.drawImage(this.image,
                        this.width * this.frameX,
                        this.height * this.frameY,
                        this.width,
                        this.height,
                        this.x,
                        this.y,
                        this.width,
                        this.height
                      );
                    
    }
  }