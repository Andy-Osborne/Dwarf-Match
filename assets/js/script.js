$(document).ready(function () {

    /** 
    * Modal Button controls works by adding display: block class when the corresponding
    * button is clicked and then removes it when the user clicks on the close button within
    * the modal window.
    **/

    $(".tutorial-btn").click(function () {
        $("#tutorial").addClass("d-block");
        $(".modal-close").click(function () {
            $(".modal").removeClass("d-block").addClass("d-none");
        })
    })

    $(".play-btn").click(function () {
        $("#levelSelect").addClass("d-block");
        $(".modal-close").click(function () {
            $(".modal").removeClass("d-block").addClass("d-none");
        });
    })

    /*
    * The below records the users choice of difficulty level and 
    * assigns it as the value which will be used to determine 
    * what difficulty the game will play at. 
    */

    let difficultyLevel = "";

    $("button.level-btn").click(function (event) {
        difficultyLevel = $(this).attr('id');
        console.log(difficultyLevel);
    });

});