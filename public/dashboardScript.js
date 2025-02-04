import { appState, setAppState } from "./stateManagement.mjs";

const saveTasksButton = document.querySelector(".saveTasksButton");
const componentArray = appState.componentList;
const userEmail = appState.userSettings.profileName;

async function saveCurrentTasks() {
  try {
    const res = await fetch("/api/tasks/save-tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        tasks: componentArray,
      }),
    });
    if (!res.ok) {
      setAppState("errorSuccessMessage", "Task data could not be saved");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Task data could not be saved", error);
  }
}

saveTasksButton.addEventListener("click", saveCurrentTasks);
