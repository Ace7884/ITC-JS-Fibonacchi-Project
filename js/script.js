//Milestone 7.1

//global variables
let inputField = document.querySelector("input");
let button1 = document.querySelectorAll("button")[0];
let questionOutput = document.querySelector("strong");
let errorBubble = document.getElementById("errorMessage");
let saveToggle = document.getElementById("saveCalcToggle");
let dropDownButton = document.getElementsByClassName("btn-secondary")[0];
let savedResults = [];

//Status variablesfi
let loadingUser = true;
let loadingResults = true;
let active = false;
let errorActivate = true;
let error = "";
let saveCalc = false;

//Registers Input and sends to Validation
button1.addEventListener("click", registerInput);
document.getElementsByClassName("inputResult")[0].classList.add("d-none");
//Toggles whether to send user input to server or calculate locally
saveToggle.addEventListener("click", registerSaveToggle);
//Check if dropdown menu activated
dropDownButton.addEventListener("click", ifDropDown);

//If dropdown active,perform sort functions given user choice if not disable menu options
function enableSort() {
  if (document.getElementById("resultsLog").innerText === "") {
    document
      .getElementById("numberAsc")
      .removeEventListener("click", numberSortAsc);
    document
      .getElementById("numberDesc")
      .removeEventListener("click", numberSortDesc);
    document
      .getElementById("dateAsc")
      .removeEventListener("click", dateSortAsc);
    document
      .getElementById("dateDesc")
      .removeEventListener("click", dateSortDesc);
  }
  document.getElementById("numberAsc").addEventListener("click", numberSortAsc);
  document
    .getElementById("numberDesc")
    .addEventListener("click", numberSortDesc);
  document.getElementById("dateAsc").addEventListener("click", dateSortAsc);
  document.getElementById("dateDesc").addEventListener("click", dateSortDesc);
}

//Local Fibonacci Calculator from milestone 3 revised
//to be used in case save button unchecked

//Calculates Fibonacci locally
function fibonacciCalcLocal(input) {
  let result = 0;
  let numSum = 0;
  let currentNum = 1;
  let secondNum = 1;

  if ((input > 0 && input < 3) || input == 42) {
    return fibonacciStartSet(input);
  }

  for (let i = 2; i < input; i++) {
    numSum = currentNum + secondNum;
    result = numSum;
    secondNum = currentNum;
    currentNum = numSum;
  }
  displayY(result);
  //timeout for single result
  timeoutDisplay();
}

//Sends user input to be validated
function registerInput() {
  let input = document.getElementById("userInput").value;
  //Client side Validation if passes send request if not send error
  InputClientValidation(input);
}

//ClientSideValidation if passes send to server as request if not display error
function InputClientValidation(input) {
  //reset output and results fields
  document.getElementsByClassName("inputResult")[0].classList.add("d-none");
  document.getElementById("resultsLog").innerHTML = "";
  savedResults = [];

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
  //check if user checked to send calculation to server
  if (saveCalc === false) {
    return fibonacciCalcLocal(input);
  }
  callServer(input);
}

//switched to Async Await syntex
//Outsources fibonacci calc to local server to display to user
async function callServer(num) {
  document.getElementsByClassName("inputResult")[0].classList.add("d-none");
  //Activate loader
  loaderInsert(0);
  const url = `http://localhost:5050/fibonacci/${num}`;
  try {
    let response = await fetch(url);
    if (response.status !== 400) {
      response = await response.json();
      let data = response;
      displayY(data.result);
    }else{
      response = await response.text();
      displayY(response);
    }
  } catch (error) {
    displayY(error);
  }
}

//switched to Async Await syntex
//log submission request and result to the server
async function resultHistory() {
  //activate loading state
  loaderInsert(1);
  const resUrl = "http://localhost:5050/getFibonacciResults";
  try {
  let response = await fetch(resUrl);
  response = await response.json();
  //deactivate loading state
  loaderInsert(1);
  //send to be logged
  displayResultsLog(response.results);
  }
  catch(error){
    displayResultsLog(error);
  }
}

//Displays search result
function displayResultsLog(data) {
  //store results for later use in sorting
  if (savedResults.length == 0) {
    for (objIndex in data) {
      savedResults.push(data[objIndex]);
    }
  }

  //reset list
  document.getElementById("resultsLog").innerHTML = "";

  //iterate throught the the array and present as list
  for (objIndex in data) {
    let objArray = data;
    //convert timestamp to proper date format
    let formatedDate = convertTimeStamp(objArray[objIndex].createdDate);
    //create list
    let listItem = document.createElement("li");
    listItem.innerText += `The Fibonnaci Of ${objArray[objIndex].number} is ${objArray[objIndex].result}. Calculated at: ${formatedDate}`;
    document.getElementById("resultsLog").appendChild(listItem);
  }
}

//Displays Fibonacci Number
function displayY(num) {
  //if 42 entered change result to error style
  serverStyle(num);
  //activate loading indicator
  if (saveCalc === false) {
    loaderInsert(0);
  }
  //display result
  questionOutput.innerText = `${num}`;
  //deactivate loading indicator
  loaderInsert(0);
  document.getElementsByClassName("inputResult")[0].classList.remove("d-none");

  //if user chose to save calc display request history
  if (saveCalc && typeof num == "number") {
    resultHistory();
    timeoutDisplay();
  }
  //timeout result
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

//set serverside response styling
function serverStyle(num) {
  if (isNaN(num)) {
    document
      .getElementsByClassName("inputResult")[0]
      .classList.remove("resultSingleNumber");
    questionOutput.setAttribute("style", "color:var(--invalid-color1)");
  }
  if (typeof num == "number") {
    document
      .getElementsByClassName("inputResult")[0]
      .classList.add("resultSingleNumber");
    questionOutput.setAttribute("style", "color:black");
  }
}
//Timeout display
function timeoutDisplay() {
  setTimeout(() => {
    document.getElementsByClassName("inputResult")[0].classList.add("d-none");
    questionOutput.removeAttribute("style", "color:var(--invalid-color1)");
    document
      .getElementsByClassName("inputResult")[0]
      .classList.remove("resultSingleNumber");
  }, 3000);
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

//Registers whether saveToggle been clicked
function registerSaveToggle() {
  if (saveCalc) {
    return (saveCalc = false);
  }
  return (saveCalc = true);
}

//Sets Starter fibonacci set conditionals
function fibonacciStartSet(input) {
  if (input > 0 && input < 3) {
    return displayY(1);
  }
  if (input == 42) {
    return displayY("42 is the meaning of life");
  }
}

//If dropdown activated and results presented enable menu options
function ifDropDown() {
  enableSort();
}

//sortFunctions
function numberSortAsc() {
  //sort results
  savedResults.sort((a, b) => {
    return b.number - a.number;
  });

  displayResultsLog(savedResults);
}

function numberSortDesc() {
  //sort results
  savedResults.sort((a, b) => {
    return a.number - b.number;
  });

  displayResultsLog(savedResults);
}
function dateSortAsc() {
  //sort results
  savedResults.sort((a, b) => {
    return b.createdDate - a.createdDate;
  });
  //convert timestamps to date format
  savedResults.forEach((element) => {
    element.createdDate = convertTimeStamp(element.createdDate);
  });

  displayResultsLog(savedResults);
}
function dateSortDesc() {
  //sort results
  savedResults.sort((a, b) => {
    return a.createdDate - b.createdDate;
  });
  //convert timestamps to date format
  savedResults.forEach((element) => {
    element.createdDate = convertTimeStamp(element.createdDate);
  });

  displayResultsLog(savedResults);
}

//convert timestamps to date format
function convertTimeStamp(timestamp) {
  timestamp = new Date(timestamp);

  return timestamp;
}
