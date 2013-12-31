define(['modules/suit', 'modules/card'], function (suit, Card) {
    var cards = suit.getCardsInSuit('green').concat(suit.getCardsInSuit('yellow')).concat(suit.getCardsInSuit('red')).concat(suit.getCardsInSuit('black'));
    cards.push(new Card('rook', 10.5, 20, 'rook'));

    return {
        cards: cards,
        hands: [],
        kitty: [],
        shuffle: function () {
            var i, r, temp;

            for (i = 0; i < this.cards.length; i += 1) {
                r = Math.floor(Math.random() * this.cards.length);
                temp = this.cards[i];
                this.cards[i] = this.cards[r];
                this.cards[r] = temp;
            }
            return this;
        },
        deal: function () {
            // we'll modify our own copy of the array instead of modifying `cards`
            var i, cardsCopy = cards.slice();

            // split the cards into 4 hands and 1 kitty
            for (i = 0; i < 4; i += 1) {
                this.hands[i] = cardsCopy.splice(0, 10);
            }
            this.kitty = cardsCopy
            return this;
        }
    }
});