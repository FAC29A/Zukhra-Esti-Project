// Get references to DOM elements
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("open-modal-btn");
const closeModalBtn = document.getElementById("close-modal");
const addTaskModalBtn = document.getElementById("add-task-modal");
const taskNameInput = document.getElementById("task-name");
const taskDescriptionTextarea = document.getElementById("task-description");
const prioritySelect = document.getElementById("priority");
const toDo = document.getElementById("to-do");
const addTaskInput = document.getElementById("add-task");

// Function to open the modal
function openModal() {
    modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
}

// Function to clear input fields
function clearInputFields() {
    taskNameInput.value = "";
    addTaskInput.value = "";
    taskDescriptionTextarea.value = "";
}

// Function to create a task element
function createTaskElement(taskName, taskDescription, priority) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task-content");
    taskElement.draggable = true;
    taskElement.innerHTML = `<h3>${taskName}</h3>`;

    if (taskDescription.trim() !== "") {
        taskElement.innerHTML += `<p>Description: ${taskDescription}</p>`;
    }

    if (priority.trim() !== "") {
        taskElement.innerHTML += `<p>Priority: ${priority}</p>`;
    }

    return taskElement;
}

// Function to add a task from the modal
function addTask()  {
    const taskName = taskNameInput.value;
    const taskDescription = taskDescriptionTextarea.value;
    const priority = prioritySelect.value;

    if (taskName.trim() !== "") {
        const taskElement = createTaskElement(taskName, taskDescription, priority);

        // Add the task to the task list
        toDo.appendChild(taskElement);

        // Clear input fields
        clearInputFields();

        // Close the modal
        closeModal();
    }
}

// Event listener to open modal button
openModalBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const taskName = addTaskInput.value;
    taskNameInput.value = taskName;
    openModal();
});

// Event listener to close the modal
closeModalBtn.addEventListener("click", closeModal);

// Event listener to add a task from the modal
addTaskModalBtn.addEventListener("click", addTask);

//*****************************************************transfer the task to another place by dragging

const draggable = document.querySelectorAll('.task-content');
const inProgress = document.querySelector('.in-progress');

// Add 'dragstart' event listener to each task container
draggable.forEach((taskElement) => {
    taskElement.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', 'This is a draggable div');
    });
});
// Add 'dragover' event listener to the target container to allow dropping
inProgress.addEventListener('dragover', (e) => {
    e.preventDefault(); // Allow dropping
});

// Add 'drop' event listener to the target container
inProgress.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    inProgress.appendChild(draggable); // Move the draggable element to the target container
});