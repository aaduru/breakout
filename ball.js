class Ball {
  constructor(ctx, i, j, dx, dy, pw) {
    this.ctx = ctx;
    this.dimX = i;
    this.dimY = j;
    this.x = i/2;
    this.y = j - 30;
    this.movex = dx;
    this.movey = -dy;
    this.reachbottom = false;

    this.paddlew = pw;
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

    if( ((paddlex - (10/1.44)) <= this.x) && (paddlex + this.paddlew + (10/1.44) >= this.x)) {
      if((this.y+10) > (this.dimY - 20 - Math.abs(this.movey))){
        if((this.y+10) < (this.dimY - 10 + Math.abs(this.movey))){
          if(this.movey > 0){

            this.movey = - this.movey;
          }
        }
      }
    }

    this.x+=this.movex;
    this.y+=this.movey;
  }
}

module.exports = Ball;
