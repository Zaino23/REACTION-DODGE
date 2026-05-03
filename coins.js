const coinTexts = document.querySelectorAll('.coinsBtn');
const coinsEarned = document.getElementById('coinsEarned');

export default class Coins {
  constructor() {
    this.coinsEarned ;
    this.coins = Number(localStorage.getItem('coins')) || 0;
  }

  updateCoins(score) {
    this.coinsEarned = Math.floor(score / 5)
    this.coins += this.coinsEarned ;
    coinTexts.forEach(txt => {
      txt.textContent = `${this.coins} 🪙`;
      localStorage.setItem('coins', this.coins);  
    });
    coinsEarned.innerHTML = `coins earned  ${Number(this.coinsEarned)}` ;
  }
}