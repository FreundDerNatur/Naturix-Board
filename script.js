
const tasks = [
    { name: "Sockel schleifen", deadline: "2025-04-03T10:00:00" },
    { name: "Gravurtest durchführen", deadline: "2025-04-03T14:00:00" },
    { name: "COMPLEX Hartöl auftragen", deadline: "2025-04-03T17:00:00" }
];

function updateTime() {
    const now = new Date();
    document.getElementById("timeDisplay").textContent = "Aktuelle Zeit: " + now.toLocaleString("de-AT");
}

function findNextDeadline() {
    const now = new Date();
    return tasks
        .map(task => ({ ...task, date: new Date(task.deadline) }))
        .filter(task => task.date > now)
        .sort((a, b) => a.date - b.date)[0];
}

function updateCountdown() {
    const deadline = findNextDeadline();
    if (!deadline) {
        document.getElementById("nextDeadline").textContent = "Keine offenen Deadlines.";
        document.getElementById("countdown").textContent = "";
        return;
    }
    document.getElementById("nextDeadline").textContent = `${deadline.name} um ${deadline.date.toLocaleString("de-AT")}`;
    const now = new Date();
    const diffMs = deadline.date - now;
    const minutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(minutes / 60);
    const restMinutes = minutes % 60;
    document.getElementById("countdown").textContent = `Noch ${hours}h ${restMinutes}min`;
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = `${task.name} (${new Date(task.deadline).toLocaleString("de-AT")})`;
        list.appendChild(li);
    });
}

setInterval(updateTime, 1000);
setInterval(updateCountdown, 60000);
updateTime();
updateCountdown();
renderTasks();
