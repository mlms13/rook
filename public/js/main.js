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

    // let the server know what's up
    $join.on('click', function () {
        socket.emit('join game', {username: $username.val()});
    });

    // handle the dealing of cards
    socket.on('start game', function (data) {
        console.log(data);
    });
});