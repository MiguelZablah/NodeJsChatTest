var socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
    
    socket.emit('createMessage', {
        from: 'Mike',
        text: 'Well it work!'
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected!');
});

socket.on('newMessage', (message) => {
    console.log('New Message', message);
})