document.addEventListener("DOMContentLoaded", () => {

  getProducts();
  loadBrandSlider(brandList);

  $(".dropdown-item").mousedown(function() {
    let sibs = $(this).siblings();
    for(const ele of sibs){
      if (jQuery(ele).hasClass("active")) { // transform ele: html element to jquery object
        jQuery(ele).removeClass("active");
        break;
      }
    }
    $(this).addClass("active");
    if ($(this).parent().attr("aria-labelledby") === "dropdownCurrency"){
      let btn = document.getElementById('dropdownCurrency');
      btn.innerHTML = "Currency: " + $(this)[0].innerHTML;
    } else {
      let btn = document.getElementById('dropdownLanguage');
      btn.innerHTML = $(this)[0].innerHTML;
    };

  })
})

function getProducts() {
  let xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://fakestoreapi.com/products",
    true
  )
  xhr.onload = () => {
    if(xhr.status == 200) {
      let list = JSON.parse(xhr.responseText);
      console.log(list);
      loadProductSlider(list);
    }else {
      console.log(xhr);
    }
  }
  xhr.send();
}

function loadProductSlider(list) {
    let slider = document.querySelector("#products");
    for (let i = 0; i < list.length; i++) {
      let item = `
        <div class="product">
            <div class="card product shadow rounded w-100 h-100 pt-5">
                <img class="card-img-top" src="${list[i].image}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title rounded">${list[i].title}</h5>
                    <div class="bottom-price">
                        <p href="#" class="text-danger mb-0 price">$ ${list[i].price.toLocaleString()}</p>
                    <div>
                </div>
            </div>
        </div>`;
        slider.insertAdjacentHTML("beforeend", item);
    }
    loadSlider("#products", 10, 30, 2, "#product-controls", ".previous", ".next", 2, 3, 4);
}

var brandList = ["breguet.jpg", "breitling.png", "cartier.jpg", "chopard.jpg", "jaeger.jpg", "omega.jpg", "panerai.jpg", "rolex.jpg", "tiffany&co.jpg", "zenith.jpg"]

function loadBrandSlider(list) {
    let slider = document.querySelector("#brands");
    for (let i = 0; i < list.length; i++) {
      let item = `
        <div class="brand">
            <div class="card brand shadow rounded">
                <img class="card-img-top" src="images/${list[i]}" alt="${list[i]}">
            </div>
        </div>`;
        slider.insertAdjacentHTML("beforeend", item);
    }
    loadSlider("#brands", 5, 30, 2, "#brand-controls", ".previous-brand", ".next-brand", 2, 4, 6);
}

function loadSlider(placeholder, items, gutter, slideBy, controlsContainer, prev, next, at640, at1200, at1400) {
    let slider = tns({
      container: placeholder,
      items: items,
      gutter: gutter,
      slideBy: slideBy,
      autoplay: true,
      controlsContainer: controlsContainer,
      edgePadding: 20,
      prevButton: prev,
      nextButton: next,
      autoplayHoverPause: true,
      autoplayButtonOutput: false, // instead of autoplayButton: false
      nav: false,
      responsive: {
        640: {
          items: at640
        },
        1200: {
          items: at1200
        },
        1400: {
          items: at1400
        }
      },
    });
}
