
document.addEventListener("DOMContentLoaded", () => {
    console.log("post loaded");
    fadeOut(document.querySelector(".loading"));
    const url = new URLSearchParams(document.location.search);
    const id = url.get("id");

    setTimeout(() => {
        fetchPostById(id);
    }, 800);
    fetchRandomUser();
})

function fetchRandomUser() {
    let xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "https://randomuser.me/api",
      true
    );
    xhr.onload = function() {
      if(this.status == 200) {
        displayUser(JSON.parse(this.responseText));
      }
    }
    xhr.send();
}

let authorBanner = document.querySelector(".author");

function displayUser(userObj) {
    let user = userObj.results[0];
    let output = `
    <div class="d-flex">
        <img src="${user.picture.large}" class="rounded-circle ${user.gender} m-3">
        <div>
            <h5>${user.name.first} ${user.name.last}</h5>
            <h6 class="font-weight-light">${user.location.city}, ${user.location.country} </h6>
            <h6 class="font-weight-light"><em>${user.email}</em></h6>
        </div>

    </div>`;
    authorBanner.innerHTML = output;
}

function fetchPostById(id){
    let xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        "https://jsonplaceholder.typicode.com/posts",
        true
    );
    xhr.onload = (e) => {
        if(xhr.status == 200){
            let post = JSON.parse(xhr.responseText)[id-1];
            printPost(post);
            
        }
    };
    xhr.send();
}

let content = document.querySelector(".post-content");

function printPost(post){
    postCard = `
    <h3 class="card-title">${post.title}</h3>
    <h6 class="card-subtitle mb-2 text-muted">PostID: ${post.id}</h6>
    <p class="card-text">${post.body}</p>`;
    content.innerHTML = postCard;
    
}

function fadeOut(el){
    el.style="opacity:0";
    setTimeout(function(){
        el.style="display:none";
    }, 400)
}


// let fetchbtn = document.querySelector("#fetch");
// fetchbtn.addEventListener("click", () => {
//     let request = fetch("https://randomuser.me/api")
//     .then((result) => {
//       return result.json();
//     })
//     .then((data) => {
//       displayUser(data);
//     })
//   })