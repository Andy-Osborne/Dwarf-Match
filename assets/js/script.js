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
        $(".landing-page").removeClass("d-block").addClass("d-none");
        $(".game-play-area").addClass("d-block");
        $(".modal").removeClass("d-block").addClass("d-none");
        $(".exit-button").removeClass("d-none");
    });

    $(".exit-button").click(function () {
        $(".game-play-area").removeClass("d-block").addClass("d-none");
        $(".landing-page").addClass("d-block");
        $(".exit-button").addClass("d-none");
    })

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
        gameTiles = 8;
    } else if (difficultyLevel == "normal") {
        gameTiles = 12;
    } else if (difficultyLevel == "hard") {
        gameTiles = 16;
    }
};

const game = document.getElementById("gameArea");


let boardTiles = [];

/**
 * The below function takes the output based on the user difficulty selection. 
 * Based on this output, it will create X amount of divs and assign it a pair class
 * which is then assigned to an array.
 */

function createCardLayout(gameTiles) {

    for (let i = 1; i < gameTiles + 1; i++) {
        var d = document.createElement("div");
        d.className = `tile image-center faceDown ${difficultyLevel}Pair${[i]}`;
        boardTiles.push(d);
    }
    for (let j = 1; j < gameTiles + 1; j++) {
        d = document.createElement("div");
        d.className = `tile image-center faceDown ${difficultyLevel}Pair${[j]}`;
        boardTiles.push(d);
    }
}


/* The below function is based on the  Durstenfeld shuffle, an optimized version of Fisher-Yates method
and has been obtained from Stackoverflow */

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

/*The below function clears the game board by removing the divs assigned to gameArea
and then empties the gameTiles array */

let clearGameArea = () => {
    const clearArea = document.getElementById("gameArea");
    clearArea.querySelectorAll("*").forEach(child => child.remove());
    gameTiles = 0;
    boardTiles = [];
}

function gamePlay() {

    createCardLayout(gameTiles);

    /* The below takes uses the shuffleArray function and assigns this to a new variable */

    let cardShuffle = shuffleArray(boardTiles);

    /*The below uses the cardShuffle vairable and then cycles through each element in the array
    and appends it to the gameArea within the DOM */

    cardShuffle.forEach(element => {
        document.getElementById("gameArea").appendChild(element)
    });




}