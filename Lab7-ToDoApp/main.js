
document.addEventListener("DOMContentLoaded",function () {

  let alertBox = document.querySelector(".alert");
  let submit = document.querySelector("#submit");

  // alertBox.style.display ="none";

  submit.addEventListener("click", function(e) {
    e.preventDefault()
    addNewTask()
  });

  function addNewTask() {
    let n_task = document.querySelector("#task").value;
    let n_activity = document.querySelector("#activity").value;
    let icon = `<i class="fas fa-book-open"></i>`
    switch(n_activity){
      case 'General':
        icon = `<!-- <i class="fas fa-cogs mr-1"></i>`;
        break;
      case 'Side-quest':
        icon = `<i class="fas fa-question-circle"></i> -->`;
        break;
      default:
        break;
    }
    let tbod = document.querySelector("tbody");
    let newrow = tbod.insertRow();
    let output =`
    <td>${icon}</td>
    <td>${n_task}</td>
    <td><input type="checkbox" class="completed task"</td>
    `;
    newrow.innerHTML = output;
    outputAlert("success","add successfully");
  }

  let completeTasks = document.querySelector(".table.completed")
  let active = document.querySelector(".table.active")

  active.addEventListener('change', function(e) {
    completeTask(e.target)
  })

  function completeTask(targ){
    let row = targ.closest("tr")
    fadeOut(row, true);

    let inserted = completeTasks.insertRow();
    let completed = `
        <td> ${row.children[0].innerHTML} </td>
        <td class="task-text"> ${row.children[1].innerText} </td>
        <td><input type="checkbox" class="delete"></td>
    `;
    inserted.innerHTML = completed;
    alertUser("success", "Task is completed!");
  }

  completeTasks.addEventListener('change', function(e) {
    removeTask(e.target)
  })

  function removeTask(targ) {
    let row = targ.closest("tr");
    fadeOut(row, true);
    alertUser("danger", "Completed task removed!");
  }
  function alertUser(type, msg){
    let classType = `alert alert-${type}`;
    alertBox.classList = classType;
    alertBox.innerText = msg;
    fadeIn(alertBox);
    setTimeout(function() {
      fadeOut(alertBox);
    },1000)
  }

  function fadeIn(el){
    el.style.display="initial";
    setTimeout(function () {
      el.style.opacity ="1";
    },10)
  }

  function fadeOut(el){
    el.style.opacity ="0";
    setTimeout(function () {
      el.style.display="none";
    },10)
  }

})
