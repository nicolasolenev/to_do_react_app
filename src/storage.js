function getTasks() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

function getLastID(tasks) {
  const arrOfID = tasks.map(task => task.id);
  const maxID = Math.max(...arrOfID);
  return maxID < 0 ? 0 : maxID;
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export default {
  getTasks,
  getLastID,
  saveTasks
}