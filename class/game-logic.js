class GameLogic {

    static checkHorizontalWins(grid) {
        // Go through each row
        for (let i = 0; i < grid.length; i++) {
            const row = grid[i];

            if (row[0] === row[1] && row[1] === row[2]) {
                if (row[0] === 'X')
                    return 'X';
                else if (row[0] === 'O')
                    return 'O';
            }
        }

        return false;
    }

    static checkVerticalWins(grid) {
        // Go through each column
        for (let i = 0; i < grid[0].length; i++) {
            if (grid[0][i] === grid[1][i] && grid[1][i] === grid[2][i]) {
                if (grid[0][i] === 'X')
                    return 'X';
                else if (grid[0][i] === 'O')
                    return 'O';
            }
        }

        return false;
    }

    static checkDiagonalWins(grid) {
        if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
            if (grid[0][0] === 'X')
                return 'X';
            else if (grid[0][0] === 'O')
                return 'O';
        }
        else if (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
            if (grid[0][2] === 'X')
                return 'X';
            else if (grid[0][2] === 'O')
                return 'O';
        }

        return false;
    }

    static gridStatus(grid) {
        let thereIsMarking = false;
        let thereIsEmpty = false;

        for (let i = 0; i < grid.length; i++) {
            const row = grid[i];

            for (let j = 0; j < row.length; j++) {
                if (row[j] === 'X' || row[j] === 'O') {
                    thereIsMarking = true;
                }
                else {
                    thereIsEmpty = true;
                }
            }
        }

        if (thereIsMarking && thereIsEmpty)
            return "half";
        else if (thereIsMarking && !thereIsEmpty)
            return "full";
        else
            return "empty";
    }

    static checkForWins(grid) {
        const status = GameLogic.gridStatus(grid);

        // If the grid is empty, return false
        if (status === "empty") {
            return false;
        }

        // Check for any wins
        let result = GameLogic.checkHorizontalWins(grid);
        if (result) {
            return result;
        }

        result = GameLogic.checkVerticalWins(grid);
        if (result) {
            return result;
        }

        result = GameLogic.checkDiagonalWins(grid);
        if (result) {
            return result;
        }

        // If the grid is full, it's a tie
        if (status === "full") {
            result = 'T';
            return result;
        }
        else
            return false;

        // Return 'X' if player X wins
        // Return 'O' if player O wins
        // Return 'T' if the game is a tie
        // Return false if the game has not ended
    }
}

module.exports = GameLogic;
