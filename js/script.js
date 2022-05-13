//Milestone 5

//global variables
let output = "";
let inputField = document.querySelector("input");
let button1 = document.querySelectorAll("button")[0];
let questionOutput = document.querySelector("strong");
let errorBubble = document.getElementById("errorMessage");
let loading = true;
let active = false;
let errorActivate = true;

//reset input style after error state
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

//toggles clientside error stylings
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

//toggles loading indicator
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

//Displays Fibonacci Number and timeouts
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
  //timeout for result display
  setTimeout(() => {
    document.getElementsByClassName("inputResult")[0].classList.add("d-none");
    questionOutput.removeAttribute("style", "color:var(--invalid-color1)");
    document
      .getElementsByClassName("inputResult")[0]
      .classList.remove("resultSingleNumber");
  }, 3000);
}

//reset input style after error
inputField.addEventListener("focus", function () {
  document
    .querySelector("input")
    .removeAttribute(
      "style",
      "color: var(--invalid-color1); border:2px solid var(--invalid-color1);"
    );
});
