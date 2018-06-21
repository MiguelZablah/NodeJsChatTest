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
    var formattedTime = moment(message.createdAt).format('hh:mm a');
    var li = $('<li></li>');
    li.text(`${message.from} ${formattedTime}: ${message.text}`);

    $('#messages').append(li);
});
// Recibin Location Message
socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('hh:mm a');
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</a>');
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);

    li.append(a);

    $('#messages').append(li);
});
// Jquery Code for new message
var messageTextBox = $('[name=message]');
$('#message-form').on('submit', function (e) {
    e.preventDefault();

    if (messageTextBox.val() === '' || messageTextBox.val() === null)
        return alert('Please tipe a message.');

    socket.emit('createMessage', {
            from: 'User',
            text: messageTextBox.val()
        },
        function () {
            messageTextBox.val('');
        }
    );
});
// Send Location
var locationbtn = $('#send-location');
locationbtn.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationbtn.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('createLocationMessage', {
            lati: position.coords.latitude,
            long: position.coords.longitude
        });
        locationbtn.removeAttr('disabled').text('Send location');
    }, () => {
        alert('Unable to fetch location.');
        locationbtn.removeAttr('disabled').text('Send location');
    });
});
