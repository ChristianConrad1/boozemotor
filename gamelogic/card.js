class Card {
  constructor(name, goal, quantity_needed, quantity_total, text) {
    this.name = name;
    this.goal = goal;
    this.quantity_needed = quantity_needed;
    this.quantity_total = quantity_total;
    this.text = text;
  }
}

module.exports = Card;