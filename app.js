// GameBorad Function

const gameBoard = (function() {
    const boardContainer = document.querySelector(".board-container");

    function createCell(position) {
        const cellElement = document.createElement('button');
        // cellElement.textContent = position + 1;
        cellElement.classList.add('board-cell');
        cellElement.setAttribute('data-position', position);
        boardContainer.appendChild(cellElement);

        return {
            position: position,
            symbol: null,
            element: cellElement
        };
    }

    const board = [];
    for (let i = 0; i < 9; i++) {
        board.push(createCell(i));
    }
    console.log(board);

    const winCombinations = [[board[0], board[1], board[2]],
                             [board[3], board[4], board[5]],
                             [board[6], board[7], board[8]],
                             [board[0], board[3], board[6]],
                             [board[1], board[4], board[7]],
                             [board[2], board[5], board[8]],
                             [board[6], board[4], board[2]],
                             [board[8], board[4], board[0]]];

    return {
        getCell: function(position) {
            return board[position];
        },
        getWinCombinations: function(combination) {
            return winCombinations[combination]
        },
        resetBoard: function() {
            board.forEach((cell) => {
                cell.symbol = null;
                cell.element.innerHTML = "";
                cell.element.style.backgroundColor = "";
            });
        },
        getAvailableCells: function() {
            const availableCells = [];
            board.forEach(cell => {
                if (cell.symbol === null) {
                    availableCells.push(cell);
                }
            })
            return availableCells;
        }
    };

})();

console.log(gameBoard.getWinCombinations(0));

// Game Function
const game = (function() {
const displayMsgs = document.querySelector('.display-msgs');
const displayWinRounds = document.querySelector('.win-rounds');
const restart = document.querySelector('.restart');

const players = {
user: {
    name: "user",
    symbol: "X",
    winner: false,
    turn: true,
    winRounds: 0
},
computer: {
    name: "computer",
    symbol: "O",
    winner: false,
    turn: false,
    winRounds: 0
}
};

const getPlayer = (playerName) => {
    return players[playerName];
}
console.log(players.user);
console.log(getPlayer("user"));

for (let i = 0; i < 9; i++) {
    const cell = gameBoard.getCell(i);
    cell.element.addEventListener('click', () => {
        if (cell.symbol !== null) {
            return;
        }
        if (players.user.turn === true) {
            cell.symbol = "X";
            cell.element.innerHTML = "X";
            cell.element.style.backgroundColor = "red";
            players.user.turn = false;
        } 
        if (getPlayer("computer").winner === true || getPlayer("computer").turn === true) {
            return;
        }
       winner();
       setTimeout(computerChoice, 1000);
    })
}

const computerChoice = () => {
    const availableCells = gameBoard.getAvailableCells();
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const randomCell = availableCells[randomIndex];
    if (getPlayer("user").winner === true || getPlayer("computer").winner === true) {
        return;
    }
    if (getPlayer("user").turn === false) {
        if (availableCells.length === 0) {
            displayMsgs.textContent = "It's a tie!";
            setTimeout(() => {
                displayMsgs.textContent = "";
                gameBoard.resetBoard();
            }, 3500)
            return;
        }
    console.log("Computer turn");
    randomCell.symbol = "O";
    randomCell.element.innerHTML = "0";
    randomCell.element.style.backgroundColor = "rgb(205, 205, 21)";
    players.user.turn = true;
}
winner();
};

function winner() {

for (let i = 0; i < 8; i++) {
        const winCombination = gameBoard.getWinCombinations(i);
  if (winCombination[0].symbol === players.user.symbol &&
      winCombination[1].symbol === players.user.symbol &&
      winCombination[2].symbol === players.user.symbol) {
     console.log(winCombination[0].symbol, winCombination[1].symbol, winCombination[2].symbol);
     console.log("User Wins!");
     players.user.winner = true;
     displayMsgs.textContent = "User Wins!";
     players.user.winRounds += 1;
     displayWinRounds.textContent = "X wins: " + players.user.winRounds + " - " + "O wins: " + players.computer.winRounds;
     console.log(players.user.winner);
     setTimeout(resetGame, 3500);
    }
  if (winCombination[0].symbol === players.computer.symbol &&
    winCombination[1].symbol === players.computer.symbol &&
    winCombination[2].symbol === players.computer.symbol) {
    console.log(winCombination[0].symbol, winCombination[1].symbol, winCombination[2].symbol);
    console.log("Computer Wins!");
    players.computer.winner = true;
    displayMsgs.textContent = "Computer Wins!";
    players.computer.winRounds += 1;
    displayWinRounds.textContent = "X wins: " + players.user.winRounds + " - " + "O wins: " + players.computer.winRounds;
    console.log(players.computer.winner);
    setTimeout(resetGame, 3500); 
 }
};
};

displayWinRounds.textContent = "X wins: " + players.user.winRounds + " - " + "O wins: " + players.computer.winRounds;
function resetGame() {
    players.user.winner = false;
    players.computer.winner = false;
    players.user.turn = true;
    players.computer.turn = false;
    displayMsgs.textContent = "";
    gameBoard.resetBoard();
}

restart.addEventListener('click', () => {
    resetGame();
    players.computer.winRounds = 0;
    players.user.winRounds = 0;
    displayWinRounds.textContent = "X wins: " + players.user.winRounds + " - " + "O wins: " + players.computer.winRounds;
})

    return {    
        resetGame: resetGame,
        winner: winner,
        getPlayer: getPlayer
    };

})();








