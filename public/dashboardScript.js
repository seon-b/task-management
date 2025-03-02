import { appState, selectTheme, setAppState } from "./stateManagement.mjs";
import { initializeTaskList, removeAllComponents } from "./components.mjs";

const dashboardLink = document.querySelector("#navDashboardLink");
const newTaskColumn = document.querySelector("[data-new-task]");
const saveSettingsButton = document.querySelector(".saveSettingsButton");
const saveTasksButton = document.querySelector(".saveTasksButton");
const logoutLink = document.querySelector("#navLogoutLink");
const profileName = document.querySelector(".profileNameArea");
const themeSelect = document.querySelector("#themeSelect");
const root = document.documentElement;

let initialUserSettings = null;
let initialUserTasks = null;
let initialLoginState = null;
let userEmail = "";

function deleteTask() {}

async function getCurrentUserData() {
  setAppState("profileName", profileName.innerHTML);
  userEmail = appState.userSettings.profileName;

  try {
    const res = await fetch("/api/users/get-user-data", {
      method: "POST",
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
    initialLoginState = data.isLoggedIn;

    setAppState("componentListInitialize", initialUserTasks);
    setAppState("userSettings", initialUserSettings);
    setAppState("isLoggedIn", initialLoginState);

    removeAllComponents(newTaskColumn);
    initializeTaskList(newTaskColumn);

    return data;
  } catch (error) {
    console.error("Could not get user data", error);
  }
}

async function logout() {
  userEmail = appState.userSettings.profileName;
  try {
    const res = await fetch("/api/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      setAppState("errorSuccessMessage", "User could not be logged out");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("User could not be logged out", error);
    console.error(error);
  }
}

async function saveCurrentTasks() {
  setAppState("profileName", profileName.innerHTML);
  userEmail = appState.userSettings.profileName;
  let componentArray = appState.componentList;

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

async function updateUserLoginState() {
  setAppState("profileName", profileName.innerHTML);
  userEmail = appState.userSettings.profileName;
  let currentLoginState = appState.isLoggedIn;

  if (appState.isLoggedIn === true) {
    currentLoginState = false;
  } else {
    currentLoginState = true;
  }

  try {
    const res = await fetch("/api/users/update-login-state", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        loginState: currentLoginState,
      }),
    });
    if (!res.ok) {
      setAppState("errorSuccessMessage", "login state could not be updated");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("login state could not be updated", error);
  }
}

dashboardLink.addEventListener("click", () => {
  window.location.assign("/dashboard");
});

logoutLink.addEventListener("click", logout);
window.addEventListener("load", getCurrentUserData);
saveSettingsButton.addEventListener("click", saveUserSettings);
saveTasksButton.addEventListener("click", saveCurrentTasks);
themeSelect.addEventListener("change", (e) => selectTheme(e, root));
