define(['modules/socket'], function (sio) {
    var socket = sio.socket;

    return {
        create: function () {
            var $username = $('#join-lobby-username'),
                $form = $('#join-lobby-form');

            // let the server know we're joining
            $form.on('submit', function () {
                socket.emit('join game', {username: $username.val()});
                return false; // prevent the form from submitting
            });

            socket.on('lobby changed', function (data) {
                console.log(data.name, 'has joined, brining the number of members in the room to', data.count);
            });

            // handle the dealing of cards
            socket.on('start game', function (data) {
                console.log('The room is full, and a game is about to begin.');
            });
        }
    }
    
});