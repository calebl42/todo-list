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
  }

  addTodo(newTodo) {
    this.todos.push(newTodo);
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((t) => t.id != id);
  }
}

let currentIndex = 0;

export function getCurrentIndex() {
  return currentIndex;
}

export function setCurrentIndex(index) {
  currentIndex = index;
}

//setup first project
export let projects = [new project("My first project", [])];
setCurrentIndex(0);
let firstProjectButton = document.querySelector(".first-project");
firstProjectButton.addEventListener("click", () => {
  currentIndex = 0;
  updateDisplay();
});

updateDisplay();


