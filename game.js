const Ball = require("./ball.js");
const Brick = require("./bricks.js");
const Paddle = require("./paddle.js");


// const Game = function (context, myCanvas) {
//
//   this.ball = new Ball();
//
// };
//
//
//
// Game.prototype.draw = function () {
//   this.ball.displayBall(this.myCanvas.width/2,this.myCanvas-30);
//
// };

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.ball = new Ball(ctx, Game.DIM_X, Game.DIM_Y);
    this.paddle = new Paddle(ctx, Game.DIM_X, Game.DIM_Y);
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
    this.rows =1;
    this.columns = 6;
    this.bricks = [];
    this.isOver = false;
  }

  paddleUpdate() {

  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);


    this.ball.displayBall();
    this.ball.ballUpdate(this.paddle.x);

    this.paddle.displayPaddle();
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
  }




}
Game.BG_COLOR = "#000000";
Game.DIM_X = 400;
Game.DIM_Y = 300;


module.exports = Game;
