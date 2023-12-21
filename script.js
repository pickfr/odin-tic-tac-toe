const gameboard = () => {

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

    const dropToken = (x, y, playerToken) => {
        if (board[x][y].getValue() === 0) {
            board[x][y].addToken(playerToken);
            console.log(`Adding ${playerController().getCurrentPlayer().name}'s marker into square: ${x}, ${y}`);
            checkWinner(x,y,playerToken);
            return true;
        } else {
            console.log("Token already placed here. Please choose another space.")
            printBoard();
            return false;
        }
    }

    const checkWinner = (x, y, checkForPlayer) => {

        //check rows
        for (i = 0; i < rows; i++) {
            if(board[x][i].getValue() !== checkForPlayer) break;
            if(i === rows-1){
                //Report Win and do scorey stuff
                console.log("Winner found on the horizontal")
            }
        }

        //check column
        for (i = 0; i < columns; i++) {
            if(board[i][y].getValue() !== checkForPlayer) break;
            if(i === columns-1){
                //Report Win and do scorey stuff
                console.log("Winner found on the vertical")
            }
        }
    }


    // Temporary board renderer
    const printBoard = () => {
        let extractedBoardValues = board.map((row) => row.map(cell => cell.getValue()))
        console.log(extractedBoardValues);
    }

    return { getBoard, dropToken, printBoard };

};

function cell() {

    let value = 0;

    const addToken = (player) => value = player;

    const getValue = () => value;

    return { getValue, addToken }

}

function playerController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {

    const board = gameboard();


    players = [
        {
            name: playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ]


    let currentPlayer = players[0];

    const switchActivePlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0]
    }

    const getCurrentPlayer = () => currentPlayer;

    const playRound = (x, y) => {

        if (board.dropToken(x, y, getCurrentPlayer().token)) {

            board.printBoard();
            switchActivePlayer();
        }

    }


    return { getCurrentPlayer, playRound }



}

game = playerController();