let gameTiles = 0;
let difficultyLevel = "";
let boardTiles = [];
let game = document.getElementById("gameArea");

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

/**
 * The below function takes the output based on the user difficulty selection. 
 * Based on this output, it will create X amount of divs and assign it a pair class
 * which is then assigned to an array.
 */

function createCardLayout(gameTiles) {

    for (let i = 1; i < gameTiles + 1; i++) {
        var cardDiv = document.createElement("div");
        cardDiv.className = `tile image-center faceDown ${difficultyLevel}Pair${[i]}`;
        boardTiles.push(cardDiv);
    }
    for (let j = 1; j < gameTiles + 1; j++) {
        cardDiv = document.createElement("div");
        cardDiv.className = `tile image-center faceDown ${difficultyLevel}Pair${[j]}`;
        boardTiles.push(cardDiv);
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

/*This function creates the game board area*/

function gamePlay() {

    createCardLayout(gameTiles);

    /* The below takes uses the shuffleArray function and assigns this to a new variable */

    let cardShuffle = shuffleArray(boardTiles);

    /*The below uses the cardShuffle vairable and then cycles through each element in the array
    and appends it to the gameArea within the DOM */

    cardShuffle.forEach(element => {
        game.appendChild(element)

    });
}

// The below is an event listener for the tutorial modal. 

document.querySelectorAll(".tutorial-btn").forEach(item => {
    item.addEventListener("click", event => {
        document.getElementById("tutorial").classList.add("d-block");
    })
    document.querySelectorAll(".modal-close").forEach(item => {
        item.addEventListener("click", event => {
            document.getElementById("tutorial").classList.remove("d-block");
        })
    })
})

// The below is an event listener for the Play Menu modal. 

document.querySelector(".play-btn").addEventListener("click", event => {
    document.getElementById("levelSelect").classList.remove("d-none");
    document.getElementById("levelSelect").classList.add("d-block");

    document.querySelectorAll(".modal-close").forEach(item => {
        item.addEventListener("click", event => {
            document.getElementById("levelSelect").classList.remove("d-block");
        })
    })
})

/** The below is an event listener for when the user clicks on a level button within the
 * Play Menu Modal
 **/

document.querySelectorAll(".level-btn").forEach(item => {
    item.addEventListener("click", event => {
        document.getElementById("landing-page").classList.remove("d-block");
        document.getElementById("landing-page").classList.add("d-none");
        document.getElementById("game-page").classList.remove("d-none");
        document.getElementById("game-page").classList.add("d-block");
        document.getElementById("levelSelect").classList.remove("d-block");
        document.getElementById("levelSelect").classList.add("d-none");
        document.getElementById("exit-btn").classList.remove("d-none");
    })
})

/** The below is an event listener for when the user clicks on the exit button within the
 * game area.
 **/

document.querySelector("#exit-btn").addEventListener("click", event => {
    document.getElementById("game-page").classList.add("d-none");
    document.getElementById("game-page").classList.remove("d-block");
    document.getElementById("landing-page").classList.add("d-block");
    document.getElementById("exit-btn").classList.add("d-none");
})