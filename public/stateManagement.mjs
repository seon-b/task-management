export let appState = {
  componentIdList: [],
  taskContent: "",
  taskDeadline: "",
  taskName: "",
  taskStatus: "active",
};

export function setAppState(state, value = "") {
  if (state === "componentIdListAdd") {
    let newArray = appState.componentIdList;
    newArray.push(value);
    appState = {
      ...appState,
      componentIdList: newArray,
    };
  } else if (state === "componentIdListRemove") {
    appState.componentIdList.find((id, index) => {
      if (id === value) {
        appState.componentIdList.splice(index, 1);
      }
    });
  } else if (state === "taskContent") {
    appState = { ...appState, taskContent: value };
  } else if (state === "taskDeadline") {
    appState = { ...appState, taskDeadline: value };
  } else if (state === "taskName") {
    appState = { ...appState, taskName: value };
  } else if (state === "taskStatus") {
    appState = { ...appState, taskStatus: value };
  } else if (state === "clearForm") {
    appState = {
      ...appState,
      taskContent: "",
      taskDeadline: "",
      taskName: "",
      taskStatus: "active",
    };
  } else {
  }
}
