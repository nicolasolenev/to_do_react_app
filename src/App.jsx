import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

const tasks = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];

let ID = !tasks.length
  ? 0
  : localStorage.getItem("id")
  ? JSON.parse(localStorage.getItem("id"))
  : 0;

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

function AddTaskButton(props) {
  return (
    <button className={props.className}>
      <img
        className={props.img.className}
        src={props.img.src}
        alt={props.img.alt}
      />
    </button>
  );
}

function TaskCreateForm(props) {
  const [value, setValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    props.saveTask(
      [].concat(props.tasks, {
        id: ID++,
        check: false,
        priority: props.priority,
        text: value
      })
    );
    event.target.reset();
    setValue("");
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <form className="todo_list__add_task" onSubmit={handleSubmit}>
      <InputField placeholder="Добавить важных дел" onChange={handleChange} />
      <AddTaskButton
        className="todo_list__add_button"
        img={{
          className: "todo_list__add_button_icon",
          src: "./src/img/add-icon.svg",
          alt: "Добавить"
        }}
      />
    </form>
  );
}

function Task(props) {
  const taskIndex = props.tasks.map(task => task.id).indexOf(props.task.id);
  const tasks = [].concat(props.tasks);

  function checkboxHandler(event) {
    tasks[taskIndex].check = !props.task.check;
    props.setTasks(tasks);
  }

  function deleteButtonHandler(event) {
    tasks.splice(taskIndex, 1);
    props.setTasks(tasks);
  }

  return (
    <div
      className={props.task.check ? "todo_list__task Done" : "todo_list__task"}
    >
      <span
        className={props.task.check ? "circle" : "circle display_none"}
      ></span>
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
  return (
    <section id={props.name} className="todo_list__section">
      <h2 className="todo_list__title">{props.name}</h2>
      <TaskCreateForm
        saveTask={props.setTasks}
        priority={props.name}
        tasks={props.tasks}
      />
      {props.tasks
        .filter(task => task.priority === props.name)
        .map(task => (
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

  window.onunload = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("id", ID);
  };

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
