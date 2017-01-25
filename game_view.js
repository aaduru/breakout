
class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    // this.paddleMove = this.game.paddleUpdate();
  }

  bindKeyHandlers() {
    // const paddleMove = this.paddleMove;

    Object.keys(GameView.MOVES).forEach((k) => {
      let move = GameView.MOVES[k];

      key(k, () => { this.game.paddle.updatePaddle(move); });
      // this.game.paddle.updatePaddle(move);
    });
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
  "left": -5,
  "right": 5
};



module.exports = GameView;
