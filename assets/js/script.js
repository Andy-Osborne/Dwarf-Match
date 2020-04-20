'use strict';

//Global variables are stored in the below object to reduce the amount in the global space.

const app = {
    gameTiles: 0,
    difficultyLevel: "",
    boardTiles: [],
    game: document.getElementById("gameArea"),
    matchChecker: [],
    firstGuess: "",
    secondGuess: "",
    gameComplete: [],
    flip: {
        flipCounter: document.getElementById("flips"),
        flipCount: 0,
        timesFlipped: 0,
        cardFlipSound: new Audio('assets/audio/cardflip.mp3'),
    },
    timer: {
        seconds: document.getElementById("seconds"),
        minutes: document.getElementById("minutes"),
        secondsTimer: 0,
        minutesTimer: 0,
        gameTimer: null,
    },

}

/**
 * The below records the users choice of difficulty level and 
 * assigns it as the value which will be used to determine 
 * what difficulty the game will play at. Difficuly level is used
 * to determine the amount of tiles required in the game. 
 **/

function levelChoice(obj) {
    app.difficultyLevel = obj.id;

    if (app.difficultyLevel === "easy") {
        app.gameTiles = 8;
    } else if (app.difficultyLevel === "normal") {
        app.gameTiles = 12;
    } else if (app.difficultyLevel === "hard") {
        app.gameTiles = 16;
    }
};

/**
 * The below function takes the output based on the user difficulty selection. 
 * Based on this output, it will create X amount of divs and assign it a pair class
 * which is then assigned to an array.
 */

function createCardLayout(gameTiles) {

    for (let i = 1; i < app.gameTiles + 1; i++) {
        var cardDiv = document.createElement("div");
        cardDiv.className = `tile image-center faceDown ${app.difficultyLevel}Pair${[i]}`;
        app.boardTiles.push(cardDiv);
    }
    for (let j = 1; j < app.gameTiles + 1; j++) {
        cardDiv = document.createElement("div");
        cardDiv.className = `tile image-center faceDown ${app.difficultyLevel}Pair${[j]}`;
        app.boardTiles.push(cardDiv);
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

app.game.addEventListener("click", function (event) {

    if (!event.target.classList.contains("faceDown") || app.flip.timesFlipped >= 2) {
        return;
    } else if (event.target.classList.contains("faceDown") && app.flip.timesFlipped <= 2) {
        cardFlip();
        app.flip.flipCount++;
        app.flip.flipCounter.innerText = app.flip.flipCount;
        app.flip.timesFlipped++;
        app.matchChecker.push(event.target.classList);

        if (app.matchChecker.length === 1) {
            app.firstGuess = event.target;
        } else if (app.matchChecker.length === 2) {
            app.secondGuess = event.target;
            matchCheck();
        }
    }
})

function cardFlip() {
    event.target.classList.remove("faceDown");
    app.flip.cardFlipSound.play();
}

function matchCheck() {
    let firstGuessPair = app.firstGuess.classList[2];
    let secondGuessPair = app.secondGuess.classList[2];

    if (firstGuessPair === secondGuessPair) {
        app.gameComplete.push(firstGuessPair);
        cardFlipCheckerReset()
        gameComplete()

    } else {
        setTimeout(() => {
            app.firstGuess.classList.add("faceDown");
            app.secondGuess.classList.add("faceDown");
            cardFlipCheckerReset()
        }, 800);
    }
}

function cardFlipCheckerReset() {
    app.firstGuess = "";
    app.secondGuess = "";
    app.flip.timesFlipped = 0;
    app.matchChecker = [];
}

function gameComplete() {

    if (app.gameComplete.length === app.gameTiles) {
        console.log("Wooo, game complete");
        // Need to add a message to user or a new modal to pop up. 
    } else {
        return;
    }
}

/*This function creates the game board area*/

function gamePlay() {

    createCardLayout(app.gameTiles);

    /* The below takes uses the shuffleArray function and assigns this to a new variable */

    let cardShuffle = shuffleArray(app.boardTiles);

    /*The below uses the cardShuffle vairable and then cycles through each element in the array
    and appends it to the gameArea within the DOM */

    cardShuffle.forEach(element => {
        app.game.appendChild(element)
    });

    // The below function starts the game timer when the user starts a game

    app.timer.gameTimer = setInterval(gameTimerStart, 1000);

    function gameTimerStart() {
        app.timer.seconds.innerText = ++app.timer.secondsTimer;

        if (app.timer.secondsTimer === 60) {
            app.timer.minutes.innerText = ++app.timer.minutesTimer;
            app.timer.seconds.innerText = 0;
            app.timer.secondsTimer = 0;
        }
        console.log(app.timer.secondsTimer);
    }
}

// This function stops the game timer and is invoked when the user exits the game.

function gameTimerStop() {
    app.timer.minutesTimer = 0;
    app.timer.secondsTimer = 0;
    app.timer.minutes.innerText = 0;
    app.timer.seconds.innerText = 0;
}


/*The below function clears the game board by removing the divs assigned to gameArea
and resets values for the associated game components */

let clearGameArea = () => {
    app.game.querySelectorAll("*").forEach(child => child.remove());
    app.gameTiles = 0;
    app.boardTiles = [];
    app.flip.count = 0;
    cardFlipCheckerReset()
    app.gameComplete = [];
    app.flip.flipCounter.innerText = 0;
    clearInterval(app.timer.gameTimer);
    gameTimerStop();
}
