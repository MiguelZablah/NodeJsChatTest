const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const express = require('express');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    // Set up room
    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room))
            return callback('Name and room name are required.');

        console.log(`User: ${params.name} joined room: ${params.room}`);
        // io.to('room name');
        // socket.broadcast.to('room name');
        // socket.leave('room name');

        // Join Room
        socket.join(params.room);
        // Check if user exist if exist deleted
        users.removeUser(socket.id);
        // Save user
        users.addUser(socket.id, params.name, params.room);
        // Send users to room
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        // Gretting Message
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app') );
        // Notify user of new user
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`) );
        callback();
    });

    // When user create message
    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);
        
        if(!user && !isRealString(message.text))
            return callback('Not valid message or user');

        console.log(`User: ${user.name}, Says: "${message.text}", to Room: ${user.room}`);
        // Send new message
        io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        callback();
    });

    socket.on('createLocationMessage', (cords) => {
        var user = users.getUser(socket.id);

        if(!user && !cords)
            return callback('Not valid message or cords');

        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, cords.lati, cords.long));
    });

    socket.on('disconnect', () => {
        // console.log('Disconnected!');
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});
