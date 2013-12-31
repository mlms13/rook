define(['modules/card'], function (Card) {
    // each suit has the following cards
    var cardTypes = [{ power: 15, worth: 15, face: 1 },
                     { power: 14, worth: 10 },
                     { power: 13, worth: 0 },
                     { power: 12, worth: 0 },
                     { power: 11, worth: 0 },
                     { power: 10, worth: 10 },
                     { power: 9, worth: 0 },
                     { power: 8, worth: 0 },
                     { power: 7, worth: 0 },
                     { power: 6, worth: 0 },
                     { power: 5, worth: 5 }];

    return {
        getCardsInSuit: function (suit) {
            var i = 0,
                length = cardTypes.length,
                cards = [];

            // for the given string "suit", populate the array of cards
            for (i = 0; i < cardTypes.length; i += 1) {
                // card.create() will handle any missing values for "face"
                cards[i] = new Card(suit, cardTypes[i].power, cardTypes[i].worth, cardTypes[i].face);
            }

            return cards;
        }
    };
});