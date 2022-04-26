//Milestone 1

//global variables
let X = 23;
let Y = 6;
let display = document.getElementsByTagName("label")[0];

//Milestone 1 functions
//Appends Y to Html
function addToHtmlY() {
  display = display.innerText += ` ${X} is ${Y}`;
}

//Milestone 2

//Milestone 2 functions
//Sets Starter fibonacci set conditionals
function fibonacciStartSet(X) {
  if (X === 0) {
    return (Y = 0);
  }
  if (X < 3 && X > 0) {
    return (Y = 1);
  }
}

//Takes X input outputs X's Fibonacci as Y
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

//Milestone 3 

//Milestone 3 global variables
let button1 = document.querySelectorAll("button")[0];
let questionOutput = document.querySelector('strong');

//Milestone 3 functions

//Register userinput to X and display Y
function registerInput() {
  X = document.getElementById("userInput").value;
  fibonacciCalc(X);
  displayY(Y);
}

//Display Fibonacci Number
function displayY(num){
  questionOutput.innerText =` ${num}`;
}

//on button click register Input and calculate Fibonacci
button1.addEventListener("click", registerInput);


