// const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
console.clear();

// array of words
let words = [
  "ABLE",
  "ABOUT",
  "ACCOUNT",
  "ACID",
  "ACROSS",
  "ACT",
  "ADDITION",
  "ADJUSTMENT",
  "ADVERTISEMENT",
  "AFTER",
  "AGAIN",
  "AGAINST",
  "AGREEMENT",
  "AIR"
];

// class called scoreboard
class scoreboard {
  constructor(
    numGuesses,
    guessesRemaining,
    score,
    word,
    wordArr,
    guess,
    guessedLetters
  ) {
    this.numGuesses = numGuesses;
    this.guessesRemaining = guessesRemaining;
    this.score = score;
    this.word = word;
    this.wordArr = wordArr;
    this.guess = guess;
    this.guessedLetters = guessedLetters;
  }
}

// let myScoreboard = new scoreboard(
//   3,
//   3,
//   400,
//   "FIZZBUZZ",
//   ["F", "I", "Z", "Z", "B", "U", "Z", "Z"],
//   ["_", "I", "Z", "Z", "_", "_", "Z", "Z"],
//   []
// );

let myScoreboard = new scoreboard(0, 6, 0, "", [], [], []);



// random word fn
const getWord = () => {
  //   get random word then set to myScoreboard.word
  myScoreboard.word = words[Math.floor(Math.random() * words.length)];
  // console.log('🪵 : ', word);
  myScoreboard.wordArr = myScoreboard.word.split("");
  // pushing the blank letters to guessed field,
  for (let i = 0; i < myScoreboard.word.length; i++) {
    myScoreboard.guess.push("_");
  }
  // console.log('🎸', myScoreboard.word);
};


//   clear/reset scoreboard
// fn clearBoard and get 'random' word from array of words
const clearBoard = () => {
  myScoreboard = new scoreboard(0, 6, 0, "", [], [], []);
  getWord();
  return myScoreboard;
};


// fn gameOver
const gameOver = () => {
  // test for win if sixth attempt
  if (myScoreboard.guessesRemaining === 0) {
    // console.log("🎈 :", myScoreboard.numGuesses, " game over");
    return true;
    // test for win if guessed letters = word
  } else if (myScoreboard.word === myScoreboard.guess.join("")) {
    // console.log("🏈 ", myScoreboard.guessedLetters.join(""));
    return true;
    // else return false, so game can resume
  } else {
    // console.log("🛹 ", myScoreboard.guessedLetters.join(""));
    return false;
  }
};



// fn to check if the user iput letter matches the WordArr & update guess and guessedLetters
const checkLetters = (letter) => {
  let arr = myScoreboard.wordArr;
  // const y = myScoreboard.guess;
  // console.log(y);
  // update guessed letters array
  myScoreboard.guessedLetters.push(letter);
  // loop through the word arrary for a match of the guessed letter
  //     and update the guesed letter in approriate position for easy display
  let isLetter = false;
  isLetter = arr.forEach((x, i) => {
    if (x === letter) {
      myScoreboard.guess[i] = x; // works with multiple instances of letter
      console.log(x, " was a correct letter");
      return true;
    } else {
      return false;
    }
  });
  // need to figure out how to test if a there was a letter  correctly 
  //    guessed to return true/fasle so we can update remaing guesses correctly
  console.log("🌭",isLetter, "🌭");
  if (isLetter === false) {
    //   update myScoreboard.guessesRemaining with GuessesRemaining - 1
    myScoreboard.guessesRemaining = myScoreboard.guessesRemaining - 1;
  };
};



// fn to print the game board, may need better looks
const printBoard = () => {
  // the printLine2 is Solely to print a hanged man
  let printLine2 = "";
  if (myScoreboard.guessesRemaining === 5) {
    printLine2 = "👨 💪 💪 🦵 🦵";
  } else if (myScoreboard.guessesRemaining === 4) {
    printLine2 = "👨 💪 💪 🦵";
  } else if (myScoreboard.guessesRemaining === 3) {
    printLine2 = "👨 💪 💪";
  } else if (myScoreboard.guessesRemaining === 2) {
    printLine2 = "👨 💪";
  } else if (myScoreboard.guessesRemaining === 1) {
    printLine2 = "👨";
  }
  console.log(myScoreboard.guess.join(" "));
  console.log(printLine2);
  console.log(
    "?#",
    myScoreboard.guessesRemaining,
    "   +=",
    myScoreboard.score,
    "⛔",
    myScoreboard.guessedLetters.join(" ")
  );
};

// fn getScore
//     calculate score
//     return score

// main game
const hangman = (guess) => {
  //   update myScoreboard.numGuesses with numGuesses + 1
  myScoreboard.numGuesses = myScoreboard.numGuesses + 1;
  // console.log("🌈", myScoreboard.guessesRemaining); // verify

  // call checLetters fn to verify letters and positions, and update class data
  checkLetters(guess);

  // call gameOver()
  if (gameOver()) {
    console.log(" Word =", myScoreboard.word);
    console.log(" ");
    console.log(" Game Over");
    console.log(" ");
    console.log(" ");
    console.log(" < <  New Game  > >");
    clearBoard();
    console.log(" ");
  } 
};

const getPrompt = () => {
  printBoard();
  rl.question("guess: ", (guess) => {
    hangman(guess);
    getPrompt();
  });
};

//     if return of checkLetters() = true
//        if myScoreboard.guessesremaining > 0
//          update myScoreboard.score to add the returned resultfrom getScore()
//          update DOM with score
//          update DOM with guessues remaining
//          update DOM to change button color

//   update myScoreboard.score with score
//   update DOM with score
//   update DOM with guessues remaining
//   update DOM hangman image
//   update DOM to change button color

clearBoard();
getPrompt();

//consoles and fn calls for testing
// getWord();
// console.log("🎰 ", myScoreboard);
// console.log('🚜 ', clearBoard());
// console.log("🙈 ", gameOver());
// let l = "B";
// console.log("🍺 ", checkLetters(l));
// console.log("✅ ", printGame());
// console.log("🌹 ", hangman());

// console.log("🏆 ", myScoreboard);


