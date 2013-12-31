define(function () {
    // a private template for a new card object
    function Card (suit, power, worth, face) {
        this.suit = suit; // red, green, yellow, or black
        this.worth = worth; // how many points the cord is worth when won
        this.power = power; // the card's strength vs other cards
        this.face = face || power; // the number show on the card (usually the same as the power)
    }

    Card.prototype.render = function () {
        // create and return a jQuery object representing the card
        var $card = $('<div class="rook-card" />');

        // add worth, if the card has worth
        if (this.worth > 0) {
            $card.attr('data-card-worth', this.worth);
        }

        return $card.addClass(this.suit)
            .attr('data-card-suit', this.suit)
            .attr('data-card-face', this.face)
            .append($('<span class="rook-card-inner">' + this.face + '</span>'));
    }

    return Card;
});