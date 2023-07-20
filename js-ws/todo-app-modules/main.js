import { Cache } from './cache.js';
import { getLocation } from './geolocation.js';

document.addEventListener('DOMContentLoaded', (event) => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    let tasks = Cache.load();
    tasks.forEach((task, index) => addTaskToList(task, index));

    addTaskButton.addEventListener('click', async () => {
        const task = taskInput.value;
        if (task) {
            let location;
            try {
                location = await getLocation();
            } catch (error) {
                location = { lat: null, long: null };
            }
            const taskWithLocation = { task, location };
            tasks.push(taskWithLocation);
            Cache.save(tasks);
            addTaskToList(taskWithLocation, tasks.length - 1);
            taskInput.value = '';
        }
    });

    function addTaskToList(taskObj, index) {
        const li = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = `${taskObj.task} (Location: ${taskObj.location.lat?.toFixed(2) || 'unknown'}, ${taskObj.location.long?.toFixed(2) || 'unknown'})`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            tasks = tasks.filter((task, idx) => idx !== index);
            Cache.save(tasks);
            taskList.removeChild(li);
        });

        li.appendChild(taskText);
        li.appendChild(deleteButton);
        taskList.appendChild(li);

        taskText.addEventListener('dblclick', () => {
            const input = document.createElement('input');
            input.type = "text";
            input.value = taskObj.task;
            input.size = Math.max(taskObj.task.length / 2, 4);
            li.insertBefore(input, taskText);
            li.removeChild(taskText);
            input.focus();

            input.addEventListener('blur', () => saveEdit(taskObj, input, taskText, li,index));
            input.addEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    saveEdit(taskObj, input, taskText, li,index);
                }
            });
        });
    }

    function saveEdit(taskObj, input, taskText, li,index) {
        taskObj.task = input.value;
        tasks[index] = taskObj;
        Cache.save(tasks);
        taskText.textContent = `${taskObj.task} (Location: ${taskObj.location.lat?.toFixed(2) || 'unknown'}, ${taskObj.location.long?.toFixed(2) || 'unknown'})`;
        li.insertBefore(taskText, input);
        li.removeChild(input);
    }
});
