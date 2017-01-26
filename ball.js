class Ball {
  constructor(ctx, i, j, dx, dy) {
    this.ctx = ctx;
    this.dimX = i;
    this.dimY = j;
    this.x = i/2;
    this.y = j - 30;
    this.movex = dx;
    this.movey = -dy;
    this.reachbottom = false;

    this.paddlew = 100;
  }

  displayBall() {
    this.ctx.beginPath();
    this.ctx.fillStyle="white";
    this.ctx.arc(this.x,this.y,10,0,Math.PI*2,true);
    this.ctx.closePath();
    this.ctx.fill();
  }


  ballUpdate(paddlex){

    if( ( (this.x + this.movex)  < 10) || ( (this.x + this.movex) > (this.dimX - 10) ) ) {
      this.movex=-this.movex;

    }
    if( (this.y + this.movey) < 10){
      this.movey=-this.movey;
    }
    if ((this.y + this.movey) > (this.dimY - 30)) {
      if (this.x > paddlex && this.x < (paddlex + this.paddlew ) ){
          this.movey= (-1 *this.movey)  ;
      }
    }
    this.x+=this.movex;
    this.y+=this.movey;
    if (this.y >= 289) {
      this.reachbottom = true;
    }
  }
}

module.exports = Ball;
