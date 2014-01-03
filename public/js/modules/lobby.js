define(['jquery', 'modules/socket', 'modules/notify'], function ($, sio, notify) {
    var socket = sio.socket,
        lobby = {};

    lobby.create = function () {
        var $username = $('#join-lobby-username'),
            $form = $('#join-lobby-form');

        // make sure our socket is connected
        if (!socket.socket.connected) {
            socket.on('connect', function () { lobby.create(); });
            return false;
        }

        // let the server know we're joining
        $form.on('submit', function () {
            socket.emit('join game', {username: $username.val()});
            return false; // prevent the form from submitting
        });

        socket.on('lobby changed', function (data) {
            notify.info({message: data.name + ' has joined this game.'});
            console.log('There are now this many people in the lobby: ', data.count);
        });

        // handle the dealing of cards
        socket.on('start game', function (data) {
            notify.success('The room is full, and a game is about to begin.');
        });
    };

    return lobby;
});