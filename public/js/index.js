var socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
    
    socket.emit('createEmail', {
        to: 'jen@example.com',
        text: 'Hey, This is Andre.'
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected!');
});

socket.on('newEmail', (res) => {
    console.log('New Email', res);
})