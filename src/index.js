import "./styles.css";
import updateDisplay from "./display.js";

export class todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

class project {
  constructor(name, todos) {
    this.name = name;
    this.todos = todos;
  }
}

export let currentProject = new project("My first project", []);
updateDisplay();


