import { canvas } from "./Canvas.esm.js";
import { Common, VISIBLE_SCREEN } from "./Common.esm.js";
import { gameLevels } from "./gameLevels.esm.js";
import { DATA_LOADED_EVENT_NAME } from "./Loader.esm.js";
import { Diamond } from "./Diamond.esm.js";
import { media } from "./Media.esm.js";
import { GameState } from "./GameState.esm.js";
import { mouseController } from "./MouseController.esm.js";

const DIAMONDS_ARRAY_WIDTH = 8;
const DIAMONDS_ARRAY_HEIGHT = DIAMONDS_ARRAY_WIDTH + 1;
const SWAPING_SPEED = 8;

// const gameState = {
//   pointsToWin: 7000,
//   getPlayerPoints: () => 1000,
//   getLeftMovement: () => 30,
// };

class Game extends Common {
  constructor() {
    super();
  }

  playLevel(level) {
    const levelInfo = gameLevels[level - 1];
    window.removeEventListener(DATA_LOADED_EVENT_NAME, this.playLevel);
    this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);
    this.diamond = new Diamond(50, 50, 1, 1, 2, media.diamondsSprite);
    this.animate();
  }

  animate() {
    // console.log('Lets game')
    this.handleMouseState();
    this.handleMouseClick();
    this.moveDiamonds()
    canvas.drawGameOnCanvas(this.gameState);
    this.diamond.draw();
    this.animationFrame = window.requestAnimationFrame(() => this.animate());
  }

  handleMouseState() {
    const isSwaping = !this.gameState.getIsSwaping();
    const isMoving = !this.gameState.getIsMoving();

    if (mouseController.clicked && isSwaping && isMoving) {
      mouseController.state++;
    }
  }

  handleMouseClick() {
    if (!mouseController.clicked) {
      returnn;
    }

    const xClicked = Math.floor(
      (mouseController.x - GAME_BOARD_X_OFFSET) / DIAMOND_SIZE
    );
    const yClicked = Math.floor(
      (mouseController.y - GAME_BOARD_Y_OFFSET) / DIAMOND_SIZE
    );

    if (
      !yClicked ||
      xClicked >= DIAMOND_ARRAY_WIDTH ||
      yClicked >= DIAMONDS_ARRAY_HEIGHT
    ) {
      mouseController.state = 0;

      return;
    }

    if (mouseController.state === 1) {
      mouseController.firstClick = {
        x: xClicked,
        y: yClicked,
      }
    } else if (mouseController.state === 2){
      mouseController.secondClick = {
        x: xClicked,
        y: yClicked,
      }

        mouseController.state = 0;

      if(
        Math.abs(mouseController.firstClick.x - mouseController.secondClick.x) +
        Math.abs(mouseController.firstClick.y - mouseController.secondClick.y) !==
        1
        ){

        return
      }

      this.swapDiamonds();

      this.gameState.setIsSwaping(true);
      this.gameState.decreasePointsMovement();
      mouseController.state = 0;
    } 

    mouseController.clicked = false
  }

  swapDiamonds() {
    const firstDiamond = mouseController.firstClick.y * DIAMONDS_ARRAY_WIDTH + mouseController.firstClick.x
    const secondDiamond = mouseController.secondClick.y * DIAMONDS_ARRAY_WIDTH + mouseController.secondClick.x
  
    this.swap(this.gameState.getGameBoard()[firstDiamond], this.gameState.getGameBoard()[secondDiamond])

  }

  moveDiamonds() {
    this.gameState.setIsMoving(false);
    this.gameState.getGameBoard().forEach(diamond => {
      let dx;
      let dy;

      for(let speedSwap = 0; speedSwap < SWAPING_SPEED; speedSwap++){
        dx = diamond.x - diamond.row * DIAMOND_SIZE;
        dy = diamond.y - diamond.column * DIAMOND_SIZE;

        if(dx) {
          diamond.x = dx/Math.abs(dx);
        }

        if (dy){
          diamond.y = dy/Math.abs(dy);
        }
      }
      if(dx || dy ){
        this.gameState.setIsMoving(true);
      }
       
    })
  }

  revertSwap() {
    if(this.gameState.getIsSwaping() && !this.gameState.getIsMoving()){
      // if(!this.scores){
        // this.swapDiamonds();
        // this.gameState.increasePointsMovement();
      // }
      this.gameState.setIsSwaping(false);
    }
  }

  swap(firstDiamond, secondDiamond) {
    [
       firstDiamond.kind,
       firstDiamond.alpha,
       firstDiamond.match,
       firstDiamond.x,
       firstDiamond.y,
       secondDiamond.kind,
       secondDiamond.alpha,
       secondDiamond.match,
       secondDiamond.x,
       secondDiamond.y,
    ] = [
       secondDiamond.kind,
       secondDiamond.alpha,
       secondDiamond.match,
       secondDiamond.x,
       secondDiamond.y,
       firstDiamond.kind,
       firstDiamond.alpha,
       firstDiamond.match,
       firstDiamond.x,
       firstDiamond.y,
    ];

    this.gameState.setIsMoving(true);

  }
}

export const game = new Game();
