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
        // need to have x postion, y postion and alive value for every brick
        this.bricks[i][j] = { x: 0, y: 0, alive: 1};

      }
    }
  }
  //
  drawBricks(w,h, p, tp, lp) {
    if (this.bricks.length === 0) {
      return;
    }
    for (let c = 0; c < this.columns; c++) {
      for (let r = 0; r < this.rows; r++) {
        if (this.bricks[c][r].alive > 0) {
          // set x and y postion of the bricks so that i can use them to keep track of the bricks
          let brickX = (c * (w + p)) + lp;
          let brickY = (r * (h + p)) + tp;
          this.bricks[c][r].x = brickX;
          this.bricks[c][r].y = brickY;
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
