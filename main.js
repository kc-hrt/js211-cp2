// // const assert = require('assert');
// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
console.clear();

// array of words
let words = [
  "CABOOSE",
  "WAGON",
  "HORSE",
  "CALIFORNIA",
  "BADLANDS",
  "BUCKAROO",
  "CHAPS",
  "COWBOY",
  "COWGIRL",
  "DUDE",
  "RANCH",
  "GOLDMINE",
  "STAGECOACH",
  "WEST",
  "WRANGLER",
  "PLAINS",
  "OREGON",
  "FRONTIER",
  "RAILWAY",
  "BUFFALO",
  "MISSION",
  "OUTLAWS",
  "GUNSLINGER",
  "PONEER",
  "GREENHORN",
  "HASS",
  "SALOON",
  "WHISKEY",
  "RAILROAD",
  "TERRITORY",
  "HOMESTEAD",
  "RODEO",
  "TRAIL",
  "TOWN",
  "CORRAL",
  "LASSO",
  "BANDANA",
  "SHERIFF",
  "CAMPFIRE",
  "WRANGLER",
  "JEANS",
  "COWPOKE",
  "COYOTE",
  "KNIFE",
  "GUN",
  "STAMPEDE",
  "LEATHER",
  "SETTLEMENT",
  "LONGHORN",
  "WILD",
  "RATTLELSNAKE",
  "MUSTANG",
  "BUCKAROO",
  "INDIANS",
  "BRONCO",
  "OUTLAWS",
  "HUCKLEBERRY"
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
    guessedLetters,
    isCorrect
  ) {
    this.numGuesses = numGuesses;
    this.guessesRemaining = guessesRemaining;
    this.score = score;
    this.word = word;
    this.wordArr = wordArr;
    this.guess = guess;
    this.guessedLetters = guessedLetters;
    this.isCorrect = isCorrect;
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

let myScoreboard = new scoreboard(0, 6, 0, "", [], [], [], false);



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
  console.log('🎸', myScoreboard.word);
};


//   clear/reset scoreboard
// fn clearBoard and get 'random' word from array of words
const clearBoard = (clearDOM) => {
  myScoreboard = new scoreboard(0, 6, 0, "", [], [], [], false);
  getWord();

  // Update DOM to reset button color, if a true was passed thorugh the parameter
  // in the html the onClick=clearBoard(true)
  // this is to not interfere with terminal game 
  if (clearDOM === true) {
    // update button color in CSS (or maybe refresh window)
    // location.reload()
    
    document.getElementById('hangmanPic').src = './img/start.png';
    // clickedBtnStyles();
    updateHTML();
    let playerGuesses = document.getElementById('guessedLetters');
    playerGuesses.innerText = myScoreboard.guess.join(' ');
  };

};

// fn gameOver
const gameOver = () => {
  // test for win if sixth attempt
  if (myScoreboard.word === myScoreboard.guess.join("")) {
    // console.log("🏈 ", myScoreboard.numGuesses);
    document.getElementById('hangmanPic').src = './img/win.png'
    return true;
    // else return false, so game can resume
  } else if (myScoreboard.guessesRemaining === 0) {
    // console.log("🎈 :", myScoreboard.numGuesses, " game over");
    document.getElementById('hangmanPic').src = './img/gameOver.png'
    return true;
    // test for win if guessed letters = word
  } else {
    // console.log("🛹 ", myScoreboard.guessedLetters.join(""));
    return false;
  }
};



// fn to check if the user iput letter matches the WordArr & update guess and guessedLetters
const checkLetters = (letter) => {
  myScoreboard.isCorrect = false // initialize to false by default
  // update guessed letters array
  myScoreboard.guessedLetters.push(letter);
  // loop through the word arrary for a match of the guessed letter
  //     and update the guesed letter in approriate position for easy display
  // const isValue = 
  myScoreboard.wordArr.forEach((x, i) => {
    if (x === letter) {
      myScoreboard.guess[i] = x; // works with multiple instances of letter
      myScoreboard.isCorrect = true;
    }
  });

  // need to figure out how to test if a there was a letter  correctly 
  //    guessed to return true/fasle so we can update remaing guesses correctly
  // console.log("🌭",myScoreboard.isCorrect , "🌭");
  // console.log();
  if (myScoreboard.isCorrect === false) {
    //   update myScoreboard.guessesRemaining with GuessesRemaining - 1
    myScoreboard.guessesRemaining = myScoreboard.guessesRemaining - 1;
    console.log('🌵', myScoreboard.guessesRemaining)
    document.getElementById('hangmanPic').src = './img/' + myScoreboard.guessesRemaining + '-remain.png';
  };
};



// fn to print the game board, may need better looks
const printBoard = () => {
  // the printLine2 is Solely to print a hanged man
  let printLine2 = "";
  if (myScoreboard.guessesRemaining === 1) {
    printLine2 = "👨 💪 💪 🦵 🦵";
  } else if (myScoreboard.guessesRemaining === 2) {
    printLine2 = "👨 💪 💪 🦵";
  } else if (myScoreboard.guessesRemaining === 3) {
    printLine2 = "👨 💪 💪";
  } else if (myScoreboard.guessesRemaining === 4) {
    printLine2 = "👨 💪";
  } else if (myScoreboard.guessesRemaining === 5) {
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

// fn to update DOM
const updateHTML = () => {
  // set the innerHTML of that element to the guessedLetters of myScoreboard
  let playerGuesses = document.getElementById('guessedLetters');
  playerGuesses.innerText = myScoreboard.guess.join(' ');
};

// main game
const hangman = (guess) => {
  //   update myScoreboard.numGuesses with numGuesses + 1
  myScoreboard.numGuesses = myScoreboard.numGuesses + 1;
  // console.log("🌈", myScoreboard.guessesRemaining); // verify
  guess = guess.toUpperCase();
  if (guess.length > 1) {
    console.log('womp wamp, please try again');
    return 'please try again'
  }
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
    // clearBoard();
    
    console.log(" ");
  } 
  
};


// commented out code for console, due to readline code breaking the gui
//
// const getPrompt = () => {
//   printBoard();
//   rl.question("guess: ", (guess) => {
//     hangman(guess);
//     getPrompt();
//   });
// };


// on btnClick function from the DOM
const btnClick = (guess) => {
 
  hangman(guess);
  if (gameOver()) {
    let playerGuesses = document.getElementById('guessedLetters');
    playerGuesses.innerText = myScoreboard.wordArr.join(' ');
  } else {
    updateHTML();
  }
};


// function to update button styles after it has been clicked
const clickedBtnStyles = () => {
  // target all buttons with the class letterBtns (returns an HTMLcollection)
  // turn the collection into an array to be able to loop through the buttons
  let letterBtns = document.querySelectorAll('.letterBtn');
  let letterBtnsArr = Array.from(letterBtns);
  
  // loop through the array and add a click event listener to each of them
  letterBtnsArr.forEach((button) => {
    button.addEventListener('click', clickedBtn);
  })
  
  // the function to run on click and update button styles
  function clickedBtn() {
    this.style.backgroundColor = '#e41518';
    this.style.color = 'rgba(0, 0, 0, 0.493)';
    this.classList.remove('hoverClass');
  }
}

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

getWord();
// getPrompt(); // used for console game
// btnClick(); // might be needed for scoreboard, but it also might interfere 

//consoles and fn calls for testing
// getWord();
// console.log("🎰 ", myScoreboard);
// console.log('🚜 ', getWord());
// console.log("🙈 ", gameOver());
// let l = "B";
// console.log("🍺 ", checkLetters(l));
// console.log("✅ ", printGame());
// console.log("🌹 ", hangman());

// console.log("🏆 ", myScoreboard);


