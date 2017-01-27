class  Paddle{
  constructor(ctx, i , j, pw){
    this.ctx = ctx;
    // this.dimX = i;
    // this.dimY = j;
    this.x = i;
    this.y = j;
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
      if (this.x > 20){
          this.x += (-30);
        // this.x = this.x + 10 ;
      }
      else {
        this.x = 0;
      }
    }else if (move === 10){
      if (this.x < (400-this.paddleWidth-30)){
          this.x += (30);
        // this.x = this.x - 10 ;
      }
      else {
          this.x = 400-this.paddleWidth;
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
