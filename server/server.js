const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');

const express = require('express');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user conected');

    socket.emit('newMessage', {
        from: 'Juan',
        text: 'Hi, loco!',
        createdAt: 123 
    });

    socket.on('createMessage', (message) => {
        console.log('Created Message', message);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected!');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});
