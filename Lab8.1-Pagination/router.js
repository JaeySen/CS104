let routes = {};
let templates = {};

let app_div = document.getElementById('app');
let postDeck = document.querySelector(".post-deck");
let postContent = document.querySelector(".post-content");

function home() {
    // let div = document.createElement('div');
    // let link = document.createElement('a');
    // link.href = '#/about';
    // link.innerText = 'About';

    // div.innerHTML = '<h1>Home</h1>';
    // div.appendChild(link);

    // app_div.appendChild(div);
    // postDeck.style = "display: initial";
    // postContent.style = "display: none";
};

function post(params) {
    // let div = document.createElement('div');
    // let link = document.createElement('a');
    // link.href = '#/';
    // link.innerText = 'Home';

    // div.innerHTML = '<h1>About</h1>';
    // div.appendChild(link);

    // app_div.appendChild(div);

    // postDeck.style = "display: none";
    // postContent.style = "display: initial";
    // postContent.innerHTML = id;
    console.log(params);
};

function route (path, template) {;
    if (typeof template === 'function') {
        return routes[path] = template;
    }
    else if (typeof template === 'string') {
        return routes[path] = templates[template];
    } else {
        return;
    };
};

function template (name, templateFunction) {
    return templates[name] = templateFunction;
};

template('home', function(){
    home();
});

template('post', function(){
    post();
});


route('/', 'home');
route('index.html', 'home');
// route('/post', 'post');
route('post.html', post);
// route('/post.html?id', 'post');

// for (const r in routes){
//     console.log(r, typeof(routes[r]));

// }
// console.log(routes);

function resolveRoute(route) {
    try {
        return routes[route];
    } catch (e) {
        throw new Error(`Route ${route} not found`);
    };
};

function resolveParams(route) {
    let paramsObj = {};
    let params = route.slice(route.lastIndexOf('?') + 1);
    let requestUrl = route.slice(0, route.lastIndexOf('?'));
    let searchParams = new URLSearchParams(params);
    searchParams.forEach((value, key) => {
        paramsObj[key] = value;
    });
    return {requestUrl: requestUrl, params: paramsObj};
}

function router(evt) {
    let url = document.URL.slice(document.URL.lastIndexOf('/') + 1) || '/';
    let obj = resolveParams(url);
    let route = resolveRoute(obj.requestUrl);
    // console.log(route);
    route(obj.params);
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);

//https://www.section.io/engineering-education/how-to-build-a-simple-router-in-javascript/