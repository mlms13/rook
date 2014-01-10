// a local reference to all lobby members
// this will be passed to the clientMemberList
var clientMemberList = [];

// handle incoming members
module.exports.join = function (io, socket, data) {
    // set up the current socket
    socket.join('lobby');
    socket.set('username', data.username);

    // keep track of everything in our local array
    clientMemberList.push({
        name: data.username,
        id: socket.id
    });

    // let everyone know the status of the lobby
    io.sockets.in('lobby').emit('lobby changed', {
        added: {name: data.username, id: socket.id},
        members: clientMemberList
    });

    // return the current status of the lobby
    return io.sockets.clients('lobby');
};

// handle disconnecting users
module.exports.exit = function (io, socket) {
    var i, len;

    // remove the user from the lobby if they have joined
    // no need to `.leave()` the room, but we should update the clientMemberList
    for (i = 0, len = clientMemberList.length; i < len; i += 1) {
        if (clientMemberList[i].id === socket.id) {
            clientMemberList.splice(i, 1);
            break; // assume there's only one instance of the client in the array
        }
    }

    // let all the remaining clients in the lobby know that someone left
    io.sockets.in('lobby').emit('lobby changed', {
        removed: {id: socket.id},
        members: clientMemberList
    });

    // return the currentstatus of the lobby for consistency
    return io.sockets.clients('lobby');
};