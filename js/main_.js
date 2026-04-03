const toggleBtn = document.getElementById('toggle-mode');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  const isDark = document.body.classList.contains('dark-mode');

  toggleBtn.innerHTML = isDark
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
});
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function addTask() {
  const input = document.getElementById('taskInput');
  const category = document.getElementById('taskCategory');
  const date = document.getElementById('taskDate');

  if (!input.value.trim()) return;

  const task = {
    id: Date.now(),
    name: input.value,
    category: category.value,
    date: date.value || "",
    done: false
  };

  tasks.push(task);

  input.value = "";
  date.value = "";

  saveTasks();
  render();

  input.focus();
}
function render(list = tasks) {
  const container = document.getElementById('taskList');
  container.innerHTML = "";

  list.forEach(task => {
    container.innerHTML += `
      <li class="category-${task.category} ${task.done ? 'done' : ''}">
        
        <span onclick="toggleTask(${task.id})">
          ${task.name} ${task.date ? "(" + task.date + ")" : ""}
        </span>

        <span class="delete" onclick="deleteTask(${task.id})">
          🗑
        </span>

      </li>
    `;
  });

  const active = tasks.filter(t => !t.done).length;

  document.getElementById('count').innerText =
    `${active} active / ${tasks.length} total`;
}
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  task.done = !task.done;

  saveTasks();
  render();
}
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);

  saveTasks();
  render();
}
function clearAll() {
  tasks = [];

  saveTasks();
  render();
}
function searchTasks() {
  const value = document
    .getElementById('searchInput')
    .value
    .toLowerCase();

  const filtered = tasks.filter(t =>
    t.name.toLowerCase().includes(value) ||
    t.category.toLowerCase().includes(value)
  );

  render(filtered);
}
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}