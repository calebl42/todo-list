import { todo, currentProject } from "./index.js";

let mainContent = document.querySelector(".main-content");
let dialog = document.querySelector("dialog");
let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  let newTodo = new todo(formData.get("title"), formData.get("description"), formData.get("due-date"), formData.get("drone"));
  currentProject.todos.push(newTodo);
  
  form.reset();
  dialog.close();
  updateDisplay();
});

function updateDisplay() {
  mainContent.innerHTML = "";

  let heading = document.createElement("h2");
  heading.textContent = currentProject.name;
  
  let todosContainer = document.createElement("div");
  todosContainer.classList.add("todos");

  for (const todo of currentProject.todos) {
    let currentTodo = document.createElement("div");
    currentTodo.classList.add("todo");
    let todoTitle = document.createElement("h3");
    todoTitle.textContent = "Todo: " + todo.title;
    let todoDescription = document.createElement("p");
    todoDescription.textContent = "Description: " + todo.description;
    let todoDueDate = document.createElement("p");
    todoDueDate.textContent = "Due by: " + todo.dueDate;
    let todoPriority = document.createElement("p");
    todoPriority.textContent = "Priority level: " + todo.priority;

    for (const el of [todoTitle, todoDescription, todoDueDate, todoPriority]) {
      currentTodo.appendChild(el);
    }

    todosContainer.appendChild(currentTodo);
  }

  let addTodo = document.createElement("button");
  addTodo.id = "add-todo";
  addTodo.textContent = "Add a todo"
  addTodo.addEventListener("click", () => {dialog.show();});

  mainContent.appendChild(heading);
  todosContainer.appendChild(addTodo);
  mainContent.appendChild(todosContainer);
}

export default updateDisplay;
