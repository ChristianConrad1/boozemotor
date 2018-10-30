var Card = require('./card.js');
const cardlist = require('./cardlist.js');
var shuffle = require('shuffle-array');

class Deck {
  constructor() {
    this.cards = [];
    this.createDeck();
  }

  createDeck() {
    for (let j = 0; j < cardlist.length; j++) {
      let element = cardlist[j];
      for (let i = 0; i < element.quantity_total; i++) {
        let newCard = new Card(element.name, element.goal, element.quantity_needed, element.quantity_total, element.text);
        this.cards.push(newCard);
      }
    }
    shuffle(this.cards);
  }

  deal() {
    if (this.cards.length > 0) {
      let card = this.cards.shift();
      return card;
    }
  }
}




module.exports = Deck;