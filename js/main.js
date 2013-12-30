require(['modules/card'], function (card) {
    card.create('red', 10, 10);
    $('body').prepend(card.render());
});