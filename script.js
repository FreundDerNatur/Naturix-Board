
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const taskNameInput = document.getElementById("taskName");
const taskTimeInput = document.getElementById("taskTime");
const timeline = document.getElementById("timeline");

let tasks = JSON.parse(localStorage.getItem("naturix_tasks") || "[]");

function saveTasks() {
    localStorage.setItem("naturix_tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";
    timeline.innerHTML = "";
    const startHour = 6;
    const endHour = 22;
    const totalMinutes = (endHour - startHour) * 60;

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        const done = task.done ? "task-done" : "";
        li.innerHTML = \`<input type="checkbox" \${task.done ? "checked" : ""} onchange="toggleDone(\${index})"> 
                         <span class="\${done}">\${task.name} (\${new Date(task.time).toLocaleString("de-AT")})</span>\`;
        taskList.appendChild(li);

        const taskDate = new Date(task.time);
        const taskMinutes = taskDate.getHours() * 60 + taskDate.getMinutes();
        const minutesSinceStart = taskMinutes - (startHour * 60);
        const percentFromLeft = (minutesSinceStart / totalMinutes) * 100;
        const widthPercent = 5;

        if (percentFromLeft >= 0 && percentFromLeft <= 100) {
            const bar = document.createElement("div");
            bar.className = "task-bar";
            bar.style.left = percentFromLeft + "%";
            bar.style.width = widthPercent + "%";
            bar.style.top = (index * 35) + "px";
            bar.textContent = task.name;
            timeline.appendChild(bar);
        }
    });
}

function toggleDone(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = {
        name: taskNameInput.value,
        time: taskTimeInput.value,
        done: false
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskForm.reset();
});

function updateTime() {
    const now = new Date();
    document.getElementById("timeDisplay").textContent = "Aktuelle Zeit: " + now.toLocaleString("de-AT");
}

setInterval(updateTime, 1000);
updateTime();
renderTasks();
