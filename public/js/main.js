require(['modules/deck'], function (deck) {
    var cards;

    deck.shuffle().deal();
    cards = deck.hands[0];

    cards.forEach(function (card) {
        $('body').prepend(card.render());
    });
});