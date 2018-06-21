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
// Recibin Location Message
socket.on('newLocationMessage', function (message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);

    li.append(a);

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
// Send Location
var locationbtn = $('#send-location');
locationbtn.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('createLocationMessage', {
            lati: position.coords.latitude,
            long: position.coords.longitude
        });
    }, () => {
        alert('Unable to fetch location.');
    });
});
