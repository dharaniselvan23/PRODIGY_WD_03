// script.js
document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const restartBtn = document.getElementById('restart');
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (e) => {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== "" || !isGameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        if (checkWinner()) {
            statusText.textContent = `${currentPlayer} wins!`;
            isGameActive = false;
        } else if (gameState.includes("")) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = `It's ${currentPlayer}'s turn`;
        } else {
            statusText.textContent = "It's a draw!";
            isGameActive = false;
        }
    };

    const checkWinner = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            const a = gameState[winCondition[0]];
            const b = gameState[winCondition[1]];
            const c = gameState[winCondition[2]];

            if (a === "" || b === "" || c === "") {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
        return roundWon;
    };

    const restartGame = () => {
        gameState = ["", "", "", "", "", "", "", "", ""];
        isGameActive = true;
        currentPlayer = "X";
        cells.forEach(cell => cell.textContent = "");
        statusText.textContent = `It's ${currentPlayer}'s turn`;
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartBtn.addEventListener('click', restartGame);

    let isGameActive = true;
    statusText.textContent = `It's ${currentPlayer}'s turn`;
});
