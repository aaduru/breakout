class  Paddle{
  constructor(ctx, i , j){
    this.ctx = ctx;
    this.dimX = i;
    this.dimY = j;
    this.x = (i / 2) - 50;
    this.y = j - 20;
  }
  displayPaddle(){

    this.ctx.beginPath();
    this.ctx.fillStyle = "yellow";
    this.ctx.rect(this.x, this.y, 100, 20);
    this.ctx.closePath();
    this.ctx.fill();
  }


  updatePaddle(move){
  
    if (move === -5 ){
      this.x += move;
      if (this.x === 0){
        this.x = this.x + 5 ;
      }
    }else if (move === 5){
      this.x += 5;
      if (this.x === 300){
        this.x = this.x - 5 ;
      }
    }
  }
}

module.exports = Paddle;
