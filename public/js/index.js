var socket = io();

// User connected
socket.on('connect', () => {
    console.log('Connected to server');
});
// User disconected
socket.on('disconnect', () => {
    console.log('Disconnected!');
});

// Recibe new message
socket.on('newMessage', (message) => {
    // console.log('New Message', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});
// Jquery Code for new message
$('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
            from: 'User',
            text: $('[name=message]').val()
        },
        function (data) {
            console.log(data);
        }
    );
});