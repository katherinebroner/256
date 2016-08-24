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

  Game.prototype.printBoard = function(original) {
    for(var i = 0; i < 4; i++) {
      for(var j=0; j < 4; j++) {
        var cell = $("#row-" + i + " .col-" + j).text(original[i][j]);
      }
    }
  };

  Game.prototype.moveRight = function(board) {
    var updated = []
    for(var i in board) {
        if (_.without(board[i], 0).length > 0) {
          var cloned = _.clone(board[i]);
          var compacted = _.compact(cloned);
          var zeros = cloned.length - compacted.length;
          for (var x = 0; x < zeros; x++) {
            compacted.unshift(0);
          }
          updated.push(compacted);
      } else {
        updated.push(board[i])
      }
    }
    return updated;
  };

  Game.prototype.moveLeft = function(board) {
    var updated = []
    for(var i in board) {
        if (_.without(board[i], 0).length > 0) {
          var cloned = _.clone(board[i]);
          var compacted = _.compact(cloned);
          var zeros = cloned.length - compacted.length;
          for (var x = 0; x < zeros; x++) {
            compacted.push(0);
          }
          updated.push(compacted);
      } else {
        updated.push(board[i])
      }
    }
    return updated;
  };

  Game.prototype.accessUpdated = function() {
    var newBoard = $("tbody").text().replace(/\s+/g, '');
    var split = newBoard.split("").map(Number);
    var updatedBoard = _.chunk(split, 4);
    return updatedBoard;
  }

  Game.prototype.displayUpdated = function(shifted) {
    for(var i = 0; i < 4; i++) {
      for(var j=0; j < 4; j++) {
        var cell = $("#row-" + i + " .col-" + j).text(shifted[i][j]);
      }
    }
  }

  game = new Game();
  var board = game.createBoard();
  var nested = game.printBoard(board);

  $(document).on('keyup', function(e){
      e.preventDefault();
      //right
      if(e.keyCode == 39) {
        var shifted = game.moveRight(board);
        game.displayUpdated(shifted);
        // left
      } else if(e.keyCode == 37) {
        var shifted = game.moveLeft(board);
        game.displayUpdated(shifted);
      }
      var check = game.accessUpdated();
      console.log(check);
    })



})