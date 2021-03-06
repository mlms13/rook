// import modules
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    path = require('path'),
    io = require('socket.io').listen(server);

// import rook-specific modules
var lobby = require('./modules/lobby'),
    game = require('./modules/game')

// middleware for all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware({
    src: path.join(__dirname, 'stylus'),
    dest: path.join(__dirname, 'public')
}));
app.use(express.static(path.join(__dirname, 'public')));

// listen for server activity
server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

// set up routes
var index = require('./routes/index');

// handle http requests
app.get('/', index);

// listen for socket activity
io.sockets.on('connection', function (socket) {
    socket.on('join game', function (data) {
        lobby.join(io, socket, data);
        lobby.members.length > 3 && game.create(io);
    });

    socket.on('disconnect', function () {
        var rooms = io.sockets.manager.roomClients[socket.id];

        if (rooms['/lobby']) {
            lobby.exit(io, socket);
        } else if (Object.keys(rooms).length > 1) {
            // if they user was in more than 1 room (the default: "")
            // TODO: handle their disconnection
        }
    });
});
