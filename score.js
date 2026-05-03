export default class ScoreDisplay {
  constructor(canvas) {
    this.x = canvas.width / 2;
    this.y = 25;
  }
  drawScore(ctx, score) {
    ctx.fillStyle = "white";
    ctx.font = "20px helevatica"
    ctx.textAlign = 'center';
    ctx.fillText(`Score: ${score}`, this.x, this.y);
  }
  bestScore(score, bestScore, newBestScore) {
    if(score > bestScore) {
      newBestScore();
    }
  }
}