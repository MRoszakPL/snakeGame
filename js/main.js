const Game = require('./game');

document.addEventListener('DOMContentLoaded', function () {
    const inputX = document.querySelector('#valueX');
    const inputY = document.querySelector('#valueY');
    const speed = document.querySelector('#speed');
    const level = document.querySelector('#level');
    const rewardInfo = document.querySelector('#reward');
    const startButton = document.querySelector('.startButton');

    const newGame = new Game();

    // Set default values on settings inputs
    inputX.value = newGame.settings.X;
    inputY.value = newGame.settings.Y;
    speed.value = newGame.settings.speed;

    startButton.addEventListener('click', function () {
        // Read set settings
        newGame.settings.X = inputX.value;
        newGame.settings.Y = inputY.value;
        newGame.settings.speed = speed.value;
        newGame.settings.level = level.value;

        // Get info if special type of powerUp is chosen
        newGame.powerUp.specialSetting = document.querySelector('input[name="powerup"]:checked').value;

        // Change text on page
        rewardInfo.innerHTML = 'Podstawa punktowa: ' + (50 * newGame.settings.level * newGame.settings.speed);

        // Add keydown listener
        document.addEventListener('keydown', newGame.keyDownReader);

        // Start of game
        newGame.startGame();

        // Rendering game
        newGame.render();
    })
});
