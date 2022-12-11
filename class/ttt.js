const Screen = require("./screen");
const Cursor = require("./cursor");
const ComputerPlayer = require('./computer-player');
const GameLogic = require('./game-logic');

class TTT {

  constructor() {

    this.playerTurn = "X";

    this.grid = [[' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('w', 'up', this.cursor.up);
    Screen.addCommand('s', 'down', this.cursor.down);
    Screen.addCommand('d', 'right', this.cursor.right);
    Screen.addCommand('a', 'left', this.cursor.left);
    Screen.addCommand(this.playerTurn.toLowerCase(), this.playerTurn, this.play);

    Screen.render();
  }

  play = () => {
    const row = this.cursor.row;
    const col = this.cursor.col;

    this.grid[row][col] = this.playerTurn;
    Screen.setGrid(row, col, this.playerTurn);

    this.cursor.resetBackgroundColor();

    // Check for any wins
    TTT.checkWin(this.grid);

    // Now the computer plays
    const compSymbol = this.playerTurn === 'X' ? 'O' : 'X';
    ComputerPlayer.play(this.grid, compSymbol);
    TTT.checkWin(this.grid);
  }

  static checkWin(grid) {
    const result = GameLogic.checkForWins(grid);
    if (result) {
      this.endGame(result);
    }
    return result;
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
