const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Menyajikan file statis dari direktori 'public'
app.use(express.static('public'));

io.on('connection', (socket) => {
console.log('a user connected');

socket.on('chat message', (msg) => {
io.emit('chat message', msg); // Broadcast pesan ke semua klien
});

socket.on('disconnect', () => {
console.log('user disconnected');
});
});

// Untuk menangani semua permintaan, arahkan ke index.html
app.get('*', (req, res) => {
res.sendFile(__dirname + '/public/index.html');
});

// Gunakan port yang diberikan oleh Vercel
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
