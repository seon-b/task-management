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
    theme: {
      colorName: "mint green",
      hValue: "174",
      sValue: "62%",
      lValue: "47%",
    },
  },
};

export function getAppThemes() {
  let themeArray = [
    {
      colorName: "mint green",
      hValue: "174",
      sValue: "62%",
      lValue: "47%",
    },
    {
      colorName: "red",
      hValue: "347",
      sValue: "83%",
      lValue: "60%",
    },
    {
      colorName: "blue",
      hValue: "220",
      sValue: "76%",
      lValue: "33%",
    },
    {
      colorName: "purple",
      hValue: "276",
      sValue: "66%",
      lValue: "40%",
    },
  ];

  return themeArray;
}

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
  } else if (state === "componentListInitialize") {
    appState = { ...appState, componentList: value };
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
  } else if (state === "theme") {
    if (value === "" || value === undefined || value === null) return;
    appState = {
      ...appState,
      userSettings: { ...appState.userSettings, theme: value },
    };
  } else if (state === "userSettings") {
    if (value === "" || value === undefined || value === null) return;
    appState = { ...appState, userSettings: value };
  } else {
  }
}

export function selectTheme(e, root) {
  let themeArray = getAppThemes();
  let selectedThemeIndex = themeArray.findIndex(
    (theme) => theme.colorName === e.target.value
  );

  let selectedTheme = themeArray[selectedThemeIndex];
  setAppState("theme", selectedTheme);
  updateTheme(root);
}

export function updateTheme(root) {
  root.style.setProperty("--hValue", appState.userSettings.theme.hValue);
  root.style.setProperty("--sValue", appState.userSettings.theme.sValue);
  root.style.setProperty("--lValue", appState.userSettings.theme.lValue);
}
