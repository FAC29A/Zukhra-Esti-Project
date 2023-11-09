//First test group: Modal open and close

test("Opening and closing the modal", () => {
    const modal = document.getElementById("modal");
    const openModalBtn = document.getElementById("open-modal-btn");
    // Click the open button to open the modal
    openModalBtn.click();
    equal(modal.style.display, "block", "Modal should be open");
    const closeModalBtn = document.getElementById("close-modal");
    // Click the open button to close the modal
    closeModalBtn.click();
    equal(modal.style.display, "none", "Modal should be closed");
});

// Secod test group: Create a task elements finctionality
test("Create task element with name, description, and priority", () => {
    const taskName = "Test Task";
    const taskDescription = "This is a test task";
    const priority = "High";

    const taskElement = createTaskElement(taskName, taskDescription, priority);

    // Check the structure and content of the task element
    equal(taskElement.classList.contains("task-content"), true, "Task element has the 'task-content' class");
    equal(taskElement.innerHTML.includes("<h3>Test Task</h3>"), true, "Task name is present");
    equal(taskElement.innerHTML.includes("<p>This is a test task</p>"), true, "Description is present");
    equal(taskElement.querySelector('.highlight-text').textContent, 'High', "Priority is present");

});


test("Create task element with name and priority only", () => {
    const taskName = "Test Task";
    const priority = "High";
    const taskElement = createTaskElement(taskName, "", priority);
    // Check the structure and content of the task element
    equal(taskElement.classList.contains("task-content"), true, "Task element has the 'task-content' class");
    equal(taskElement.innerHTML.includes("<h3>Test Task</h3>"), true, "Task name is present");
    notEqual(taskElement.innerHTML.includes("<p>Description:"), true, "Description is not present");
    equal(taskElement.querySelector('.highlight-text').textContent, 'High', "Priority is present");
});

//Third test group: Add task finctionality
test("Add task with an empty name", () => {
    // Mocking the input values
    taskNameInput.value = "";
    taskDescriptionTextarea.value = "This is a test task";
    prioritySelect.value = "Medium";

    // Running the addTask function
    addTask();

    // Checking if no task has been added to the task list
    const taskList = document.getElementById("to-do");
    const taskElements = taskList.getElementsByClassName("task-content");

    equal(taskElements.length, 0, "No task added with an empty name");
});

test("Add task with a whitespace-only name", () => {
    // Mocking the input values
    taskNameInput.value = "   ";
    taskDescriptionTextarea.value = "This is a test task";
    prioritySelect.value = "Low";

    // Running the addTask function
    addTask();

    // Checking if no task has been added to the task list
    const taskList = document.getElementById("to-do");
    const taskElements = taskList.getElementsByClassName("task-content");

    equal(taskElements.length, 0, "No task added with a whitespace-only name");
});


test("Add task with a valid name and priority", () => {
    // Mocking the input values
    taskNameInput.value = "Test Task";
    taskDescriptionTextarea.value = "This is a test task";
    prioritySelect.value = "Important";

    // Running the addTask function
    addTask();

    // Checking if the task has been added to the task list
    const taskList = document.getElementById("to-do");
    const taskElements = taskList.getElementsByClassName("task-content");

    equal(taskElements.length, 1, "Task has been added to the task list");
    // Remove created task
    Array.from(taskElements).forEach((element) => element.remove());
});


//****************************************************/ Third test: Drag and drop functionality
// Define your test cases
test("onDragStart should set dataTransfer correctly", () => {
    // Create a dynamic task element
    const taskElement = document.createElement("div");
    taskElement.id = "task-1";

    const event = {
        target: taskElement,
        dataTransfer: {
            setData: function (type, value) {
                equal(type, "text/plain", 'DataTransfer type should be "text/plain"');
                equal(value, "task-1", "DataTransfer value should be set correctly");
            },
        },
    };

    onDragStart(event);
});

test("onDrop should move the task to the appropriate section", () => {
    // Create dynamic task elements
    const draggableElement = document.createElement("div");
    draggableElement.id = "task-2";

    const dropzone = document.createElement("div");
    dropzone.id = "section-2";

    // Simulate the dynamic task creation by adding them to the document
    document.body.appendChild(draggableElement);
    document.body.appendChild(dropzone);

    const event = {
        dataTransfer: {
            getData: function (type) {
                equal(type, "text", 'DataTransfer type should be "text"');
                return "task-2";
            },
        },
        target: dropzone,
    };

    onDrop(event);

    equal(
        draggableElement.parentElement,
        dropzone,
        "Task should be moved to the appropriate section"
    );
});

//****************************************************/ Forth test: Delete functionality

test('onDrop should delete the task if dropped into the "delete" bin', () => {
    // Create a dynamic task element
    const draggableElement = document.createElement("div");
    draggableElement.id = "task-3";

    const deleteBin = document.createElement("div");
    deleteBin.id = "delete";

    // Simulate the dynamic task creation by adding them to the document
    document.body.appendChild(draggableElement);
    document.body.appendChild(deleteBin);

    const event = {
        dataTransfer: {
            getData: function (type) {
                equal(type, "text", 'DataTransfer type should be "text"');
                return "task-3";
            },
        },
        target: deleteBin,
    };

    draggableElement.remove = function () {
        equal(
            draggableElement.parentElement,
            null,
            'Task should be removed when dropped into the "delete" bin'
        );
    };

    onDrop(event);
});
