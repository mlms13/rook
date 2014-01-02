require.config({
    paths: {
        jquery: 'jquery',
        socketio: '../socket.io/socket.io'
    }
});

require(['jquery', 'socketio'], function ($, io) {
    // connect to the server
    var $container = $('body'),
        $username = $('<input placeholder="Username" />').appendTo($container),
        $join = $('<a class="button" href="#">Join Random Game</a>').appendTo($container),
        socket = io.connect('http://localhost:3000');

    // let the server know we're joining
    $join.on('click', function () {
        socket.emit('join game', {username: $username.val()});
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