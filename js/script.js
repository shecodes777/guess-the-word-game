const guessedLetterElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const numberRemainingGuesses = document.querySelector(".current-number");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  message.innerText = "";
  const input = inputLetter.value;
  const validateGuess = validateInput(input);

  if (validateGuess) {
    makeGuess(input);
  }

  inputLetter.value = "";
});

const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;

  if (input.length === 0) {
    message.innerText = `Please enter a letter`;
  } else if (input.length > 1) {
    message.innerText = `You can only enter one letter`;
  } else if (!input.match(acceptedLetter)) {
    message.innerText = `You can only type in a letter from A-Z.`;
  } else {
    return input;
  }
};

const makeGuess = function (letter) {
  letter = letter.toUpperCase();

  if (guessedLetters.includes(letter)) {
    message.innerText = `You have already guessed that letter. Please try again.`;
  } else {
    guessedLetters.push(letter);
    console.log(guessedLetters);
    guessesDisplayed();
    updateWordInProgress(guessedLetters);
  }
};

const guessesDisplayed = function () {
  guessedLettersDisplay.innerText = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersDisplay.append(li);
  }
  // guessedLetters
};
// guessedLettersDisplay

const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];

  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter);
      message.innerText = `Good guess`;
    } else {
      revealWord.push("●");
      message.innerText = `Try another word`;
    }
  }
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};

const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    message.classList.add("win");
  }
};
