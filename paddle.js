class  Paddle{
  constructor(ctx, i , j, pw, gamex, gamey){
    this.ctx = ctx;
    this.x = i;
    this.y = j;
    this.paddleWidth = pw;
    this.gamex =gamex;
    this.gamey=gamey;
  }
  displayPaddle(){

    this.ctx.beginPath();
    this.ctx.fillStyle = "#ff585b";
    this.ctx.rect(this.x, this.y, this.paddleWidth, 20);
    this.ctx.closePath();
    this.ctx.fill();
  }


  updatePaddle(move){

    if (move === -25 ){
      if (this.x > 25){
          this.x += (-25);

      }
      else {
        this.x = 0;
      }
    }else if (move === 25){
      if (this.x < (this.gamex-this.paddleWidth-25)){
          this.x += (25);

      }
      else {
          this.x = this.gamex-this.paddleWidth;
      }
    }
  }

}

module.exports = Paddle;
