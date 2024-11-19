const peer = new Peer({
    config: {
        'iceServers': [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' },
            { urls: 'stun:stun3.l.google.com:19302' },
            { urls: 'stun:stun4.l.google.com:19302' },
        ]
    }
});
let conn = null;
let isHost = false;
let peerId = null;

// Get DOM elements
const hostBtn = document.getElementById("host-btn");
const joinBtn = document.getElementById("join-btn");
const gameIdInput = document.getElementById("game-id");
const gameStatus = document.getElementById("game-status");

const chatWindow = document.getElementById("chat");
const chatList = document.getElementById("chat-list");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

// Set up peer connection
peer.on('open', function (id) {
    peerId = id;
    console.log('My peer ID is: ' + id);
});

function hostGame() {
    isHost = true;
    gameStatus.textContent = `Hosting game. Your game ID is: ${peerId}`;

    // Listen for incoming connections
    peer.on('connection', function (connection) {
        conn = connection;
        console.log("Connected to peer!");

        setupConnectionHandlers();
        const messageElement = document.createElement('p');
        messageElement.textContent = `Player 2 joined!`;
        chatList.appendChild(messageElement);
        chatWindow.style.display = "block";
    });
}

function joinGame() {
    const hostId = gameIdInput.value;
    if (!hostId) {
        gameStatus.textContent = "Please enter a game ID";
        return;
    }

    // Connect to host
    conn = peer.connect(hostId);
    setupConnectionHandlers();
}

function setupConnectionHandlers() {
    conn.on('open', function () {

        console.log("Connection established!");

        // Send test message
        if (!isHost) {
            sendMessage("[ Player 2 joined ]");
            gameStatus.textContent = "Connected!";
        }
    });

    // Handle incoming messages here
    conn.on('data', function (data) {
        console.log('Received:', data);

        if (typeof data === 'string') {
            console.log("Received message: " + data);
            const messageElement = document.createElement('p');
            messageElement.textContent = `Player 2: ${data}`;
            chatList.appendChild(messageElement);
        }
    });

    conn.on('close', function () {
        console.log("Connection closed");
        gameStatus.textContent = "Connection closed";
        chatWindow.style.display = "none";
        conn = null;
    });
}

// Event listeners
hostBtn.addEventListener('click', hostGame);
joinBtn.addEventListener('click', joinGame);

// Example function to send messages
function sendMessage(message) {
    if (conn && conn.open) {
        conn.send(message);
        const messageElement = document.createElement('p');
        messageElement.textContent = `You: ${message}`;
        chatList.appendChild(messageElement);
    } else {
        console.log("No connection available");
    }
}

chatSend.addEventListener('click', function () {
    const message = chatInput.value;
    sendMessage(message);
    chatInput.value = "";
});