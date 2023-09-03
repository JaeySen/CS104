const cname = document.querySelector("#cname");
const email = document.querySelector("#email");
const age = document.querySelector("#age");

const form = document.querySelector('#classmateform');
const table = document.querySelector("table");
console.log("Script loaded");

let editing = [];

table.addEventListener("click", function(e) {
  e.preventDefault();
  let targ = e.target;
  
  if (targ.classList.contains("edit")) {
    // store node list of original state in edit[] in case user cancels edit
    let originial = targ.closest('tr').cloneNode(true)
    editing.push(originial);
    addRowInputs(targ);
    addActionButtons(targ);
  }
  else if(targ.classList.contains("delete")) deleteRow(targ)
  else if(targ.classList.contains("update")) updateRow(targ)
  else if(targ.classList.contains("cancel")) cancelRow(targ)
})

form.addEventListener("submit", function(e) {
  e.preventDefault();
  console.log("Form Submitted");

  addClassmate();
});


function cancelRow(targ){
  //get row id from first child td
  let row = targ.closest("tr");
  let id = row.children[0].textContent;
  editing.forEach(function(node) {
    if(node.children[0].textContent === id){
      // console.log(node.children[0].innerText)
      row.children[0].innerHTML = node.children[0].innerText;
      row.children[1].innerHTML = node.children[1].innerText;
      row.children[2].innerHTML = node.children[2].innerText;
      row.children[3].innerHTML = node.children[3].innerText;
      row.children[4].innerHTML = node.children[4].innerHTML;
    }
  })

}

//update row
function updateRow(targ){
  let row = targ.closest("tr");
  let cname = row.children[1];
  let email = row.children[2];
  let age = row.children[3];
  
  let n_name = cname.firstChild.value;
  let n_age = age.firstChild.value;
  let n_email = email.firstChild.value;
  //remove input from td cells
  cname.firstChild.remove();
  age.firstChild.remove();
  email.firstChild.remove();

  //update td cells with new value
  cname.innerText = n_name;
  age.innerText = n_age;
  email.innerText = n_email;

  targ.parentElement.innerHTML = "<a href='#' class='edit'>edit</a>";
}

function deleteRow(targ) {
  targ.closest("tr").remove();
}

function addRowInputs(targ) {
  let row = targ.closest("tr");
  let name = "<input type='text' class='uname intable' value='" + row.children[1].textContent + "'>";
  let email = "<input type='text' class='email intable' value='" + row.children[2].textContent + "'>";
  let age = "<input type='number' class='age intable'value='" + row.children[3].textContent + "'>";
  row.children[1].innerHTML = name;
  row.children[2].innerHTML = email;
  row.children[3].innerHTML = age;
}

function addActionButtons(targ) {
    let td = targ.parentElement;
    console.log($(document).width());
    let btns = '';
    if ($(document).width() > 1140) {
      btns = "<button class='btn btn-outline-success btn-sm update'>Update</button>";
      btns += "<button class='btn btn-outline-danger btn-sm delete mr-2 ml-2'>Delete</button>";
      btns += "<button class='btn btn-outline-warning btn-sm cancel'>Cancel</button>";
    }
    else {
      btns = "<button class='btn btn-outline-success btn-sm update'><i class='fa fa-floppy-o' aria-hidden='true'></i></button>";
      btns += "<button class='btn btn-outline-danger btn-sm delete m-1'><i class='fa fa-trash-o' aria-hidden='true'></i></button>";
      btns += "<button class='btn btn-outline-warning btn-sm cancel'><i class='fa fa-undo' aria-hidden='true'></i></button>";
    }

    td.innerHTML = btns;
}

function addClassmate() {
  let tr = document.querySelectorAll("tr");
  let newrow = table.insertRow();
  let td = "<td>" + tr.length + "</td>";
     td += "<td>" + cname.value + "</td>";
     td += "<td>" + email.value + "</td>";
     td += "<td>" + age.value + "</td>";
     td += "<td><a href='#' class='edit'>edit</a></td>";
  newrow.innerHTML = td;
}

