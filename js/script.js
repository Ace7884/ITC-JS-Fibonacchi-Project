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
  Y = 0;
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
  //replaced with recursion function 
  fibonacciCalcRecursion(X)
  displayY(Y);
  setTimeout(() => {
    document.getElementsByClassName('inputResult')[0].classList.add('d-none');
  }, 5000);
  Y=0;
}

//Display Fibonacci Number
function displayY(num){
  questionOutput.innerText =` ${num}`;
  document.getElementsByClassName('inputResult')[0].classList.remove('d-none');
  
  
}

//on button click register Input and calculate Fibonacci
button1.addEventListener("click", registerInput);

// document.getElementsByClassName('inputResult')[0].classList.add('d-none');


//Milestone 3* recursion version for calc instead

function fibonacciCalcRecursion(X){

  if (X > 0 && X < 3 ) {
    return (Y = 1);
  }
  if (X === 0) {
    return (Y = 0);
  }
    Y = fibonacciCalcRecursion(X-1)+fibonacciCalcRecursion(X-2) ;
  return Y;
}

//Milestone 4

