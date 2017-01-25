class Brick {
  constructor(ctx, r, c){
    this.ctx = ctx;
    this.bricks = [];
    this.alive = true;
    this.rows = r ;
    this.columns = c ;

  }
  brickArray(){
    for(let i=0; i<this.columns; i++) {
      this.bricks[i] = [];
      for(let j=0; j < this.rows; j++) {
        this.bricks[i][j] = { x: 0, y: 0, status: 1};
      }
    }
  }
  //
  drawBricks(w,h, p, tp, lp) {
    for (let c = 0; c < this.columns; c++) {
      for (let r = 0; r < this.rows; r++) {
        if (this.bricks[c][r].status > 0) {
          let brickX = (c * (w + p)) + lp;
          let brickY = (r * (h + p)) + tp;
          this.bricks[c][r].x = brickX;
          this.bricks[c][r].y = brickY;
          // // console.log(brickX);
          // // console.log(brickY);
          // console.log(h);
          // console.log(p);
          // console.log(tp);
          this.ctx.beginPath();
          this.ctx.rect(brickX, brickY, w, h);
          this.ctx.fillStyle = "#841F27";
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
  }
}


}

module.exports = Brick;
