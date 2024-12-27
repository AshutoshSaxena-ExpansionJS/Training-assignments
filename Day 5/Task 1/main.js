document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('searchInput').addEventListener('input', debounce(searchTasks, 300));
document.addEventListener('DOMContentLoaded', loadTasks);

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const task = {
            id: Date.now(),
            text: taskInput.value,
            completed: false
        };
        saveTask(task);
        renderTask(task);
        taskInput.value = '';
    }
}

function renderTask(task) {
    const taskList = document.getElementById('taskList');

    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-4 task-item';
    colDiv.dataset.id = task.id;

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card mb-3';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const taskText = document.createElement('p');
    taskText.className = 'card-text';
    taskText.textContent = task.text;
    if (task.completed) {
        taskText.classList.add('completed');
    }

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm float-right';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        removeTask(task.id);
        taskList.removeChild(colDiv);
    });

    taskText.addEventListener('click', () => {
        taskText.classList.toggle('completed');
        updateTask(task.id, { completed: taskText.classList.contains('completed') });
    });

    cardBody.appendChild(taskText);
    cardBody.appendChild(deleteButton);
    cardDiv.appendChild(cardBody);
    colDiv.appendChild(cardDiv);
    taskList.appendChild(colDiv);
}

function saveTask(task) {
    const tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    const tasks = getTasksFromStorage();
    tasks.forEach(renderTask);
}

function removeTask(taskId) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(taskId, updates) {
    const tasks = getTasksFromStorage();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function searchTasks() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const taskItems = document.querySelectorAll('.task-item');

    taskItems.forEach((taskItem) => {
        const taskText = taskItem.querySelector('.card-text').textContent.toLowerCase();
        if (taskText.includes(searchInput)) {
            taskItem.style.display = '';
        } else {
            taskItem.style.display = 'none';
        }
    });
}
