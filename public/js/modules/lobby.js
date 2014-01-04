define(['jquery', 'modules/socket', 'modules/notify'], function ($, sio, notify) {
    var socket = sio.socket,
        $form = $('#join-lobby-form')
        lobby = {};

    lobby.create = function () {
        // make sure our socket is connected
        if (!socket.socket.connected) {
            socket.on('connect', function () { lobby.create(); });
            return false;
        }

        // set up basic event handling
        $form.on('submit', function (e) {
            e.preventDefault(); // prevent the form from submitting
            lobby.join();
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

    lobby.join = function () {
        var $username = $('#join-lobby-username');

        // let the server know we're joining
        socket.emit('join game', {username: $username.val()});

        // when the client successfully joins the lobby, change the interface
        $form.toggleClass('in out');
    };

    return lobby;
});