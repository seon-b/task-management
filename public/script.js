import { appState, setAppState } from "./stateManagement.mjs";
import { addComponent, removeComponent } from "./components.mjs";

const newTaskComponent = document.querySelector("[data-new-task]");
const currentTaskComponent = document.querySelector("[data-current-task]");
const completedTaskComponent = document.querySelector("[data-completed-task]");
const createTaskButton = document.querySelector(".submitButton");

createTaskButton.addEventListener("click", (e) => {
  e.preventDefault();
  addComponent("#taskComponent", newTaskComponent);
});
