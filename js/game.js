function Game() {
  this.board =  "0000220000000000";
}

Game.prototype.createBoard = function() {
  var split = this.board.split("").map(Number);
  var shuffled = _.shuffle(split);
  var nestedBoard = _.chunk(shuffled, 4);
  return nestedBoard;
};

game = new Game();
var board = game.createBoard();
console.log(board);