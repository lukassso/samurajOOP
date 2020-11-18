import { Diamond } from "./Diamond.esm.js";

export class GameState {
  constructor(level, leftMovement, pointsToWin, diamonds, diamondsSpriteImage) {
    let _leftMovement = leftMovement;
    let _playerScores = 0;
    let _gameBoard = diamonds.map((diamond) => new Diamond({ diamondsSpriteImage, ...diamond }));
    let _isSwaping = false;
    let _isMoving = false;
    this._pointsToWin = pointsToWin;
    this._level = level;

    this.getLeftMovement = () => _leftMovement;
    this.decreasePointsMovement = () => _leftMovement--;
    this.increasePointsMovement = () => _leftMovement++;

    this.getPlayerPoints = () => _playerScores;
    this.increasePlayerPoints = (points) => (_playerScores += points);
    
    this.getSwaping = () => _isSwaping
    this.setSwaping = value => _isSwaping = value
    this.getIsMoving = () => _isMoving;
    this.setIsMoving = value => _isMoving = value 

    this.isPlayerWinner = () => _playerScores >= this._pointsToWin;
    this.getGameBoard = () => _gameBoard;
  }

  get level() {
    return this._level;
  }

  get pointsToWin() {
    return this._pointsToWin;
  }
}
