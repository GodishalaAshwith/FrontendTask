
const form = document.getElementById('todoForm');
const input = document.getElementById('todo-input');
const list = document.getElementById('todos');

// Use the SAME key everywhere: "todos"
const todos = JSON.parse(localStorage.getItem('todos')) || [];

function render() {
  list.innerHTML = '';
  todos.forEach((t, i) => {
    const li = document.createElement('li');
    li.textContent = t.text;

    if (t.done) {
      li.classList.add('completed');
    }

    // Toggle completion when clicked
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
  e.preventDefault(); // prevent page reload
  const val = input.value.trim();
  if (!val) return;

  todos.push({ text: val, done: false });
  input.value = '';
  save();
  render();
});

// Initial render
render();

