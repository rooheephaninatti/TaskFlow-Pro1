let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

displayTasks();

function saveTasks() {
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {

let input = document.getElementById("taskInput");

let text = input.value.trim();

if(text === ""){
alert("Enter a task");
return;
}

tasks.push({
id: Date.now(),
text: text,
completed: false
});

input.value = "";

saveTasks();
displayTasks();
}

function displayTasks() {

let taskList = document.getElementById("taskList");

taskList.innerHTML = "";

let filtered = tasks.filter(task => {

if(currentFilter === "active")
return !task.completed;

if(currentFilter === "completed")
return task.completed;

return true;
});

filtered.forEach(task => {

let li = document.createElement("li");

li.className =
task.completed ? "task completed" : "task";

li.innerHTML = `

<span>${task.text}</span>

<div class="task-buttons">

<button class="complete"
onclick="toggleTask(${task.id})">
<i class="fas fa-check"></i>
</button>

<button class="edit"
onclick="editTask(${task.id})">
<i class="fas fa-pen"></i>
</button>

<button class="delete"
onclick="deleteTask(${task.id})">
<i class="fas fa-trash"></i>
</button>

</div>
`;

taskList.appendChild(li);
});

updateCount();
}

function toggleTask(id){

tasks = tasks.map(task =>
task.id === id
? {...task, completed: !task.completed}
: task
);

saveTasks();
displayTasks();
}

function deleteTask(id){

tasks = tasks.filter(task =>
task.id !== id
);

saveTasks();
displayTasks();
}

function editTask(id){

let task = tasks.find(t => t.id === id);

let newText = prompt(
"Edit Task",
task.text
);

if(newText){

task.text = newText;

saveTasks();
displayTasks();
}
}

function clearCompleted(){

tasks = tasks.filter(task =>
!task.completed
);

saveTasks();
displayTasks();
}

function filterTasks(type,btn){

currentFilter = type;

document
.querySelectorAll(".filter")
.forEach(button =>
button.classList.remove("active")
);

btn.classList.add("active");

displayTasks();
}

function updateCount(){

let count =
tasks.filter(task =>
!task.completed
).length;

document.getElementById("taskCount")
.innerText =
count + " Tasks Left";
}