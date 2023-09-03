// This app gets BTC exchange rates and outputs them
// every 30 seconds from:
//https://api.coindesk.com/v1/bpi/currentprice/vnd.json;

// getting and setting global vars
let latestRates = {
  usd: 0,
  jpy: 0,
  vnd: 0
};

var availableExchanges = ['eur', 'gbp', 'cny', 'aud', 'cad', 'chf'];

document.addEventListener("DOMContentLoaded", () => {
  Object.keys(latestRates).forEach((currency) => {
    getBTCVal(currency, (res) => updateCard(res, currency));
  });

  let alertbox = document.querySelector(".alert.checking");
  let i = 29;

  setInterval(() => {
    if(i == 5) {
      alertbox.style.opacity = "1";
    } else if (i <= 0) {
      alertbox.style.opacity = "0";
      updateRates();
      i = 30;
    }
    setTimer(i);
    i--;
  }, 1000);

});

let cardTemplate = document.getElementById('template-card');
let displace = document.querySelector(".displace");

async function addCard(thisObj) {
  const curr = thisObj.getAttribute("key");
  thisObj.value = '';
  availableExchanges = availableExchanges.filter(e => e !== curr.toLowerCase());
  let card = cardTemplate.content.cloneNode(true);
  card.querySelector("h5").insertAdjacentHTML("beforeend", curr);
  
  getBTCValSync(curr.toLowerCase()).then(result => {
    card.querySelector("p").innerHTML = Math.round(result.bpi[curr].rate_float).toLocaleString() + " " + result.bpi[curr].code;
    card.querySelector("p").classList = `${curr.toLowerCase()} green`;

    latestRates[curr.toLowerCase()] = Math.round(result.bpi[curr].rate_float);
    
  });

  setTimeout(() => displace.appendChild(card), 2000);
  
  // console.log(latestRates);
}

function updateCard(result, currency) {
  const U_key = currency.toUpperCase();
  let newRate = result.bpi[U_key].rate_float;
  let elRate = document.querySelector(`.${currency}`);
  elRate.classList = `${currency} ${newRate >= latestRates[currency] ? "green": "red"}`;
  
  latestRates[currency] = Math.round(newRate);
  elRate.innerText = Math.round(newRate).toLocaleString() + " " + U_key;
}

function updateRates() {
  Object.keys(latestRates).forEach((currency) => {
    getBTCVal(currency, (res) => updateCard(res, currency));
  });
}

function getBTCVal(currency, callback, callerror) {
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`,
    true // async true/false
  );
  // xhr.addEventListener("load", e => console.log(e)).then(console.log())
  xhr.onload = (e) => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callback(JSON.parse(xhr.responseText));
    }
    // addCurrencyRate(JSON.parse(xhr.responseText), currency);
  }
  xhr.onerror = (e) => {
    // console.log(xhr);
    callerror(e);
  }
  xhr.send();
}

// https://stackoverflow.com/questions/42666843/access-to-a-variable-outside-of-a-callback-function-in-javascript
// https://stackoverflow.com/questions/68816507/uncaught-in-promise-typeerror-response-is-undefined-using-fetch-api
// https://stackoverflow.com/questions/54928751/how-to-avoid-uncaught-error-in-promise-with-async-await

async function getBTCValSync(currency) {
  return new Promise((resolve, reject) => {
    getBTCVal(currency, (result) => resolve(result), (error) => reject(error))
  })
}

$(function () {
	// prevent the list from opening by clicking on an empty field
	$(".form-add").on("show.bs.dropdown", function (e) {
		if (!e.relatedTarget.value) {
			// return false;
      suggestion();
		} 
	});

	// handle changes in the input field
	// $("#add-currency-input").on("input", function (e) {
  //   if (this.value) {
  //     $(this).dropdown("show");
  //   } else {
  //     $(this).dropdown("hide");
  //   }
	// });
});

function suggestion() {
  // console.log("clicked search");
  dropdown.innerHTML = '';
  availableExchanges.forEach((curr) => {
    addMatchedSearch(curr);
  })
}

// const shallowRates = {...latestRates};
// const deepRates = structuredClone(latestRates);


document.querySelector("#add-currency-input").addEventListener("keyup", (e) => {
  let search_key = e.target.value;
  let match_search = [];
  dropdown.innerHTML = '';
  $($("#add-currency-input")[0]).dropdown("hide");
  if (search_key.length > 0) {
    availableExchanges.forEach((curr) => {
      if (curr.indexOf(search_key) > -1) {
        match_search.push(curr);
        addMatchedSearch(curr);
      }
    })
  }
  if (match_search.length > 0) {
    setTimeout(() => {
      $($("#add-currency-input")[0]).dropdown("show");
  
    }, 500)
  }
})

let dropdown = document.querySelector(".dropdown-menu");

async function addMatchedSearch(key) {
  const res = await getBTCValSync(key);
  const U_key = key.toUpperCase();
  dropdown.innerHTML += `
    <a class="dropdown-item" href="#!" onclick="addCard(this)" key="${res.bpi[U_key].code}">${res.bpi[U_key].code} - ${res.bpi[U_key].description}</a>
  `;
  
}

function setTimer(time) {
  let target = document.querySelector("span.time");
  target.innerText = time;
}

let tbody = document.querySelector("tbody");

// function addCurrencyRate(obj, currency) {
//   let curr = currency.toUpperCase();
//   let template = `
//   <tr>
//     <th scope="row">1</th>
//     <td>${obj.bpi[curr].description}</td>
//     <td>${obj.bpi[curr].code}</td>
//     <td>${obj.bpi[curr].rate}</td>
//     <!-- <td><a href="#" class="edit">Edit</a></td> -->
//   </tr>
//   `;
//   tbody.innerHTML += template;
// }

// let table = document.querySelector("table");
// let editing = [];

// table.addEventListener("click", function(e){
//   let targ = e.target;
//   if(targ.classList.contains("edit")){
//     // let originial = targ.closest('tr').cloneNode(true);
//     // editing.push(originial);
//     // addRowInputs(targ);
//     addActionButtons(targ);
//   }
//   else if(targ.classList.contains("delete")) deleteRow(targ)
//   else if(targ.classList.contains("update")) updateRow(targ)
//   else if(targ.classList.contains("cancel")) cancelRow(targ)
// });

// let actionButtons = document.getElementById('template-actions-sm');

// function addActionButtons(targ){
//   let td = targ.parentElement; // td
//   let temp = actionButtons.content.cloneNode(true);
//   td.innerHTML = '';
//   td.appendChild(temp);
// }

// Helper functions

// function handleImageError(image) {
//   image.onerror = null;
//   image.src = 'cat.png';
// }

// const images = document.querySelectorAll('img');
// images.forEach( image => handleImageError(image) );


// Remove array duplicates

// const arr = [2,2,4,4,6,6,7,7];
// const newArr = [...new Set(array)]

// differenciate between OR operator (||) and nullish coalescing (??)
// OR operator return left value if right valus is FALSE
// Nullish coalescing return left id right is NULL or Undefined

// // Optional Chaining
// let sampleFunction = undefined;
// sampleFunction?.('args');

// // instead of 
// if (sampleFunction) sampleFunction(args);
// // or 
// sampleFunction && sampleFunction("args")