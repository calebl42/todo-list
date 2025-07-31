import { project, todo, projects, getCurrentId, setCurrentId, saveProjects } from "./index.js";
import { parseISO, format } from "date-fns";
import plus from "./plus.png";

function updateDisplay() {
  let mainContent = document.querySelector(".main-content");
  mainContent.innerHTML = "";
  let currentProject = projects[getCurrentId()];

  let heading = document.createElement("h2");
  heading.textContent = currentProject.name;
  
  let todosContainer = document.createElement("div");
  todosContainer.classList.add("todos");

  //display projects in nav bar
  let nav = document.querySelector("nav");
  nav.innerHTML = "";
  //setup add project button
  let addProject = document.createElement("a");
  addProject.id = "add-project";
  let plusImg = document.createElement("img");
  plusImg.src = plus;
  plusImg.width = "30";
  addProject.appendChild(plusImg);
  addProject.addEventListener("click", () => {
    let newProjectName = prompt("Enter new project name: ");
    if (newProjectName === null) { return; };
    let newProject = new project(newProjectName, []);
    projects[newProject.id] = newProject;
    saveProjects();
    updateDisplay();
  });
  addProject.onmouseenter = function() {
    addProject.style = "background-color: rgba(256, 256, 256, 0.7)";
  };
  addProject.onmouseleave = function() {
    addProject.style = "background-color: transparent";
  }
  nav.appendChild(addProject)
  for (const [id, proj] of Object.entries(projects)) {
    let newProjectButton = document.createElement("button");
    newProjectButton.textContent = proj.name;
    newProjectButton.addEventListener("click", () => {
      setCurrentId(id);
      updateDisplay();
    });
    let addProject = document.querySelector("#add-project");
    addProject.before(newProjectButton);
  }

  //display current todos
  for (const todo of currentProject.todos) {
    let currentTodo = document.createElement("div");
    currentTodo.classList.add("todo");
    let todoTitle = document.createElement("h3");
    todoTitle.textContent = todo.title;

    let todoDescription = document.createElement("p");
    todoDescription.textContent = "Description: " + todo.description;
    todoDescription.hidden = true;

    let todoDueDate = document.createElement("p");
    todoDueDate.textContent = "Due: " + format(parseISO(todo.dueDate), "PPPPp");
    todoDueDate.hidden = true;

    let todoPriority = document.createElement("p");
    todoPriority.textContent = "Priority level: " + todo.priority;
    todoPriority.hidden = true;

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "finished";
    deleteButton.classList.add("finished");
    deleteButton.addEventListener("click", () => {
      currentTodo.remove();
      projects[getCurrentId()].deleteTodo(todo.id);
      saveProjects();
    });
    let showButton = document.createElement("button");
    showButton.textContent = "expand";
    showButton.classList.add("show");
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

    currentTodo.appendChild(todoTitle);
    if (todoDescription.textContent !== "Description: ") currentTodo.appendChild(todoDescription);
    for (const el of [todoDueDate, todoPriority, deleteButton, showButton]) {
      currentTodo.appendChild(el);
    }

    if (todo.priority === "high") {
      currentTodo.style.border = "solid red 3px";
    } else if (todo.priority === "medium") {
      currentTodo.style.border = "solid orange 3px";
    } else {
      currentTodo.style.border = "solid lightblue 3px";
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
  let currentProject = projects[getCurrentId()];
  e.preventDefault();
  const formData = new FormData(form);
  let newTodo = new todo(formData.get("title"), formData.get("description"), formData.get("due-date"), formData.get("drone"));
  currentProject.addTodo(newTodo);
  
  saveProjects();
  form.reset();
  dialog.close();
  updateDisplay();
});

export default updateDisplay;