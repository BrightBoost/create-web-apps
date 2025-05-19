
---

## ✅ Goal

* Add a small ❌ "delete" button on each task.
* When clicked, the task is removed from the DOM and localStorage.

---

## ✏️ Code Changes

### ✅ Step 1: Update `createTaskElement` to add a delete button

Modify this part of your function:

```js
function createTaskElement(text, id = Date.now().toString()) {
    const task = document.createElement('div');
    task.className = 'task';
    task.dataset.id = id;
    task.draggable = true;

    const span = document.createElement('span');
    span.textContent = text;
    task.appendChild(span);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
        task.remove();
        deleteTaskFromStorage(id);
    });

    task.appendChild(deleteBtn);

    task.addEventListener('dragstart', (e) => {
        draggedTask = task;
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => task.classList.add('hidden'), 0);
    });

    task.addEventListener('dragend', () => {
        draggedTask = null;
        task.classList.remove('hidden');
        saveTasks();
    });

    return task;
}
```

---

### ✅ Step 2: Add a helper to delete from localStorage

Below your `saveTasks` and `loadTasks`, add:

```js
function deleteTaskFromStorage(id) {
    const tasks = JSON.parse(localStorage.getItem('kanbanTasks')) || [];
    const updated = tasks.filter(task => task.id !== id);
    localStorage.setItem('kanbanTasks', JSON.stringify(updated));
}
```

---

### ✅ Step 3: (Optional) Add some CSS for the delete button

In your CSS file (`style.css`), add:

```css
.delete-btn {
    background: transparent;
    border: none;
    color: #888;
    font-size: 16px;
    margin-left: auto;
    cursor: pointer;
    transition: color 0.2s ease;
}

.delete-btn:hover {
    color: #d11a2a;
}

.task {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

---

### 🎉 Result

Each task now has a tiny ❌ button. Clicking it will:

* Remove the task from the board.
* Update localStorage.
* Work across page reloads.

---

Let me know if you’d like to add:

* A confirmation dialog before deleting
* Keyboard accessibility
* Undo deletion

Happy to help build it out!
