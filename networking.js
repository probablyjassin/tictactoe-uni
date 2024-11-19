// P2P implementation using PeerJS
const peer = new Peer();
let conn = null;
let isHost = false;
let gameState = {
    board: Array(9).fill(null),
    currentTurn: 'X'
};

function showMessage(textContent) {
    alert(textContent);
  }


// Host game
function hostGame() {
    isHost = true;
    const gameId = generateGameId(); // Generate simple game ID
    showMessage(`Share this game code with opponent: ${gameId}`);
    
    peer.on('connection', (connection) => {
        //conn = connection;
        //setupGameConnection();
        showMessage('Hi host!');
    });
}

// Join game
function joinGame() {
    isHost = false;
    const hostId = document.getElementById("game-id").value
    console.log(hostId)
    conn = peer.connect(hostId);
    //setupGameConnection();
    showMessage("yay")
}

function setupGameConnection() {
    conn.on('open', () => {
        if (!isHost) {
            showMessage('Hi Client');
        }
    });

    conn.on('data', (data) => {
        if (data.type === 'move') {
            handleMove(data.position);
        }
    });
}

function makeMove(position) {
    if (gameState.board[position] !== null) return;
    if ((isHost && gameState.currentTurn !== 'X') || 
        (!isHost && gameState.currentTurn !== 'O')) return;

    // Update local game state
    gameState.board[position] = gameState.currentTurn;
    gameState.currentTurn = gameState.currentTurn === 'X' ? 'O' : 'X';
    
    // Send move to opponent
    conn.send({
        type: 'move',
        position: position
    });
    
    // Update UI
    updateBoard();
    checkWinCondition();
}

function handleMove(position) {
    gameState.board[position] = gameState.currentTurn;
    gameState.currentTurn = gameState.currentTurn === 'X' ? 'O' : 'X';
    updateBoard();
    checkWinCondition();
}

// Helper functions
function generateGameId() {
    return Math.random().toString(36).substring(7);
}

function checkWinCondition() {
    // Implement win checking logic
    // ...
}

document.getElementById("host-btn").addEventListener('click', hostGame)
document.getElementById("join-btn").addEventListener('click', joinGame)