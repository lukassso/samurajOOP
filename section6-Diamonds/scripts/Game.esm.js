import { canvas } from "./Canvas.esm.js";
import { Common, VISIBLE_SCREEN } from "./Common.esm.js";
import { gameLevels } from "./gameLevels.esm.js";
import { DATA_LOADED_EVENT_NAME, loader } from "./Loader.esm.js";
import { Diamond } from "./Diamond.esm.js";
import { media } from "./Media.esm.js";



const gameState = {
  pointsToWin: 7000,
  getPlayerPoints: () => 1000,
  getLeftMovement: () => 30,
};

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
    canvas.drawGameOnCanvas(gameState);
    this.diamond.draw();
    this.animationFrame = window.requestAnimationFrame(() => this.animate());
  }
}

export const game = new Game();
