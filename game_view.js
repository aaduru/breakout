
class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.game.draw(this.ctx);

  }

  bindKeyHandlers() {

    Object.keys(GameView.MOVES).forEach((k) => {
      let move = GameView.MOVES[k];

      key(k, () => {
      this.game.paddle.updatePaddle(move); });
      // this.game.paddle.updatePaddle(move);
    });
  }


  start() {
    key.unbind('left');
    key.unbind('right');
    this.bindKeyHandlers();
    // TODO: refactor to not be on window
    window.interval = setInterval( () => {

      this.game.draw(this.ctx);
    },  10);
  }


}

GameView.MOVES = {
  "left": -25,
  "right": 25
};



module.exports = GameView;
