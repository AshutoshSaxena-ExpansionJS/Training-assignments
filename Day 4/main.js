document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('searchInput').addEventListener('input', debounce(searchTasks, 1000));

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
        const colDiv = document.createElement('div');
        colDiv.className = 'col-md-4 task-item';

        const cardDiv = document.createElement('div');
        cardDiv.className = 'card mb-3';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const taskText = document.createElement('p');
        taskText.className = 'card-text';
        taskText.textContent = taskInput.value;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm float-right';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(colDiv);
        });

        taskText.addEventListener('click', () => {
            taskText.classList.toggle('completed');
        });

        cardBody.appendChild(taskText);
        cardBody.appendChild(deleteButton);
        cardDiv.appendChild(cardBody);
        colDiv.appendChild(cardDiv);
        taskList.appendChild(colDiv);
        taskInput.value = '';
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
