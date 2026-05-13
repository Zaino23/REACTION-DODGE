import Player from "./player.js"
import InputHandler from "./input.js";
import Enemies from "./enemies.js";
import ScoreDisplay from "./score.js";
import Coins from "./coins.js";
import renderShop from "./shop.js";

window.onload = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const box = document.getElementById('container');
  const loading = document.getElementById('loading');
  loading.style.display = 'none';

  const menus = {
    startMenu: document.getElementById('startMenu'),
    pauseMenu: document.getElementById('PauseMenu'),
    endMenu: document.getElementById('EndMenu'),
    shop: document.getElementById('shop')
  }
  
  const scoreBoard = {
    endScore: document.getElementById('score'),
    bestScore: document.getElementById('bestScore'),
  }

  const buttons = {
    pause: document.getElementById('pause'), 
    pause2: document.getElementById('pause2'),
    QuitButtons:  document.querySelectorAll('.quitBtn'),
    restartButtons: document.querySelectorAll('.RestartBtn'),
    shopBtn: document.querySelectorAll('.shopBtn'),
    startBtn:  document.getElementById('startBtn')
  }

  canvas.width = 400;
  canvas.height = box.clientHeight;

  canvas.addEventListener("contextmenu", e => e.preventDefault());
  
  let isPaused = true;

  let score = 0;
  let bonus = 1;
  let bestScore = Number(localStorage.getItem('hightScore')) || 0;
  let coins = 0;

  const enemies = [];
  const player = new Player(canvas.width, canvas.height, canvas);
  const input = new InputHandler();
  const enemy = new Enemies(canvas.width, canvas.height, score);
  const ScoreDisplayer = new ScoreDisplay(canvas);
  const coinsDisplayer = new Coins() ;

  const coinTexts = document.querySelectorAll('.coinsBtn');
  coinTexts.forEach(txt => {
    txt.textContent = `${Number(localStorage.getItem('coins'))} 🪙`;
  })

  renderShop();

  function collision() {
    const pad = 6;
    for(let i = 0; i < enemies.length; i++) {
      let e = enemies[i];
      if (
        player.x + pad < e.x + e.width - pad &&
        player.x + player.width - pad > e.x + pad &&
        player.y + pad < e.y + e.height - pad &&
        player.y + player.height - pad > e.y + pad
      ) {
        endGame();
      }
    }
  }

  function onRecycle() {
    score ++;
  }

  function newBestScore() {
    bestScore = score;
    localStorage.setItem('hightScore', bestScore);
  }

  buttons.startBtn.addEventListener('click', start);

    function hideAllMenus() {
      Object.values(menus).forEach(menu => {
        menu.style.display = 'none';
      })
    }

  function restart() {
        enemy.resetEnemies(enemies, canvas);
        player.ressetPlayer(input, canvas);
        hideAllMenus();
        score = 0;  
  }

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
      buttons.restartButtons.forEach(tempButtons => {
        tempButtons.addEventListener('click', e=> {
        restart();
        hideAllMenus();
        buttons.pause.style.display = 'inline-block';
        buttons.pause.innerHTML = '❚❚';
        isPaused = false;
        enemy.resetEnemies(enemies, canvas);
        animate();
      })
      })

function start() {
    box.style = 'border: 2px solid #136265';
    buttons.pause.style.display = 'inline-block';
    isPaused = false;
    restart();
    hideAllMenus();
    player.ressetPlayer(input, canvas);
    enemy.resetEnemies(enemies, canvas);
    score = 0;
    animate();
}


function pauseGame() {
  isPaused = true;
  buttons.pause.style.display = 'none';
  menus.pauseMenu.style.display = 'block'
}

function resume() {
  if(isPaused) {
    isPaused = false;
    buttons.pause.style.display = 'inline-block';
    menus.pauseMenu.style.display = 'none';
    animate();
  }
}

  buttons.shopBtn.forEach(button => {
    button.addEventListener('click', e => {
      hideAllMenus();
      menus.shop.style.display = 'block';
      isPaused = true;
    })
  })

  buttons.pause.addEventListener('click', e => {
    if(isPaused) resume();
    else if (!isPaused) pauseGame();
  });
  buttons.pause2.addEventListener('click', e=> {
    if(isPaused) resume();
  })

  buttons.QuitButtons.forEach(qButton => {
    qButton.addEventListener('click', () => {
      quitGame();
      player.ressetPlayer(input, canvas);
    })
  })

  function quitGame() {
    if(isPaused) {
      clear();
      box.style.border = 'none';
      hideAllMenus();
      menus.startMenu.style.display = 'block';
      enemies.length = 0;
      isPaused = false;
    }
  }

  function endGame() {
    hideAllMenus();
    buttons.pause.style.display = 'none';
    isPaused = true;
    menus.endMenu.style.display = 'block';
    player.ressetPlayer(input, canvas);
    enemy.resetEnemies(enemies, canvas);
    scoreBoard.endScore.innerHTML = `SCORE: ${score}`
    scoreBoard.bestScore.innerHTML = `Highscore ${bestScore}`;
    bonus = localStorage.getItem('sold-bonus') === 'true' ? 1.25 : 1;
    coinsDisplayer.updateCoins(score, bonus);
    score = 0;
  }

function animate() {
    if(isPaused) return;

    ctx.fillStyle = '#1c9ab3';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    enemy.recycleEnemies(enemies, canvas, ctx, onRecycle, score);
    player.drawPlayer(ctx); 
    input.draw(player, canvas); 
    ScoreDisplayer.drawScore(ctx, score);
    ScoreDisplayer.bestScore(score, bestScore, newBestScore)
    collision();
    requestAnimationFrame(animate);
  }
  animate();
};