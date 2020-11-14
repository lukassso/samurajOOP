import { Common, HIDDEN_SCREEN, VISIBLE_SCREEN } from "./Common.esm.js";

const LOADER_ELEMENT_ID = "js-loading-screen";
const LOAD_CURRENT_ID = "js-loading-screen-current";
const LOAD_TOTAL_ID = "js-loading-screen-total";

export const DATA_LOADED_EVENT_NAME = "data-loaded";
class Loader extends Common {
  constructor() {
    super(LOADER_ELEMENT_ID);
    this.bindToElements();
    this.clearFlags();
  }

  bindToElements() {
    this.currentElement = this.bindToElement(LOAD_CURRENT_ID);
    this.totalElement = this.bindToElement(LOAD_TOTAL_ID);
  }

  loadImage(imageURL) {
    this.changeVisibilityScreen(this.element, VISIBLE_SCREEN);
    this.isAllLoaded = false;
    this.totalCounter++;
    this.totalElement = this.totalCounter;
    const image = new Image();

    image.src = imageURL;
    image.addEventListener("load", (event) => this.itemLoaded(event), false);

    return image;
  }

  itemLoaded(event) {
    event.target.removeEventListener(event.type, this.itemLoaded, false);
    this.loadedCounter++;
    this.currentElement.textContent = this.loudedCounter;

    if (this.loadedCounter === this.totalCounter) {
      this.clearFlags();
      this.changeVisibilityScreen(this.element, HIDDEN_SCREEN);
      window.dispatchEvent(new CustomEvent(DATA_LOADED_EVENT_NAME));
    }
  }

  clearFlags() {
    this.isAllLoaded = true;
    this.loadedCounter = 0;
    this.totalCounter = 0;
    // this.clearFlags = false;
  }
}

export const loader = new Loader();