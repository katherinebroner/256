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
    var update = board.map(function(row) {
      var compacted = _.compact(row);
      while(compacted.length < 4) {
        compacted.unshift(0);
      }
      return compacted;
    });
    return update;
  }

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

  Game.prototype.insertNumber = function(board) {
    var flattened = _.flatten(board);
    for( i = 0; i < flattened.length; i++ ){
      if (i === 0) {
        flattened[i] = 2;
        break;
      }
    }
    var nested = _.chunk(flattened, 4);
    return nested;
  }

  Game.prototype.accessUpdated = function() {
    var newBoard = $("tbody").text().replace(/\s+/g, '');
    var split = newBoard.split("").map(Number);
    var updatedBoard = _.chunk(split, 4);
    var flattened = _.flatten(updatedBoard);
    return flattened;
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
  // var check = game.accessUpdated();

    $(document).on('keyup', function(e){
        e.preventDefault();
        //right
        if(e.keyCode == 39) {
          var shifted = game.moveRight(board);
          game.displayUpdated(shifted);
          // var inserted = game.insertNumber(shifted);
          // game.displayUpdated(inserted);
        } else if(e.keyCode == 37) {
          var shifted = game.moveLeft(board);
          game.displayUpdated(shifted);
          // var inserted = game.insertNumber(shifted);
          // game.displayUpdated(inserted);
        }
    var check = game.accessUpdated();
    })



})