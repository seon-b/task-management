export function addComponent(templateId, element) {
  let taskTemplate = document.querySelector(templateId);
  let taskTemplateContent = taskTemplate.content.cloneNode(true);
  element.appendChild(taskTemplateContent);
}

export function removeComponent(taskArea, element) {}
