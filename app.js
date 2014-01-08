
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var io = require('socket.io');

var app = express(),
    server = require('http').createServer(app);

// all environments
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

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);

io = io.listen(server);

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

var clientMemberList = []; // an array of members that will be passed to the client

io.sockets.on('connection', function (socket) {
    console.log('A user connected. Listening for them to join a game...');

    socket.on('join game', function (data) {
        // add this user to the lobby and let everyone else know
        socket.join('lobby');
        clientMemberList.push({
            name: data.username,
            id: socket.id
        });

        // if the lobby is now full, start a game and clear the lobby
        if (io.sockets.clients('lobby').length === 4) {
            console.log('The lobby is now full. Starting a game.');
            io.sockets.in('lobby').emit('start game', {});
        } else {
            // otherwise, let everyone know the status of the lobby
            io.sockets.in('lobby').emit('lobby changed', {
                added: {name: data.username, id: socket.id},
                members: clientMemberList
            });
        }
    });

    socket.on('disconnect', function () {
        var i, len;

        // remove the user from the lobby if they have joined
        // no need to `.leave()` the room, but we should update the clientMemberList
        for (i = 0, len = clientMemberList.length; i < len; i += 1) {
            if (clientMemberList[i].id === socket.id) {
                clientMemberList.splice(i, 1);
                break; // assume there's only one instance of the client in the array. right?
            }
        }

        io.sockets.in('lobby').emit('lobby changed', {
            removed: {id: socket.id},
            members: clientMemberList
        })
    });
});
