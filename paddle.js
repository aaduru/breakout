class  Paddle{
  constructor(ctx, i , j, pw){
    this.ctx = ctx;
    this.dimX = i;
    this.dimY = j;
    this.x = (i / 2) - 50;
    this.y = j - 20;
    this.paddleWidth = pw;
  }
  displayPaddle(){

    this.ctx.beginPath();
    this.ctx.fillStyle = "yellow";
    this.ctx.rect(this.x, this.y, this.paddleWidth, 20);
    this.ctx.closePath();
    this.ctx.fill();
  }


  updatePaddle(move){

    if (move === -10 ){
      this.x += move;
      if (this.x === 0){
        this.x = this.x + 10 ;
      }
    }else if (move === 10){
      this.x += 5;
      if (this.x === 300){
        this.x = this.x - 10 ;
      }
    }
  }
  restart(keys) {
    if (keys.includes(13)) { // return

      this.isOver = false;
      this.level = 0;
      this.score = 0;
      this.lives = 3;

    }
  }
}

module.exports = Paddle;
