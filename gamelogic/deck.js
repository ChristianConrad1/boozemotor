var Card = require('./card.js');
const cardlist = require('./cardlist.js');
var shuffle = require('shuffle-array');

class Deck {
  constructor() {
    this.deck = [];
    this.createDeck();
  }

  createDeck() {
    for (let j = 0; j < cardlist.length; j++) {
      let element = cardlist[j];
      for (let i = 0; i < element.quantity_total; i++) {
        let newCard = new Card(element.name, element.goal, element.quantity_needed, element.quantity_total, element.text);
        this.deck.push(newCard);
      }
    }
    shuffle(this.deck)
  }

  deal() {
    let card = this.deck.shift();
    return card;
  }
}




module.exports = Deck;