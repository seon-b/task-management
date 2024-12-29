import { appState, setAppState } from "./stateManagement.mjs";
import { addComponent, removeComponent } from "./components.mjs";

const completeRadioButton = document.querySelector("#complete");
const activeRadioButton = document.querySelector("#active");
const currentTaskColumn = document.querySelector("[data-current-task]");
const completedTaskColumn = document.querySelector("[data-completed-task]");
const createTaskButton = document.querySelector(".submitButton");
const newTaskColumn = document.querySelector("[data-new-task]");
const taskNameInput = document.querySelector("#taskName");
const taskDeadlineInput = document.querySelector("#taskDeadline");
const taskContentInput = document.querySelector("#taskContent");

createTaskButton.addEventListener("click", (e) => {
  e.preventDefault();
  addComponent("#taskComponent", newTaskColumn, appState);
  setAppState("clearForm");
  clearForm();
});

function clearForm() {
  taskContentInput.value = appState.taskContent;
  taskDeadlineInput.value = appState.taskDeadline;
  taskNameInput.value = appState.taskContent;
  activeRadioButton.checked = true;
}
function getUserInput(e) {
  let idName = "#";
  let inputLabel = e.target.name;
  let inputValue;

  if (inputLabel === "taskName") {
    let element = document.querySelector(idName + inputLabel);
    inputValue = element.value;
    setAppState("taskName", inputValue);
  } else if (inputLabel === "taskDeadline") {
    let element = document.querySelector(idName + inputLabel);
    inputValue = element.value;
    setAppState("taskDeadline", inputValue);
  } else if (inputLabel === "taskContent") {
    let element = document.querySelector(idName + inputLabel);
    inputValue = element.value;
    setAppState("taskContent", inputValue);
  } else {
  }
}

function getUserSelection(e) {
  if (e.target.id === "complete") {
    setAppState("taskStatus", e.target.value);
  } else if (e.target.id === "active") {
    setAppState("taskStatus", e.target.value);
  } else {
  }
}

taskNameInput.addEventListener("change", (e) => getUserInput(e));
taskDeadlineInput.addEventListener("change", (e) => getUserInput(e));
taskContentInput.addEventListener("change", (e) => getUserInput(e));
completeRadioButton.addEventListener("change", (e) => getUserSelection(e));
activeRadioButton.addEventListener("change", (e) => getUserSelection(e));
