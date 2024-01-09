const gameboard = () => {

    const boardsize = 3;
    const maxRounds = boardsize*boardsize;
    let currentRound = 0;

    let board = [];

    for (i = 0; i < boardsize; i++) {
        board[i] = [];
        for (j = 0; j < boardsize; j++) {
            board[i].push(cell());
        }
    }

    const getBoard = () => board;

    const dropToken = (x, y, playerToken) => {
        if (board[x][y].getValue() === 0) {
            board[x][y].addToken(playerToken);
            currentRound++;
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

        //Check for tie
        if(currentRound >= maxRounds){
            console.log("Tie!")
        }

        //check rows
        for (i = 0; i < boardsize; i++) {
            if(board[x][i].getValue() !== checkForPlayer) break;
            if(i === boardsize-1){
                //Report Win and do scorey stuff
                console.log("Winner found on the horizontal")
            }
        }

        //check column
        for (i = 0; i < boardsize; i++) {
            if(board[i][y].getValue() !== checkForPlayer) break;
            if(i === boardsize-1){
                //Report Win and do scorey stuff
                console.log("Winner found on the vertical")
            }
        }

        //check diagonal South East/ North West
        for(i=0; i < boardsize; i++){
            if(board[i][i].getValue() !== checkForPlayer) break;
            if(i === boardsize-1){
                //Report Win and do scorey stuff
                console.log("Winner found on the diagonal - SE")
            }
        }

        //check diagonal North East/ South West
        for(i=0; i < boardsize; i++){
            if(board[boardsize-(i+1)][i].getValue() !== checkForPlayer) break;

            if(i === boardsize-1){
                //Report Win and do scorey stuff
                console.log("Winner found on the diagonal - NE")
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


    const players = [
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
        currentPlayer = getCurrentPlayer() === players[0] ? players[1] : players[0]
    }

    const getCurrentPlayer = () => currentPlayer;

    const playRound = (x, y) => {

        if (board.dropToken(x, y, getCurrentPlayer().token)) {

            board.printBoard();
            switchActivePlayer();
        }

    }


    return { getCurrentPlayer, playRound, switchActivePlayer}



}

game = playerController();