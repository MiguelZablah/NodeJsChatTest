const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const express = require('express');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user conected');
    // Gretting Message
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app') );
    // Notify user of new user
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined') );

    // When user create message
    socket.on('createMessage', (message) => {
        console.log('Created Message', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        // socket.broadcast.emit('newMessage', generateMessage(message.from, message.text) );
    });

    socket.on('disconnect', () => {
        console.log('Disconnected!');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});
