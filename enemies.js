export default class Enemies {
  constructor(gameWidth, gameHeight, score){
      this.speedY = 2;
      this.gameWidth = gameWidth;
      this.gameheight = gameHeight;
      this.image = document.getElementById('spaceShip');
      this.width = 50;
      this.height = 50;
      this.x = Math.random() * (gameWidth - this.width);
      this.y = -50;
      this.frameX = Math.floor(Math.random() * 2);
      this.frameY = Math.floor(Math.random() * 2);
    }

    update(score) {;
      this.speedY = 2 + Math.floor(score / 20) * 0.5 ;
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
    recycleEnemies(enemies, canvas, ctx, onRecycle, score) {
      for(let i =0; i < enemies.length; i++) {
        enemies[i].update(score);
        enemies[i].draw(ctx);
        if(enemies[i].y > canvas.height) {
          enemies.splice(i, 1);
          enemies.push(new Enemies(canvas.width, canvas.height));
          onRecycle();
      }
    }
  }
  resetEnemies(enemies, canvas) {
    enemies.length = 0;
        for (let i = 0; i < 4; i++) {
          let enemy = new Enemies(canvas.width, canvas.height);
          enemy.y = -50 - i * 175; 
          enemies.push(enemy)
    }
  }
}