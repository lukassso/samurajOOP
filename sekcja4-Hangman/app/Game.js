import { Quote } from "./Quote.js";

class Game {
  currentStep = 0;
  lastStep = 7;

  quotes = [
    {
      text: "lalka",
      category: "Bajki",
    },
    {
      text: "wonder",
      category: "Film",
    },
    {
      text: "pan tadeusz",
      category: "Utwór literacji",
    },
    {
      text: "pepa",
      category: "Bajki",
    },
    {
      text: "kraina lodu",
      category: "Film",
    },
  ];

  constructor({ lettersWrapper, categoryWrapper, wordWrapper, outputWrapper }) {
    this.lettersWrapper = lettersWrapper;
    this.categoryWrapper = categoryWrapper;
    this.wordWrapper = wordWrapper;
    this.outputWrapper = outputWrapper;
    // losowanie tytułu i kategorii
    const { text, category } = this.quotes[
      Math.floor(Math.random() * this.quotes.length)
    ];
    this.categoryWrapper.innerHTML = category;

    this.quote = new Quote(text);
    console.log(text);
    console.log(category);
  }

  guess(letter, event) {
    // console.log(letter);
    event.target.disabled = true;
    if (this.quote.guess(letter)) {
      this.drawQuote();
    } else {
      this.currentStep++;
      document.getElementsByClassName("step")[
        this.currentStep
      ].style.opacity = 1;
      if (this.currentStep == this.lastStep) {
        this.loosing;
      }
    }
    
  }

  drawLetters() { 
    for (let i = 0; i < 26; i++) {
      const label = (i + 10).toString(36);
      const button = document.createElement("button");
      button.innerHTML = label;
      button.addEventListener("click", (event) => this.guess(label, event));
      this.lettersWrapper.appendChild(button);
    }
  }

  drawQuote() {
    const content = this.quote.getContent();
    this.wordWrapper.innerHTML = content;
    if (!content.includes("_")) {
      this.winning();
    }
  }

  start() {
    document.getElementsByClassName("step")[this.currentStep].style.opacity = 1;

    // wywołanie liter z alfabetu
    // const label = (11).toString(36);
    // console.log(label)
    this.drawLetters();
    this.drawQuote();
  }

  winning() {
    this.wordWrapper.innerHTML = "gratulacje, wygrywasz";
    this.lettersWrapper.innerHTML = "";
  }
  loosing() {
    this.wordWrapper.innerHTML = "niestety, przegrywasz";
    this.lettersWrapper.innerHTML = "";
  } 
}

const game = new Game({
  lettersWrapper: document.getElementById("letters"),
  categoryWrapper: document.getElementById("category"),
  wordWrapper: document.getElementById("word"),
  outputWrapper: document.getElementById("output"),
});
game.start();
