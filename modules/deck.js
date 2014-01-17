// a private template for a new card object
var Card = function (suit, points, power, face) {
    this.suit = suit; // red, green, yellow, or black
    this.points = points; // how many points the cord is worth when won
    this.power = power; // the card's strength vs other cards
    this.face = face || power; // the number show on the card (usually the same as the power)
};

var Deck = function () {
    var i, j,
        suits = ['green', 'yellow', 'red', 'black'],
        cardTypes = [{ power: 15, points: 15, face: 1 },
                     { power: 14, points: 10 },
                     { power: 13, points: 0 },
                     { power: 12, points: 0 },
                     { power: 11, points: 0 },
                     { power: 10, points: 10 },
                     { power: 9, points: 0 },
                     { power: 8, points: 0 },
                     { power: 7, points: 0 },
                     { power: 6, points: 0 },
                     { power: 5, points: 5 }];

    this.cards = [new Card('rook', 20, 10.5, 'rook')];

    for (i = 0; i < suits.length; i ++) {
        for (j = 0; j < cardTypes.length; j++) {
            this.cards.push(new Card(suits[i], cardTypes[j].points, cardTypes[j].power, cardTypes[j].face));
        }
    }
};

Deck.prototype.shuffle = function () {
    var i, r, len, temp;

    console.log('There are this many cards in the deck:', this.cards.length);

    for (i = 0, len = this.cards.length; i < len; i ++) {
        r = Math.floor(Math.random() * len);
        temp = this.cards[i];
        this.cards[i] = this.cards[r];
        this.cards[r] = temp;
    }
    return this;
};

Deck.prototype.deal = function () {
    var copy = this.cards.slice(),
        dealt = {hands: [], kitty: []};

    // split our copy of the cards into four hands and a kitty
    while (copy.length > 0) {
        if (copy.length >= 10) {
            dealt.hands.push(copy.splice(0,10));
        } else {
            dealt.kitty = copy.splice(0, copy.length);
        }
    }

    return dealt;
};

module.exports = Deck;
