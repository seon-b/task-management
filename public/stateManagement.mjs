export let appState = {
  taskDeadline: "",
  taskStatus: "active",
  taskName: "",
};

export function setAppState(state, value) {
  if (state === "taskDeadline") {
    appState = { ...appState, taskDeadline: value };
  } else if (state === "taskStatus") {
    appState = { ...appState, taskStatus: value };
  } else if (state === "taskName") {
    appState = { ...appState, taskName: value };
  } else {
  }
}
