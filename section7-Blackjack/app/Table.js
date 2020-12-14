export class Table {
  constructor(dealersCards,playersCards){
    this.dealersCards = dealersCards;
    this.playersCards = playersCards;
  }

  showPlayersCard(card){
    this.playersCards.appendChild(card); 
  }

  showDealersCard(card){
    this.dealersCards.appendChild(card);
  }

}