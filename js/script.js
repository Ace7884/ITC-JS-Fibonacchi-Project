//Milestone 5

//global variables
let inputField = document.querySelector("input");
let button1 = document.querySelectorAll("button")[0];
let questionOutput = document.querySelector("strong");
let errorBubble = document.getElementById("errorMessage");

//Status variables
let loading = true;
let active = false;
let errorActivate = true;
let output = "";
let error = "";
let responseStatus = "";

//Registers Input and sends to Validation
button1.addEventListener("click", registerInput);
document.getElementsByClassName("inputResult")[0].classList.add("d-none");

//Sends user input to be validated
function registerInput() {
  let input = document.getElementById("userInput").value;
  //Client side Validation if passes send request if not send error
  InputClientValidation(input);
}

//ClientSideValidation if passes send to server as request if not display error
function InputClientValidation(input) {
  if (input > 50 || input == 0 || input === "") {
    document.getElementById("errorMessage").classList.remove("d-none");
    errorActivate = true;
    toggleInputError();
  }
  if (input > 50) {
    throw (errorBubble.innerText = "Can't be larger then 50");
  }
  if (input == 0 || input === "") {
    throw (errorBubble.innerText = "Must be between 1-50");
  }
  callServer(input);
}

//Outsources fibonacci calc to local server and display to user
function callServer(num) {
  //activate loading indicator
  loading = true;
  loaderInsert(0);
  const url = `http://localhost:5050/fibonacci/${num}`;
  fetch(url)
    .then((response) => {
      //check for server error and process either to json if ok or to a text if not
      if (response.status === 400) {
        //store status for further usage and store response text in error variable thrown to catch
        responseStatus = 400;
        error = response.text();
        throw error;
      }
      return response.json();
    })
    .then((data) => {
      output = data.result;
      displayY(output);
    })
    //catch error variable and pass over to displaying to resolve promise pending status
    .catch((errorResponse) => {
      return error;
    })
    //display server error
    .then((displayError) => {
      //Last check to block error code to run if no server error detected and update status indicator
      if (responseStatus === 400) {
        displayY(displayError);
        responseStatus = "";
      }
      return;
    });
}

//Displays Fibonacci Number
function displayY(num) {
  //if 42 entered change result to error style
  if (isNaN(num)) {
    questionOutput.setAttribute("style", "color:var(--invalid-color1)");
  } else {
    document
      .getElementsByClassName("inputResult")[0]
      .classList.add("resultSingleNumber");
  }
  //remove loading indicator
  loading = false;
  loaderInsert(0);
  //display result
  questionOutput.innerText = `${num}`;
  document.getElementsByClassName("inputResult")[0].classList.remove("d-none");
  //timeout for result
  timeoutDisplay();
}

//Auxiliry functions

//Toggles clientside error stylings
function toggleInputError() {
  if (!active) {
    document
      .querySelector("input")
      .setAttribute(
        "style",
        "color: var(--invalid-color1); border:2px solid var(--invalid-color1);"
      );
    return (active = true);
  }
  document
    .querySelector("input")
    .removeAttribute(
      "style",
      "color: var(--invalid-color1); border:2px solid var(--invalid-color1);"
    );
  return (active = false);
}

//Timeout display
function timeoutDisplay() {
  setTimeout(() => {
    document.getElementsByClassName("inputResult")[0].classList.add("d-none");
    questionOutput.removeAttribute("style", "color:var(--invalid-color1)");
    document
      .getElementsByClassName("inputResult")[0]
      .classList.remove("resultSingleNumber");
  }, 2000);
}

//Toggle loading indicator
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

//Reset input styling after error state
inputField.addEventListener("focus", function () {
  if (errorActivate) {
    document.getElementById("errorMessage").classList.add("d-none");
    errorActivate = false;
  }
  document
    .querySelector("input")
    .removeAttribute(
      "style",
      "color: var(--invalid-color1); border:2px solid var(--invalid-color1);"
    );
  return (active = false);
});
