import { canvas } from "./Canvas.esm.js";
import { Common, VISIBLE_SCREEN } from "./Common.esm.js";
import { gameLevels } from "./gameLevels.esm.js";
import { DATA_LOADED_EVENT_NAME, loader } from "./Loader.esm.js";
import { Diamond } from "./Diamond.esm.js";
import { media } from "./Media.esm.js";

export const GAME_BOARD_X_OFFSET = 40;
export const GAME_BOARD_Y_OFFSET = 20;

const gameState = {
  pointsToWin: 70000,
  getPlayerPoints: () => 1000,
  getLeftMovement: () => 30,
};

class Game extends Common {
  constructor() {
    super();
  }

  playLevel(level) {
    window.removeEventListener(DATA_LOADED_EVENT_NAME, this.playLevel);
    const levelInfo = gameLevels[level - 1];
    this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);
    this.diamond = new Diamond(50, 50, 1, 1, media.diamondsSprite);
    this.animate();
  }

  animate() {
    // console.log('Lets game')
    canvas.drawGameOnCanvas(gameState);
    this.diamond.draw();
    this.animationFrame = window.requestAnimationFrame(() => this.animate());
  }
}

export const game = new Game();
