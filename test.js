const ComputerPlayer = require('./class/computer-player');

let grid1;
let grid2;
let grid3;
let grid4;
let grid5;

grid1 =
    [[' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']];

grid2 =
    [[' ', ' ', ' '],
    [' ', 'X', ' '],
    ['O', ' ', 'X']];

grid3 =
    [[' ', 'X', 'X'],
    [' ', 'X', ' '],
    ['O', 'O', ' ']];

grid4 =
    [['O', ' ', ' '],
    ['X', 'X', ' '],
    ['O', ' ', 'X']];

grid5 =
    [['O', 'X', 'X'],
    ['X', 'X', 'O'],
    ['O', 'O', 'X']];

const actual2 = ComputerPlayer.isWinningMove(grid2, 'X', [0, 0]);
console.log(actual2);
