var Game = function (members) {
    this.id = Date.now().toString(36);
    this.members = members;
};

module.exports.create = function (io, callback) {
    var members = io.sockets.clients('lobby'),
        game = new Game(members);

    // add each member in the lobby to a new "room" (and leave the "lobby")
    // and send them a message
    members.forEach(function (member) {
        member.leave('lobby').join(game.id).emit('message', {
            type: 'success',
            message: 'A game is about to begin!'
        });
    });
}
