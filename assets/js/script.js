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
    },
    timer: {
        seconds: document.getElementById("seconds"),
        minutes: document.getElementById("minutes"),
        secondsTimer: 0,
        minutesTimer: 0,
        gameTimer: null,
    },
    audio: {
        cardFlipSound: new Audio("assets/audio/cardflip.mp3"),
        gameCompleteAudio: new Audio("assets/audio/VictorySound.mp3"),
        clickSoundAudio: new Audio("assets/audio/ClickingSound.mp3"),
        gameMusic: new Audio("assets/audio/alexander-nakarada-adventure.mp3"),
        cardMatchAudio: new Audio("assets/audio/cardMatchSound.mp3")
    },
    victory: {
        victoryModal: document.getElementById("victory"),
        flipModal: document.getElementById("flips-taken"),
        timeModal: document.getElementById("time-taken"),
        nextLevel: document.getElementById("next-level"),
        nextDifficulty: document.getElementById("difficult-start"),
    }
}

function soundEffectController() {
    let soundActive = true;
   //Placeholder - use an if statement and combine with event listener
}

function musicController() {
    let musicActive = true;
    //Placeholder - use an if statement and combine with event listener
}

function clickSound() {
    app.audio.clickSoundAudio.volume = 0.3;
    app.audio.clickSoundAudio.play();
}

function playMusic() {
    app.audio.gameMusic.play();
    app.audio.gameMusic.loop = true;
    app.audio.gameMusic.volume = 0.4;
}

function stopMusic() {
    app.audio.gameMusic.pause();
    app.audio.gameMusic.currentTime = 0;
}

function victorySound() {
    stopMusic();
    app.audio.gameCompleteAudio.volume = 0.15;
    app.audio.gameCompleteAudio.play();
}

function cardMatchEffect() {
    app.audio.cardMatchAudio.volume = 0.3;
    app.audio.cardMatchAudio.play();
}

function cardFlipSound() {
    app.audio.cardFlipSound.volume = 0.5;
    app.audio.cardFlipSound.play();
}

/**
 * The below records the users choice of difficulty level and 
 * assigns it as the value which will be used to determine 
 * what difficulty the game will play at. Difficuly level is used
 * to determine the amount of tiles required in the game. 
 **/

function levelChoice(event) {
    app.difficultyLevel = event.id;
};


function createGameTiles() {
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

app.game.addEventListener("click", function(event) {

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
    cardFlipSound();
}

function matchCheck() {
    let firstGuessPair = app.firstGuess.classList[2];
    let secondGuessPair = app.secondGuess.classList[2];

    if (firstGuessPair === secondGuessPair) {
        cardMatchEffect();
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
        victorySound();
        clearInterval(app.timer.gameTimer);
        app.victory.victoryModal.classList.remove("d-none");
        app.victory.victoryModal.classList.add("d-block");
        app.victory.flipModal.innerText = app.flip.flipCount;

        if (app.timer.minutesTimer === 0) {
            app.victory.timeModal.innerText = `${app.timer.secondsTimer} seconds to do it!`
        } else if (app.timer.minutesTimer === 1) {
            app.victory.timeModal.innerText = `${app.timer.minutesTimer} minute and ${app.timer.secondsTimer} seconds to do it!`
        } else {
            app.victory.timeModal.innerText = `${app.timer.minutesTimer} minutes and ${app.timer.secondsTimer} seconds to do it!`
        };

        if (app.difficultyLevel !== "hard") {
            app.victory.nextLevel.classList.remove("d-none");
            app.victory.nextLevel.addEventListener("click", event => {
                clickSound();
                difficultyIncrease();
                app.victory.victoryModal.classList.add("d-none");
                app.victory.victoryModal.classList.remove("d-block");
                app.victory.nextLevel.classList.add("d-none");
            });
        };
    } else {
        return;
    }
}

function restartLevel() {
    app.game.querySelectorAll("*").forEach(child => child.remove());
    app.gameTiles = 0;
    app.boardTiles = [];
    app.flip.flipCount = 0;
    cardFlipCheckerReset()
    app.gameComplete = [];
    app.flip.flipCounter.innerText = app.flip.flipCount;
    clearInterval(app.timer.gameTimer);
    gameTimerStop();
    gamePlay();
}

function difficultyIncrease() {

    if (app.difficultyLevel === "easy") {
        app.difficultyLevel = "normal";
    } else {
        app.difficultyLevel = "hard";
    }
    restartLevel();
}

/*This function creates the game board area*/

function gamePlay() {

    playMusic();

    createGameTiles();

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

        if(app.timer.secondsTimer < 9) {
            ++app.timer.secondsTimer
            app.timer.seconds.innerText = `0${app.timer.secondsTimer}`;
        } else {
            app.timer.seconds.innerText = ++app.timer.secondsTimer;
        }


        if (app.timer.secondsTimer === 60) {
            app.timer.minutes.innerText = ++app.timer.minutesTimer;
            app.timer.seconds.innerText = 0;
            app.timer.secondsTimer = 0;
        }
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
    app.flip.flipCount = 0;
    cardFlipCheckerReset()
    app.gameComplete = [];
    app.flip.flipCounter.innerText = app.flip.flipCount;
    clearInterval(app.timer.gameTimer);
    app.difficultyLevel = "";
    gameTimerStop();
    stopMusic();
}