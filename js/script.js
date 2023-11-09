const guessedLetterElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const numberRemainingGuesses = document.querySelector(".current-number");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";

const placeholder = function () {
  const placeholderLetters = [];
  for (const letter of word) {
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder();

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  const press = inputLetter.value;
  console.log(press);
  inputLetter.value = "";
});
