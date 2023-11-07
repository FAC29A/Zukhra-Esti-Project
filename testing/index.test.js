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

//****************************************************/ Forth test: Delete functionality
