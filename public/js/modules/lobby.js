define(['jquery', 'modules/socket', 'modules/notify'], function ($, sio, notify) {
    var socket = sio.socket,
        $form = $('#join-lobby-form'),
        $tile = $form.parent(),
        $memberTile = [],
        $memberList = [],
        lobby = {};

    function createMemberList() {
        // make sure the list doesn't already exist
        if ($memberTile.length > 0) { return; }

        $memberTile = $('<div class="fade"></div>')
                        .append($('<h1 class="tile-title">Waiting</h1>'))
                        .prependTo($tile);

        // store a separate reference to the <ul>
        $memberList = $('<ul class="tile-list"></ul>').appendTo($memberTile);

        // fade in the member tile after the browser has finished repainting
        window.setTimeout(function () {
            $memberTile.addClass('in');
        }, 0);
    }

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
            if (data.added) {
                lobby.addMember(data.added.name, data.added.id);
            }
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
        $username.trigger('blur'); // remove focus fromt he input
        $form.toggleClass('in out'); // fade out the form
        createMemberList(); // add a new section to the tile for displaying lobby members
    };

    lobby.addMember = function (name, id) {
        // create a new list item for the member who just joined
        $('<li class="tile-list-item" data-userid="' + id + '">' + name + '</li>').appendTo($memberList);
    };

    return lobby;
});