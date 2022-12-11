const TTT = require('./ttt');
const Screen = require('./screen');
const Cursor = require('./cursor');
const Command = require('./command');
const GameLogic = require('./game-logic');

class ComputerPlayer {

  static getValidMoves(grid) {
    const validMoves = [];

    grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === ' ') {
          validMoves.push([i, j]);
        }
      })
    });

    return validMoves;
  }

  static randomMove(grid) {
    const validMoves = ComputerPlayer.getValidMoves(grid);

    if (validMoves.length > 0) {
      const index = Math.floor(Math.random() * validMoves.length);
      return validMoves[index];
    }
    else {
      return false;
    }
  }

  static isWinningMove(grid, symbol, move) {
    // Copy grid
    let newGrid = grid.map(row => {
      return [...row];
    });

    const row = move[0];
    const col = move[1];
    newGrid[row][col] = symbol;

    // Says it's not a function...
    const result = GameLogic.checkForWins(newGrid);
    if (result === symbol) {
      return true;
    }
    else {
      return false;
    }
  }

  static getWinningMoves(grid, symbol) {
    const validMoves = ComputerPlayer.getValidMoves(grid);
    const winningMoves = [];

    validMoves.forEach(move => {
      const winning = ComputerPlayer.isWinningMove(grid, symbol, move);
      if (winning) {
        winningMoves.push(move);
      }
    });

    return winningMoves;
  }

  static getSmartMove(grid, symbol) {

    const playerSymbol = symbol === 'X' ? 'O' : 'X';

    const winningMoves = ComputerPlayer.getWinningMoves(grid, symbol);
    const playerWinningMoves = ComputerPlayer.getWinningMoves(grid, playerSymbol);

    if (winningMoves.length > 0) {
      return winningMoves[0];
    }
    else if (playerWinningMoves.length > 0) {
      return playerWinningMoves[0];
    }
    else {
      return ComputerPlayer.randomMove(grid);
    }
  }

  static play(grid, symbol) {
    const move = ComputerPlayer.getSmartMove(grid, symbol);
    const row = move[0];
    const col = move[1];

    grid[row][col] = symbol;
    Screen.setGrid(row, col, symbol);
    Screen.render();
  }
}

module.exports = ComputerPlayer;
