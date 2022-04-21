// Milestone 1 global variables
let X = 8;
let Y = 0;
let display = document.getElementsByTagName("label")[0];

// takes X input outputs X's Fibonacci as Y
function fibonacciCalc(X) {
  let prevNum = X - 1;
  Y += X + prevNum;
  return Y;
}

// add to Html Result
function addToHtmlY(){
  fibonacciCalc(X);
  display = display.innerText += ` ${X} is ${Y}`;
}

addToHtmlY();


// future milestone variables
let userInput = document.getElementById("userInput");
let button = document.getElementsByClassName("btn")[0];
let questionOutput = document.getElementById("inputResult");
