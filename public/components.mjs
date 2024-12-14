import { appState, setAppState } from "./stateManagement.mjs";

let idHashMap = {
  1: 48,
  2: 49,
  3: 50,
  4: 51,
  5: 52,
  6: 53,
  7: 54,
  8: 55,
  9: 56,
  10: 57,
  11: 65,
  12: 66,
  13: 67,
  14: 68,
  15: 69,
  16: 70,
  17: 71,
  18: 72,
  19: 73,
  20: 74,
  21: 75,
  22: 76,
  23: 77,
  24: 78,
  25: 79,
  26: 80,
  27: 81,
  28: 82,
  29: 83,
  30: 84,
  31: 85,
  32: 86,
  33: 87,
  34: 88,
  35: 89,
  36: 90,
  37: 97,
  38: 98,
  39: 99,
  40: 100,
  41: 101,
  42: 102,
  43: 103,
  44: 104,
  45: 105,
  46: 106,
  47: 107,
  48: 108,
  49: 109,
  50: 110,
  51: 111,
  52: 112,
  53: 113,
  54: 114,
  55: 115,
  56: 116,
  57: 117,
  58: 118,
  59: 119,
  60: 120,
  61: 121,
  62: 122,
};

export function addComponent(templateId, element) {
  let taskTemplate = document.querySelector(templateId);
  let taskTemplateContent = taskTemplate.content.cloneNode(true);
  element.appendChild(taskTemplateContent);
}

function generateRandomId(idLength) {
  let id = "";
  let randomHashmapKey;

  for (let i = 0; i < idLength; i++) {
    randomHashmapKey = Math.floor(Math.random() * 62) + 1;
    id += String.fromCharCode(idHashMap[randomHashmapKey]);
  }

  return id;
}

function setComponentId(component, value) {
  component.childNodes[1].dataset.taskId = value;
}

export function removeComponent(componentId) {
  let componentToRemove = document.querySelector(
    `[data-current-task = ${componentId}]`
  );
}
