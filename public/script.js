import { appState, setAppState } from "./stateManagement.mjs";
import { addComponent, removeComponent } from "./components.mjs";

const currentTaskComponent = document.querySelector("[data-current-task]");
const completedTaskComponent = document.querySelector("[data-completed-task]");
const createTaskButton = document.querySelector(".submitButton");
const taskNameInput = document.querySelector("#taskName");
const taskDeadlineInput = document.querySelector("#taskDeadline");
const taskContentInput = document.querySelector("#taskContent");
const taskStatusInputs = document.querySelectorAll(".taskStatus");

createTaskButton.addEventListener("click", (e) => {
  e.preventDefault();
  addComponent("#taskComponent", newTaskComponent, appState);
});

function getUserInput(e) {
  let className = ".";
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
  } else if (inputLabel === "taskStatus") {
    let element = document.querySelector(className + inputLabel);
    inputValue = element.value;
    setAppState("taskStatus", inputValue);
  }
}

taskNameInput.addEventListener("change", (e) => getUserInput(e));
taskDeadlineInput.addEventListener("change", (e) => getUserInput(e));
taskContentInput.addEventListener("change", (e) => getUserInput(e));
taskStatusInputs.forEach((input) =>
  input.addEventListener("change", (e) => getUserInput(e))
);
