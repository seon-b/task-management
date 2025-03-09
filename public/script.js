import {
  appState,
  displayErrorMessage,
  selectTheme,
  setAppState,
} from "./stateManagement.mjs";
import {
  addComponent,
  removeComponent,
  initializeTaskList,
} from "./components.mjs";

const currentTaskColumn = document.querySelector("[data-current-task]");
const completedTaskColumn = document.querySelector("[data-completed-task]");
const createTaskButton = document.querySelector(".submitButton");
const errorMessage = document.querySelector(".errorMessage");

let dragAndDropElements;

const loginLink = document.querySelector("#navLoginLink");
const navBrandLink = document.querySelector("#navBrandLink");
const dragAndDropElementContainers = document.querySelectorAll(".dropzone");
const newTaskColumn = document.querySelector("[data-new-task]");
const taskNameInput = document.querySelector("#taskName");
const taskDeadlineInput = document.querySelector("#taskDeadline");
const taskContentInput = document.querySelector("#taskContent");
const taskManagementArea = document.querySelector("#taskManagementArea");
const themeButton = document.querySelector(".themeButton");

const root = document.documentElement;

createTaskButton.addEventListener("click", (e) => {
  e.preventDefault();
  addComponent("#taskComponent", newTaskColumn, appState, errorMessage);
  setAppState("clearForm");
  clearForm();
  setDragAndDropElements();
  initializeDragAndDrop();
});

initializeTaskList(newTaskColumn);
setDragAndDropElements();
initializeDragAndDrop();

function clearForm() {
  taskContentInput.value = appState.taskContent;
  taskDeadlineInput.value = appState.taskDeadline;
  taskNameInput.value = appState.taskContent;
}

function deleteTask(e) {
  let taskId;
  if (e.target.classList.contains("deleteButton")) {
    taskId = e.target.parentElement.parentElement.dataset.taskId;
  } else {
    return;
  }

  removeComponent(taskId);
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

loginLink.addEventListener("click", () => {
  displayErrorMessage(errorMessage, "Login not available");
});
navBrandLink.addEventListener("click", () => {
  window.location.assign("/");
});
taskNameInput.addEventListener("change", (e) => getUserInput(e));
taskManagementArea.addEventListener("click", (e) => deleteTask(e));
taskDeadlineInput.addEventListener("change", (e) => getUserInput(e));
taskContentInput.addEventListener("change", (e) => getUserInput(e));
themeButton.addEventListener("click", () =>
  selectTheme(appState.userSettings.theme.colorName, root)
);
