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

    const getBoardSize = () => boardsize;

    const dropToken = (x, y, playerToken) => {
        if (board[x][y].getValue() === 0) {
            board[x][y].addToken(playerToken);
            currentRound++;
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

    return { getBoard, getBoardSize, dropToken, printBoard };

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

    const getBoard = () => board;


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
            switchActivePlayer();
        }

    }


    return { getCurrentPlayer, playRound, switchActivePlayer, getBoard}



}

function screenController() {
    const pc = playerController();
    const container = document.getElementById(`game-container`);

    const getPC = () => pc;

    const makeElements = () => {
        // Gameboard
        const gameBoardElement = document.createElement("div");
        gameBoardElement.setAttribute("id", "gameboard");
        container.appendChild(gameBoardElement);
        

        //Cells
        for(i=0; i<pc.getBoard().getBoardSize(); i++){
            for(j=0; j<pc.getBoard().getBoardSize(); j++){
                const cellElement = document.createElement("div");
                cellElement.setAttribute("data",`${i} ${j}`);
                gameBoardElement.appendChild(cellElement);
                cellElement.textContent = pc.getBoard().getBoard()[i][j].getValue();               
            }
        }
    }


    return{makeElements, getPC};
}

const game = screenController();