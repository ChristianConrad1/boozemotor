var Deck = require('./deck.js');
var Player = require('./player.js');
class Game {
  constructor() {
    this.deck = new Deck();
    this.players = [];
    this.topCard = this.deck.deal();

    this.addPlayer("Peter");
    this.addPlayer("Paul");
    this.addPlayer("Otto");
    this.addPlayer("Manni");
    this.addPlayer("Thorsten");
    this.bet([10, 10, 3, 10, 11]);
  }

  addPlayer(name) {
    let id = this.players.length;
    let newPlayer = new Player(name, id);
    this.players.push(newPlayer);
  }

  bet(moneyArray) {
    console.log(this.topCard.goal);
    let winnercard = 0;
    if (this.topCard.goal === "low") {
      winnercard = 99;
    }
    console.log(winnercard);
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
      this.players[winner].cards.push(this.topCard)
    }
    console.log(this.players[winner].cards);
  }

  checkCards()

}

module.exports = Game;