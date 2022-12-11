const chai = require('chai');
const { getSmartMove } = require('../class/computer-player');
const expect = chai.expect;
const ComputerPlayer = require('../class/computer-player');

describe("Computer Player Class", () => {
    let grid1;
    let grid2;
    let grid3;
    let grid4;
    let grid5;

    beforeEach(() => {
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
    });

    describe("getValidMoves(grid) static method", () => {
        it("should return an array of [row, col] arrays that are empty on the passed-in grid", () => {
            const actual1 = ComputerPlayer.getValidMoves(grid1);
            const actual2 = ComputerPlayer.getValidMoves(grid2);
            const actual3 = ComputerPlayer.getValidMoves(grid3);
            const actual4 = ComputerPlayer.getValidMoves(grid4);
            const actual5 = ComputerPlayer.getValidMoves(grid5);

            expect(actual1).to.deep.equal(
                [[0, 0], [0, 1], [0, 2],
                [1, 0], [1, 1], [1, 2],
                [2, 0], [2, 1], [2, 2]]
            );

            expect(actual2).to.deep.equal(
                [[0, 0], [0, 1], [0, 2],
                [1, 0], [1, 2], [2, 1]]
            );

            expect(actual3).to.deep.equal(
                [[0, 0], [1, 0], [1, 2], [2, 2]]
            );

            expect(actual4).to.deep.equal(
                [[0, 1], [0, 2], [1, 2], [2, 1]]
            );

            expect(actual5).to.deep.equal([]);
        });
    });

    describe("randomMove(grid) static method", () => {
        it("Returns a random playable move on the grid as an array [row, col]", () => {
            function arrayIncludes(arr, pair) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i][0] === pair[0] && arr[i][1] === pair[1]) {
                        return true;
                    }
                }
                return false;
            }

            const actual1 = ComputerPlayer.randomMove(grid1);
            const actual2 = ComputerPlayer.randomMove(grid2);
            const actual3 = ComputerPlayer.randomMove(grid3);
            const actual4 = ComputerPlayer.randomMove(grid4);

            const options1 = ComputerPlayer.getValidMoves(grid1);
            const options2 = ComputerPlayer.getValidMoves(grid2);
            const options3 = ComputerPlayer.getValidMoves(grid3);
            const options4 = ComputerPlayer.getValidMoves(grid4);

            const result1 = arrayIncludes(options1, actual1);
            const result2 = arrayIncludes(options2, actual2);
            const result3 = arrayIncludes(options3, actual3);
            const result4 = arrayIncludes(options4, actual4);

            expect(result1).to.deep.equal(true);
            expect(result2).to.deep.equal(true);
            expect(result3).to.deep.equal(true);
            expect(result4).to.deep.equal(true);
        });

        it("Should not return the same move every time", () => {
            const actual1 = ComputerPlayer.randomMove(grid2);
            const actual2 = ComputerPlayer.randomMove(grid2);
            const actual3 = ComputerPlayer.randomMove(grid2);
            const actual4 = ComputerPlayer.randomMove(grid2);
            const actual5 = ComputerPlayer.randomMove(grid2);

            const allTheSame = actual1 === actual2
                && actual2 === actual3
                && actual3 === actual4
                && actual4 === actual5;

            expect(allTheSame).to.deep.equal(false);
        });

        it("Returns false if there are no playable moves", () => {
            const actual = ComputerPlayer.randomMove(grid5);

            expect(actual).to.deep.equal(false);
        });
    });

    describe("isWinningMove(grid, symbol, move static method", () => {
        it("Checks if a given move is a winning move for a given grid", () => {
            const actual1 = ComputerPlayer.isWinningMove(grid1, 'X', [1, 1]);
            const actual2 = ComputerPlayer.isWinningMove(grid2, 'X', [0, 0]);
            // const actual3 = ComputerPlayer.isWinningMove(grid2, 'O', [0, 0]);

            // expect(actual1).to.deep.equal(false);
            // expect(actual2).to.deep.equal(true);
            // expect(actual3).to.deep.equal(false);
        });
    });

    describe("getWinningMoves(grid, symbol) static method", () => {
        it("Returns an array of moves [row, col] that will let the computer win", () => {
            const newGrid =
                [[' ', ' ', 'X'],
                [' ', 'X', ' '],
                ['O', ' ', 'X']];

            const actual1 = ComputerPlayer.getWinningMoves(grid3, 'O');
            const actual2 = ComputerPlayer.getWinningMoves(grid2, 'X');
            const actual3 = ComputerPlayer.getWinningMoves(newGrid, 'X');

            expect(actual1).to.deep.equal([[2, 2]]);
            expect(actual2).to.deep.equal([[0, 0]]);
            expect(actual3).to.deep.equal([[0, 0], [1, 2]]);
        });

        it("Should not mutate the passed-in grid", () => {
            ComputerPlayer.isWinningMove(grid1, 'X', [1, 1]);
            expect(grid1).to.deep.equal(
                [[' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']]
            );
        });
    });

    describe("getSmartMove(grid, symbol) static method", () => {
        it("Should return a winning move", () => {
            const actual1 = ComputerPlayer.getSmartMove(grid3, 'O');
            const actual2 = ComputerPlayer.getSmartMove(grid4, 'X');

            expect(actual1).to.deep.equal([2, 2]);
            expect(actual2).to.deep.equal([1, 2]);
        });

        it("Otherwise, it should return a move that keeps the player from winning", () => {
            const actual1 = ComputerPlayer.getSmartMove(grid2, 'O');
            const actual3 = ComputerPlayer.getSmartMove(grid4, 'O');

            expect(actual1).to.deep.equal([0, 0]);
            expect(actual3).to.deep.equal([1, 2]);
        });

        it("Otherwise, it should return a random move", () => {
            const actual1 = ComputerPlayer.randomMove(grid1);
            const actual2 = ComputerPlayer.randomMove(grid1);
            const actual3 = ComputerPlayer.randomMove(grid1);
            const actual4 = ComputerPlayer.randomMove(grid1);
            const actual5 = ComputerPlayer.randomMove(grid1);

            const allTheSame = actual1 === actual2
                && actual2 === actual3
                && actual3 === actual4
                && actual4 === actual5;

            expect(allTheSame).to.deep.equal(false);
        });
    });
});
