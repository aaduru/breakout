const Ball = require("./ball.js");
const Brick = require("./bricks.js");
const Paddle = require("./paddle.js");

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.ball = new Ball(ctx, Game.DIM_X, Game.DIM_Y);
    this.paddle = new Paddle(ctx, Game.DIM_X, Game.DIM_Y);
    this.rows = 1;
    this.columns = 6;
    this.brick = new Brick(ctx, this.rows, this.columns);

    this.x = Game.DIM_X / 2;
    this.y = Game.DIM_Y-30;
    this.dx = 1;
    this.dy = 1;
    this.radius = 10;

    this.score = 0 ;
    this.lives = 3;
    this.level = 1 ;
    this.maxlevel = 3;
    // this.bricks = [];
    this.isOver = false;

    this.noOfBricks = 6;
    this.brickWidth = ((Game.DIM_X - 7) / this.noOfBricks) ;
    this.brickHeight = 15;
    this.brickPadding = 1;
    this.brickTopPadding = 50;
    this.brickLeftPadding = 1;
  }

  paddleUpdate() {

  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);


    this.ball.displayBall();
    this.ball.ballUpdate(this.paddle.x);

    if (this.brick.bricks.length === 0 ){
      this.brick.brickArray();
    }
    this.paddle.displayPaddle();
    this.brick.drawBricks(this.brickWidth, this.brickHeight, this.brickPadding, this.brickTopPadding, this.brickLeftPadding);
    if (this.ball.reachbottom) {

      this.gameover(ctx);
    }
  }

  gameover(ctx){
    this.isOver = true;
    this.drawGameOver(ctx);
  }

  collionDetection(){

  }

  drawGameOver(ctx){
    ctx.fillText(`GAME OVER`, 105, 200);

    ctx.fillStyle = 'red';
    ctx.font = 'bold 48px Russo One';
    ctx.fillText(`HIT ENTER TO RESTART`, 15, 600);
  }




}
Game.BG_COLOR = "#000000";
Game.DIM_X = 400;
Game.DIM_Y = 300;


module.exports = Game;
