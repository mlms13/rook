require.config({
    paths: {
        jquery: 'jquery',
        socketio: '../socket.io/socket.io'
    }
});

require(['jquery', 'modules/lobby'], function ($, lobby) {
    lobby.create();
});