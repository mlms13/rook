require.config({
    paths: {
        jquery: 'jquery',
        socketio: '../socket.io/socket.io'
    }
});

require(['jquery', 'socketio'], function ($, io) {
    // connect to the server
    var $container = $('body'),
        $username = $('#join-lobby-username'),
        $form = $('#join-lobby-form'),
        socket = io.connect('http://localhost:3000');

    // let the server know we're joining
    $form.on('submit', function () {
        socket.emit('join game', {username: $username.val()});
        return false; // prevent the form from submitting
    });

    socket.on('lobby changed', function (data) {
        console.log('lobby changed');
        console.log(data.name, 'has joined, brining the number of members in the room to', data.count);
    });

    // handle the dealing of cards
    socket.on('start game', function (data) {
        console.log('The room is full, and a game is about to begin.');
    });
});