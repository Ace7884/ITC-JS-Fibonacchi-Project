// Milestone 1 global variables
let X = 5;
let Y = 8;
let display = document.getElementsByTagName("label")[0];

// add to Html Result
function addToHtmlY(){
  display = display.innerText += ` ${X} is ${Y}`;
}
addToHtmlY();





/*milestone 2 work in progress ignore untill posted

// takes X input outputs X's Fibonacci as Y
function fibonacciCalc(X) {
  let prevNum = X - 1;
  Y += X + prevNum;
  return Y;
}


// future milestone variables
let userInput = document.getElementById("userInput");
let button = document.getElementsByClassName("btn")[0];
let questionOutput = document.getElementById("inputResult");
*/