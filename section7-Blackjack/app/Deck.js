import {Card, Types, Weights } from './Card.js'

export class Deck {
  cards = [];

  constructor(){
    Types.forEach(type => 
      Weights.forEach(weight => this.cards.push(new Card(weight, type))))

      console.log(this.cards);
  }
}
