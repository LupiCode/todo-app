document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from server
    fetch('http://localhost:3000/api/tasks')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach((task, index) => {
                addTaskToDOM(task, index);
            });
        });

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskText = taskInput.value;

        // Add task to server
        fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: taskText }),
        })
        .then(response => response.json())
        .then(task => {
            addTaskToDOM(task, taskList.children.length);
        });

        taskInput.value = '';
    });

    function addTaskToDOM(task, index) {
        const li = document.createElement('li');
        li.textContent = task.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

        deleteBtn.addEventListener('click', () => {
            // Delete task from server
            fetch(`http://localhost:3000/api/tasks/${index}`, {
                method: 'DELETE',
            })
            .then(() => {
                taskList.removeChild(li);
            });
        });
    }
});
