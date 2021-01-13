import { Missile } from "./Missile.js";

export class Spaceship {
  missiles = [];
  #modifier = 10;
  #leftArrow = false;
  #rightArrow = false;
  constructor(element, container) {
    this.element = element;
    this.container = container;
  }
  init() {
    // console.log('hello')
    this.#setPositon();
    this.#eventListeners();
    this.#gameLoop();
  }
  #setPositon() {
    this.element.style.bottom = "0px";
    this.element.style.left = `${
      window.innerWidth / 2 - this.#getPosition()
    }px`;
  }
  #getPosition() {
    return this.element.offsetLeft + this.element.offsetWidth / 2;
  }
  #eventListeners() {
    window.addEventListener("keydown", ({ keyCode }) => {
      switch (keyCode) {
        case 37:
          this.#leftArrow = true;
          break;
        case 39:
          this.#rightArrow = true;
          break;
      }
    });
    window.addEventListener("keyup", ({ keyCode }) => {
      switch (keyCode) {
        case 32:
          this.#shot();
          break;
        case 37:
          this.#leftArrow = false;
          break;
        case 39:
          this.#rightArrow = false;
          break;
      }
    });
  }
  #gameLoop = () => {
    this.#whatKey();
    requestAnimationFrame(this.#gameLoop);
  };
  #whatKey() {
    if (this.#leftArrow && this.#getPosition() > 12) {
      this.element.style.left = `${
        parseInt(this.element.style.left, 10) - this.#modifier
      }px`;
    } else if (this.#rightArrow & (this.#getPosition() +12  < window.innerWidth)) {
      this.element.style.left = `${
        parseInt(this.element.style.left, 10) + this.#modifier
      }px`;
    }
  }
  #shot() {
    const missile = new Missile(
      this.#getPosition(),
      this.element.offsetTop,
      this.container
    );
    missile.init();
    this.missiles.push(missile);
  }
}