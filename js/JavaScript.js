// Get references to DOM elements
const modal = document.getElementById("modal");
const newTask = document.getElementById("newTask");
const openModalBtn = document.getElementById("open-modal-btn");
const openTaskBtn = document.getElementById("add-task-modal");
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
// ***********************************************************************
// Function to create a task element
function createTaskElement(taskName, taskDescription, priority) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("newTask");
    taskElement.draggable = true;

      // Set the ondragstart attribute
  taskElement.ondragstart = function (event) {
    dragStart(event);
  };

  // Set the ondrag attribute
  taskElement.ondrag = function (event) {
    dragging(event);
  };

    // Add 'dragstart' event listener to the task element
    taskElement.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', 'This is a draggable div');
    });

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
function dragStart(event) {
    event.dataTransfer.setData("Div", event.target.id);
  }
  
  
  
  function allowDrop(event) {
    event.preventDefault();
  }
  
  function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("Div");
    event.target.appendChild(document.getElementById(data));
  }

  function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("Div");
  const draggedDiv = document.getElementById(data);

  // Get the parent element of the 'in-progress' div
  const parentElement = event.target.parentElement;

  // Insert the dragged div after the 'in-progress' div
  parentElement.insertBefore(draggedDiv, event.target.nextSibling);
}

  // Function to open the task
function openTask() {
    newTask.style.display = "block";
}

// Event listener to open task button
openTaskBtn.addEventListener("click", function (event) {
    event.preventDefault();
  
    openTask();
});
