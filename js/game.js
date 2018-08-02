  const ScoreBoard = require('./scoreboard');
  const Snake = require('./snake');
  const Board = require('./board');
  const Apple = require('./apple');
  const PowerUp = require('./powerup');

  function Game() {

    const Scoreboard = new ScoreBoard();
    const game = document.getElementById('game');
    const context = game.getContext('2d');
    const score = document.querySelector('#score');
    const snakeLength = document.querySelector('#lengthOfSnake');
    const timerElement = document.querySelector('#timer');
    const startButton = document.querySelector('.startButton');
    timerElement.innerHTML="Rozpocznij grę";
    snakeLength.innerHTML = "Długość węża: ";

    const self = this;
    this.snake = 0;
    this.board = 0;
    this.apple = 0;
    this.powerUp = 0;
    this.numberOfEatenApples = 0;
    this.invisible = false;

    this.time = 0;
    this.settings = {
        X: 5,
        Y: 5,
        level: 1,
        speed: 1,
        chosenLevel: 0
    };

    this.score = 0;
    this.gameTimer= 0;


    this.keyDownReader = function (event) {
        event.preventDefault();
        self.snake.setDirection(event.keyCode);
    };

    //Rendering each element of game
    this.renderObstacles = function () {
        context.fillStyle = "rgb(0,0,0)"; //Black
        for(let i = 0; i<this.board.obstaclePositionX.length; i++){
            context.fillRect(this.board.obstaclePositionX[i]*15,this.board.obstaclePositionY[i]*-15, 15, 15);
        }
    };

    this.renderSnake = function () {
        context.fillStyle = this.snake.color;
        for(let i = 0; i<this.snake.positionsX.length; i++){
            context.fillRect(this.snake.positionsX[i]*15,this.snake.positionsY[i]*-15, 15, 15);
        }
    };

    this.renderApple = function () {
        context.fillStyle = "rgb(0,255,0)"; //Green
        context.fillRect(this.apple.positionX*15,this.apple.positionY*-15, 15, 15);

    };

    this.renderPowerUp = function () {

        context.fillStyle = this.powerUp.colorOfPowerUp; //Yellow
        context.fillRect(this.powerUp.positionX*15,this.powerUp.positionY*-15, 15, 15);
    };

    this.render = function () {
        this.renderObstacles();
        this.renderSnake();
        this.renderApple();
        if(this.powerUp.showPowerUp){
            this.renderPowerUp();
        }
    };

    //Checking collisions with specific of snake
    this.checkCollisionApple = function () {

        if(this.apple.positionX === this.snake.positionsX[this.snake.positionsX.length-1] && this.apple.positionY === this.snake.positionsY[this.snake.positionsY.length-1] ){

            this.snake.lengthenSnake(1);
            this.apple.generateNewLocation();
            this.score= this.score + (50*this.settings.level*this.settings.speed);
            snakeLength.innerHTML = "Długość węża: " + this.snake.length;
            this.numberOfEatenApples++;

            //If 2 apples were eaten. PowerUp will appear
            if(this.numberOfEatenApples%2 === 0){
                this.powerUp.generateProperties();
                this.powerUp.showPowerUp = true;
            }
        }
    };

    this.checkCollisionWithSnake = function () {
        for(let i = 0; i< this.snake.positionsX.length-1; i++){
            if(this.snake.positionsX[this.snake.positionsX.length-1] === this.snake.positionsX[i] && this.snake.positionsY[this.snake.positionsY.length-1] === this.snake.positionsY[i]){
                this.gameOver();
            }
        }
    };

    this.checkCollisionWithObstacles = function () {
        for(let i = 0; i< this.board.obstaclePositionX.length; i++){
            if(this.snake.positionsX[this.snake.positionsX.length-1] === this.board.obstaclePositionX[i] && this.snake.positionsY[this.snake.positionsY.length-1] === this.board.obstaclePositionY[i]){
                this.gameOver();
            }
        }
    };

    this.clearPowerUpTimer = function () {
        this.invisible = false;
        this.powerUp.powerUpMuliplier = 1;
        this.snake.color = "rgb(0,128,0)"; //Dark Green
        clearTimeout( this.powerUp.powerUpTimer);
    };

    this.checkCollisionWithPowerUp = function () {

        if(this.powerUp.positionX === this.snake.positionsX[this.snake.positionsX.length-1] && this.powerUp.positionY === this.snake.positionsY[this.snake.positionsY.length-1] ){

            this.powerUp.showPowerUp = false;
            if(this.powerUp.typeOfPowerUp<=1){
                this.snake.lengthenSnake(this.settings.X);
                snakeLength.innerHTML = "Długość węża: " + this.snake.length;
                console.log('Wydłużanie');

            } else {
                if(this.powerUp.typeOfPowerUp<2 && this.powerUp.typeOfPowerUp>1) {
                    this.snake.shortenSnake(self.settings.X);
                    snakeLength.innerHTML = "Długość węża: " + this.snake.length;
                    console.log('Skracanie');
                } else {
                    if(this.powerUp.typeOfPowerUp<3 && this.powerUp.typeOfPowerUp>=2) {

                        this.clearPowerUpTimer();
                        this.powerUp.powerUpMuliplier = 2;
                        this.snake.color = "rgb(255,0,0)";
                        this.powerUp.powerUpTimer= setTimeout(
                            function () {
                                self.powerUp.powerUpMuliplier = 1;
                                self.snake.color = "rgb(0,128,0)"; //Dark Green
                                clearTimeout(self.powerUp.powerUpTimer);
                            }
                            , 1000*this.settings.Y);

                        console.log('Przyspieszenie');
                    } else {
                        if(this.powerUp.typeOfPowerUp<4 && this.powerUp.typeOfPowerUp>=3) {
                            this.clearPowerUpTimer();
                            this.powerUp.powerUpMuliplier = 0.5;
                            this.snake.color = "rgb(46,139,87)";
                            this.powerUp.powerUpTimer= setTimeout(
                                function () {
                                    self.powerUp.powerUpMuliplier = 1;
                                    self.snake.color = "rgb(0,128,0)"; //Dark Green
                                    clearTimeout( self.powerUp.powerUpTimer);
                                }
                                , 1000*this.settings.Y);

                            console.log('Spowolnienie');
                        } else {
                            if(this.powerUp.typeOfPowerUp<5 && this.powerUp.typeOfPowerUp>=4) {
                                this.score+= (50*this.settings.level*this.settings.speed)*this.settings.X;
                                console.log('Punkty');
                            } else {
                                this.clearPowerUpTimer();
                                this.invisible = true;
                                this.snake.color = "rgb(192,192,192)";
                                this.powerUp.powerUpTimer= setTimeout(
                                    function () {
                                        self.invisible = false;
                                        self.snake.color = "rgb(0,128,0)"; //Dark Green
                                        clearTimeout( self.powerUp.powerUpTimer);
                                    }
                                    , 1000*this.settings.Y);
                                console.log('Przenikanie');
                            }
                        }
                    }
                }

            }


        }

    };

    //Start game function
    this.startGame = function () {

        //Generation of obstacles
        this.board =  new Board(this.settings.level);

        //Generation of snake
        this.snake =  new Snake(this.settings.X);

        //Send information about obstacles to apple
        this.apple =  new Apple(this.board.obstaclePositionX, this.board.obstaclePositionY,);

        this.powerUp = new PowerUp(this.board.obstaclePositionX, this.board.obstaclePositionY,);

        //Generate Apple position
        this.apple.generateNewLocation();

        //Hide "Start Button"
        startButton.style.visibility = "hidden";

        let counter = 0;
        this.snake.length = 3;
        this.time = 0;
        this.score =0;
        this.numberOfEatenApples =0;

        snakeLength.innerHTML = "Długość węża: " + this.snake.length;

        this.gameTimer = setInterval(function () {

            if(counter%(100*(1/(self.settings.speed*self.powerUp.powerUpMuliplier))) === 0) {
                self.snake.move();
                context.clearRect(0, 0, 600, 600);
                self.render();
                self.checkCollisionApple();
                self.checkCollisionWithSnake();
                if(!self.invisible){
                    self.checkCollisionWithObstacles();
                }
                if(self.powerUp.showPowerUp ){
                    self.checkCollisionWithPowerUp();
                }
                score.innerHTML = 'Twój wynik: ' + self.score;
            }

            if(counter%1000 === 0){
                self.time ++;
                timerElement.innerHTML = 'Gra trwa ' + self.time + 's';
                counter = 0;
            }

            counter+=25;

        }, 25)

    };

    //Game Over function
    this.gameOver = function () {

        //Stop timer
        clearInterval(this.gameTimer);

        //Create GAME OVER screen
        context.clearRect(0, 0, 600, 600);
        context.font="100px Georgia";
        context.fillStyle = "rgb(255,0,0)"; //Red
        context.fillText("GAME OVER",150,315,300);

        //Change text over the board
        timerElement.innerHTML = 'Koniec gry';
        score.innerHTML = 'Zdobyłeś ' + this.score + 'punktów';

        Scoreboard.addResult(this.score);

        //Show "Start Button" again
        startButton.style.visibility = "visible";

        //Remove of keyDown listener after game
        document.removeEventListener('keydown', this.keyDownReader);
    };

}

module.exports = Game;