export class Quote {
  constructor(text) {
    this.text = text;
    this.guessed =[];
  }

  // getContent() {
  //   let content = " ";
  //   for (const char of this.text) {
  //     if (char !== " ") {
  //       content += "__  ";
  //     } else {
  //       content += " ";
  //     }
  //   }
  //   return content;
  // }
  
  getContent() {
    let content = " ";
    for (const char of this.text) {
      if (char == " " || this.guessed.includes(char)) {
        content += char;
      } else {
        content += "__ ";
      }
    }
    return content;
  }

  guess(letter) {
    if (!this.text.includes(letter)){
      return false;
    } 
    this.guessed.push(letter)
      return true;
    
  }
}
