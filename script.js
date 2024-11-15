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
    }
})