let cardDeck = document.querySelector(".card-deck");
let pagination = document.querySelector("ul.pagination");
let prev = document.querySelector(".page-link.prev");
let next = document.querySelector(".page-link.next");
let articles = {
    list: [],
    current: {
        page: 0,
        article: 0,
        limit: 0
    },
}
var postsList = [];
var lastPost; 
var postsPerPage; 
const pages = 17; 
var currentPg = 1; 

document.addEventListener("DOMContentLoaded", () => {
    console.log("doc loaded");
    fadeOut(document.querySelector(".loading"));
    setTimeout(() => {
        fetchPosts();
        loadPagination();
    }, 800);
    fadeIn(document.querySelector(".row.pagination"), "flex");

})

function fetchPosts(){
    let xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        "https://jsonplaceholder.typicode.com/posts",
        true
    );
    xhr.onload = (e) => {
        if(xhr.status == 200){
            postsList = JSON.parse(xhr.responseText);
            postsPerPage = Math.ceil(postsList.length / pages);
            printPosts();
            
        }
    };
    xhr.send();
}

function printPosts(first = 0, last = 6){
    let postCard = '';
    let row = '';
    cardDeck.innerHTML = '';
    lastPost = last; 
    let route = document.URL.replace(document.URL.slice(document.URL.lastIndexOf('/')), '') + '/post.html';
    for (const post of postsList.slice(first, last + 1)) {
        postCard += `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title"><a href="${route}?id=${post.id}">${post.title}</a></h5>
                <h6 class="card-subtitle mb-2 text-muted">PostID: ${post.id}</h6>
                <p class="card-text">${post.body}</p>
            </div>
        </div>`;
        if (post.id % 3 === 0) {
            row = `<div class="row">${postCard}</div>`
            cardDeck.innerHTML += row;
            postCard = '';
        }
    }
    
}

function loadPagination(){
    let pagIndexs = '';
    for (let i = 1; i < pages; i++){
        pagIndexs += `
        <li class="page-item"><a class="page-link" href="#" data-page="${i + 1}">${i + 1}</a></li>
        `;
    }
    pagination.children[pagination.children.length - 1].insertAdjacentHTML('beforebegin', pagIndexs);

}

pagination.addEventListener("click", (e) => {
    e.preventDefault();
    let plink = e.target;

    if ([...plink.classList].includes('page-link')){
        let lastPag = pagination.querySelector(`[data-page="${currentPg}"]`);
        lastPag.parentElement.classList.remove("active");
    
        if ([...plink.classList].includes('next')) {
            if (currentPg < pages) {
                currentPg += 1; 
                lastPag.parentElement.nextElementSibling.classList.add("active");
            }

        } else if ([...plink.classList].includes('prev')) {
            if (currentPg > 1) {
                currentPg -= 1; 
                lastPag.parentElement.previousElementSibling.classList.add("active");
            }
        } 
        else { 
            currentPg = Number(plink.getAttribute("data-page"));
            plink.parentElement.classList.add("active");
            
        }
        printPosts(((currentPg - 1) * postsPerPage), ((currentPg - 1) * postsPerPage) + 6);
        
        if (currentPg == pages) {
            pagination.querySelector(".next").parentElement.classList.add("disabled");
            pagination.querySelector(".prev").parentElement.classList.remove("disabled");

        } else if (currentPg == 1) {
            pagination.querySelector(".prev").parentElement.classList.add("disabled");
            pagination.querySelector(".next").parentElement.classList.remove("disabled");
        } 
        else {
            pagination.querySelector(".prev").parentElement.classList.remove("disabled");
            pagination.querySelector(".next").parentElement.classList.remove("disabled");
        }
    }

})


function fadeOut(el){
    el.style="opacity:0";
    setTimeout(function(){
        el.style="display:none";
    }, 400)
}

function fadeIn(el, display){
    // el.style="opacity:1";
    el.style = "display: none";
    setTimeout(() => {
        el.style=`display: ${display}`;
    }, 2000)
}