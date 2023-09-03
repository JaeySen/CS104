$(document).ready(() => {
    console.log("Lab 2 End is loaded!")

    $("img").click(function(){
        let src = $(this).attr("src");
        console.log(src);
        showTheater(src);
    });

    $(".theater").click(function() {
        hideTheater();
    });


    function showTheater(src) {
        $(".theater").css("display", "initial");
        $(".theater img").attr("src", src);
    }

    function hideTheater() {
        $(".theater").css("display", "none");
    }

    $("input").click(function() {
        console.log("checked")
    })

})