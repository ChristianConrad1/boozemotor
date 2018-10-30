var Deck = require('./deck.js');
var Player = require('./player.js');
class Game {
  constructor() {
    this.deck = new Deck();
    this.players = [];
    this.topCard = this.deck.deal();
    this.cardPool = [];
    this.isRunning = false;


    //
    this.addPlayer("Peter");
    this.addPlayer("Paul");
    this.addPlayer("Otto");
    this.addPlayer("Manni");
    this.addPlayer("Thorsten");
    this.bet([10, 10, 3, 10, 11]);
    //

  }

  addPlayer(name) {
    let id = this.players.length;
    let newPlayer = new Player(name, id);
    this.players.push(newPlayer);
  }

  bet(moneyArray) {
    console.log(this.topCard.name);
    let winnercard = 0;
    if (this.topCard.goal === "low") {
      winnercard = 99;
    }
    let winner = 99;
    let duplicatenumbers = [];
    let duplicates = [];

    for (let i = 0; i < moneyArray.length; i++) {
      if (duplicatenumbers.includes(moneyArray[i])) {
        duplicates.push(i);
      } else if (!duplicates.includes(i)) {
        for (let j = i + 1; j <= moneyArray.length; j++) {
          if (moneyArray[i] === moneyArray[j] && !duplicates.includes(i)) {
            duplicates.push(i);
            duplicatenumbers.push(moneyArray[i]);
          }
        }
      }
      if (!duplicates.includes(i)) {
        if (this.topCard.goal == "high") {
          if (moneyArray[i] > winnercard) {
            winnercard = moneyArray[i];
            winner = i;
          }
        } else {
          if (moneyArray[i] < winnercard) {
            winnercard = moneyArray[i];
            winner = i;
          }
        }
      }
    }
    if (winnercard != 99 && winnercard != 0) {
      if (this.cardPool.length > 0) {
        for (var i = 0; i < this.cardPool.length; i++) {
          this.players[winner].cards.push(this.cardPool[i]);
        }
        this.cardPool = [];
      }
      this.players[winner].cards.push(this.topCard);
      this.checkCards(this.players[winner], this.topCard);
    } else {
      this.cardPool.push(this.topCard);
    }
    if (this.deck.cards.length > 0) {
      this.topCard = this.deck.deal();
      this.bet([10, 10, 3, 10, 11]);
    }

  }

  checkCards(player, card) {
    let duplicates = [];
    if (card.quantity_needed === 1) {
      console.log(card.text);
      player.cards.pop();
    } else {
      for (let i = 0; i < player.cards.length - 1; i++) {
        if (card.name === player.cards[i].name) {
          duplicates.push(i);
          if (card.quantity_needed === duplicates.length + 1) {
            console.log(card.text);
            for (let j = duplicates.length; j > 0; j--) {
              player.cards.splice(duplicates[j - 1], 1);
            }

            player.cards.pop();
          }
        }
      }
    }
  }
}

module.exports = Game;