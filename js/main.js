const Game = require('./game');

document.addEventListener('DOMContentLoaded', function () {


    const inputX = document.querySelector('#valueX');
    const inputY = document.querySelector('#valueY');
    const speed = document.querySelector('#speed');
    const level = document.querySelector('#level');
    const rewardInfo = document.querySelector('#reward');
    const startButton = document.querySelector('.startButton');

    const GameVar = new Game();

    //Set default values on settings inputs
    inputX.value = GameVar.settings.X;
    inputY.value = GameVar.settings.Y;
    speed.value = GameVar.settings.speed;

    startButton.addEventListener('click', function () {

            //Read set settings
            GameVar.settings.X = inputX.value;
            GameVar.settings.Y = inputY.value;
            GameVar.settings.speed = speed.value;
            GameVar.settings.level = level.value;

            //Get info if special type of powerUp is chosen
            GameVar.powerUp.specialSetting = document.querySelector('input[name="powerup"]:checked').value;

            //Change text on page
            rewardInfo.innerHTML = 'Podstawa punktowa: '+ (50*GameVar.settings.level*GameVar.settings.speed);

            //Add keydown listener
            document.addEventListener('keydown', GameVar.keyDownReader);

            //Start of game
            GameVar.startGame();

            //Rendering game
            GameVar.render();





    });

});