"use strict";

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
    gameActive: false,
    levelBackground: document.getElementById("game-page"),
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
        gameMusic: document.getElementById("game-music"),
        cardMatchAudio: new Audio("assets/audio/cardMatchSound.mp3"),
        soundEffectActive: true,
        musicSoundActive: true,
        soundEffectBtn: document.getElementById("sound-btn"),
        musicBtn: document.getElementById("music-btn"),
        musicVolumeElement: document.getElementById("mVolume-slider"),
        soundVolumeElement: document.getElementById("sVolume-slider"),
    },
    victory: {
        victoryModal: document.getElementById("victory"),
        flipModal: document.getElementById("flips-taken"),
        timeModal: document.getElementById("time-taken"),
        nextLevel: document.getElementById("next-level"),
        nextDifficulty: document.getElementById("difficult-start"),
    }
};

// Function sets default volume for all audio/music on page load

function defaultVolume() {
    app.audio.gameMusic.volume = app.audio.musicVolumeElement.defaultValue / 100;
    app.audio.clickSoundAudio.volume = app.audio.soundVolumeElement.defaultValue / 100;
    app.audio.cardMatchAudio.volume = app.audio.soundVolumeElement.defaultValue / 100;
    app.audio.cardFlipSound.volume = app.audio.soundVolumeElement.defaultValue / 100;
    app.audio.gameCompleteAudio.volume = 0.20;
}



// Below listener records the users choice for music value. If volume is set to 0. Music is paused.

app.audio.musicVolumeElement.addEventListener("change", event => {
    app.audio.gameMusic.volume = app.audio.musicVolumeElement.value / 100;
    if (app.audio.gameMusic.volume === 0) {
        stopMusic();
    } else {
        playGameMusic();
    }
});

function musicController() {
    if (app.audio.musicSoundActive === true) {
        app.audio.musicSoundActive = false;
        app.audio.musicBtn.innerHTML = "Off";
        stopMusic();
    } else {
        app.audio.musicSoundActive = true;
        app.audio.musicBtn.innerHTML = "On";
        playGameMusic();
    }
}

//The below determines if the game is active, if the game is not active, no music will play

function isGameActive() {
    if (app.difficultyLevel !== "") {
        app.gameActive = true;
    } else {
        app.gameActive = false;
    }
}

//Function to play the game music if game is active and music has not been muted

function playGameMusic() {
    isGameActive();
    if (app.gameActive !== false && app.audio.musicSoundActive !== false) {
        app.audio.gameMusic.play();
        app.audio.gameMusic.loop = true;
    }
}

//Function to "stop" music and reset to 0

function stopMusic() {
    app.audio.gameMusic.pause();
    app.audio.gameMusic.currentTime = 0;
}

/** 
 * Below listener records the users choice for sound effects volume. The sound value
 * for gameCompleteAudio audio is limited at 0.20 as the audio is too loud at higher levels.
 */

app.audio.soundVolumeElement.addEventListener("change", event => {
    app.audio.clickSoundAudio.volume = app.audio.soundVolumeElement.value / 100;
    app.audio.cardMatchAudio.volume = app.audio.soundVolumeElement.value / 100;
    app.audio.cardFlipSound.volume = app.audio.soundVolumeElement.value / 100;

    if (app.audio.soundVolumeElement.value == 0) {
        app.audio.gameCompleteAudio.volume = 0;
    } else if (app.audio.soundVolumeElement.value > 0 && app.audio.soundVolumeElement.value <= 20) {
        app.audio.gameCompleteAudio.volume = app.audio.soundVolumeElement.value / 100;
    } else {
        app.audio.gameCompleteAudio.volume = 0.2;
    }
});


function soundEffectController() {
    if (app.audio.soundEffectActive === true) {
        app.audio.soundEffectActive = false;
        app.audio.soundEffectBtn.innerHTML = "Off";
    } else {
        app.audio.soundEffectActive = true;
        app.audio.soundEffectBtn.innerHTML = "On";
    }
}


function clickSound() {
    if (app.audio.soundEffectActive !== false) {
        app.audio.clickSoundAudio.play();
    }
    return;
}


function victorySound() {
    stopMusic();
    if (app.audio.soundEffectActive !== false) {
        app.audio.gameCompleteAudio.play();
    }
    return;
}

function cardMatchEffect() {
    if (app.audio.soundEffectActive !== false) {
        app.audio.cardMatchAudio.play();
    }
    return;
}

function cardFlipSound() {
    if (app.audio.soundEffectActive !== false) {
        app.audio.cardFlipSound.play();
    }
    return;
}

// Function records users difficulty choice for level

function levelChoice(event) {
    app.difficultyLevel = event.id;
}


// Function determines the amount of pairs required for game based on difficulty.

function createGameTiles() {
    if (app.difficultyLevel === "easy") {
        app.gameTiles = 8;
    } else if (app.difficultyLevel === "normal") {
        app.gameTiles = 12;
    } else if (app.difficultyLevel === "hard") {
        app.gameTiles = 16;
    }
}

/**
 * The below function takes the output based on the user difficulty selection. 
 * Based on this output, it will create X amount of divs and assign it a pair class
 * which is then assigned to an array.
 */

function createCardLayout(gameTiles) {

    for (let i = 1; i < app.gameTiles + 1; i++) {
        const cardDiv = document.createElement("div");
        cardDiv.className = `tile image-center faceDown ${app.difficultyLevel}Pair${[i]}`;
        app.boardTiles.push(cardDiv);
    }
    for (let j = 1; j < app.gameTiles + 1; j++) {
        const cardDiv = document.createElement("div");
        cardDiv.className = `tile image-center faceDown ${app.difficultyLevel}Pair${[j]}`;
        app.boardTiles.push(cardDiv);
    }
}

/* Function shuffles card deck based on the  Durstenfeld shuffle, an optimized version of Fisher-Yates method
and has been obtained from Stackoverflow */

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function runs the game logic

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
});

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
        cardFlipCheckerReset();
        gameComplete();
    } else {
        setTimeout(() => {
            app.firstGuess.classList.add("faceDown");
            app.secondGuess.classList.add("faceDown");
            cardFlipCheckerReset();
        }, 800);
    }
}


// Function resets the variables used within the game matchCheck function

function cardFlipCheckerReset() {
    app.firstGuess = "";
    app.secondGuess = "";
    app.flip.timesFlipped = 0;
    app.matchChecker = [];
}

// function controls the Victory modal and options within it.

function gameComplete() {

    if (app.gameComplete.length === app.gameTiles) {
        victorySound();
        clearInterval(app.timer.gameTimer);
        app.victory.victoryModal.classList.remove("d-none");
        app.victory.victoryModal.classList.add("d-block");
        app.victory.flipModal.innerText = app.flip.flipCount;

        if (app.timer.minutesTimer === 0) {
            app.victory.timeModal.innerText = `${app.timer.secondsTimer} seconds to do it!`;
        } else if (app.timer.minutesTimer === 1) {
            app.victory.timeModal.innerText = `${app.timer.minutesTimer} minute and ${app.timer.secondsTimer} seconds to do it!`;
        } else {
            app.victory.timeModal.innerText = `${app.timer.minutesTimer} minutes and ${app.timer.secondsTimer} seconds to do it!`;
        }

        if (app.difficultyLevel !== "hard") {
            app.victory.nextLevel.classList.remove("d-none");
            app.victory.nextLevel.addEventListener("click", event => {
                clickSound();
                difficultyIncrease();
                app.victory.victoryModal.classList.add("d-none");
                app.victory.victoryModal.classList.remove("d-block");
                app.victory.nextLevel.classList.add("d-none");
            });
        }
    } else {
        return;
    }
}

//Function to change game background image based on difficulty

function gameBackground() {
    app.levelBackground.classList.remove("game-easy-background");
    app.levelBackground.classList.remove("game-normal-background");
    app.levelBackground.classList.remove("game-hard-background");

    if (app.difficultyLevel === "easy") {
        app.levelBackground.classList.add("game-easy-background");

    } else if (app.difficultyLevel === "normal") {
        app.levelBackground.classList.add("game-normal-background");

    } else if (app.difficultyLevel === "hard") {
        app.levelBackground.classList.add("game-hard-background");
    }
}

/** Function restarts the game board & clears all variables, excluding
 * difficulty variable as this value is used to restart the game at same difficulty.
 */

function restartLevel() {
    app.game.querySelectorAll("*").forEach(child => child.remove());
    app.gameTiles = 0;
    app.boardTiles = [];
    app.flip.flipCount = 0;
    cardFlipCheckerReset();
    app.gameComplete = [];
    app.flip.flipCounter.innerText = app.flip.flipCount;
    clearInterval(app.timer.gameTimer);
    gameTimerStop();
    gamePlay();
}

//Function increases difficulty level of game if user has not selected hard previously.

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

    gameBackground();
    
    playGameMusic();
    createGameTiles();
    createCardLayout(app.gameTiles);

    /* The below takes uses the shuffleArray function and assigns this to a new variable */

    let cardShuffle = shuffleArray(app.boardTiles);

    /*The below uses the cardShuffle vairable and then cycles through each element in the array
    and appends it to the gameArea within the DOM */

    cardShuffle.forEach(element => {
        app.game.appendChild(element);
    });

    // The below function starts the game timer when the user starts a game

    app.timer.gameTimer = setInterval(gameTimerStart, 1000);

    function gameTimerStart() {

        if (app.timer.secondsTimer < 9) {
            ++app.timer.secondsTimer;
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

function clearGameArea() {
    app.game.querySelectorAll("*").forEach(child => child.remove());
    app.gameTiles = 0;
    app.boardTiles = [];
    app.flip.flipCount = 0;
    cardFlipCheckerReset();
    app.gameComplete = [];
    app.flip.flipCounter.innerText = app.flip.flipCount;
    clearInterval(app.timer.gameTimer);
    app.difficultyLevel = "";
    gameTimerStop();
    stopMusic();
}