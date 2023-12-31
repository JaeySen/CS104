$(document).ready(() => {
  $(".gallery img").click((e) => {
    // let src = $(this).attr("src");
    // $(this).addClass("active");
    let src = $(e.currentTarget).attr("src");
    $(e.currentTarget).addClass("active");
    loadImg(src);
    showLightbox();
  });

  // stop propagation on child elements
  $(".lightbox img, .lightbox ul").click((e) => e.stopPropagation());

  $(".lightbox").click(() => {
    hideLightbox();
    $(".gallery img").removeClass("active");
  });

  // listen for click on NEXT tab
  $(".lightbox ul li.next").click(() => cycleImg("next"));
  $(".lightbox ul li.prev").click(() => cycleImg("prev"));

  function cycleImg(direction) {
    let currentnode = $(".gallery img.active");
    let src, nextnode, onclass, offclass;
    if (direction == "next") {
      nextnode = currentnode.next();
      currentnode.removeAttr("class");
      onclass = "left100";
      offclass = "leftminus100";
    } else {
      nextnode = currentnode.prev();
      onclass = "leftminus100";
      offclass = "left100";
    }

    src = nextnode.attr("src"); //?

    if (src == null && direction == "next") {
      nextnode = $(".gallery img").first();
      src = nextnode.attr("src");
    } else if (src == null && direction == "prev") {
      nextnode = $(".gallery img").last();
      src = nextnode.attr("src");
    }
    currentnode.removeClass("active");
    nextnode.addClass("active");

    // let newnode = "<img src='" + src + "' class='" + onclass + "'>";
    let newnode = `
      <img src="${src}" id="wrapper-img" class="${onclass}" >
    `
    $(".wrapper").append(newnode);
    setTimeout(function () {
      $(".wrapper img").last().removeClass(onclass);
      $(".wrapper img").first().addClass(offclass);
    }, 10);
    setTimeout(function () {
      $(".wrapper img").first().remove();
      $(".wrapper img").last().removeAttr("class")
    }, 300);
  }

  //show the lightbox with fade in
  function showLightbox() {
    $(".lightbox").css("display", "flex");
    setTimeout(() => {
      $(".lightbox").css("opacity", 1);
    }, 10);
  }
  //hide the lightbox with fade out
  function hideLightbox() {
    $(".lightbox").css("opacity", 0);
    setTimeout(function () {
      $(".lightbox").css("display", "none");
    }, 300);
  }
  function loadImg(src) {
    $(".lightbox img").attr("src", src);
  }
});
