import Player from "./player.js"
import InputHandler from "./input.js";
import Enemies from "./enemies.js";

window.onload = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const box = document.getElementById('container');
  const loading = document.getElementById('loading');
  const startMenu = document.getElementById('startMenu');
  const pause = document.getElementById('pause');
  loading.style.display = 'none';

  canvas.width = 400;
  canvas.height = box.clientHeight;

  canvas.addEventListener("contextmenu", e => e.preventDefault());
  
  let Rholding = false;
  let Lholding = false;

  let eColor = 'blue';
  
  let isPaused = true;

  const enemies = [];
  const player = new Player(canvas.width, canvas.height);
  const input = new InputHandler();
  const enemy = new  Enemies(canvas);

  for (let i = 0; i < 4; i++) {
  let enemy = new Enemies(canvas);
  enemy.y = -50 - i * 175; 
  enemies.push(enemy)
}

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
        player.x < e.x + e.width &&
        player.x + player.width > e.x &&
        player.y < e.y + e.height &&
        player.y + player.height > e.y
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
  const startBtn = document.getElementById('startBtn');
  startBtn.addEventListener('click', start);

function start() {
    startMenu.style.display = 'none';
    box.style = 'border: 2px solid #136265';
    pause.style.opacity = 1;
    isPaused = false;
    animate();
}

function pauseGame() {
  isPaused = true;
  pause.innerHTML = '⏵';
}

function resume() {
  if(isPaused) {
    isPaused = false;
    pause.innerHTML = '❚❚';
    animate();
  }
}

  pause.addEventListener('click', e => {
    if(isPaused) resume();
    else if (!isPaused) pauseGame();
  });

function animate() {
    if(isPaused) return;

    ctx.fillStyle = '#1c9ab3';
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