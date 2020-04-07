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

    $("button.level-btn").click(function (event) {
        $(".landing-page").addClass("d-none");
        $(".game-play-area").addClass("d-block");
    });

});


let gameTiles = 0;
let difficultyLevel = "";

/**
 * The below records the users choice of difficulty level and 
 * assigns it as the value which will be used to determine 
 * what difficulty the game will play at. Difficuly level is used
 * to determine the amount of tiles required in the game. 
 **/

function levelChoice(obj) {
    difficultyLevel = obj.id;

    if (difficultyLevel == "easy") {
        gameTiles = 12;
    } else if (difficultyLevel == "normal") {
        gameTiles = 18;
    } else if (difficultyLevel == "hard") {
        gameTiles = 36;
    }
};

const game = document.getElementById("gameArea");


let boardTiles = [];

function createCardLayout(gameTiles) {
 
    for (let i = 0; i < gameTiles; i++) {
        var d = document.createElement("div");
        d.className = "tile";
        document.getElementById("gameArea").appendChild(d);
        boardTiles.push(d);
    }
}

let cardAssign = [boardTiles];

