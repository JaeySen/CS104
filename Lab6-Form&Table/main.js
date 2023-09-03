// get variables and inputs

// let passCreate = document.querySelector("#passCreate");
// let passConfirm = document.querySelector("#passConfirm");
// let email = document.querySelector("#email");
// let age = document.querySelector("#age");

// var form = document.querySelector('form')
// let error = document.querySelectorAll("p.error");

console.log("Script loaded");


let submitAnchor = document.querySelector('#submit');
let temp = document.getElementById('classmateTemplate')

let rowContainForm = document.getElementById('form')
let tableBody = document.querySelector('tbody')

let cname = document.getElementById("name");
let age = document.getElementById("age");

submitAnchor.addEventListener("click", function(e) {
  
  tableBody.insertBefore(addClassmate(cname.value, age.value), rowContainForm)
  // let formfail = false;
  // // loop through errors obj to check if any errors = true
  // Object.keys(errors).forEach(function(item) {
  //   console.log(item + ": " + errors[item]);
  //   if(errors[item]) {
  //     //if an error is found set formfail to true
  //     formfail = true;
  //   }
  // })
  // if(formfail) {
  //   alert("The form failed, please correct errors");
  // } else {
  //   alert("form submitted successfully");
  //   addClassmate();
  // }
});

function addClassmate(name, age){
  let content = temp.content.cloneNode(true);
  const cells = content.querySelectorAll("td");
  cells[0].innerHTML = 6;
  cells[1].innerHTML = name;
  cells[2].innerHTML = age;
  return content;
}

let table = document.querySelector("table");
let editing = [];
// Add event listeners
table.addEventListener("click", function(e){
  let targ = e.target;
  if(targ.classList.contains("edit")){
    let originial = targ.closest('tr').cloneNode(true)
    editing.push(originial);
    addRowInputs(targ);
    addActionButtons(targ);
  }
  else if(targ.classList.contains("delete")) deleteRow(targ)
  else if(targ.classList.contains("update")) updateRow(targ)
  else if(targ.classList.contains("cancel")) cancelRow(targ)
});

let editButtons = document.getElementById('editTemplate')

function addActionButtons(targ){
  let td = targ.parentElement; // td
  let temp = editButtons.content.cloneNode(true);
  td.innerHTML = '';
  td.appendChild(temp)
}

function addRowInputs(targ){
  let row = targ.closest("tr");
  let nameinput =`<input type='text' class='uname' value='${row.children[1].textContent}'>`;
  let ageinput =`<input type='number' class='age' value='${row.children[2].textContent}'>`;
  row.children[1].innerHTML = nameinput;
  row.children[2].innerHTML = ageinput;
}

function cancelRow(targ){
  //get row id from first child td
  let row = targ.closest("tr");
  let id = row.children[0].textContent;
  editing.forEach(function(node) {
    if(node.children[0].textContent === id){
      // console.log(node.children[0].innerText)
      row.children[0].innerHTML = node.children[0].innerText
      row.children[1].innerHTML = node.children[1].innerText
      row.children[2].innerHTML = node.children[2].innerText
      row.children[3].innerHTML = node.children[3].innerHTML
    }
  })

}

function deleteRow(targ){
  targ.closest("tr").remove();
}

function updateRow(targ){
  let row = targ.closest("tr");
  let cname = row.children[1];
  let age = row.children[2];
  
  let n_name = cname.firstChild.value;
  let n_age = age.firstChild.value;
  //remove input from td cells
  cname.firstChild.remove();
  age.firstChild.remove();

  //update td cells with new value
  cname.innerText = n_name;
  age.innerText = n_age;

  targ.parentElement.innerHTML = "<a href='#' class='edit'>edit</a>";
}
