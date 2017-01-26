
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
    if(e.keyCode == 32 ) {
      // && !game.inPlay
      // game.inPlay = true;
      // console.log(game.inPlay);
      gameView.start();
    }
  });
});
