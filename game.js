// var c=document.getElementById("myCanvas");
// var ctx=c.getContext("2d");
//
// // displays the first brick
// ctx.rect(20, 20, 50, 30);
// ctx.fillStyle = "#841F27";
// ctx.fill();
// ctx.stroke();
//
// // ball
// ctx.beginPath();
// ctx.arc(120,120,20,0,2*Math.PI);
// ctx.fillStyle = "white";
// ctx.fill();
// ctx.stroke();


var myCanvas=document.getElementById("myCanvas");
var context;
var x=150;
var y=270;
var dx=1;
var dy=1;

function init()
{
  context= myCanvas.getContext('2d');
  setInterval(draw,10);
}

function displayBall() {
  
}
function draw()
{
  context.clearRect(0,0, myCanvas.width,myCanvas.height);
  context.beginPath();
  context.fillStyle="black";

  context.arc(x,y,10,0,Math.PI*2,true);
  context.closePath();
  context.fill();

  if( x<0 || x>myCanvas.width) dx=-dx;
  if( y<0 || y>myCanvas.height) dy=-dy;
  x+=dx;
  y+=dy;
}

let rows = 1;
let columns = 6;
let bwidth = (myCanvas.width/columns)-1;
let bheight = 10;
let topemptyspace = 50;
let bricks = [];
let padding = 1;

function brickArray() {
  for(let i = 0; i < rows ; i++) {
    bricks[i]= [];
    for(let j =0 ; j < columns ; j++) {
      bricks[i][j] = 1;
    }
  }
}

function displayBricks(){

}
