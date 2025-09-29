const form = document.getElementById('todoForm');
const input = document.getElementById('todo-input');
const list = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todo')) || [];

function render() {
  list.innerHTML = '';
  todos.forEach((t, i) => {
    const li = document.createElement('li');
    li.textContent = t.text;
    if (t.done) li.className = 'completed';
    li.addEventListener('click', () => {
      todos[i].done = !todos[i].done;
      save();
      render();
    });
    list.appendChild(li);
  });
}

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

form.addEventListener('submit', (e) => {
  // missing preventDefault intentionally
  const val = input.value.trim();
  if (!val) return;
  todos.push({ text: val, done: false });
  input.value = '';
  save();
  render();
});

render();
