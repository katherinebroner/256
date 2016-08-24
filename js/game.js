$(document).ready(function() {

function Game() {
  this.board =  "0000220000000000";
}

Game.prototype.createBoard = function() {
  var split = this.board.split("").map(Number);
  var shuffled = _.shuffle(split);
  var nestedBoard = _.chunk(shuffled, 4);
  return nestedBoard;
};

Game.prototype.printBoard = function() {
  var nestedBoard = this.createBoard();

  for(var i = 0; i < 4; i++) {
    for(var j=0; j < 4; j++) {
      var cell = $("#row-" + i + " .col-" + j).text(nestedBoard[i][j]);
    }
  }
}
game = new Game();
var board = game.createBoard();
var nested = game.printBoard();

})