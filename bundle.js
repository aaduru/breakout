/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(2);
	
	document.addEventListener("DOMContentLoaded", () => {
	  const canvasEl = document.getElementsByTagName("canvas")[0];
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;
	
	  const ctx = canvasEl.getContext("2d");
	  const game = new Game(ctx,Game.DIM_X,Game.DIM_Y );
	  const gameView = new GameView(game, ctx);
	  document.addEventListener("keyup", (e) => {
	    if(e.keyCode == 32 ) {
	      // && !game.inPlay
	      // game.inPlay = true;
	      // console.log(game.inPlay);
	      gameView.start();
	    }
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Ball = __webpack_require__(3);
	const Brick = __webpack_require__(4);
	const Paddle = __webpack_require__(5);
	
	class Game {
	  constructor(ctx) {
	    this.ctx = ctx;
	    this.dx = 1;
	    this.dy = -1;
	    this.paddleWidth = 100;
	    this.ball = new Ball(ctx, Game.DIM_X, Game.DIM_Y, this.dx, this.dy, this.paddleWidth);
	    this.paddle = new Paddle(ctx, ((Game.DIM_X/2) - (this.paddleWidth/2)), (Game.DIM_Y - 20), this.paddleWidth);
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
	
	  displayLevel(ctx){
	    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	    ctx.fillStyle = Game.BG_COLOR;
	    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
	    ctx.fillStyle = 'white';
	    ctx.font = 'bold 24px Gloria Hallelujah';
	    ctx.fillText(`Level: ${this.level + 1}`, 50, 200);
	    ctx.fillStyle = 'white';
	    ctx.font = 'bold 24px Gloria Hallelujah';
	    ctx.fillText(`Your Score: ${this.score}`, 150, 250);
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
	    ctx.fillText(`Your Score: ${this.score}`, 150, 250);
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
	    ctx.fillText(`Your Score: ${this.score}`, 150, 250);
	    this.restart(ctx);
	  }
	
	
	
	
	  brickBallCollision(){
	    for( let c = 0; c < this.columns ; c++ ){
	      for ( let r = 0; r < this.rows; r++){
	        // the position of ball is greater than the position of brick
	        if (this.brick.bricks[c][r].alive === 1) {
	          // console.log(this.brick.bricks[c][r]);
	          if ((this.ball.x - this.radius) > (this.brick.bricks[c][r].x - this.brickWidth) ) {
	            if ( (this.ball.y + this.radius) >= (this.brick.bricks[c][r].y - this.brickHeight)){
	              //should check for position of ball being less than that of brick
	              //here i need to width of the brick to the x position of brick as the ball can hit any part of the width
	              if((this.ball.x + this.radius) <= (this.brick.bricks[c][r].x + this.brickWidth)) {
	                // i  need to check if i need to add height as well
	                if((this.ball.y - this.radius) <= (this.brick.bricks[c][r].y + this.brickHeight)){
	                  // make the brick disappear
	                  // need to change the direction of the ball
	                  this.ball.movey = - this.ball.movey;
	                  this.score += this.scorefactor;
	                  this.brick.bricks[c][r].alive = -1;
	                  this.count --;
	                }
	              }
	            }
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
	    if ((this.ball.y + this.ball.movey) > (Game.DIM_Y + 20)) {
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
	
	    this.paddle.displayPaddle();
	    this.ball.displayBall();
	    this.ball.ballUpdate(this.paddle.x);
	  }
	
	  gameOver(ctx){
	    if (this.lives === 0){
	      clearInterval(window.interval);
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	
	class GameView {
	  constructor(game, ctx) {
	    this.ctx = ctx;
	    this.game = game;
	    this.game.draw(this.ctx);
	
	  }
	
	  bindKeyHandlers() {
	
	    Object.keys(GameView.MOVES).forEach((k) => {
	      let move = GameView.MOVES[k];
	
	      key(k, () => { this.game.paddle.updatePaddle(move); });
	      // this.game.paddle.updatePaddle(move);
	    });
	    // key("space", () => { this.start(); });
	  }
	
	
	  start() {
	
	    this.bindKeyHandlers();
	    // TODO: refactor to not be on window
	    window.interval = setInterval( () => {
	
	      this.game.draw(this.ctx);
	    },  10);
	  }
	
	
	}
	
	GameView.MOVES = {
	  "left": -10,
	  "right": 10
	};
	
	
	
	module.exports = GameView;


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports) {

	class  Paddle{
	  constructor(ctx, i , j, pw){
	    this.ctx = ctx;
	    // this.dimX = i;
	    // this.dimY = j;
	    this.x = i;
	    this.y = j;
	    this.paddleWidth = pw;
	  }
	  displayPaddle(){
	
	    this.ctx.beginPath();
	    this.ctx.fillStyle = "yellow";
	    this.ctx.rect(this.x, this.y, this.paddleWidth, 20);
	    this.ctx.closePath();
	    this.ctx.fill();
	  }
	
	
	  updatePaddle(move){
	
	    if (move === -10 ){
	      this.x += move;
	      if (this.x === 0){
	        this.x = this.x + 10 ;
	      }
	    }else if (move === 10){
	      this.x += 5;
	      if (this.x === 300){
	        this.x = this.x - 10 ;
	      }
	    }
	  }
	  restart(keys) {
	    if (keys.includes(13)) { // return
	
	      this.isOver = false;
	      this.level = 0;
	      this.score = 0;
	      this.lives = 3;
	
	    }
	  }
	}
	
	module.exports = Paddle;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map