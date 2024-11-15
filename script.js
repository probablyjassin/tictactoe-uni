gameContainer = document.querySelector("game")

console.log("hi")

for (let i = 0; i < 9; i++) {
    let newBox = document.createElement('div');

    newBox.classList.add('game-box');

    newBox.textContent = ".";

    gameContainer.appendChild(newBox);
}
