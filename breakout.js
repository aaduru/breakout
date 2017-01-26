// const Game = require("./game.js");
//
// let myCanvas=document.getElementById("myCanvas");
// let context;
//
// function init()
// {
//   context= myCanvas.getContext('2d');
//   const game = new Game(context, myCanvas);
//   game.setIntervalFunction();
// }

const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const game = new Game(ctx,Game.DIM_X,Game.DIM_Y );
  const gameView = new GameView(game, ctx);
  document.addEventListener("keyup", (e) => {
    if(e.keyCode == 32) {
      gameView.start();
    }
  });
});

// document.addEventListener("keydown", game.keyDown, false);
// document.addEventListener("keyup",game.keyUp, false);
