// get elements
let taskform = document.querySelector("#task-form");
let taskstable = document.querySelector("table.new-tasks");
let completedtable = document.querySelector("table.completed-tasks");

let icons = [
  "<i class='fas fa-cogs'></i>",
  "<i class='fas fa-edit'></i>",
  "<i class='far fa-file-alt'></i>",
  "<i class='fas fa-atlas'></i>"
];
// on page load Tasks
let task = {};

// event listeners
taskform.addEventListener("submit", (e) => {
  e.preventDefault();
  getTask();
})

taskstable.addEventListener("change", (e) => {
  console.log(e);
  console.log(e.target);
  taskCompleted(e.target);
});

completedtable.addEventListener("click", (e) => {
  if(e.target.classList.contains("delete-task")) {
    removeCompletedTask(e.target);
  }
})

// General Functions for adding, moving and removing To-Dos

function getTask() {
  let thetask = document.querySelector("#task");
  let thetype = document.querySelector("#type");
  task = {
    task: thetask.value,
    type: thetype.value
  };
  console.log(task);
  createNewTask();
  thetask.value = "";
}

function createNewTask() {
  let tasktable = document.querySelector(".new-tasks");
  let newrow = tasktable.insertRow();
  let output = `
      <td> ${icons[task.type]} </td>
      <td class="task-text"> ${task.task} </td>
      <td><input type="checkbox" class="check-completed"></td>
  `;
  newrow.innerHTML = output;
  alertUser("primary", "New task added, GANBATE BANZAI!")
}
function removeCompletedTask(el) {
  let therow = el.closest("tr");
  fadeOut(therow, true);
  alertUser("danger", "Completed task removed!");
}

function taskCompleted(task) {
  let row = task.closest("tr")
  let tasktext = row.querySelector(".task-text").textContent;
  fadeOut(row, true);
  createCompletedTask(tasktext);
}

function createCompletedTask(tasktext) {
  let newrow = completedtable.insertRow();
  let thetime = new Date().toISOString().split('T')[0];
  let output = `
      <td> ${thetime} </td>
      <td class="task-text"> ${tasktext} </td>
      <td><button type="button" class="btn btn-outline-danger btn-small delete-task">X</button></td>
  `;
  newrow.innerHTML = output;
  alertUser("success", "Great work!");
}


function alertUser(theclass, msg) {
  let thealert = document.querySelector(".alert");
  thealert.classList = "alert alert-" + theclass;
  thealert.innerText = msg;
  thealert.style.opacity = "1";
  setTimeout(()=> {
    thealert.style.opacity = "0";
  }, 2000);
}

// helper functions


function fadeIn(el) {
  el.style.display = "initial";
  setTimeout(function() {
    el.style.opacity = "1";
  }, 10);
}

function fadeOut(el,remove = false) {
  el.style.opacity = "0";
  setTimeout(function() {
    if(remove = true) {
      el.remove();
    } else {
      el.style.display = "none";
    }
  }, 300);
}
