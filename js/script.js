// Milestone 1 global variables
let X = 23;
let Y = 6;
let display = document.getElementsByTagName("label")[0];

// Appends Y to Html
function addToHtmlY() {
  display = display.innerText += ` ${X} is ${Y}`;
}


//milestone 2
//starter fibonacci set conditionals
function fibonacciStartSet(X) {
  if (X === 0) {
    return (Y = 0);
  }
  if (X < 3 && X > 0) {
    return (Y = 1);
  }
}

// takes X input outputs X's Fibonacci as Y
function fibonacciCalc(X) {
  Y = 1;
  let numSum = 0;
  let currentNum = 1;
  let secondNum = 1;

  fibonacciStartSet(X);

  for (let i = 2; i < X; i++) {
    numSum = currentNum + secondNum;
    Y = numSum;
    secondNum = currentNum;
    currentNum = numSum;
  }
  return Y;
}

fibonacciCalc(X);
addToHtmlY();

// future milestone variables
let userInput = document.getElementById("userInput");
let button = document.getElementsByClassName("btn")[0];
let questionOutput = document.getElementById("inputResult");
