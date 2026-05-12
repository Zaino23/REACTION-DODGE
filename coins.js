const coinTexts = document.querySelectorAll('.coinsBtn');
const coinsEarned = document.getElementById('coinsEarned');

export default class Coins {
  constructor() {
    this.coinsEarned = 0;
    this.coins = Number(localStorage.getItem('coins')) || 0;
  }

  updateCoins(score) {
    if(score >= 499){
      this.coinsEarned = Math.floor(score / 5) + 100;
    } else if(score >= 200) {
      this.coinsEarned = Math.floor(score / 5) + 25;
    } else if(score >= 100) {
      this.coinsEarned = Math.floor(score / 5) + 10;
    } else if(score >= 50) {
      this.coinsEarned = Math.floor(score / 5) +5;
    } else {
      this.coinsEarned = Math.floor(score / 5);
    }
    this.coins += this.coinsEarned ;
    coinTexts.forEach(txt => {
      txt.textContent = `${this.coins} 🪙`;
      localStorage.setItem('coins', this.coins);  
    });
    coinsEarned.textContent = `coins earned  ${Number(this.coinsEarned)}` ;
  }
}