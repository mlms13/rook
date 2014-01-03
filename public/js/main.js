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

require(['jquery', 'modules/lobby'], function ($, lobby) {
    lobby.create();
});