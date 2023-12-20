const gameboard = (function () {

    const columns = 3;
    const rows = 3;

    let board = [];

    for (i = 0; i < rows; i++) {
        board[i] = [];
        for (j = 0; j < columns; j++) {
            board[i].push(cell());
        }
    }

    const getBoard = () => board;

    const dropToken = (x, y, playerToken) => board[x][y].addToken(playerToken);

    // Temporary board renderer
    const printBoard = () => {
        let extractedBoardValues = board.map((row) => row.map(cell => cell.getValue()))
        console.log(extractedBoardValues);
    }

    return { getBoard, dropToken, printBoard};

}());

function cell() {

    let value = 0;

    const addToken = (player) => value = player;

    const getValue = () => value;

    return { getValue, addToken }

}