var Game = function (members) {
    this.id = Date.now().toString(36);
    this.members = members;
};

module.exports.create = function (io, callback) {
    var members = io.sockets.clients('lobby'),
        game = new Game(members),
        clientMembers = members.map(function (member) {
            return member.id;
        });

    // add each member in the lobby to a new "room" (and leave the "lobby")
    // and send them a message
    members.forEach(function (member) {
        member.leave('lobby').join(game.id).emit('start game', {
            members: clientMembers
        });
    });
}
