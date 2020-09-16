import { Common, HIDDEN_SCREEN, VISIBLE_SCREEN } from "./Common.esm.js";

const SCALE_PROPERTY = '--scale-value'
const START_SREEN_GAME_BUTTON_ID = "js-start-game";
const START_SCREEN_ID = "js-start-screen";
const START_SCREEN_SETTINGS_BUTTON_ID = "js-settings-button";

class MainMenu extends Common {
  constructor() {
    super(START_SCREEN_ID);
    this.bindToGameElements();
    window.addEventListener('resize', this.resizeGameWindow);
  }

  bindToGameElements() {
    const gameStartButton = this.bindToElement(START_SREEN_GAME_BUTTON_ID);
    const gameSetttingsButton = this.bindToElement(
      START_SCREEN_SETTINGS_BUTTON_ID
    );

    gameStartButton.addEventListener("click", this.showLevelScreen);
    gameSetttingsButton.addEventListener("click", this.showSettingScreen);
  }

  showLevelScreen() {
    console.log("nowa gra");
  }

  showSettingScreen() {
    console.log("ustawienia gry");
  }

resizeGameWindow() {
  const {innerWidth: width, innerHeight: height} = window;
  const scale = Math.min(width / 640, height / 480);

  document.documentElement.style.setProperty(SCALE_PROPERTY, scale);
}

}

export const mainMenu = new MainMenu();
