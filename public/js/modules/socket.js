define(['socketio'], function (io) {
    return {
        socket: io.connect('http://localhost:3000')
    }
});