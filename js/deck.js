
class Deck {
  #cardsImages = [
    "./citrus1.png",
    "./citrus2.png",
    "./citrus3.png",
    "./citrus4.png",
    "./citrus5.png",
    "./citrus6.png",
    "./citrus7.png",
    "./citrus8.png",
    "./citrus9.png",
    "./citrus10.png",
    "./citrus11.png",
    "./citrus12.png",
  ];

  constructor() {
    this.cards = [];
    this.#cardsImages.forEach((image) => {
      this.cards.push(new Card(image));
      this.cards.push(new Card(image));
    });
  }

  shuffle() {
    this.cards.sort(() => Math.random() - 0.5);
  }

  removeCard(card) {
    let index = this.cards.findIndex(
      (item) => item.imagePath == card.imagePath
    );
    if (index != -1) {
      this.cards.splice(index, 1);
      card.disconectFromDOM();
    }
  }
}
