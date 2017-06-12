const inquirer = require('inquirer');
// Game
const Game = function() {
  let player1, player2;
  let board = [['1','2','3'],['4','5','6'],['7','8','9']];
  let options = ['1','2','3','4','5','6','7','8','9'];
  let won = false;
  let plays = {
    '1': [0,0],
    '2': [0,1],
    '3': [0,2],
    '4': [1,0],
    '5': [1,1],
    '6': [1,2],
    '7': [2,0],
    '8': [2,1],
    '9': [2,2],
  }

  // 0 indicates player 1's turn
  // 1 indicated player 2's turn
  let currTurn = 0;

  this.init = function() {
    // Get player1's name and assign marker
    player1 = new Player('Player1', 'X');
    player2 = new Player('Player2', 'O');
    console.log("Player 1, You will be X's.")
    console.log("Player 2, You will be O's.")
    console.log(player1.name, player1.marker)
    console.log(player2.name, player2.marker)
    this.start();

  };

  this.start = function() {
    this.prettyPrint()
    currTurn === 0 ? (
      player1.takeTurn(options)
      .then(answer => this.finishTurn(answer, player1.marker))
      .catch(err => console.error(err))
    ) : (
      player2.takeTurn(options)
      .then(answer => this.finishTurn(answer, player2.marker))
      .catch(err => console.error(err))
    )
  }

  this.finishTurn = function(answer, marker) {
    this.markBoard(plays[answer], marker)
    options.splice(options.indexOf(answer), 1);
    won = this.checkBoard();
    if (won) {
      let winner = (currTurn === 0 ? player1 : player2);
      console.log(`Congratulations ${winner.name}, you've won!`);
    } else {
      currTurn = (currTurn === 0 ? 1 : 0);
      console.log('currTurn', currTurn)
      this.start()
    }
  }

  this.markBoard = function([i, j], marker) {
    board[i][j] = marker;
  };

  this.checkRow = function(row) {
    // Check for empty spot
    if(row[0] === '' || row[1] === '' || row[2] === '') {
      return false
    } else if (row[0] === row[1] && row[1] === row[2]) {
      return true
    }
  };

  this.checkRows = function() {
    for( let i = 0; i < 3; i++) {
      if(this.checkRow(board[i])) return true
    }
    return false
  };

  this.checkColumns = function() {
    let cols = [[],[],[]]
    board.forEach(row => {
      row.forEach((item, colIndex) => cols[colIndex].push(item))
    })
    for(let i = 0; i < 3; i++) {
      if(this.checkRow(cols[i])) return true
    }
    return false;
  };

  this.checkDiags = function() {
    return this.checkRow([board[0][0],board[1][1], board[2,2]]) || this.checkRow([board[0][2],board[1][1], board[2,1]])
  }


  this.checkBoard = function() {
    // returns false if board is incomplete
    return this.checkRows() || this.checkColumns() || this.checkDiags();
  };

  this.prettyPrint = function() {
    board.forEach(row => console.log(row));
  }

};

const Player = function(name, marker) {
  this.name = name;
  this.marker = marker

  this.takeTurn = function(options) {
    return inquirer.prompt({
      name: 'play',
      message: `${this.name}, choose where you would like to play an ${this.marker}.`,
    })
    .then(ans => ans.play)
    .catch(err => console.error(err))
  }
};

let game = new Game();
game.init()
