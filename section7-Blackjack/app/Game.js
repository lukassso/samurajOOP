import { Deck } from "./Deck.js";
import { Player } from "./Player.js";
import { Table } from "./Table.js";
class Game {
  constructor({player, table, hitButton, standButton }) {
    this.hitButton = hitButton;
    this.standButton = standButton;
    this.player = player;
    this.dealer = new Player("Croupier");
    this.table = table;
    this.playersCards = playersCards;
    this.dealersCards = dealersCards;
    this.deck = new Deck();
    this.deck.shuffle();
  }

  run() {
    this.hitButton.addEventListener('click', (event) => {this.hitCard()})
    this.dealCards();
  }

  hitCard(){
    // debugger
    const card = this.deck.pickOne();
    this.player.hand.addCard(card);
    this.table.showPlayersCard(card);
  }

  dealCards() {
    for (let n = 0; n < 2; n++) {
      let card1 = this.deck.pickOne();
      this.player.hand.addCard(card1);
      // this.playersCards.appendChild(card1.render());
      this.table.showPlayersCard(card1);

      let card2 = this.deck.pickOne();
      this.dealer.hand.addCard(card2);
      // this.dealersCards.appendChild(card2.render());
      this.table.showDealersCard(card2);
      // console.log(this.player.hand.cards);
    }
  }
}

const table = new Table( 
  document.getElementById("dealersCards"),
  document.getElementById("playersCards")
)


const player = new Player("Lukas");
const game = new Game({
  hitButton: document.getElementById('hit'), 
  standButton: document.getElementById('stand'),
  player,
  table
});

game.run();
