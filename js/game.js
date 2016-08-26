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
    var right = this.moveRight(board);
    var update = right.map(function(row) {
      return row.reverse();
    });
    return update;
  }

  Game.prototype.moveUp = function(board) {
    var zipped = _.unzip(board)
    var up = this.moveLeft(zipped);
    var update = _.unzip(up);
    return update;
  }

  Game.prototype.moveDown = function(board) {
    var zipped = _.unzip(board)
    var up = this.moveRight(zipped);
    var update = _.unzip(up);
    return update;
  }

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
    return updatedBoard;
  }

  game = new Game();
  var board = game.createBoard();
  var nested = game.printBoard(board);

    $(document).on('keyup', function(e){
        e.preventDefault();
        var check = game.accessUpdated();
        if(e.keyCode == 39) {
          var shifted = game.moveRight(check);
          game.printBoard(shifted);
          // var inserted = game.insertNumber(shifted);
          // game.printBoard(inserted);
        } else if(e.keyCode == 37) {
          var shifted = game.moveLeft(check);
          game.printBoard(shifted);
          // var inserted = game.insertNumber(shifted);
          // game.printBoard(inserted);
        } else if(e.keyCode == 38) {
          var shifted = game.moveUp(check);
          game.printBoard(shifted);
        } else if(e.keyCode == 40) {
          var shifted = game.moveDown(check);
          game.printBoard(shifted);
        }
    })



})