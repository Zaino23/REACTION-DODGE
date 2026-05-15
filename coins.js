const coinTexts = document.querySelectorAll('.coinsBtn');
const coinsEarned = document.getElementById('coinsEarned');

export default class Coins {
  constructor() {
    this.coinsEarned = 0;
    this.coins = Number(localStorage.getItem('coins')) || 0;
    this.scoreBonus = 0;
  }

  updateCoins(score, bonus) {
    this.scoreBonus = 0;
    if(score >= 499){
      this.scoreBonus = 100;
      this.coinsEarned = Math.floor(score / 5 * bonus) + this.scoreBonus ;
    } else if(score >= 200) {
      this.scoreBonus = 50;
      this.coinsEarned = Math.floor((score / 5 * bonus) + this.scoreBonus );
    } else if(score >= 100) {
      this.scoreBonus = 25;
      this.coinsEarned = Math.floor(score / 5 * bonus) + this.scoreBonus;
    } else if(score >= 50) {
      this.scoreBonus = 10;
      this.coinsEarned = Math.floor(score / 5 * bonus) + this.scoreBonus;
    } else {
      this.coinsEarned = Math.floor(score / 5 * bonus);
    }
    this.coins += this.coinsEarned ;
    console.log(this.scoreBonus)
    coinTexts.forEach(txt => {
      txt.textContent = `${this.coins} 🪙`;
      localStorage.setItem('coins', this.coins);  
    });
     if(bonus === 1.25 && this.scoreBonus > 0) {
      coinsEarned.textContent = `coins earned  ${Number(score / 5)} 🪙 + ${Number(score / 5 * 0.25)} 🪙  + ${this.scoreBonus} 🪙= ${Number(this.coinsEarned)} 🪙 `
    this.scoreBonus = 0;
    } else if (bonus === 1 && this.scoreBonus > 0) {
      coinsEarned.textContent = `coins earned ${this.coinsEarned - this.scoreBonus} 🪙 + ${this.scoreBonus} 🪙 = ${this.coinsEarned} 🪙`;
    this.scoreBonus = 0;
    } else if(bonus === 1.25){
    coinsEarned.textContent = `coins earned  ${Number(score / 5)} 🪙 + ${Number(score / 5 * 0.25)} 🪙  = ${Number(this.coinsEarned)} 🪙 ` ;
    this.scoreBonus = 0;
    } else if (bonus === 1) {
      coinsEarned.textContent = `coins earned ${this.coinsEarned} 🪙 `;
    this.scoreBonus = 0;
    } 
  }
}