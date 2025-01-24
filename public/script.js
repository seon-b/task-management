import { appState, setAppState } from "./stateManagement.mjs";
import { addComponent, removeComponent } from "./components.mjs";

const currentTaskColumn = document.querySelector("[data-current-task]");
const completedTaskColumn = document.querySelector("[data-completed-task]");
const createTaskButton = document.querySelector(".submitButton");
const errorMessage = document.querySelector(".errorMessage");
let dragAndDropElements;

const dragAndDropElementContainers = document.querySelectorAll(".dropzone");
const newTaskColumn = document.querySelector("[data-new-task]");
const taskNameInput = document.querySelector("#taskName");
const taskDeadlineInput = document.querySelector("#taskDeadline");
const taskContentInput = document.querySelector("#taskContent");

createTaskButton.addEventListener("click", (e) => {
  e.preventDefault();
  addComponent("#taskComponent", newTaskColumn, appState);
  setAppState("clearForm");
  clearForm();
  setDragAndDropElements();
  initializeDragAndDrop();
});

initializeTaskList();
setDragAndDropElements();
initializeDragAndDrop();

function clearForm() {
  taskContentInput.value = appState.taskContent;
  taskDeadlineInput.value = appState.taskDeadline;
  taskNameInput.value = appState.taskContent;
}

function displayErrorMessage(message) {
  setAppState("errorSucessMessage", message);
  errorMessage.textContent = appState.errorSucessMessage;
  errorMessage.parentElement.classList.remove("errorAreaHidden");
  setTimeout(() => {
    errorMessage.parentElement.classList.add("errorAreaHidden");
    setAppState("errorSucessMessage", "");
    errorMessage.textContent = appState.errorSucessMessage;
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

function initializeTaskList() {
  if (appState.componentList.length === 0) return;
  appState.componentList.forEach((task) => {
    addComponent("#taskComponent", newTaskColumn, task, "initialize");
  });
}

function initializeDragAndDrop() {
  dragAndDropElements.forEach((element) => {
    if (!element.classList.contains("dragAndDropEnabled")) {
      element.addEventListener("dragstart", () => {
        element.classList.add("draggingComponent");
      });
      element.addEventListener("dragend", () => {
        element.classList.remove("draggingComponent");
      });
      element.classList.add("dragAndDropEnabled");
    } else {
    }
  });

  dragAndDropElementContainers.forEach((element) => {
    element.addEventListener("dragover", (e) => {
      e.preventDefault();
      let currentDraggingComponent =
        document.querySelector(".draggingComponent");
      element.appendChild(currentDraggingComponent);
    });
  });
}

function setDragAndDropElements() {
  dragAndDropElements = document.querySelectorAll(".taskContainer");
}

taskNameInput.addEventListener("change", (e) => getUserInput(e));
taskDeadlineInput.addEventListener("change", (e) => getUserInput(e));
taskContentInput.addEventListener("change", (e) => getUserInput(e));
