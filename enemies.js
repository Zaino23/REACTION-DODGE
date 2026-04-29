export default class Enemies {
  constructor(gameWidth, gameHeight){
      this.speedY = 5;
      this.gameWidth = gameWidth;
      this.gameheight = gameHeight;
      this.image = document.getElementById('spaceShip');
      this.width = 50;
      this.height = 50;
      this.x = this.x = Math.random() * (gameWidth - this.width);
      this.y = -50;
      this.frameX = Math.floor(Math.random() * 2);
      this.frameY = Math.floor(Math.random() * 2);
    }

    update() {;
      this.y += this.speedY;
    }

    draw(context){
      context.drawImage(this.image,
                        this.frameX * this.width,
                        this.frameY * this.height,
                        this.width,
                        this.height,
                        this.x,
                        this.y,
                        this.width,
                        this.height
      )
    }
}