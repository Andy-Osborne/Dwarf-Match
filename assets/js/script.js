$(document).ready(function() {
    
    $(".tutorial-btn").click(function() {
        $("#tutorial").addClass("display-block");
    $(".modal-close").click(function() {
        $(".modal").removeClass("display-block").addClass("display-none");
    })
})

$(".play-btn").click(function() {
    $("#levelSelect").addClass("display-block");
    $(".modal-close").click(function() {
        $(".modal").removeClass("display-block").addClass("display-none");
    })
})


});