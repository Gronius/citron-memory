
class GameManager {
  #boardElement;
  #scoreElement;
  #deck = new Deck();
  #firstCard = null;
  #secondCard = null;
  #attemptNumber = 0;

  constructor(board, score) {
    if (typeof board === "string") {
      this.#boardElement = document.querySelector(board);
    } else {
      this.#boardElement = board;
    }

    if (typeof score === "string") {
      this.#scoreElement = document.querySelector(score);
    } else {
      this.#scoreElement = score;
    }
  }

  startGame() {
    this.attemptNumber = 0;
    this.#deck = new Deck();
    this.#boardElement.innerHTML = "";
    this.shuffleAndDeal();
  }

  shuffleAndDeal() {
    this.#deck.shuffle();
    this.#deck.cards.forEach((card) => {
      this.#boardElement.append(card.element);
    });
  }

  selectCard(card) {
    if (card == this.#firstCard) return; // якщо картку клацнути другий раз, далі метод не виконується
    card.flip(); // перевертаємо картку

    // якщо в двох полях є значення, то попередні два не співпали
    // перевертаємо їх сорочкою догори
    if (this.#firstCard && this.#secondCard) {
      this.#firstCard.flip();
      this.#secondCard.flip();

      this.#firstCard = this.#secondCard = null;
    }

    // Якщо вибрано одну картку, запам'ятовуємо її та знаходимо другу
    if (this.#firstCard == null) {
      this.#firstCard = card;
    } else if (this.#secondCard == null) {
      this.attemptNumber++;
      this.#secondCard = card;

      // Якщо знайдено картки з однаковим зображенням
      if (this.#firstCard.imagePath === card.imagePath) {
        this.#deck.removeCard(this.#firstCard); 
        this.#deck.removeCard(this.#secondCard);

        this.#firstCard = this.#secondCard = null;
      }
    }
  }

  get attemptNumber() {
    return this.#attemptNumber;
  }

  set attemptNumber(value) {
    this.#attemptNumber = value;
    this.#scoreElement.innerHTML = value;
  }
}
