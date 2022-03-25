import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./main.css";
import storage from "./storage.js";

const tasks = storage.getTasks();
let ID = storage.getLastID(tasks);

function InputField(props) {
  return (
    <input
      type="text"
      className="todo_list__input"
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  );
}

function AddTaskButton() {
  return (
    <button className="todo_list__add_button">
      <img
        className="todo_list__add_button_icon"
        src="./src/img/add-icon.svg"
        alt="Добавить"
      />
    </button>
  );
}

function TaskCreateForm(props) {
  const [value, setValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const task = {
      id: ++ID,
      check: false,
      priority: props.priority,
      text: value
    };

    props.saveTask([...props.tasks, task]);
    event.target.reset();
    setValue("");
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <form className="todo_list__add_task" onSubmit={handleSubmit}>
      <InputField
        placeholder={
          props.priority === "high" ? "Добавить важных дел" : "Добавить"
        }
        onChange={handleChange}
      />
      <AddTaskButton />
    </form>
  );
}

function Task(props) {
  const taskIndex = props.tasks.map(task => task.id).indexOf(props.task.id);
  const tasks = [...props.tasks];
  const check = props.task.check;

  function checkboxHandler(event) {
    tasks[taskIndex].check = !check;
    props.setTasks(tasks);
  }

  function deleteButtonHandler(event) {
    tasks.splice(taskIndex, 1);
    props.setTasks(tasks);
  }

  return (
    <div className={check ? "todo_list__task Done" : "todo_list__task"}>
      <span className={check ? "circle" : "circle display_none"}></span>
      <input
        type="checkbox"
        className="todo_list__checkbox"
        onClick={checkboxHandler}
      />
      <span className="todo_list__input">{props.task.text}</span>
      <button
        className="todo_list__delete_button"
        onClick={deleteButtonHandler}
      >
        <img
          className="todo_list__delete_button_icon"
          src="./src/img/add-icon.svg"
        />
      </button>
    </div>
  );
}

function PrioritySection(props) {
  const filteredTasksByPriority = props.tasks.filter(
    task => task.priority === props.name
  );

  return (
    <section id={props.name} className="todo_list__section">
      <h2 className="todo_list__title">{props.name}</h2>
      <TaskCreateForm
        saveTask={props.setTasks}
        priority={props.name}
        tasks={props.tasks}
      />
      {filteredTasksByPriority.map(task => (
        <Task
          key={task.id}
          task={task}
          tasks={props.tasks}
          setTasks={props.setTasks}
        />
      ))}
    </section>
  );
}

function ToDoList(props) {
  const [tasks, setTasks] = useState(props.tasks);
  window.onunload = storage.saveTasks(tasks);
  return (
    <div className="todo_list">
      <PrioritySection name="high" tasks={tasks} setTasks={setTasks} />
      <PrioritySection name="low" tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

function App() {
  return <ToDoList tasks={tasks} />;
}

export default App;
