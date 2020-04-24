// Tutorial Modal

document.querySelectorAll(".tutorial-btn").forEach(item => {
    item.addEventListener("click", event => {
        clickSound();
        document.getElementById("tutorial").classList.add("d-block");
        document.getElementById("tutorial").classList.remove("d-none");
    });
    document.querySelectorAll(".modal-close").forEach(item => {
        item.addEventListener("click", event => {
            document.getElementById("tutorial").classList.remove("d-block");
            document.getElementById("tutorial").classList.add("d-none");
        });
    });
});

// Play Menu Modal

document.querySelector(".play-btn").addEventListener("click", event => {
    clickSound();
    document.getElementById("levelSelect").classList.remove("d-none");
    document.getElementById("levelSelect").classList.add("d-block");

    document.querySelectorAll(".modal-close").forEach(item => {
        item.addEventListener("click", event => {
            document.getElementById("levelSelect").classList.remove("d-block");
            document.getElementById("levelSelect").classList.add("d-none");
        });
    });
});

// Audio Modal

document.querySelectorAll(".audio-btn").forEach(item => {
    item.addEventListener("click", event => {
        clickSound();
        document.getElementById("soundModal").classList.remove("d-none");
        document.getElementById("soundModal").classList.add("d-block");
    
        document.querySelectorAll(".modal-close").forEach(item => {
            item.addEventListener("click", event => {
                document.getElementById("soundModal").classList.remove("d-block");
                document.getElementById("soundModal").classList.add("d-none");
            });
        });
    });
});

// Audio Options Listener

document.getElementById("sound-btn").addEventListener("click", event => {
    soundEffectController();
});

document.getElementById("music-btn").addEventListener("click", event => {
    musicController();
});

/** The below is an event listener for when the user clicks on a level button within the
 * Play Menu Modal
 **/

document.querySelectorAll(".level-btn").forEach(item => {
    item.addEventListener("click", event => {
        clickSound();
        document.getElementById("landing-page").classList.remove("d-block");
        document.getElementById("landing-page").classList.add("d-none");
        document.getElementById("game-page").classList.remove("d-none");
        document.getElementById("game-page").classList.add("d-block");
        document.getElementById("levelSelect").classList.remove("d-block");
        document.getElementById("levelSelect").classList.add("d-none");
        document.getElementById("nav-btns").classList.remove("d-none");
        document.getElementById("title").classList.add("d-none");
        document.getElementById("title").classList.remove("d-block");
    });
});

/** The below is an event listener for when the user clicks on the exit button within the
 * game area.
 **/

document.querySelector("#exit-btn").addEventListener("click", event => {
    clickSound();
    clearGameArea();
    document.getElementById("victory").classList.add("d-none");
    document.getElementById("victory").classList.remove("d-block");
    document.getElementById("game-page").classList.add("d-none");
    document.getElementById("game-page").classList.remove("d-block");
    document.getElementById("landing-page").classList.add("d-block");
    document.getElementById("nav-btns").classList.add("d-none");
    document.getElementById("title").classList.remove("d-none");
    document.getElementById("title").classList.add("d-block");
});

// The below runs the restart game function

document.getElementById("restart-btn").addEventListener("click", event => {
    clickSound();
    restartLevel();
});

// Victory modal listeners.

document.getElementById("home").addEventListener("click", event => {
    clickSound();
    clearGameArea();
    document.getElementById("victory").classList.add("d-none");
    document.getElementById("victory").classList.remove("d-block");
    document.getElementById("game-page").classList.add("d-none");
    document.getElementById("game-page").classList.remove("d-block");
    document.getElementById("landing-page").classList.add("d-block");
    document.getElementById("nav-btns").classList.add("d-none");
    document.getElementById("title").classList.remove("d-none");
    document.getElementById("title").classList.add("d-block");
});

document.getElementById("restart-level").addEventListener("click", event => {
    clickSound();
    document.getElementById("victory").classList.add("d-none");
    document.getElementById("victory").classList.remove("d-block");
    restartLevel();
});