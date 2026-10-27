const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementsByTagName("button")[0];
const incompleteTaskList = document.getElementById("incompleteTasks");
const completedTaskList = document.getElementById("completed-tasks");

const createDeleteButton = function () {
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);
  return deleteButton;
};

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");

  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");

  label.innerText = taskString;
  label.className = "task";

  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "edit";

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(createDeleteButton());
  return listItem;
};

const addTask = function () {
  const taskText = newTaskInput.value.trim();
  if (!taskText) return;
  const listItem = createNewTaskElement(taskText);

  incompleteTaskList.appendChild(listItem);
  bindTaskEvents(listItem);

  newTaskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");
  const isEditMode = listItem.classList.contains("editMode");

  if (isEditMode) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const taskList = listItem.parentNode;
  taskList.removeChild(listItem);
};

const updateTaskStatus = function () {
  const listItem = this.parentNode;
  const targetList = this.checked ? completedTaskList : incompleteTaskList;
  targetList.appendChild(listItem);
};

addTaskButton.onclick = addTask;

const bindTaskEvents = function (taskListItem) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = updateTaskStatus;
};

document
  .querySelectorAll("#incompleteTasks > li, #completed-tasks > li")
  .forEach(bindTaskEvents);
