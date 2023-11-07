console.log("tests");
//********************************************************/ First test: Modal open and close

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

//****************************************************/ Secod test: Add task finctionality

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
