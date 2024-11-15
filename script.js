// game state
let isGameRunning = false

// create game board
gameContainer = document.querySelector("game")

for (let i = 0; i < 9; i++) {
    let newBox = document.createElement('div');

    newBox.classList.add('game-box');

    newBox.textContent = "⋅";

    gameContainer.appendChild(newBox);
}

// handle game start
button = document.querySelector("#start-button")
gameStatus = document.querySelector("#game-status")

players = ["X", "O"]
activePlayer = players[Math.floor(Math.random() * players.length)];

button.addEventListener("click", function () {
    isGameRunning = true
    button.style.display = "none"
    gameStatus.textContent = `${activePlayer}'s turn!`
})

// handle gameplay
gameContainer.addEventListener("click", function (event) {
    if (!isGameRunning || event.target.classList.contains('occupied')) {
        return
    }
    if (event.target.classList.contains('game-box')) {
        event.target.textContent = activePlayer

        event.target.classList.add('occupied')
        activePlayer = activePlayer === "X" ? "O" : "X"
        gameStatus.textContent = `${activePlayer}'s turn!`

        let winner = hasWon()
        if (winner) {
            gameStatus.textContent = `${winner} has won!`
            isGameRunning = false
        }
    }
})

// check for a winner
function getSquare(index) {
    return gameContainer.children[index].innerText
}

function playerIfIsPlayer(character) {
    return character == "X" || character == "O" ? character : undefined
}

function hasWon() {

    // diagonals
    if (
        (getSquare(0) === getSquare(4) && getSquare(4) === getSquare(8) && playerIfIsPlayer(getSquare(4))) ||
        (getSquare(2) === getSquare(4) && getSquare(4) === getSquare(6) && playerIfIsPlayer(getSquare(4)))
    ) {
        console.log("diagonal")
        detection = getSquare(4)
        if (playerIfIsPlayer(detection)) {
            return detection
        }
    }

    // rows
    for (let i = 0; i < 9; i = i + 3) {
        if (getSquare(i) === getSquare(i + 1) === getSquare(i + 2)) {
            console.log("row")
            detection = getSquare(i)
            if (playerIfIsPlayer(detection)) {
                return detection
            }
        }
    }

    // columns
    for (let i = 0; i < 3; i++) {
        if (getSquare(i) === getSquare(i + 3) === getSquare(i + 6)) {
            console.log("column")
            detection = getSquare(i)
            if (playerIfIsPlayer(detection)) {
                return detection
            }
        }

    }
}