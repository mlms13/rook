var Game = function (members) {
    this.id = Date.now().toString(36);
    this.members = members;
};

module.exports.create = function (io) {
    var members = io.sockets.clients('lobby'),
        game = new Game(members);

    // add each member in the lobby to a new "room"
    // and send them a message
    members.forEach(function (member) {
        member.join(game.id).emit('message', {
            text: 'A game is about to begin!'
        });
    });
}
