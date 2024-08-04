const socket = io();

const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');

socket.on('chat message', (msg) => {
    const message = document.createElement('p');
    message.textContent = msg;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

function sendMessage() {
    const message = messageInput.value;
    if (message.trim() !== '') {
        socket.emit('chat message', message);
        messageInput.value = '';
    }
}
