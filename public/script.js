import { appState, selectTheme, setAppState } from "./stateManagement.mjs";
import {
  addComponent,
  initializeTaskList,
  initializeDragAndDrop,
  removeComponent,
} from "./components.mjs";

const currentTaskColumn = document.querySelector("[data-current-task]");
const completedTaskColumn = document.querySelector("[data-completed-task]");
const createTaskButton = document.querySelector(".submitButton");

const errorMessage = document.querySelector(".errorMessage");
let dragAndDropElements;

const navBrandLink = document.querySelector("#navBrandLink");

const dragAndDropElementContainers = document.querySelectorAll(".dropzone");
const newTaskColumn = document.querySelector("[data-new-task]");
const taskNameInput = document.querySelector("#taskName");
const taskDeadlineInput = document.querySelector("#taskDeadline");
const taskContentInput = document.querySelector("#taskContent");
const root = document.documentElement;

createTaskButton.addEventListener("click", (e) => {
  e.preventDefault();
  addComponent("#taskComponent", newTaskColumn, appState);
  setAppState("clearForm");
  clearForm();
  setDragAndDropElements(dragAndDropElements);
  initializeDragAndDrop(dragAndDropElements, dragAndDropElementContainers);
});

initializeTaskList(newTaskColumn);
setDragAndDropElements(dragAndDropElements);
initializeDragAndDrop(dragAndDropElements, dragAndDropElementContainers);

function clearForm() {
  taskContentInput.value = appState.taskContent;
  taskDeadlineInput.value = appState.taskDeadline;
  taskNameInput.value = appState.taskContent;
}

function displayErrorMessage(message) {
  setAppState("errorSuccessMessage", message);
  errorMessage.textContent = appState.errorSuccessMessage;
  errorMessage.parentElement.parentElement.classList.remove("errorAreaHidden");

  setTimeout(() => {
    errorMessage.parentElement.parentElement.classList.add("errorAreaHidden");
    setAppState("errorSuccessMessage", "");
    errorMessage.textContent = appState.errorSuccessMessage;
  }, 1000);
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

function setDragAndDropElements() {
  dragAndDropElements = document.querySelectorAll(".taskContainer");
}

navBrandLink.addEventListener("click", () => {
  window.location.assign("/");
});

taskNameInput.addEventListener("change", (e) => getUserInput(e));
taskDeadlineInput.addEventListener("change", (e) => getUserInput(e));
taskContentInput.addEventListener("change", (e) => getUserInput(e));
