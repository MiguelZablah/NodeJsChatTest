var socket = io();

// User connected
socket.on('connect', () => {
    try{
        var params = $.deparam();
        socket.emit('join', params, function(e) {
            if (e) {
                alert(e);
                return window.location.href = '/';
            }
            console.log('Connected to server');
        });
    }catch{
        return window.location.href = '/';
    }

});

// User disconected
socket.on('disconnect', () => {
    console.log('Disconnected!');
});

// User update
socket.on('updateUserList', (users) => {
    // console.log('User List', users);
    var ol = $('<ol></ol>');

    users.forEach((user) => {
        ol.append($('<li></li>').text(user));
    });

    $('#users').html(ol);
});

// Recibe new message
socket.on('newMessage', (message) => {
    // Using Mustach
    var formattedTime = moment(message.createdAt).format('hh:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        text: message.text
    });
    $('#messages').append(html);
    scrollToBottom();

    // With no Mustach
    // var formattedTime = moment(message.createdAt).format('hh:mm a');
    // var li = $('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    // $('#messages').append(li);
});
// Recibin Location Message
socket.on('newLocationMessage', function (message) {
    // Using Mustach
    var formattedTime = moment(message.createdAt).format('hh:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });
    $('#messages').append(html);
    scrollToBottom();

    // With no Mustach
    // var formattedTime = moment(message.createdAt).format('hh:mm a');
    // var li = $('<li></li>');
    // var a = $('<a target="_blank">My Current Location</a>');
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // $('#messages').append(li);
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
// Scroll to bottom function
function scrollToBottom() {
    // Selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}
