//Milestone 4

//global variables
let output = "";
let display = document.getElementsByTagName("label")[0];
let button1 = document.querySelectorAll("button")[0];
let questionOutput = document.querySelector("strong");

//on button click register Input and calculate Fibonacci
button1.addEventListener("click", registerInput);
document.getElementsByClassName("inputResult")[0].classList.add("d-none");

//Revised function to replace previous fibonacci calc and display to local server execution
function registerInput() {
  let input = document.getElementById("userInput").value;
  //server doesnt accept zero thus condition it
  if (input == 0) {
    displayY(0);
  } else {
    //replace calc to local server
    callServer(input);
  }
}

//function that outsources fibonacci calc to local server
function callServer(num) {
  const url = `http://localhost:5050/fibonacci/${num}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      output = data.result;
      displayY(output);
    });
}

//Displays Fibonacci Number and timeout after awhile
function displayY(num) {
  questionOutput.innerText = `${num}`;
  document.getElementsByClassName("inputResult")[0].classList.remove("d-none");
  setTimeout(() => {
        document.getElementsByClassName('inputResult')[0].classList.add('d-none');
      }, 8000);
}
