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
        this.bricks[i][j] = { this.alive = true; };
      }
    }
  }
  //
  // drawBricks(r, c) {
  //   for(let i=0; i<c; i++) {
  //     for(let j=0; j<r; j++) {
  //       let brickX = (i*(bwidth+padding))+brickshiftspace;
  //       let brickY = (j*(bheight+padding))+topemptyspace;
  //       this.bricks[i][j].x = brickX;
  //       this.bricks[i][j].y = brickY;
  //       this.ctx.beginPath();
  //       this.ctx.rect(brickX, brickY, bwidth, bheight);
  //       this.ctx.fillStyle = "#841F27";
  //       this.ctx.fill();
  //       this.ctx.closePath();
  //     }
  //   }
  // }

}

module.exports = Brick;
