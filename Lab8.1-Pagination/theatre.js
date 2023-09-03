var imagesArray = [
    "blog1.jpg",
    "blog2.png",
    "blog3.png",
    "front1.jpg",
    "front2.png",
    "front3.jpg",
    "front4.jpeg"
];

let postImg = document.querySelector('.post-img')

function displayRandomImage(){
    var num = Math.floor(Math.random() * 7);
    postImg.src = `images/${imagesArray[num]}` ;

}

document.addEventListener("DOMContentLoaded", () => {
    console.log("theatre loaded")
    setTimeout(() => {
        displayRandomImage();
    }, 2000)
})


$(document).ready(function() {
    console.log("theatre loaded");

    $("img").click(function(){
      let currentnode = $(this);
      let src = currentnode.attr("src");
      currentnode.addClass("active");
      loadImg(src);
      showLightbox();
    });
  
    $(".lightbox img").click(function(event) {
      event.stopPropagation();
    })
    $(".lightbox ul").click(function(event) {
      event.stopPropagation();
    })
  
    $(".lightbox").click(function(){
      hideLightbox();
      $("img").removeClass("active");
    });
  
    // $(".lightbox ul li.next").click(function() {
    //   cycleImg("next");
    // });
    // $(".lightbox ul li.prev").click(function() {
    //   cycleImg("prev");
    // });

})
  
  function showLightbox() {
    $(".lightbox").css("display", "flex");
    setTimeout(() => {
      $(".lightbox").css("opacity", 1);
    }, 10);
  }

  function hideLightbox() {
    $(".lightbox").css("opacity", 0);
    setTimeout(() => {
      $(".lightbox").css("display", "none");
    }, 300);
  }
  function loadImg(src) {
    $(".lightbox img").attr("src", src);
  }

  function cycleImg(direction) {
    let currentnode = $(".gallery img.active");
    let src,nextnode,onclass,offclass;
    if(direction == "next") {
      console.log("next chosen");
       nextnode = currentnode.next();
       onclass = "left100";
       offclass = "leftminus100";
    } else {
      console.log("prev chosen");
      nextnode = currentnode.prev();
      onclass = "leftminus100";
      offclass = "left100";
    }

    src = nextnode.attr("src");//?

    if(src == null && direction == "next") {
      nextnode = $(".gallery img").first();
      src = nextnode.attr("src");
    } else if (src == null && direction == "prev") {
      nextnode = $(".gallery img").last();
      src = nextnode.attr("src");
    }
    currentnode.removeClass("active");
    nextnode.addClass("active");

    let newnode = "<img src='" + src + "' class='"+ onclass + "'>";
    $(".lightbox .wrapper").append(newnode);
    setTimeout(function() {
      $(".lightbox .wrapper img").last().removeClass(onclass);
      $(".lightbox .wrapper img").first().addClass(offclass);
    }, 10)
    setTimeout(function(){
      $(".lightbox .wrapper img").first().remove();
    }, 300)
  }