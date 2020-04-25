# Dwarf Match Testing

The code used for Dwarf Match was extensively tested through manual process during each stage of development. I have tested certain functions through the use of Jasmine to automate the testing however; due to time constraints and my lack of knowledge of using it, I have not written a complete set of automated testing.

## Code Validation

All code written has been thoroughly validated and passed through the following online validators:

- HTML - All code was run through the [W3C HTML Validator](https://validator.w3.org/) to ensure it was valid code and no errors were made.

- CSS - All styling was run through the [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) to ensure it was valid and no errors were made.

- JavaScript - All my script was run through the [JSHint](https://jshint.com/) validator and no errors were found.

## Testing Against User Stories

The below goes through of of the user stores listed in the UX section of the [README.md](https://github.com/Andy-Osborne/Dwarf-Match/blob/master/README.md).

**As a user, I want:**

1. The landing page to be visually appealing as this sets the standard for the rest of the website and will aid in the decision of whether I want to try the game or not.

    - The landing page of the website has a fantasy theme though the use of images which appeals to the user.
    - The background image on the landing page has been animated through the use of CSS to show a flowing forest which was done to stimulate the visual appearance to the user.
    - The colour scheme used compliments the theme of the game and that all text elements standout against their background colours.
    - The use of images against the menu buttons emphasizes what each button does, even if there was to be no text shown.

2. To be able to navigate myself around the site with ease and with as little guidance as necessary.

    - All user interaction buttons are clearly labeled so the user can see it and instantly know what it does.
    - During the course of the game, buttons appear in the top left of the screen that the user can interact with and use an image to display what the intent of that button does.

3. To easily access the game, tutorial information if needed, and control the sounds coming from the website.

    - All buttons are easily accessible to the user throughout their journey.
    - The audio controls are simplistic in nature so the user can intuitively use them as they can either reduce/increase the volume of sound effects/music or use the ON/OFF button to completely disable them.

4. I want to be able to choose the difficulty level of the game before I play and have an idea of what will change with each difficulty level.

    - This is achieved through the play button as it asks the user to confirm the difficulty they want to play at and states how many cards and pairs are in that level.

5. I want to be able to restart the game if necessary without having to go back to the home screen to do it.

    - This has been achieved in two different ways. During the course of the game, I have used an image of a circular arrow which is conventionally used in games to indicate "Restart". In addition to this, when the user completes a level, the victory modal pop-up asks them if they would like to restart the level.

6. I want to be able to keep track of the amount of flips it has taken me to complete the game & the time taken to do so as this can give me a personal challenge to beat it on further run throughs.

    - During the course of the game the amount of flips the user has done and the time in game is recorded and displayed to the user above the game board so it is easily viewable.
    - Upon level completion, the victory modal displays the amount of flips done and time taken to the user.

7. I want the card layout to be randomised so the front faces of the cards are not in the same position as previous games.

    - This has been achieved by using the Durstenfeld shuffle which shuffles the game cards before they are appended to the game board.

## Manual Testing

I have detailed the manual testing undertaken during the development stage to ensure that all aspects of the game work as intended.

### Responsive Design Testing

During the development and testing phase of the site, I used Google Chrome and Google Canary Dev Tools to test the layout as I built my code and used the various screen sizes to ensure that it displayed correctly and that elements of the size displayed correctly and easily viewable by the user.

1. Overview:

    This game was intended to be responsive to all user media devices such as mobile phones, tablets, desktops.

2. How was this implemented?

    To ensure the site remains responsive, I tested the layout at every stage of development on the various screen sizes within the Chrome Dev tools and corrected the styling of the elements and added Media Queries so that the design will adjust to device being viewed. As this is a game, users may decide play it with a landscape orientation rather than portrait so I tailored additional Media Queries with this in mind.

    The overall site was designed using the Bootstrap Framework to make use of their flex layout. In addition to this I used relative measurements in my styling where possible, rather than absolute measurements to allow the elements to adapt to screen size changes before a new media query would need to be introduced.

### Responsive Bugs Identified

- Where were the bugs?
    1. Google Canary acted differently to Google Chrome - max-width: fit-content
    2. Edge - When modals are launched a white space appears between background image and footer at bot of page
    3. Image sizing - images were different sizes which caused issues on displaying

### Functionality Testing

1. Modal Overview

    - I performed manual tests on all the modals to ensure they could open and close correctly. All modals opened and closed as expected, no bugs discovered with this functionality.

- Bug Discovered - **Multiple Modals Open At Once**:

     During the testing of the modals, I discovered that I could launch multiple modals at the same time. For example, when the Audio Modal was open, I could also open the Tutorial Modal and this would open up behind the Audio Modal. This was not an intended function.

- Fix Applied:

    In order to fix this unintended bug, I created the below function which is executed when either the Tutorial or Audio Modal is opened and it closes the other one:

    ```Javascript
    function closeActiveModal() {
        document.getElementById("tutorial").classList.remove("d-block");
        document.getElementById("tutorial").classList.add("d-none");
        document.getElementById("soundModal").classList.remove("d-block");
        document.getElementById("soundModal").classList.add("d-none");
    }
    ```

- Bug Discovered - **Tutorial & Sound Modal During Victory Modal**:

    When completing a level within the game, the Victory Modal launched as expected however; I was also able to launch the Tutorial and Audio Modals as well. The Audio Modal was able to launch on top of the Victory Modal where the Tutorial Modal would launch underneath the Victory Modal. **This issue was prior to the fix documented above**

    I considered disabling the Audio and Tutorial Modal buttons whilst the Victory Modal is active however; I did not want to limit the users actions.
    I discovered that I could launch multiple modals at the same time. For example, when the Audio Modal was open, I could also open the Tutorial Modal and this would open up behind the Audio Modal. This was not an intended function.

- Fix Applied:

    In order to fix this unintended bug, I edited the CSS style rule for the Victory Modal to lessen its `z-index` value so that the Audio Modal and Tutorial Modal will launch above it.

#### Individual Modal Testing

1. **Audio Modal**

    1. Sound Effect and Music Level Slider

        - I tested the slider to ensure that it updated the volume level correctly. I initially included the console.log to report to the console the volume level after any change in the audio level was made.

        - I tested that once the volume had been adjusted, the audio levels would remain at that level throughout the users journey in the game and until they adjusted it again.

        - I tested that the text within the ON/OFF button correctly updated to reflect the current status of whether the audio was ON/OFF.

        - No bugs were discovered with the slider functionality and it correctly adjusted the volume levels.

    2. Sound Effect and Music ON/OFF Button

        - I tested the functionality of the buttons one by one to ensure that they muted the right aspect they were assigned and once they were turned on again, Sound Effects and Music would play.

        - In addition to toggling the buttons ON/OFF in the same session, I commenced a game, played a few cards, toggled the both audio's OFF, played a few more cards, then exited to the landing page and then re-entered a game to ensure that sounds/music would commence until the Sound Effects/Music were turned back on.

        - No bugs were discovered with the mute button functionality and all sound effects and music remained muted until they were turned on again.

2. **Level Selection Modal**

    1. I tested each button individually to ensure that the ``levelChoice`` function was correctly grabbing the ID of the button pressed by logging it to the console as well as logging the current value of the variable ``app.difficultyLevel``.

        - After ascertaining that the correct value was saved to the variable and I had linked it to the relevant functions of creating the game area, I tested it further to ensure the right amount of cards were generated according to that level.

        - No bugs were discovered with the level button functionality and the correct values were passed through to the variable.

3. **Tutorial Modal**

    1. The Tutorial Modal primarily holds text to explain to the user how to play the game, the only functionality to test was that it launches and closes as expected.

        - No bugs were discovered with the functionality of the Tutorial Modal.

4. **Victory Modal**

    1. **Victory Modal and Sound Effect**

        - I tested that the Victory Modal would launch at the end of each game once the user completed their current level and play the victory sound (as long as the user had not muted the audio).

        - No bugs were discovered with the functionality of the Victory Modal pop-up appearing.

        - I tested whether the buttons within the play area would impact the Victory Modal. Aside from the issues mentioned previously about the Sound and Tutorial Modal there was one further element that impacted it.

        - Bug Discovered:

            - If the user presses the "Restart Button" associated with the game area, the game would restart however; the Victory Modal would remain open.

        - Fix Applied:

            - To fix this bug, I created a function that would close the Victory Modal and associated it with the in-game "Restart Button" so that it would be executed upon that button being pressed.

            ```Javascript
            function closeVictoryModal() {
                document.getElementById("victory").classList.add("d-none");
                document.getElementById("victory").classList.remove("d-block");
            }
            ```

    2. **InnerText: Displaying Time Taken and Flip Count**

        - I tested that the Victory Modal correctly displayed the amount of flips and time it took the user to complete the level. It correctly displayed the amount of flips taken.

        - Bug Discovered:

            - When it came to displaying the time taken for the user to complete the level, it initially updated the HTML text to say that it took the user ``0 minutes and XX seconds`` to complete the level however; if the game took less than a minute to complete then it should only show the amount of seconds to complete.

            - In addition, if it only took the user 1 minute to complete the level, then the HTML text should state ``1 minute and XX seconds``.

        - Fix Applied:

            - To fix this, I added in an if statement as follows:

                ```Javascript
                if (app.timer.minutesTimer === 0) {  
                    app.victory.timeModal.innerText = `${app.timer.secondsTimer} seconds to do it!`;
                    } else if (app.timer.minutesTimer === 1) {
                    app.victory.timeModal.innerText = `${app.timer.minutesTimer} minute and ${app.timer.secondsTimer} seconds to do it!`;
                    } else {
                    app.victory.timeModal.innerText = `${app.timer.minutesTimer} minutes and ${app.timer.secondsTimer} seconds to do it!`;
                }
                ```

    3. **Restart Level**

        - I tested the functionality of the "Restart" level button during each level to ensure it worked as intended.

        - No bugs were discovered with the functionality of the "Restart" level button and it correctly restarted the level at the same difficulty the user was playing at and reset the counter and time to 0.

    4. **Next Level**

        - I tested that the "Next Level" button works correctly and generates a new game on the next highest difficulty. The functionality worked as intended if the user was on either Easy or Normal.

        - Bug Discovered:

            - When the user was playing at the Hard difficulty, the button would show however; it caused an error as the user was already on the highest difficulty.

        - Fix Applied:

            - To fix this, I added in an if statement as follows that displays the "Next Level" button if the user is not already on the hard level:

            ```Javascript
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
            ```

    5. **Exit Function**

        - I tested that the "Take me home" button works correctly and completes the functionality of clearing the game board and taking the user to the landing page.

        - No bugs were discovered with this functionality and it works as intended.

#### Individual Audio and Music Testing

1. Audio & Music

    1. Clicking Sound Effect
        - What did I do to test?
        - What bugs were discovered?
        - How did I remedy them?

    2. Card Match Sound Effect
        - What did I do to test?
        - What bugs were discovered?
        - How did I remedy them?

    3. Card Flip Sound Effect
        - What did I do to test?
        - What bugs were discovered?
        - How did I remedy them?

    4. Victory Sound
        - What did I do to test?
        - What bugs were discovered?
        - How did I remedy them?

    5. Game Music
        - What did I do to test?
        - What bugs were discovered?
        - How did I remedy them?

#### Game Functionality Testing

3. Game Functionality

    1. Card Flipping
        - What did I do to test?
        - What bugs were discovered?
        - How did I remedy them?

    2. Card Matching
        - What did I do to test?
        - What bugs were discovered?
        - How did I remedy them?

    3. Flip Counter
        - What did I do to test?
        - What bugs were discovered?
        - How did I remedy them?

    4. Time Count
        - What did I do to test?
        - What bugs were discovered?
        - How did I remedy them?

    5. Game Restart
        - What did I do to test?
        - What bugs were discovered?
        - How did I remedy them?

### Additional Testing

I asked my friends and family to try the game out on their various devices and they could not find any errors within the game or the responsiveness of the site.
