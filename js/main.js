require(['modules/suit'], function (suit) {
    var green = suit.getCardsInSuit('green');

    green.forEach(function (card) {
        $('body').prepend(card.render());
    });
});