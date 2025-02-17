// 获取DOM元素
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const totalTasksSpan = document.getElementById('totalTasks');
const completedTasksSpan = document.getElementById('completedTasks');

// 从localStorage加载任务
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// 更新统计信息
function updateStats() {
    totalTasksSpan.textContent = tasks.length;
    const completedCount = tasks.filter(task => task.completed).length;
    completedTasksSpan.textContent = completedCount;
}

// 保存任务到localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateStats();
}

// 创建新任务元素
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
        <span class="task-text">${task.text}</span>
        <button class="delete-task">删除</button>
    `;

    // 复选框事件监听
    const checkbox = li.querySelector('.task-checkbox');
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        li.classList.toggle('completed');
        saveTasks();
    });

    // 删除按钮事件监听
    const deleteButton = li.querySelector('.delete-task');
    deleteButton.addEventListener('click', () => {
        const index = tasks.indexOf(task);
        tasks.splice(index, 1);
        li.remove();
        saveTasks();
    });

    return li;
}

// 添加新任务
function addTask(text) {
    if (text.trim() === '') return;

    const task = {
        text: text,
        completed: false
    };

    tasks.push(task);
    taskList.appendChild(createTaskElement(task));
    saveTasks();
}

// 添加按钮点击事件
addTaskButton.addEventListener('click', () => {
    addTask(taskInput.value);
    taskInput.value = '';
});

// 回车键添加任务
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask(taskInput.value);
        taskInput.value = '';
    }
});

// 初始化显示已保存的任务
tasks.forEach(task => {
    taskList.appendChild(createTaskElement(task));
});

// 初始化统计信息
updateStats();