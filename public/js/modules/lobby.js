define(['jquery', 'modules/socket', 'modules/notify'], function ($, sio, notify) {
    var socket = sio.socket,
        $form = $('#join-lobby-form'),
        $tile = $form.parent(),
        $memberTile = [],
        $memberList = [],
        $progressBar = [],
        lobby = {};

    function createMemberList() {
        var progressContainer; // a local reference to the progress container

        // make sure the list doesn't already exist
        if ($memberTile.length > 0) { return; }

        $memberTile = $('<div class="fade"></div>')
                        .append($('<h1 class="tile-title">Waiting</h1>'))
                        .prependTo($tile);

        // create a progress bar to track the number of members
        $progressContainer = $('<div class="progress"></div>').appendTo($memberTile);
        $progressBar = $('<div class="progress-bar" role="aria-progressbar" aria-valuemin="0" aria-valuemax="4"></div>')
                        .appendTo($progressContainer);

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

        socket.on('lobby changed', lobby.update);
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

    lobby.update = function (data) {
        var i, len;

        // Completely erase any existing list and add all members.
        // This may be slightly slower, but it makes sure the list is always accurate,
        // and it ensures a complete list is created, even if you're 3rd to join.
        $memberList.empty();

        for (i = 0, len = data.members.length; i < len; i += 1) {
            lobby.addMember(data.members[i].name, data.members[i].id);
        }

        $progressBar.attr('aria-valuenow', data.members.length).css('width', (data.members.length / 4) * 100 + '%' );
    };

    return lobby;
});