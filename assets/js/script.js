// Game variables
let wins = 0;
let losses = 0;
let timeLeft = 10;
let isGameRunning = false;
let timerInterval = null;
let currentWord = '';
let wordDisplay = '';

// Word list
const words = ['apple', 'banana', 'cherry', 'grape', 'orange'];

// DOM elements
const startButton = document.getElementById('startButton');
const wordDisplayElement = document.getElementById('wordDisplay');
const timerElement = document.getElementById('timeLeft');
const winCountElement = document.getElementById('winCount');
const lossCountElement = document.getElementById('lossCount');
const guessInputElement = document.getElementById('guessInput');

// Start the game when the Start Game button is clicked
startButton.addEventListener('click', startGame);

// Initialize the game

function startGame() {
  isGameRunning = true;
  timeLeft = 60;
  timerElement.textContent = timeLeft;
  guessInputElement.value = '';
  guessInputElement.disabled = false;
  guessInputElement.focus();

  currentWord = getRandomWord();
  wordDisplay = '_ '.repeat(currentWord.length);
  
  // Select a random letter from the current word
  const randomIndex = Math.floor(Math.random() * currentWord.length);
  const randomLetter = currentWord[randomIndex];
  
  // Replace one underscore in the word display with the random letter
  wordDisplay = wordDisplay.substr(0, randomIndex) + randomLetter + wordDisplay.substr(randomIndex + 1);
  
  wordDisplayElement.textContent = wordDisplay;

  timerInterval = setInterval(updateTimer, 1000);
}


// Get a random word from the words array
function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// Update the timer
function updateTimer() {
  timeLeft--;
  timerElement.textContent = timeLeft;

  if (timeLeft <= 0) {
    endGame(false);
    clearInterval(timerInterval); // Stop the timer interval
  }
}


// Check if the guessed letter is correct
function checkGuess() {
  const guess = guessInputElement.value.toLowerCase();

  if (guess.length === 1) {
    let newWordDisplay = '';

    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i] === guess) {
        newWordDisplay += guess;
      } else {
        newWordDisplay += wordDisplay[i];
      }
    }

    if (newWordDisplay === wordDisplay) {
      timeLeft--;
      timerElement.textContent = timeLeft;
    } else {
      wordDisplay = newWordDisplay;
      wordDisplayElement.textContent = wordDisplay;

      if (wordDisplay === currentWord) {
        endGame(true);
      }
    }

    guessInputElement.value = '';
  }
}

// End the game
function endGame(isWin) {
  isGameRunning = false;
  clearInterval(timerInterval);
  guessInputElement.disabled = true;

  if (isWin) {
    wins++;
    winCountElement.textContent = wins;
    wordDisplayElement.textContent = 'Congratulations! You won!';
  } else {
    losses++;
    lossCountElement.textContent = losses;
    wordDisplayElement.textContent = 'Time ran out! You lost.';
  }
  clearInterval(timerInterval); // Stop the timer interval
}


// Capture key press events
guessInputElement.addEventListener('keyup', function(event) {
  if (isGameRunning) {
    checkGuess();
  }
});




