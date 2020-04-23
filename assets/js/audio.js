"use strict";

//Global variables are stored in the below object to reduce the amount in the global space.

const audio = {
    gameActive: false,
    cardFlipAudio: new Audio("assets/audio/cardflip.mp3"),
    victoryAudio: new Audio("assets/audio/VictorySound.mp3"),
    clickAudio: new Audio("assets/audio/ClickingSound.mp3"),
    gameMusic: document.getElementById("game-music"),
    cardMatchAudio: new Audio("assets/audio/cardMatchSound.mp3"),
    isSoundMuted: false,
    isMusicMuted: false,
    soundEffectBtn: document.getElementById("sound-btn"),
    musicBtn: document.getElementById("music-btn"),
    musicVolumeSlider: document.getElementById("mVolume-slider"),
    soundVolumeSlider: document.getElementById("sVolume-slider"),
};

// This sets default volume for all audio/music on page load

function defaultVolume() {
    audio.gameMusic.volume = audio.musicVolumeSlider.defaultValue / 100;
    audio.clickAudio.volume = audio.soundVolumeSlider.defaultValue / 100;
    audio.cardMatchAudio.volume = audio.soundVolumeSlider.defaultValue / 100;
    audio.cardFlipAudio.volume = audio.soundVolumeSlider.defaultValue / 100;
    audio.victoryAudio.volume = 0.20;
}

// Below listener records the users choice for music value. If volume is set to 0. Music is paused.

audio.musicVolumeSlider.addEventListener("change", event => {
    audio.gameMusic.volume = audio.musicVolumeSlider.value / 100;
    if (audio.gameMusic.volume === 0) {
        stopMusic();
    } else {
        playMusic();
    }
});

/**
 * Below function is tied to utils event listener. If user presses the button, the variable
 * isMusicMuted will change to the opposite boolean value. This is used to determine
 * whether music will play. 
 */

function musicController() {
    if (audio.isMusicMuted === true) {
        audio.isMusicMuted = false;
        audio.musicBtn.innerHTML = "On";
        playMusic();
    } else if (audio.isMusicMuted === false) {
        audio.isMusicMuted = true;
        audio.musicBtn.innerHTML = "Off";
        stopMusic();
    }
}

//The below determines if the game is active, if the game is not active.

function isGameActive() {
    if (app.difficultyLevel !== "") {
        audio.gameActive = true;
    } else {
        audio.gameActive = false;
    }
}

//The below function will play music as long as the conditions are met.

function playMusic() {
    isGameActive();
    if (audio.gameActive !== false && audio.isMusicMuted !== true) {
        audio.gameMusic.play();
        audio.gameMusic.loop = true;
    }
}

//Function to "stop" music and reset to 0.

function stopMusic() {
    audio.gameMusic.pause();
    audio.gameMusic.currentTime = 0;
}

/** 
 * Below listener records the users choice for sound effects volume. The sound value
 * for victoryAudio audio is limited at 0.20 as the audio is too loud at higher levels.
 */

audio.soundVolumeSlider.addEventListener("change", event => {
    audio.clickAudio.volume = audio.soundVolumeSlider.value / 100;
    audio.cardMatchAudio.volume = audio.soundVolumeSlider.value / 100;
    audio.cardFlipAudio.volume = audio.soundVolumeSlider.value / 100;

    if (audio.soundVolumeSlider.value == 0) {
        audio.victoryAudio.volume = 0;
    } else if (audio.soundVolumeSlider.value > 0 && audio.soundVolumeSlider.value <= 20) {
        audio.victoryAudio.volume = audio.soundVolumeSlider.value / 100;
    } else {
        audio.victoryAudio.volume = 0.2;
    }
});

/**
 * Function is tied to utils event listener. If user presses the button, the variable
 * isSoundMuted will change to the opposite boolean value. This is used to determine
 * whether sound will play. 
 */

function soundEffectController() {
    if (audio.isSoundMuted === true) {
        audio.isSoundMuted = false;
        audio.soundEffectBtn.innerHTML = "On";
    } else if (audio.isSoundMuted === false) {
        audio.isSoundMuted = true;
        audio.soundEffectBtn.innerHTML = "Off";
    }
}

// Function plays a click sound when buttons are pressed.

function clickSound() {
    if (audio.isSoundMuted !== true) {
        audio.clickAudio.play();
    }
    return;
}

// Function plays a victory sound on game completition.

function victorySound() {
    stopMusic();
    if (audio.isSoundMuted !== true) {
        audio.victoryAudio.play();
    }
    return;
}

// Function plays a sound when a card match is found.

function cardMatchEffect() {
    if (audio.isSoundMuted !== true) {
        audio.cardMatchAudio.play();
    }
    return;
}

// Function plays a sound when a card is being flipped.

function cardFlipSound() {
    if (audio.isSoundMuted !== true) {
        audio.cardFlipAudio.play();
    }
    return;
}