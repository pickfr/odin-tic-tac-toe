const gameboard = () => {

    const boardsize = 3;
    const maxRounds = boardsize * boardsize;
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
        if (board[y][x].getValue() === 0) {
            board[y][x].addToken(playerToken);
            currentRound++;
            checkWinner(x, y, playerToken);
            return true;
        } else {
            console.log("Token already placed here. Please choose another space.")
            printBoard();
            return false;
        }
    }

    const checkWinner = (x, y, checkForPlayer) => {

        //Check for tie
        if (currentRound >= maxRounds) {
            console.log("Tie!")
        }

        //check rows
        for (i = 0; i < boardsize; i++) {
            if (board[y][i].getValue() !== checkForPlayer) break;
            if (i === boardsize - 1) {
                //Report Win and do scorey stuff
                console.log("Winner found on the horizontal")
            }
        }

        //check column
        for (i = 0; i < boardsize; i++) {
            if (board[i][x].getValue() !== checkForPlayer) break;
            if (i === boardsize - 1) {
                //Report Win and do scorey stuff
                console.log("Winner found on the vertical")
            }
        }

        //check diagonal South East/ North West
        for (i = 0; i < boardsize; i++) {
            if (board[i][i].getValue() !== checkForPlayer) break;
            if (i === boardsize - 1) {
                //Report Win and do scorey stuff
                console.log("Winner found on the diagonal - SE")
            }
        }

        //check diagonal North East/ South West
        for (i = 0; i < boardsize; i++) {
            if (board[boardsize - (i + 1)][i].getValue() !== checkForPlayer) break;

            if (i === boardsize - 1) {
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
            game.updateElements();
        }

    }


    return { getCurrentPlayer, playRound, getBoard }



}

function screenController() {
    const pc = playerController();
    const HTMLContainer = document.getElementById(`game-container`);

    const getPC = () => pc;

    // Gameboard
    const HTMLGameboard = document.createElement("div");
    HTMLGameboard.setAttribute("id", "gameboard");
    HTMLGameboard.style.gridTemplateColumns = `repeat(${pc.getBoard().getBoardSize()}, 1fr)`
    HTMLGameboard.style.gridTemplateColumns = `repeat(${pc.getBoard().getBoardSize()}, 1fr)`
    HTMLContainer.appendChild(HTMLGameboard);


    // Cells
    for (i = 0; i < pc.getBoard().getBoardSize(); i++) {
        for (j = 0; j < pc.getBoard().getBoardSize(); j++) {
            const HTMLCell = document.createElement("div");
            HTMLCell.setAttribute("class", "cell");
            HTMLCell.setAttribute("data", `${i} ${j}`);
            if(j > 0) {HTMLCell.style.borderLeft = 'solid 1px #000'}
            if(i < pc.getBoard().getBoardSize()-1 ) {HTMLCell.style.borderBottom = 'solid 1px #000'}
            HTMLGameboard.appendChild(HTMLCell);

            HTMLCell.textContent = pc.getBoard().getBoard()[i][j].getValue();

            HTMLCell.addEventListener("click", (e) => {
                const coords = e.target.getAttribute("data").split(" ")
                pc.playRound(coords[1], coords[0]);
            })
        }
    }

    //Gameinfo Box
    const HTMLGameInfo = document.createElement("div");
    HTMLGameInfo.setAttribute("id", "game-info")
    HTMLContainer.appendChild(HTMLGameInfo);

    const HTMLPlayer = document.createElement("div");
    HTMLPlayer.setAttribute("class", "player-info");
    HTMLGameInfo.appendChild(HTMLPlayer);


    const updateElements = () => {

        // Update Tokens
        for (i = 0; i < pc.getBoard().getBoardSize(); i++) {
            for (j = 0; j < pc.getBoard().getBoardSize(); j++) {

                switch (pc.getBoard().getBoard()[i][j].getValue()) {
                    case 1:
                        tokenDisplay = "X";
                        break;
                    case 2:
                        tokenDisplay = "O";
                        break;

                    default:
                        tokenDisplay = "";
                        break;
                }


                document.querySelector(`[data="${i} ${j}"`).textContent = tokenDisplay;
            }
        }

        // Update Current Players Turn
        HTMLPlayer.textContent = `${getPC().getCurrentPlayer().name}'s Turn.`


    }

    updateElements();
    return { getPC, updateElements };
}

const game = screenController();