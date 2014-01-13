var lobby = {};

// a local reference to all lobby members
// this will be passed to the client via socket.io
lobby.members = [];

// handle incoming members
lobby.join = function (io, socket, data) {
    // set up the current socket
    socket.join('lobby');
    socket.set('username', data.username);

    // keep track of everything in our local array
    lobby.members.push({
        name: data.username,
        id: socket.id
    });

    // let everyone know the status of the lobby
    io.sockets.in('lobby').emit('lobby changed', {
        added: {name: data.username, id: socket.id},
        members: lobby.members
    });

    // return the lobby object for easy chaining
    return lobby;
};

// handle disconnecting users
lobby.exit = function (io, socket) {
    var i, len;

    // remove the user from the lobby if they have joined
    // no need to `.leave()` the room, but we should update the members
    for (i = 0, len = lobby.members.length; i < len; i += 1) {
        if (lobby.members[i].id === socket.id) {
            lobby.members.splice(i, 1);
            break; // assume there's only one instance of the client in the array
        }
    }

    // let all the remaining clients in the lobby know that someone left
    io.sockets.in('lobby').emit('lobby changed', {
        removed: {id: socket.id},
        members: lobby.members
    });

    return lobby;
};

// remove anyone from the lobby who is in a game
lobby.clear = function (io) {
    io.sockets.clients('lobby').forEach(function (member) {
        // These members have to be in at least two rooms, "lobby" and "" (default).
        // If they're in more than that, they must be in a game,
        // so remove them from the lobby.

        if (Object.keys(io.sockets.manager.roomClients[member.id]).length > 2) {
            member.leave('lobby');
        }
    });
};

module.exports = lobby;
