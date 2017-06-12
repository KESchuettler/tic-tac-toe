
// Game
const Game = function() {
  let player1, player2;
  let board = [['','',''],['','',''],['','','']];
  let won = false;

  // 0 indicates player 1's turn
  // 1 indicated player 2's turn
  let currTurn = 0;

  this.init = function() {
    // Get player1's name and assign marker
    let name1 = prompt('Player 1, What is your name?');
    let player1 = new Player(name1, 'X');
    console.log("Player 1, You will be X's.")
    let name2 = prompt('Player 2, What is your name?')
    let player2 = new Player(name2, 'O');
    console.log("Player 2, You will be O's.")

    while(!won) {
      this.prettyPrint();
      nextTurn = 0 ? (
        this.markBoard(player1.takeTurn(), player1.marker)
      ) : (
        this.markBoard(player2.takeTurn(), player2.marker)
      );
      won = this.checkBoard();
      if(won) {
        let winner = (currTurn === 0 ? player1 : player2);
        console.log(`Congratulations ${winner.name}, you've won!`);
      }
      currTurn = (currTurn === 0 ? 1 : 0);
    }
  };

  this.markBoard = function([i, j], marker) {
    if(board[j-1][i-1] !== '') {
      console.log('This spot is taken. You lose your turn.')
    } else {
    board[j-1][i-1] = marker;
    }
  };

  this.checkRow = function(row) {
    let flag = true;
    row.forEach(item => {
      if(item === '') {
        flag = false;
      }
    })
    return flag
  };

  this.checkRows = function() {
    let flag = true;
    for( let i = 0; i < 3; i++) {
      if(!checkRow(board[i])) {
        flag = false
      }
    }
    return flag
  };

  this.checkColumns = function() {
    let cols = [[],[],[]]
    board.forEach(row => {
      row.forEach((item, colIndex) => cols[colIndex].push(item))
    })
    let flag = true;
    for(let i = 0; i < 3; i++) {
      if(!checkRow(cols[i])) {
        flag = false
      }
    }
    return flag
  };

  this.checkBoard = function() {
    // returns false if board is incomplete
    return this.checkRows() && this.checkColumns()
  };

  this.prettyPrint = function() {
    board.forEach(row => console.log(row));
  }

}

const Player = function(name, marker) {
  this.name = name;
  this.marker = marker

  this.takeTurn = function() {
    let play = console.prompt(`${name}, it is your turn. Where would you like to play? Enter choice with comma separated values`)
    return play.split().map(item => parseInt(item))
  }
}

const prompt = function(question, callback)

let game = new Game();
game.init()
