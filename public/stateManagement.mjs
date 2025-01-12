export let appState = {
  errorSucessMessage: "",
  componentIdList: [],
  componentList: [
    {
      taskContent: "Study merge sort and binary search algorithms",
      taskDeadline: new Date().toLocaleDateString("en-US"),
      taskName: "Study",
      taskStatus: "active",
    },
    {
      taskContent: "Study linked list and binary search tree data structures",
      taskDeadline: new Date().toLocaleDateString("en-US"),
      taskName: "Study",
      taskStatus: "active",
    },
    {
      taskContent:
        "Register for Calculus III, Advanced Computer Architecture, and Digital Signal Processing",
      taskDeadline: new Date().toLocaleDateString("en-US"),
      taskName: "Register for classes",
      taskStatus: "active",
    },
  ],
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
  } else if (state === "clearForm") {
    appState = {
      ...appState,
      taskContent: "",
      taskDeadline: "",
      taskName: "",
      taskStatus: "active",
    };
  } else if (state === "errorSucessMessage") {
    appState = { ...appState, errorSucessMessage: value };
  } else if (state === "taskContent") {
    appState = { ...appState, taskContent: value };
  } else if (state === "taskDeadline") {
    appState = { ...appState, taskDeadline: value };
  } else if (state === "taskName") {
    appState = { ...appState, taskName: value };
  } else if (state === "taskStatus") {
    appState = { ...appState, taskStatus: value };
  } else {
  }
}
