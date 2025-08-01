import "./styles.css";
import updateDisplay from "./display.js";

export class todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = crypto.randomUUID();
  }
}

export class project {
  constructor(name, todos) {
    this.name = name;
    this.todos = todos;
    this.id = crypto.randomUUID();
  }

  addTodo(newTodo) {
    this.todos.push(newTodo);
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((t) => t.id != id);
  }
}

export let projects = {};
let currentId;

export function getCurrentId() {
  return currentId;
}

export function setCurrentId(id) {
  currentId = id;
}

//setup first project
if (localStorage.getItem("projects") !== null) {
  currentId = localStorage.getItem("currentId");
  let projectList = JSON.parse(localStorage.getItem("projects"));
  for (let [id, proj] of Object.entries(projectList)) {
    for (let func of Object.getOwnPropertyNames(project.prototype)) {
      if (func !== "constructor" && typeof project.prototype[func] === "function") {
        proj[func] = project.prototype[func];
      }
    }
    projects[id] = proj;
  }
} else {
  let firstProject = new project("My first project", []);
  projects[firstProject.id] = firstProject;
  currentId = firstProject.id;
}

export function saveProjects() {
  localStorage.setItem("currentId", currentId);
  localStorage.setItem("projects", JSON.stringify(projects));
}

let dropdownButton = document.getElementById("dropdown-button");
let menu = document.getElementById("menu");
dropdownButton.classList.add("opened");
dropdownButton.onclick = function() {
  dropdownButton.classList.toggle("opened");
  if (menu.style.visibility === "hidden") {
    menu.style.visibility = "visible";
  } else {
    menu.style.visibility = "hidden";
  }
};

let darkmode = document.getElementById("darkmode");
darkmode.onclick = function() {
  let main = document.querySelector("main");
  main.classList.toggle("dark");
};

updateDisplay();