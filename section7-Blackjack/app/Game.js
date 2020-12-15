import { Deck } from "./Deck.js";
import { Player } from "./Player.js";
import { Table } from "./Table.js";
class Game {
  constructor({player, table, dealerPoints, playerPoints, hitButton, standButton }) {
    this.hitButton = hitButton;
    this.standButton = standButton;
    this.dealerPoints = dealerPoints;
    this.playerPoints = playerPoints;
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
    this.standButton.addEventListener('click', (event) => this.dealerPlays())
    this.dealCards();
  }

  hitCard(){
    // debugger
    const card = this.deck.pickOne();
    this.player.hand.addCard(card);
    this.table.showPlayersCard(card);
  this.playerPoints.innerHTML = this.player.calculatePoints();

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

  this.playerPoints.innerHTML = this.player.calculatePoints();
  this.dealerPoints.innerHTML = this.dealer.calculatePoints();

  }

dealerPlays() {
  while (this.dealer.points <= this.player.points && this.dealer.points <= 21 && this.player.points <=21){
    const card = this.deck.pickOne();
    this.dealer.hand.addCard(card);
    this.table.showDealersCard(card);
    this.dealerPoints.innerHTML = this.dealer.calculatePoints();
  }
}

}

const table = new Table( 
  document.getElementById("dealersCards"),
  document.getElementById("playersCards")
)

const player = new Player("Lukas");

const game = new Game({
  playerPoints: document.getElementById('playerPoints'),
  dealerPoints: document.getElementById('dealerPoints'),
  hitButton: document.getElementById('hit'), 
  standButton: document.getElementById('stand'),
  player,
  table
});

game.run();
