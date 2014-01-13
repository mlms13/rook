require.config({
    paths: {
        'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min', 'lib/jquery'],
        'bootstrap': ['//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min', 'lib/bootstrap-min'],
        'socketio': '../socket.io/socket.io'
    },
    shim: {
        'bootstrap': ['jquery']
    }
});

require(['modules/socket', 'modules/lobby', 'modules/notify'], function (sio, lobby, notify) {
    var socket = sio.socket;

    // kick things off by creating the lobby interface
    lobby.create();

    // handle generic incoming messages with the notification module
    socket.on('message', function (data) {
        notify.message(data);
    });
});