//Milestone 5

//global variables
let output = "";
let display = document.getElementsByTagName("label")[0];
let button1 = document.querySelectorAll("button")[0];
let questionOutput = document.querySelector("strong");
let loading = true;

//on button click register Input and calculate Fibonacci
button1.addEventListener("click", registerInput);
document.getElementsByClassName("inputResult")[0].classList.add("d-none");

//Revised function to replace previous fibonacci calc and display with local server instead
function registerInput() {
  let input = document.getElementById("userInput").value;
  //Client side Validation if passes send request if not send error
  InputClientValidation(input);
}

//Function validates if user input more then 50 if it sends error instead of request
function InputClientValidation(input) {
  if (input > 50) {
    return displayY("Illegal input number cant be larger then 50");
  }
  if (input == 0 || input === "") {
    return displayY("Illegal input Please enter number between 1-50");
  }
  callServer(input);
}

//try catch to the server request in case of asking for 42

//Outsources fibonacci calc to local server
function callServer(num) {
  //activate loading indicator
  loading = true;
  loaderInsert(0);
  const url = `http://localhost:5050/fibonacci/${num}`;
  fetch(url)
    .then((response) => {
      //if 42 input display error and exit promise
      if (response.status === 400) {
        throw displayY("Server Error: 42 is the meaning of life");
      }
      return response.json();
    })
    .then((data) => {
      output = data.result;
      return displayY(output);
    });
}

//toggles loader display
function loaderInsert(index) {
  document.getElementsByClassName("inputResult")[0].classList.add("d-none");
  if (loading) {
    return document
      .getElementsByClassName("spinner-border")
      [index].classList.remove("d-none");
  }
  document
    .getElementsByClassName("spinner-border")
    [index].classList.add("d-none");
}

//Displays Fibonacci Number and timeout after awhile
function displayY(num) {
  if (isNaN(num)) {
    //if 42 entered change result to error style
    document
      .getElementsByClassName("inputResult")[0]
      .classList.add("is-invalid");
  } else {
    document
      .getElementsByClassName("inputResult")[0]
      .classList.add("resultSingleNumber");
  }
  //remove loading indicator
  loading = false;
  loaderInsert(0);
  questionOutput.innerText = `${num}`;
  document.getElementsByClassName("inputResult")[0].classList.remove("d-none");
  setTimeout(() => {
    document.getElementsByClassName("inputResult")[0].classList.add("d-none");
    document
      .getElementsByClassName("inputResult")[0]
      .classList.remove("is-invalid");
    document
      .getElementsByClassName("inputResult")[0]
      .classList.remove("resultSingleNumber");
  }, 8000);
}
