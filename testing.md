# Dwarf Match Testing

The code used for Dwarf Match was extensively tested through manual process during each stage of development. I have tested certain functions through the use of Jasmine to automate the testing however; due to time constraints and my lack of knowledge of using it, I have not written a complete set of automated testing.

## Code Validation

All code written has been thoroughly validated and passed through the following online validators:

- HTML - All code was run through the [W3C HTML Validator](https://validator.w3.org/) to ensure it was valid code and no errors were made.

- CSS - All styling was run through the [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) to ensure it was valid and no errors were made.

- JavaScript - All my script was run through the [JSHint](https://jshint.com/) validator and no erros were found.

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

7. I want the tile layout to be randomised so the front faces of the cards are not in the same position as previous games.

    - This has been achieved by using the Durstenfeld shuffle which shuffles the game tiles before they are appended to the gameboard.


## Automated Testing

## Manual Testing

