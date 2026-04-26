import Player from "./player.js"
import InputHandler from "./input.js";
import Enemies from "./enemies.js";


window.onload = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const box = document.getElementById('container');
  const loading = document.getElementById('loading');
  loading.style.display = 'none';

  canvas.width = box.clientWidth;
  canvas.height = box.clientHeight;

  console.log(canvas.width, canvas.height)
  canvas.addEventListener("contextmenu", e => e.preventDefault());
  
  let Rholding = false;
  let Lholding = false;

  let eColor = 'blue';

  const enemies = [];
  const player = new Player(canvas.width, canvas.height);
  const input = new InputHandler(canvas);
  const enemy = new  Enemies(canvas);

  for (let i = 0; i < 4; i++) {
  let enemy = new Enemies(canvas);
  enemy.y = -50 - i * 175; 
  enemies.push(enemy)
}
  console.log(enemies);

  function renderEnemies() {
    for(let i =0; i < enemies.length; i++) {
      enemies[i].update();
      enemies[i].draw(ctx);

      if(enemies[i].y > canvas.height) {
      enemies.splice(i, 1);
      enemies.push(new Enemies(canvas.width, canvas.height));
    }
    }
  }  

  function collision() {
    for(let i = 0; i < enemies.length; i++) {
      let e = enemies[i];
      if (
        player.x < e.x + 50 &&
        player.x + 50 > e.x &&
        player.y < e.y + 50 &&
        player.y + 50 > e.y
      ) {
        eColor = 'white';
        alert('GAME OVER!')
        player.x = canvas.width / 2;
        input.Rholding = false;
        input.Lholding = false;
        enemies.length = 0;

        for(let j = 0; j < 4; j++) {
          let enemy = new Enemies(canvas.width, canvas.height);
          enemy.y = -50 - j * 175; 
          enemies.push(enemy)
        }
      }
    }
  }

  function animate() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    renderEnemies();
    player.drawPlayer(ctx); 
    input.draw(player, canvas);
    enemy.draw(ctx)
    collision();
    requestAnimationFrame(animate);
  }
  animate();
};