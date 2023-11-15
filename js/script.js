const guessedLettersDisplay = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const inputLetter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const totalRemainingGuesses = document.querySelector(".remaining");
const currentNumber = document.querySelector(".current-number");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
  const medium = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const convertMedium = await medium.text();
  const array = convertMedium.split("\n");
  const random = Math.floor(Math.random() * array.length);
  word = array[random].trim();
  placeholder(word);
};

getWord();

const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    // console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

// placeholder(word);

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

const makeGuess = function (input) {
  input = input.toUpperCase();

  if (guessedLetters.includes(input)) {
    message.innerText = `You have already guessed that letter. Please try again.`;
  } else {
    guessedLetters.push(input);
    console.log(guessedLetters);
    updateRemainingGuesses(input);
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
};

const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealWord = [];

  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter);
    } else {
      revealWord.push("●");
    }
  }
  wordInProgress.innerText = revealWord.join("");
  checkIfWin();
};

const updateRemainingGuesses = function (input) {
  const upperWord = word.toUpperCase();
  if (upperWord.includes(input)) {
    message.innerText = `Good guess`;
  } else {
    message.innerText = `Wrong guess. Please try again`;
    remainingGuesses -= 1;
  }

  if (remainingGuesses === 0) {
    currentNumber.innerText = `no guesses`;
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    startOver();
  } else if (remainingGuesses > 1) {
    currentNumber.innerText = `${remainingGuesses} guesses`;
  } else if (remainingGuesses === 1) {
    currentNumber.innerText = ` 1 guess`;
  }
};

const checkIfWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    message.classList.add("win");
    startOver();
  }
};

const startOver = function () {
  guessButton.classList.add("hide");
  guessedLettersDisplay.classList.add("hide");
  totalRemainingGuesses.classList.add("hide");
  playAgain.classList.remove("hide");
};

playAgain.addEventListener("click", function () {
  message.innerText = "";
  remainingGuesses = 8;
  currentNumber.innerHTML = `${remainingGuesses} guesses`;
  guessedLetters = [];
  wordInProgress.innerText = "";
  guessedLettersDisplay.innerText = "";
  message.classList.remove("win");
  getWord();

  guessButton.classList.remove("hide");
  guessedLettersDisplay.classList.remove("hide");
  totalRemainingGuesses.classList.remove("hide");
  playAgain.classList.add("hide");
});
