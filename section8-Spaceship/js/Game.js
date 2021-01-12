import { Spaceship } from "./Spaceship.js";
import {Enemy} from './Enemy.js';

class Game {
  #htmlElements = {
    spaceship: document.querySelector("[data-spaceship]"),
    container: document.querySelector("[data-container]"),
  };
  #ship = new Spaceship(
    this.#htmlElements.spaceship,
    this.#htmlElements.container
  );

  #enemies = [];
  #enemiesInterval = null;
  #checkPositionInterval = null;
  #createEnemyInterval = null;

  init() {
    this.#ship.init();
    this.#newGame();
  } 
 
  #newGame() {
    this.#enemiesInterval = 30;
    this.#createEnemyInterval = setInterval(()=> this.#createNewEnemy(), 1000)
    this.#checkPositionInterval = setInterval(() => this.#checkPosition(), 1)
  }

  #createNewEnemy() {
    const enemy = new Enemy(
      this.#htmlElements.container, this.#enemiesInterval, 'enemy'
    );
    enemy.init();
    this.#enemies.push(enemy);
  }

  #checkPosition() {
    this.#enemies.forEach((enemy, missileIndex, enemiesArr) => {
      const enemyPosition = {
        top: enemy.element.offsetTop,
        right: enemy.element.offsetLeft + enemy.element.offsetWidth,
        bottom: enemy.element.offsetTop + enemy.element.offsetHeight,
        left: enemy.element.offsetLeft,
      };
      if (enemyPosition.top > window.innerHeight) {
        enemy.remove();
        enemiesArr.splice(enemyIndex, 1)
      }
    });
  }
}


window.onload = function () {
  const game = new Game();
  game.init();
};
