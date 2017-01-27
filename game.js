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
    this.paddle = new Paddle(ctx,((Game.DIM_X/2) - (this.paddleWidth/2)), (Game.DIM_Y - 20), this.paddleWidth);
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

    this.isOver = false;

    this.noOfBricks = 6;
    this.brickWidth = ((Game.DIM_X - 7) / this.noOfBricks) ;
    this.brickHeight = 15;
    this.brickPadding = 1;
    this.brickTopPadding = 50;
    this.brickLeftPadding = 1;
    this.count = this.noOfBricks;

    this.inPlay = false;
    this.collision = false;
  }

  drawScore(ctx){
    ctx.fillStyle = 'white';
    ctx.font = 'bold 10px Gloria Hallelujah';
    ctx.fillText(`SCORE : ${this.score}`, 20, 30);
  }

  drawLives(ctx){
    ctx.fillStyle = 'white';
    ctx.font = 'bold 10px Gloria Hallelujah';
    ctx.fillText(`Lives: ${this.lives}`, 170, 30);
  }

  drawLevels(ctx){
    ctx.fillStyle = 'white';
    ctx.font = 'bold 10px Gloria Hallelujah';
    ctx.fillText(`Level: ${this.level}`, 340, 30);
  }

  displayLevel(ctx){
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Gloria Hallelujah';
    ctx.fillText(`Level: ${this.level + 1}`, 50, 50);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Gloria Hallelujah';
    ctx.fillText(`Your Score: ${this.score}`, 150, 150);
  }

  drawGameOver(ctx){
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Gloria Hallelujah';
    ctx.fillText(`GAME OVER`, 25, 100);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Gloria Hallelujah';
    ctx.fillText(`Your Score: ${this.score}`, 100, 250);
    this.restart(ctx);
  }
  drawGameWon(ctx){
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Gloria Hallelujah';
    ctx.fillText(`You have won`, 25, 100);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Gloria Hallelujah';
    ctx.fillText(`Your Score: ${this.score}`, 100, 250);
    this.restart(ctx);
  }




  brickBallCollision(){
    // console.log("X cord");
    // console.log(this.ball.x);
    // console.log("Y cord");
    // console.log(this.ball.y);
    for( let c = 0; c < this.columns ; c++ ){
      for ( let r = 0; r < this.rows; r++){
        // the position of ball is greater than the position of brick
        // if (this.brick.bricks[c][r].alive === 1) {
        //   // console.log(this.brick.bricks[c][r]);
        //   if ((this.ball.x - this.radius) > (this.brick.bricks[c][r].x - this.brickWidth) ) {
        //     if ( (this.ball.y + this.radius) >= (this.brick.bricks[c][r].y - this.brickHeight)){
        //       //should check for position of ball being less than that of brick
        //       //here i need to width of the brick to the x position of brick as the ball can hit any part of the width
        //       if((this.ball.x + this.radius) <= (this.brick.bricks[c][r].x + this.brickWidth)) {
        //         // i  need to check if i need to add height as well
        //         if((this.ball.y - this.radius) <= (this.brick.bricks[c][r].y + this.brickHeight)){
        //           // make the brick disappear
        //           // need to change the direction of the ball
        //           this.ball.movey = - this.ball.movey;
        //           this.score += this.scorefactor;
        //           this.brick.bricks[c][r].alive = -1;
        //           this.count --;
        //         }
        //       }
        //     }
        //   }
        // }
        if (this.brick.bricks[c][r].alive === 1) {
          //Check bottom collision
          // debugger
          this.collision = false;
          if( ((this.brick.bricks[c][r].x - (this.radius/1.44)) <= this.ball.x) && (this.brick.bricks[c][r].x + this.brickWidth + (this.radius/1.44) >= this.ball.x)) {
          //  if((this.ball.y-this.radius) === (this.brick.bricks[c][r].y+this.brickHeight)){
            if((this.ball.y-this.radius) > (this.brick.bricks[c][r].y+this.brickHeight-Math.abs(this.ball.movey))){
              if((this.ball.y-this.radius) < (this.brick.bricks[c][r].y+this.brickHeight+Math.abs(this.ball.movey))){
                this.collision = true;
                this.ball.movey = - this.ball.movey;
                // console.log("Bottom Collison");
              }
            }
          }
          //Check top collision
          if( ((this.brick.bricks[c][r].x - (this.radius/1.44)) <= this.ball.x) && (this.brick.bricks[c][r].x + this.brickWidth + (this.radius/1.44) >= this.ball.x)) {
            //if((this.ball.y+this.radius) === (this.brick.bricks[c][r].y)){
            if((this.ball.y+this.radius) > (this.brick.bricks[c][r].y-Math.abs(this.ball.movey))){
              if((this.ball.y+this.radius) < (this.brick.bricks[c][r].y+Math.abs(this.ball.movey))){
                this.collision = true;
                this.ball.movey = - this.ball.movey;
                // console.log("Top Collison");
              }
            }
          }
          //Check left collision
          if( ((this.brick.bricks[c][r].y + this.brickHeight + (this.radius/1.44)) >= this.ball.y) && ((this.brick.bricks[c][r].y - (this.radius/1.44) <= this.ball.y))) {
            //if((this.ball.x+this.radius) === Math.round(this.brick.bricks[c][r].x)){
            if((this.ball.x+this.radius) > Math.round(this.brick.bricks[c][r].x-Math.abs(this.ball.movex))){
              if((this.ball.x+this.radius) < Math.round(this.brick.bricks[c][r].x+Math.abs(this.ball.movex))){
                this.collision = true;
                this.ball.movex = - this.ball.movex;
                // console.log("left Collison");
              }
            }
          }
          //Check right collision
          if( ((this.brick.bricks[c][r].y + this.brickHeight + (this.radius/1.44)) >= this.ball.y) && ((this.brick.bricks[c][r].y - (this.radius/1.44) <= this.ball.y))) {
            //debugger
            //if((this.ball.x-this.radius) === Math.round(this.brick.bricks[c][r].x+this.brickWidth)){
            if((this.ball.x-this.radius) > Math.round(this.brick.bricks[c][r].x+this.brickWidth-Math.abs(this.ball.movex))){
              if((this.ball.x-this.radius) < Math.round(this.brick.bricks[c][r].x+this.brickWidth+Math.abs(this.ball.movex))){
                this.collision = true;
                this.ball.movex = - this.ball.movex;
                // console.log("Right Collison");
              }
            }
          }
          if(this.collision) {
            this.score += this.scorefactor;
            this.brick.bricks[c][r].alive = -1;
            this.count --;
            this.collision = false;
          }
        }
      }
    }
  }

  won(ctx){
    if (this.level === 3 && this.count === 0){
      this.drawGameWon(ctx);
    }
  }
  nextLevel(ctx){
    if (this.count === 0) {
      this.displayLevel(ctx);
      if (this.level < this.maxlevel ){
        // TODO: refactor to not rely on window
        clearInterval(window.interval);
        this.inPlay = false;
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
        this.paddleWidth  = this.paddleWidth - 20;
        this.noOfBricks  ++;
        this.brickWidth = ((Game.DIM_X - 7) / this.noOfBricks) ;
        this.brickHeight = 15;
        this.brickPadding = 1;
        this.brickTopPadding = 50;
        this.brickLeftPadding = 1;

        this.count = (this.rows * this.noOfBricks);
        this.ball = new Ball(ctx, Game.DIM_X, Game.DIM_Y, this.dx, this.dy, this.paddleWidth);
        this.paddle = new Paddle(ctx, ((Game.DIM_X/2) - (this.paddleWidth/2)), (Game.DIM_Y - 20), this.paddleWidth);
        this.brick = new Brick(ctx, this.rows, this.columns);
        this.brick.drawBricks(this.brickWidth, this.brickHeight, this.brickPadding, this.brickTopPadding, this.brickLeftPadding);
        this.ball.x = Game.DIM_X / 2;
        this.ball.y = Game.DIM_Y - 30;
        this.paddle.x = (Game.DIM_X / 2) - 50;
        this.paddle.y = Game.DIM_Y - 20;
        this.paddle.displayPaddle();
        this.ball.displayBall();
        this.ball.ballUpdate(this.paddle.x);

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
    if ((this.ball.y + this.ball.movey) > (Game.DIM_Y - 10)) {
      this.gameResetForLives(ctx);
    }
    this.brickBallCollision();
    this.drawScore(ctx);
    this.drawLives(ctx);
    this.drawLevels(ctx);
    this.gameOver(ctx);
    this.nextLevel(ctx);
    this.won(ctx);
  }

  gameResetForLives(ctx){

    this.lives --;

    this.ball.x = Game.DIM_X / 2;
    this.ball.y = Game.DIM_Y - 30;
    this.paddle.x = (Game.DIM_X / 2) - 50;
    this.paddle.y = Game.DIM_Y - 20;

    clearInterval(window.interval);
    this.inPlay = false;
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.paddle.displayPaddle();
    this.ball.displayBall();
    this.ball.ballUpdate(this.paddle.x);
    this.brick.drawBricks(this.brickWidth, this.brickHeight, this.brickPadding, this.brickTopPadding, this.brickLeftPadding);


  }

  gameOver(ctx){
    if (this.lives === 0){
      clearInterval(window.interval);
      this.inPlay = false;
      this.drawGameOver(ctx);
    }
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

    this.isOver = false;
    this.paddleWidth = 100;
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
    this.ball = null;
    delete this.ball;
    this.paddle = null;
    delete this.paddle;
    this.ball = new Ball(ctx, Game.DIM_X, Game.DIM_Y, this.dx, this.dy, this.paddleWidth);
    this.paddle = new Paddle(ctx, ((Game.DIM_X/2) - (this.paddleWidth/2)), (Game.DIM_Y - 20), this.paddleWidth);
    this.brick = new Brick(ctx, this.rows, this.columns);
    this.paddle.x = (Game.DIM_X / 2) - 50;
    this.paddle.displayPaddle();
    this.ball.displayBall();
    this.ball.ballUpdate(this.paddle.x);
    this.brick.drawBricks(this.brickWidth, this.brickHeight, this.brickPadding, this.brickTopPadding, this.brickLeftPadding);
  }


}
Game.BG_COLOR = "#000000";
Game.DIM_X = 400;
Game.DIM_Y = 300;


module.exports = Game;
