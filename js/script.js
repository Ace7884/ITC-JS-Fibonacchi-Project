//Milestone 6

//global variables
let inputField = document.querySelector("input");
let button1 = document.querySelectorAll("button")[0];
let questionOutput = document.querySelector("strong");
let errorBubble = document.getElementById("errorMessage");
let searchLog = [];

//Status variables
let loadingUser = true;
let loadingResults = true;
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
  //reset output and results fields
  document.getElementById("resultsLog").innerHTML = "";
  document.getElementsByClassName("inputResult")[0].classList.add("d-none");
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
  document.getElementsByClassName("inputResult")[0].classList.add("d-none");
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
      return errorResponse;
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

//log submission request and result to the server
function resultHistory() {
  document.getElementById("resultsLog").innerHTML = "";
  loaderInsert(1);
  const resUrl = "http://localhost:5050/getFibonacciResults";
  fetch(resUrl)
    .then((response) => response.json())
    .then((data) => displayResultsLog(data));
}

//Displays search result
function displayResultsLog(data) {
  loaderInsert(1);
  //reset list
  document.getElementById("resultsLog").innerHTML = "";
  //iterate throught the the array and present as list
  for (objIndex in data.results) {
    let objArray = data.results;
    //convert timestamp to proper date format
    let formatedDate = new Date(objArray[objIndex].createdDate);
    let listItem = document.createElement("li");
    listItem.innerText += `The Fibonnaci Of ${objArray[objIndex].number} is ${objArray[objIndex].result}. Calculated at: ${formatedDate}`;
    document.getElementById("resultsLog").appendChild(listItem);
  }
}

//Displays Fibonacci Number
function displayY(num) {
  //if 42 entered change result to error style
  if (isNaN(num)) {
    document
      .getElementsByClassName("inputResult")[0]
      .classList.remove("resultSingleNumber");
    questionOutput.setAttribute("style", "color:var(--invalid-color1)");
  } else {
    document
      .getElementsByClassName("inputResult")[0]
      .classList.add("resultSingleNumber");
    questionOutput.setAttribute("style", "color:black");
  }
  //disactivate loading indicator
  loaderInsert(0);
  //display result
  questionOutput.innerText = `${num}`;
  document.getElementsByClassName("inputResult")[0].classList.remove("d-none");
  resultHistory();
  //timeout for results
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
  }, 5000);
}

//Toggle loading indicator
function loaderInsert(index) {
  if (loadingUser && loadingResults) {
    document
      .getElementsByClassName("spinner-border")
      [index].classList.remove("d-none");
    return loadingUser, (loadingResults = false);
  }
  document
    .getElementsByClassName("spinner-border")
    [index].classList.add("d-none");
  return loadingUser, (loadingResults = true);
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
