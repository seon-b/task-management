export let appState = {
  errorSuccessMessage: "",
  componentIdList: ["gYxBiz", "8nhpUE", "Z8WKIn"],
  componentList: [
    {
      taskId: "gYxBiz",
      taskContent: "Study merge sort and binary search algorithms",
      taskDeadline: new Date().toLocaleDateString("en-US"),
      taskLocationColumn: "newTaskColumn",
      taskName: "Study",
    },
    {
      taskId: "8nhpUE",
      taskContent: "Study linked list and binary search tree data structures",
      taskDeadline: new Date().toLocaleDateString("en-US"),
      taskLocationColumn: "newTaskColumn",
      taskName: "Study",
    },
    {
      taskId: "Z8WKIn",
      taskContent:
        "Register for Calculus III, Advanced Computer Architecture, and Digital Signal Processing",
      taskDeadline: new Date().toLocaleDateString("en-US"),
      taskLocationColumn: "newTaskColumn",
      taskName: "Register for classes",
    },
  ],
  taskContent: "",
  taskDeadline: "",
  taskLocationColumn: "newTaskColumn",
  taskName: "",
  userSettings: {
    profileName: "",
    theme: "default",
  },
};

export function setAppState(state, value = "") {
  if (state === "componentIdListAdd") {
    let newArray = appState.componentIdList;
    newArray.push(value);
    appState = {
      ...appState,
      componentIdList: newArray,
    };
  } else if (state === "componentListAdd") {
    let newArray = appState.componentList;
    newArray.push(value);
  } else if (state === "componentIdListRemove") {
    appState.componentIdList.find((id, index) => {
      if (id === value) {
        appState.componentIdList.splice(index, 1);
      }
    });
  } else if (state === "componentListRemove") {
    appState.componentList.find((id, index) => {
      if (id === value) {
        appState.componentList.splice(index, 1);
      }
    });
  } else if (state === "clearForm") {
    appState = {
      ...appState,
      taskContent: "",
      taskDeadline: "",
      taskLocationColumn: "newTaskColumn",
      taskName: "",
    };
  } else if (state === "errorSuccessMessage") {
    appState = { ...appState, errorSuccessMessage: value };
  } else if (state === "profileName") {
    appState = {
      ...appState,
      userSettings: { ...appState.userSettings, profileName: value },
    };
  } else if (state === "taskContent") {
    appState = { ...appState, taskContent: value };
  } else if (state === "taskDeadline") {
    appState = { ...appState, taskDeadline: value };
  } else if (state === "taskName") {
    appState = { ...appState, taskName: value };
  } else if (state === "taskLocationColumn") {
    appState = { ...appState, taskLocationColumn: value };
  } else if (state === "userSettings") {
    let userSettingsObject = appState.userSettings;
    appState = { ...appState, taskLocationColumn: userSettingsObject };
  } else {
  }
}
