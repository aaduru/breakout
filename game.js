const Ball = require("./ball.js");
const Brick = require("./bricks.js");
const Paddle = require("./paddle.js");

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.dx = 1;
    this.dy = -1;
    this.paddleWidth = 100;
    this.ball = new Ball(ctx, Game.DIM_X, Game.DIM_Y, this.dx, this.dy, this.paddleWidth);
    this.paddle = new Paddle(ctx, Game.DIM_X, Game.DIM_Y, this.paddleWidth);
    this.rows = 1;
    this.columns = 6;
    this.brick = new Brick(ctx, this.rows, this.columns);

    this.x = Game.DIM_X / 2;
    this.y = Game.DIM_Y-30;
    this.radius = 10;

    this.score = 0 ;
    this.scorefactor = 100;
    this.lives = 3;
    this.level = 1 ;
    this.maxlevel = 4;
    // this.bricks = [];
    this.isOver = false;

    this.noOfBricks = 6;
    this.brickWidth = ((Game.DIM_X - 7) / this.noOfBricks) ;
    this.brickHeight = 15;
    this.brickPadding = 1;
    this.brickTopPadding = 50;
    this.brickLeftPadding = 1;
    this.count = this.noOfBricks;

    this.inPlay = false;
  }

  drawScore(ctx){
    ctx.fillStyle = 'white';
    ctx.font = 'bold 10px Gloria Hallelujah';
    ctx.fillText(`SCORE : ${this.score}`, 20, 30);
  }
  drawLives(ctx){
    ctx.fillStyle = 'white';
    ctx.font = 'bold 10px Gloria Hallelujah';
    ctx.fillText(`Lives: ${this.lives}`, 100, 30);
  }
  drawLevels(ctx){
    ctx.fillStyle = 'white';
    ctx.font = 'bold 10px Gloria Hallelujah';
    ctx.fillText(`Level: ${this.level}`, 250, 30);
  }


  collionDetection(){
    for( let c = 0; c < this.columns ; c++ ){
      for ( let r = 0; r < this.rows; r++){
        // debugger
        // let collision = this.brick.bricks[c][r];
        //
        // console.log(this.collison);
        // console.log(this.brick.bricks);
        // the position of ball is greater than the position of brick
        if (this.brick.bricks[c][r].alive === 1) {
          // console.log(this.brick.bricks[c][r]);
          if (this.ball.x > this.brick.bricks[c][r].x) {
            if (this.ball.y > this.brick.bricks[c][r].y){
              // console.log("inside");
              //should check for position of ball being less than that of brick
              //here i need to width of the brick to the x position of brick as the ball can hit any part of the width

              if(this.ball.x < (this.brick.bricks[c][r].x + this.brickWidth)) {
                // i  need to check if i need to add height as well
                // console.log("inside");
                if(this.ball.y < (this.brick.bricks[c][r].y + this.brickHeight)){
                  // console.log("inside");
                  // make the brick disappear
                  // need to change the direction of the ball

                  this.ball.movey = - this.ball.movey;
                  this.score += this.scorefactor;

                  this.brick.bricks[c][r].alive = -1;
                  // if (this.brick.bricks === []) {
                  //
                  // }
                  this.count --;


                }
              }
            }
          }
        }
      }
    }
  }

  nextLevel(ctx){
    if (this.count === 0) {
      if (this.level < this.maxlevel ){
        // debugger
        // TODO: refactor to not rely on window
        clearInterval(window.interval);
        // this.inPlay = false;
        this.level++;
        this.brick.bricks = [];
        this.brick = null;
        delete this.brick;
        this.ball = null;
        delete this.ball;
        this.paddle = null;
        delete this.paddle;
        this.rows ++;
        this.columns ++;
        this.dx ++;
        this.dy --;
        this.paddleWidth  = this.paddleWidth-25;
        this.noOfBricks  ++;
        this.brickWidth = ((Game.DIM_X - 7) / this.noOfBricks) ;
        this.brickHeight = 15;
        this.brickPadding = 1;
        this.brickTopPadding = 50;
        this.brickLeftPadding = 1;

        this.count = (this.rows * this.noOfBricks);
        this.ball = new Ball(ctx, Game.DIM_X, Game.DIM_Y, this.dx, this.dy, this.paddleWidth);
        this.paddle = new Paddle(ctx, Game.DIM_X, Game.DIM_Y, this.paddleWidth);
        this.brick = new Brick(ctx, this.rows, this.columns);
        this.brick.drawBricks(this.brickWidth, this.brickHeight, this.brickPadding, this.brickTopPadding, this.brickLeftPadding);
        this.ball.x = Game.DIM_X / 2;
        this.ball.y = Game.DIM_Y - 30;
        this.paddle.x = (Game.DIM_X / 2) - 50;
        this.paddle.y = Game.DIM_Y - 20;
        this.paddle.displayPaddle();
        this.ball.displayBall();
        this.ball.ballUpdate(this.paddle.x);
        // debugger
      }

    }
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
    if ((this.ball.y + this.ball.movey) > (Game.DIM_Y + 20)) {
      this.gameResetForLives(ctx);
    }
    this.collionDetection();
    this.drawScore(ctx);
    this.drawLives(ctx);
    this.drawLevels(ctx);
    this.gameOver(ctx);
    this.nextLevel(ctx);
  }

  gameResetForLives(ctx){
    // console.log(this.lives);
    this.lives --;
    // console.log(this.lives);
    // console.log(this.ball.x);
    // console.log(this.ball.y);
    this.ball.x = Game.DIM_X / 2;
    this.ball.y = Game.DIM_Y - 30;
    this.paddle.x = (Game.DIM_X / 2) - 50;
    this.paddle.y = Game.DIM_Y - 20;
    // console.log(this.ball.x);
    // console.log(this.ball.y);
    // console.log(this.paddle.x);
    // console.log(this.paddle.y);


    this.paddle.displayPaddle();
    this.ball.displayBall();
    this.ball.ballUpdate(this.paddle.x);
    // this.drawGameOver(ctx);

  }

  gameOver(ctx){
    if (this.lives === 0){
      clearInterval(window.interval);
      this.drawGameOver(ctx);
    }
  }


  drawGameOver(ctx){
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Gloria Hallelujah';
    ctx.fillText(`GAME OVER`, 105, 200);
    this.restart(ctx);
  }



  restart(ctx) {

    this.rows = 1;
    this.columns = 6;


    this.x = Game.DIM_X / 2;
    this.y = Game.DIM_Y-30;
    this.dx = 1;
    this.dy = -1;
    this.radius = 10;

    this.score = 0 ;
    this.scorefactor = 100;
    this.lives = 3;
    this.level = 1 ;
    this.maxlevel = 3;
    // this.bricks = [];
    this.isOver = false;

    this.noOfBricks = 6;
    this.count = this.noOfBricks;
    this.brickWidth = ((Game.DIM_X - 7) / this.noOfBricks) ;
    this.brickHeight = 15;
    this.brickPadding = 1;
    this.brickTopPadding = 50;
    this.brickLeftPadding = 1;
    this.brick.bricks = [];
    this.brick = null;
    delete this.brick;
    this.brick = new Brick(ctx, this.rows, this.columns);
    this.brick.drawBricks(this.brickWidth, this.brickHeight, this.brickPadding, this.brickTopPadding, this.brickLeftPadding);
  }




}
Game.BG_COLOR = "#000000";
Game.DIM_X = 400;
Game.DIM_Y = 300;


module.exports = Game;
