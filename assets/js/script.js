"use strict";

//Global variables are stored in the below object to reduce the amount in the global space.

let app = {
    gameCards: 0,
    difficultyLevel: "",
    cardHolder: [],
    game: document.getElementById("gameArea"),
    matchChecker: [],
    firstGuess: "",
    secondGuess: "",
    gameComplete: [],
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
    victory: {
        victoryModal: document.getElementById("victory"),
        flipModal: document.getElementById("flips-taken"),
        timeModal: document.getElementById("time-taken"),
        nextLevel: document.getElementById("next-level"),
        nextDifficulty: document.getElementById("difficult-start"),
    }
};

// Function records users difficulty choice for level.

function levelChoice(event) {
    app.difficultyLevel = event.id;
}

// Function determines the amount of pairs required for game based on difficulty.

function determineGameCards() {
    if (app.difficultyLevel === "easy") {
        app.gameCards = 8;
    } else if (app.difficultyLevel === "normal") {
        app.gameCards = 12;
    } else if (app.difficultyLevel === "hard") {
        app.gameCards = 16;
    }
}

/**
 * Function takes the output based on the user difficulty selection. 
 * Based on this output, it will create X amount of divs and assign it a pair class
 * which is then assigned to an array.
 */

function createCardLayout(gameCards) {
    for (let i = 1; i < app.gameCards + 1; i++) {
        const cardDiv = document.createElement("div");
        cardDiv.className = `card image-center faceDown ${app.difficultyLevel}Pair${[i]}`;
        app.cardHolder.push(cardDiv);
    }
    for (let j = 1; j < app.gameCards + 1; j++) {
        const cardDiv = document.createElement("div");
        cardDiv.className = `card image-center faceDown ${app.difficultyLevel}Pair${[j]}`;
        app.cardHolder.push(cardDiv);
    }
}

/* Function shuffles card deck based on the Durstenfeld shuffle, an optimized version of Fisher-Yates method
and has been obtained from Stackoverflow */

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Function runs the game logic. If conditions in else if are met, the game records
 * the click in the flip counter, updates the HTML element for timesFlipped, pushes the target card
 * into an array to be checked. Each card flip is assigned to a variable, firstGuess and
 * secondGuess. Once the array contains 2 cards, it runs the matchCheck function.
 */

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
});

// Function removes the faceDown class from event.target in game logic & plays sound effect.

function cardFlip() {
    event.target.classList.remove("faceDown");
    cardFlipSound();
}

/**
 * Function records the respective class from firstGuess and secondGuess. 
 * This then checks to see if they match. If they do a sound is played,
 * the class of the firstGuess is assigned to the gameComplete array and 
 * then the flipCounter is reset so the player can select two more cards. 
 * It runs the gameComplete function to determine whether the game is over.
 * If the cards do not match, it locks the board whilst it adds the facedown
 * class back to the first and secondGuess cards, then exits the function
 */

function matchCheck() {
    let firstGuessPair = app.firstGuess.classList[2];
    let secondGuessPair = app.secondGuess.classList[2];

    if (firstGuessPair === secondGuessPair) {
        cardMatchEffect();
        app.gameComplete.push(firstGuessPair);
        matchCheckerReset();
        gameComplete();
    } else {
        setTimeout(() => {
            app.firstGuess.classList.add("faceDown");
            app.secondGuess.classList.add("faceDown");
            matchCheckerReset();
        }, 800);
    }
}

function matchCheckerReset() {
    app.firstGuess = "";
    app.secondGuess = "";
    app.flip.timesFlipped = 0;
    app.matchChecker = [];
}

/**
 * Function determines whether game is complete by checking the array length
 * of gameComplete against the gameCards array. 
 * 
 * If game is complete, it displays the victory modal and tells the user
 * how long it took them to win and the amount of flips done in the game
 * and provides them 2 to 3 options based on current difficultyLevel value.
 */

function gameComplete() {
    if (app.gameComplete.length === app.gameCards) {
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

// Function to change game background image based on difficulty.

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
    app.gameCards = 0;
    app.cardHolder = [];
    app.flip.flipCount = 0;
    matchCheckerReset();
    app.gameComplete = [];
    app.flip.flipCounter.innerText = app.flip.flipCount;
    clearInterval(app.timer.gameTimer);
    gameTimerStop();
    gamePlay();
}

// Function increases difficulty level of game if user has not selected hard previously.

function difficultyIncrease() {
    if (app.difficultyLevel === "easy") {
        app.difficultyLevel = "normal";
    } else {
        app.difficultyLevel = "hard";
    }
    restartLevel();
}

// This function creates the game board area.

function gamePlay() {
    gameBackground();
    playMusic();
    determineGameCards();
    createCardLayout(app.gameCards);

    // The below uses the shuffleArray function and assigns this to a new variable. 

    let cardShuffle = shuffleArray(app.cardHolder);

    // The below appends each cardShuffle element it to the gameArea within the DOM,

    cardShuffle.forEach(element => {
        app.game.appendChild(element);
    });

    // The below function starts the game timer and updates the corresponding HTML field.

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

// Function stops the game timer and is invoked when the user exits the game.

function gameTimerStop() {
    app.timer.minutesTimer = 0;
    app.timer.secondsTimer = 0;
    app.timer.minutes.innerText = 0;
    app.timer.seconds.innerText = 0;
}

// Function clears the game board and resets values.

function clearGameArea() {
    app.game.querySelectorAll("*").forEach(child => child.remove());
    app.gameCards = 0;
    app.cardHolder = [];
    app.flip.flipCount = 0;
    matchCheckerReset();
    app.gameComplete = [];
    app.flip.flipCounter.innerText = app.flip.flipCount;
    clearInterval(app.timer.gameTimer);
    app.difficultyLevel = "";
    gameTimerStop();
    stopMusic();
}
