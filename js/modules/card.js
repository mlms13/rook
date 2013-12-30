define(function () {
    return {
        power: 0,
        worth: 0,
        suit: undefined,
        create: function (suit, power, worth) {
            this.suit = suit;
            this.worth = worth;
            this.power = power;
        },
        render: function () {
            // create and return a jQuery object representing the card
            var $card = $('<div class="rook-card" />');

            // add worth, if the card has worth
            if (this.worth > 0) {
                $card.attr('data-card-worth', this.worth);
            }

            return $card.addClass(this.suit)
                .attr('data-card-power', this.power)
                .append($('<span class="rook-card-inner">' + this.power + '</span>'));
        }
    };
});