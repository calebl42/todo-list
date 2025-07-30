import { project, todo, projects, getCurrentIndex, setCurrentIndex, deleteTodo } from "./index.js";
import { parseISO, format } from "date-fns";

function updateDisplay() {
  let mainContent = document.querySelector(".main-content");
  mainContent.innerHTML = "";
  let currentProject = projects[getCurrentIndex()];

  let heading = document.createElement("h2");
  heading.textContent = currentProject.name;
  
  let todosContainer = document.createElement("div");
  todosContainer.classList.add("todos");

  for (const todo of currentProject.todos) {
    let currentTodo = document.createElement("div");
    currentTodo.classList.add("todo");
    let todoTitle = document.createElement("h3");
    todoTitle.textContent = todo.title;

    let todoDescription = document.createElement("p");
    todoDescription.textContent = todo.description === "" ? "" : "Description: " + todo.description;
    todoDescription.hidden = true;

    let todoDueDate = document.createElement("p");
    todoDueDate.textContent = "Due: " + format(parseISO(todo.dueDate), "PPPPp");
    todoDueDate.hidden = true;

    let todoPriority = document.createElement("p");
    todoPriority.textContent = "Priority level: " + todo.priority;
    todoPriority.hidden = true;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "finished";
    deleteButton.addEventListener("click", () => {
      currentTodo.remove();
      projects[getCurrentIndex()].deleteTodo(todo.id);
    });
    let showButton = document.createElement("button");
    showButton.textContent = "expand";
    showButton.addEventListener("click", () => {
      if (showButton.textContent === "expand") {
        showButton.textContent = "shrink";
      } else {
        showButton.textContent = "expand";
      }
      todoDescription.hidden ^= true;
      todoDueDate.hidden ^= true;
      todoPriority.hidden ^= true;
    });

    for (const el of [todoTitle, todoDescription, todoDueDate, todoPriority, deleteButton, showButton]) {
      currentTodo.appendChild(el);
    }

    todosContainer.appendChild(currentTodo);
  }

  //setup add todo button
  let addTodo = document.createElement("button");
  addTodo.id = "add-todo";
  addTodo.textContent = "Add Todo"
  addTodo.addEventListener("click", () => {
    let dateInput = document.querySelector("#due-date");
    const epochDate = new Date();
    const localDate = new Date(epochDate - (epochDate.getTimezoneOffset()-60) * 60000);
    localDate.setSeconds(null);
    localDate.setMilliseconds(null);
    dateInput.value = (localDate).toISOString().slice(0, -1);
    dialog.show();
  });

  mainContent.appendChild(heading);
  todosContainer.appendChild(addTodo);
  mainContent.appendChild(todosContainer);
}

//form processing logic
let dialog = document.querySelector("dialog");
let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  let currentProject = projects[getCurrentIndex()];
  e.preventDefault();
  const formData = new FormData(form);
  let newTodo = new todo(formData.get("title"), formData.get("description"), formData.get("due-date"), formData.get("drone"));
  currentProject.addTodo(newTodo);
  
  form.reset();
  dialog.close();
  updateDisplay();
});

//setup add project button
let addProject = document.querySelector("#add-project");
addProject.addEventListener("click", () => {
  let newProjectName = prompt("Enter new project name: ");
  if (newProjectName === null) { return; };
  let newProject = new project(newProjectName, []);
  let newProjectButton = document.createElement("button");
  newProjectButton.textContent = newProjectName;
  projects.push(newProject);
  let index = projects.length - 1;
  newProjectButton.addEventListener("click", () => {
    setCurrentIndex(index);
    updateDisplay();
  });
  addProject.before(newProjectButton);
});

export default updateDisplay;