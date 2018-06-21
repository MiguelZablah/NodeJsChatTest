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
    // Gretting Message
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app'
    });
    // Notify user of new user
    socket.broadcast.emit('newMessage',{
        from: 'Admin',
        text: 'New user joined'
    });
    
    // When user create message
    socket.on('createMessage', (message) => {
        console.log('Created Message', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('Disconnected!');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});
