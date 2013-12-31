require.config({
    paths: {
        jquery: 'jquery',
        socketio: '../socket.io/socket.io'
    }
});

require(['jquery', 'socketio', 'modules/deck'], function ($, io, deck) {
    var cards;

    deck.shuffle().deal();
    cards = deck.hands[0];

    cards.forEach(function (card) {
        $('body').prepend(card.render());
    });

    var socket = io.connect('http://localhost:3000');
    socket.on('news', function (data) {
        console.log(data);
        socket.emit('my other event', { my: 'data' });
    });
});