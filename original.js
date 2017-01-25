

let myCanvas=document.getElementById("myCanvas");
let context;
let x=150;
let y=270;
let dx=1;
let dy=1;
let rows = 1;
let columns = 6;
let bwidth = (myCanvas.width/columns)- 1;
let bheight = 10;
let topemptyspace = 30;
let brickshiftspace = 0;
let bricks = [];
let padding = 1;
let paddleX = myCanvas.width / 2 ;
let paddleH = 20;
let paddleY= myCanvas.height - paddleH;
let paddleW = 100;
let radius = 10;
let keyPressRight = false;
let keyPressLeft = false;

function init()
{
  context= myCanvas.getContext('2d');
  setInterval(draw,10);
}

function displayBall(i, j) {
  context.beginPath();
  context.fillStyle="white";
  context.arc(i,j,radius,0,Math.PI*2,true);
  context.closePath();
  context.fill();
}

function brickArray(r, c){
  for(let i=0; i<c; i++) {
    bricks[i] = [];
    for(let j=0; j<r; j++) {
      bricks[i][j] = { x: 0, y: 0 };
    }
  }
}

function drawBricks(r, c) {

  for(let i=0; i<c; i++) {
    for(let j=0; j<r; j++) {

      let brickX = (i*(bwidth+padding))+brickshiftspace;
      let brickY = (j*(bheight+padding))+topemptyspace;
      bricks[i][j].x = brickX;
      bricks[i][j].y = brickY;
      context.beginPath();
      context.rect(brickX, brickY, bwidth, bheight);
      context.fillStyle = "#841F27";
      context.fill();
      context.closePath();
    }
  }
}
// space 32
// right arrow 39
// left arrow 37
// escape 27
function keyDown(event){

  if (event.keyCode === 39){
    keyPressRight = true;
  }
  if (event.keyCode === 37){
    keyPressLeft = true;
  }
}

function keyUp(event){
  if (event.keyCode !== 39){
    keyPressRight = false;
  }
  if (event.keyCode !== 37){
    keyPressLeft = false;
  }
}

document.addEventListener("keydown", keyDown, false);
document.addEventListener("keyup", keyUp, false);


function displayPaddle(xul, yul, w, h){
  context.beginPath();
  context.fillStyle = "yellow";
  context.rect(xul, yul, w, h);
  context.closePath();
  context.fill();
}
let paddleWidth = myCanvas.width - paddleW;
function draw()
{
  context.clearRect(0,0, myCanvas.width,myCanvas.height);
  displayBall(x,y);

  //radius is added other wise the ball goes outside the screen limit
  if( (x < 0) || ( x > (myCanvas.width - radius) ) ) {
    dx=-dx;
  }
  if( (y < 0) || ( y > (myCanvas.height - radius) ) ) {
    dy=-dy;
  }

  if (keyPressRight === true && paddleX < paddleWidth ) {
    paddleX += 5;
  }
  else if (keyPressLeft === true && paddleX > 0 ) {
    paddleX -= 5;
  }

  x+=dx;
  y+=dy;
  displayPaddle(paddleX,paddleY,paddleW, paddleH);
  brickArray(rows, columns);
  drawBricks(rows, columns);
}
