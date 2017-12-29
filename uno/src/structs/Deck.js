class Card {
    constructor(color, number, powerCard, power) {
        this.color = color;
        this.number = number;
        this.powerCard = powerCard;
        this.power = power;
    }
}

class Deck {
    constructor() {
        this.deck = this.createDeck()
    }
    /**
     * Inefficient, but easy to understand;
     */
    createDeck() {
        let colors = ['blue', 'green', 'yellow', 'red'],
            specialCards = ['skip', 'reverse', 'drawTwo'],
            rareCards = ['wild', 'wildFour'],
            cards = [];
        for (var k = 0; k < 2; ++k) {
            for (var i = 0; i < colors.length; ++i) {
                for (var j = 1; j < 13; ++j) {
                    let name = j < 10 ? j : specialCards[j],
                        special = j < 10 ? false : true,
                        power = j < 10 ? null : specialCards[j - 10];
                    cards.push(new Card(colors[i], name, special, power));
                }
            }
        }
        for (var j = 0; j < 3; ++j) {
            for (var i = 0; i < rareCards.length; ++i) {
                cards.push(new Card(colors[i], 0));
            }
            for (var i = 0; i < rareCards.length; ++i) {
                cards.push(new Card(null, null, true, rareCards[i]));
            }
        }
        console.log(cards);
        return cards;
    }
    shuffle() {
        let curr = this.deck.length,
            temp,
            randomIndex;

        while (curr !== 0) {
            randomIndex = Math.floor(Math.random() * curr);
            curr -= 1;

            // swap;
            temp = this.deck[curr],
            this.deck[curr] = this.deck[randomIndex],
            this.deck[randomIndex] = temp;
        }

        return this;

    }
};

export default Deck;