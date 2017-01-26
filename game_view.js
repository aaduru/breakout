
class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.game.draw(this.ctx);
    // this.paddleMove = this.game.paddleUpdate();
  }

  bindKeyHandlers() {
    // const paddleMove = this.paddleMove;

    Object.keys(GameView.MOVES).forEach((k) => {
      let move = GameView.MOVES[k];

      key(k, () => { this.game.paddle.updatePaddle(move); });
      // this.game.paddle.updatePaddle(move);
    });
    key("space", () => { this.start(); });
  }


  start() {

    // setInterval(this.game.draw.bind(this.game, this.ctx), 10);
    this.bindKeyHandlers();
    setInterval( () => {

      this.game.draw(this.ctx);
    },  10);
  }


}

GameView.MOVES = {
  "left": -10,
  "right": 10
};



module.exports = GameView;
