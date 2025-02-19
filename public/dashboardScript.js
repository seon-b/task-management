import { appState, selectTheme, setAppState } from "./stateManagement.mjs";

const saveSettingsButton = document.querySelector(".saveSettingsButton");
const saveTasksButton = document.querySelector(".saveTasksButton");
const componentArray = appState.componentList;
const profileName = document.querySelector(".profileNameArea");
const themeSelect = document.querySelector("#themeSelect");
const root = document.documentElement;
const initialUserSettings = null;
const initialUserTasks = null;
let userEmail = "";

function deleteTask() {}

async function getCurrentUserData() {
  setAppState("profileName", profileName.innerHTML);
  userEmail = appState.userSettings.profileName;

  try {
    const res = fetch("/api/users/get-user-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
      }),
    });
    if (!res.ok) {
      setAppState("errorSuccessMessage", "Could not get user data");
    }

    const data = await res.json();
    initialUserTasks = data.tasks;
    initialUserSettings = data.settings;
    setAppState("componentListInitialize", initialUserTasks);
    setAppState("userSettings", initialUserSettings);
    return data;
  } catch (error) {
    console.error("Could not get user data", error);
  }
}

async function saveCurrentTasks() {
  setAppState("profileName", profileName.innerHTML);
  userEmail = appState.userSettings.profileName;

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
      setAppState("errorSuccessMessage", "User tasks data could not be saved");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Task data could not be saved", error);
  }
}

async function saveUserSettings() {
  setAppState("profileName", profileName.innerHTML);
  userEmail = appState.userSettings.profileName;

  const currentUserSettings = appState.userSettings;
  try {
    const res = await fetch("/api/users/save-user-settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        settings: currentUserSettings,
      }),
    });
    if (!res.ok) {
      setAppState(
        "errorSuccessMessage",
        "User settings data could not be saved"
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("user settings data could not be saved", error);
  }
}

document.addEventListener("DOMContentLoaded", getCurrentUserData);
saveSettingsButton.addEventListener("click", saveUserSettings);
saveTasksButton.addEventListener("click", saveCurrentTasks);
themeSelect.addEventListener("change", (e) => selectTheme(e, root));
