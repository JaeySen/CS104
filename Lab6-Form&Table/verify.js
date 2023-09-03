const cname = document.querySelector("#cname");
const pass1 = document.querySelector("#pass1");
const pass2 = document.querySelector("#pass2");
const email = document.querySelector("#email");
const age = document.querySelector("#age");
let errors = {
    unameerr: false,
    pass1err: false,
    pass2err: false,
    emailerr: false,
    age: false
  };

export function checkName() {
    if(uname.value.length < 5 || uname.value.length > 20) {
        errors.unameerr = true;
        error[0].style = "display:initial";
    } else {
        errors.unameerr = false;
        error[0].style = "display:none";
    }
}

export function checkPass1() {
    console.log("password check 1");
    if(pass1.value.length < 10 || pass1.value.length > 20) {
        errors.pass1err = true;
        error[2].style = "display:initial";
    } else {
        errors.pass1err = false;
        error[2].style = "display:none";
    }
}

export function matchPasswords() {
    if(pass1.value != pass2.value) {
        errors.pass2err = true;
        error[3].style = "display:initial";
    } else {
        errors.pass2err = false;
        error[3].style = "display:none";
    }
}

export function checkLength() {
    let passlen = pass1.value.length;
    let percent = (passlen / 10) * 100;
    let progressbar = document.querySelector(".progress-bar");
    progressbar.style = "width: " + percent + "%";
    if(percent >= 100 && percent <= 200) {
        progressbar.classList.add("bg-success");
        progressbar.classList.remove("bg-danger");
    } else if(percent > 200) {
        progressbar.classList.remove("bg-success");
        progressbar.classList.add("bg-danger");
    } else if(percent < 100) {
        progressbar.classList.remove("bg-success");
    }
    console.log(percent);
}

// check user email
export function checkEmail() {
    let pattern = new RegExp(/^[+a-zA-Z1-9._-]+@[a-zA-Z1-9.-]+\.[a-zA-Z]{2,4}$/i);
    if(pattern.test(email.value)) {
        console.log("true, email valid");
        hideFalse(error[1], errors.emailerr);
    } else {
        console.log("false, email invalid");
        showTrue(error[1], errors.emailerr);
    }
}
// check age within range
export function checkAge() {
    if(age.value < 15 || age.value > 40) {
        showTrue(error[4], errors.age);
    } else {
        hideFalse(error[4], errors.age);
    }
}

// let password_check = {
//   number: -1,
//   letter: -1,
//   cap_letter: -1,
//   special: -1
// }

// passCreate.addEventListener("keyup", function() {
//   let pass = passCreate.value;
//   let pg_pass = document.querySelector(".progress-bar.passCreate");
//   checkPasswordLength(pass, pg_pass);
// });

// function removeCharDiverse(password_length){
//   for (check in password_check){
//     if (password_check[check] == password_length){
//       password_check[check] = -1;
//       console.log("password_check", password_check);
//       break;
//     }

//   }
// }

// function checkCharField(password){
//   removeCharDiverse(password.length);
//   let last_char = password.slice(-1);
//   if(last_char.match(/[0-9]/i)){
//     if(password_check["number"] < 0){
//       password_check["number"] = password.length - 1;
//       console.log("Number at ", password_check["number"], "position");
//       console.log("password_check", password_check);
//     }
//     else{
//       return checkDiverse(password_check);
//     }
//   }
//   else if(last_char.match(/[a-z]/)){
//     if(password_check["letter"] < 0){
//       password_check["letter"] = password.length - 1;
//       console.log("Letter at position: ", password_check["letter"]);
//       console.log("password_check", password_check);
//     }
//     else{
//       return checkDiverse(password_check);
//     }
//   }
//   if(last_char.match(/[A-Z]/)){
//     if(password_check["cap_letter"] < 0){
//       password_check["cap_letter"] = password.length - 1;
//       console.log("Cap_letter at position: ", password_check["cap_letter"]);
//       console.log("password_check", password_check);
//     }
//     else{
//       return checkDiverse(password_check);
//     }
//   }
//   else if(last_char.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)){
//     if(password_check["special"] < 0){
//       password_check["special"] = password.length - 1;
//       console.log("Special at position: ", password_check["special"]);
//       console.log("password_check", password_check);
//     }
//     else{
//       return checkDiverse(password_check);
//     }
//   }
// }

// function checkDiverse(password_check){
//   for (check in password_check){
//     if(password_check[check] < 0)  {
//       return false;
//     }
//     else{
//       return true;
//     }
//   }
// }

// function checkPasswordLength(input, placeholder) {
//   let charDiverse = checkCharField(input);
//   if(input.length < 8 && input.length > 0) {
//     if(charDiverse == true){
//       placeholder.classList.remove("bg-danger");
//       placeholder.classList.add("bg-warning");
//       placeholder.style = "width: 40%";
//     }
//     else {
//       placeholder.classList.remove("bg-warning");
//       placeholder.classList.add("bg-danger");
//       placeholder.style = "width: 20%";
//     }

//   }
//   else if(input.length >= 8){
//     if(charDiverse == true){
//       placeholder.classList.remove("bg-warning");
//       placeholder.classList.add("bg-success");
//       placeholder.style = "width: 70%";
//     }
//     else{
//       placeholder.classList.remove("bg-danger");
//       placeholder.classList.add("bg-warning");
//       placeholder.style = "width: 40%";
//     }
//   }
//   else if(input.length < 1){    
//     placeholder.style ="width: 0%";
//     for(check in password_check){
//       password_check[check] = -1;
//     }
//   }
// }

// cname.addEventListener("keyup", function(){
//   let len = cname.value.length;
//   console.log(len);
//   let pg_name = document.querySelector(".progress-bar.name");
//   checkNameLength(len, pg_name);
// });

// function checkNameLength(input, placeholder) {
//   if(input > 5 && input < 20) {
//     placeholder.classList.add("bg-success");
//     placeholder.classList.remove("bg-danger");
//     placeholder.style = "width: 66%";
//   } 
//   else if(input > 20 || input < 5) {
//     placeholder.classList.remove("bg-success");
//     placeholder.classList.add("bg-danger");
//     if(input > 20){
//       placeholder.style = "width: 100%";
//     }
//     else if(input < 5 && input > 0) {
//       placeholder.style = "width: 33%";
//     }
//     else if(input < 1){
//       placeholder.style = "width: 0%";
//     }
//   }
// }