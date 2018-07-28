document.addEventListener('DOMContentLoaded', function () {

    const game = document.getElementById('game');
    const context = game.getContext('2d');

    const inputX = document.querySelector('#valueX');
    const inputY = document.querySelector('#valueY');
    const speed = document.querySelector('#speed');
    const level = document.querySelector('#level');
    const timerElement = document.querySelector('#timer');
    const score = document.querySelector('#score');
    const startButton = document.querySelector('.startButton');
    const rewardInfo = document.querySelector('#reward');
    const scoreList = document.querySelector('#scoreList');
    const snakeLength = document.querySelector('#lengthOfSnake');

    function keyDownReader(event) {
        event.preventDefault();
        GameVar.snake.setDirection(event.keyCode);
    }

    function Snake() {

        this.positionsX = [1,2,3];
        this.positionsY = [0,0,0];
        this.length = 3;
        this.direction = 'right';
        this.lastOppositeDirection = 'left';
        this.color = "rgb(0,128,0)"; //Dark Green

        this.setDirection = function (direction) {

            switch (direction) {
                case 37:
                    if('left' !==  this.lastOppositeDirection){
                        this.direction = 'left';
                    }
                    break;

                case 38:
                    if('up' !==  this.lastOppositeDirection){
                        this.direction = 'up';
                    }
                    break;

                case 39:
                    if('right' !== this.lastOppositeDirection){
                        this.direction = 'right';
                    }

                    break;

                case 40:
                    if('down' !== this.lastOppositeDirection){
                        this.direction = 'down';
                    }
                    break;
            }
        };

        this.move = function () {

                switch(this.direction){

                    case "right":
                        if(this.positionsX[this.positionsX.length-1] === 39){
                            this.positionsX.push(0);
                        } else {
                            this.positionsX.push(this.positionsX[this.positionsX.length-1]+1);
                        }
                        this.positionsY.push(this.positionsY[this.positionsY.length-1]);
                        this.lastOppositeDirection = 'left';
                        break;

                    case "left":
                        if(this.positionsX[this.positionsX.length-1] === 0){
                            this.positionsX.push(39);
                        } else {
                            this.positionsX.push(this.positionsX[this.positionsX.length-1]-1);
                        }
                        this.positionsY.push(this.positionsY[this.positionsY.length-1]);
                        this.lastOppositeDirection = 'right';
                        break;

                    case "up":
                        if(this.positionsY[this.positionsY.length-1] === 0){
                            this.positionsY.push(-39);
                        } else {
                            this.positionsY.push(this.positionsY[this.positionsY.length-1]+1);
                        }
                        this.positionsX.push(this.positionsX[this.positionsX.length-1]);
                        this.lastOppositeDirection = 'down';
                        break;

                    case "down":
                        if(this.positionsY[this.positionsY.length-1] === -39){
                            this.positionsY.push(0);
                        } else {
                            this.positionsY.push(this.positionsY[this.positionsY.length-1]-1);
                        }
                        this.positionsX.push(this.positionsX[this.positionsX.length-1]);
                        this.lastOppositeDirection = 'up';
                        break;
                }

                this.arraylength = this.positionsX.length;

                //Shorten table of positions if needed


                if(this.arraylength > this.length){
                    this.positionsX = this.positionsX.slice(1,this.arraylength);
                    this.positionsY = this.positionsY.slice(1,this.arraylength);
                }

        };

        this.shortenSnake = function (length) {

            this.length = this.length - parseInt(length);


            if(this.length<3){
                this.length = 3;
            }

            this.positionsX = this.positionsX.slice((-this.length));
            this.positionsY = this.positionsY.slice((-this.length));

        };

        this.lengthenSnake = function (length) {
            this.length = this.length + parseInt(length);
        };

    }

    function Board(level) {

        this.obstaclePositionX = [];
        this.obstaclePositionY = [];

        this.levels = {
            level1: {
                posX: [
                    2, 3, 4, 5, 6, 7, 8, 9,
                    2, 3, 4, 5, 6, 7, 8, 9,
                    2, 2, 2, 2, 2, 2, 2, 2,
                    2, 2, 2, 2, 2, 2, 2, 2,
                    37, 37, 37, 37, 37, 37, 37, 37,
                    37, 37, 37, 37, 37, 37, 37, 37,
                    37, 36, 35, 34, 33, 32, 31, 30,
                    37, 36, 35, 34, 33, 32, 31, 30
                ], posY: [
                    -2, -2, -2, -2, -2, -2, -2, -2,
                    -37, -37, -37, -37, -37, -37, -37, -37,
                    -3, -4, -5, -6, -7, -8, -9, -10,
                    -36, -35, -34, -33, -32, -31, -30, -29,
                    -3, -4, -5, -6, -7, -8, -9, -10,
                    -36, -35, -34, -33, -32, -31, -30, -29,
                    -2, -2, -2, -2, -2, -2, -2, -2,
                    -37, -37, -37, -37, -37, -37, -37, -37]
            },
            level2: {
                posX: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
                    19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20],
                posY: [-19, -19, -19, -19, -19, -19, -19, -19, -19, -19, -19, -19, -19, -19, -19, -19, -19, -19, -19, -19,
                    -17, -16, -15, -14, -13, -17, -16, -15, -14, -13, -21, -22, -23, -24, -25, -21, -22, -23, -24, -25]
            },
            level3: {
                posX: [19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20,
                    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
                posY: [-3, -4, -5, -6, -7, -3, -4, -5, -6, -7, -36, -35, -34, -33, -32, -36, -35, -34, -33, -32,
                    -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -37, -37, -37, -37, -37, -37, -37, -37, -37, -37]
            },
            level4: {
                posX: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34],
                posY: [-8, -9, -10, -11, -12, -13, -14, -30, -29, -28, -27, -26, -25, -24, -8, -9, -10, -11, -12, -13, -14, -30, -29, -28, -27, -26, -25, -24]
            },
            level5: {
                posX: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
                    10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
                posY: [-10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10,
                    -28, -28, -28, -28, -28, -28, -28, -28, -28, -28, -28, -28, -28, -28, -28, -28, -28, -28, -28, -28]
            }
        };

        //Creating obstacles on the board
        switch(level){

            case '1':
                this.obstaclePositionX = this.levels.level1.posX;
                this.obstaclePositionY = this.levels.level1.posY;

                break;
            case '1.2':
                this.obstaclePositionX = this.obstaclePositionX.concat(this.levels.level1.posX, this.levels.level2.posX);
                this.obstaclePositionY = this.obstaclePositionY.concat(this.levels.level1.posY, this.levels.level2.posY);
                break;
            case '1.4':
                this.obstaclePositionX = this.obstaclePositionX.concat(this.levels.level1.posX, this.levels.level2.posX, this.levels.level3.posX);
                this.obstaclePositionY = this.obstaclePositionY.concat(this.levels.level1.posY, this.levels.level2.posY, this.levels.level3.posY);
                break;
            case '1.6':
                this.obstaclePositionX = this.obstaclePositionX.concat(this.levels.level1.posX, this.levels.level2.posX, this.levels.level3.posX, this.levels.level4.posX);
                this.obstaclePositionY = this.obstaclePositionY.concat(this.levels.level1.posY, this.levels.level2.posY, this.levels.level3.posY, this.levels.level4.posY);
                break;
            case '2':
                this.obstaclePositionX = this.obstaclePositionX.concat(this.levels.level1.posX, this.levels.level2.posX, this.levels.level3.posX, this.levels.level4.posX,this.levels.level5.posX);
                this.obstaclePositionY = this.obstaclePositionY.concat(this.levels.level1.posY, this.levels.level2.posY, this.levels.level3.posY, this.levels.level4.posY,this.levels.level5.posY);
                break;
        }
    }

    function Apple(positionsX, positionsY) {


        this.obstacles = {
            positionsX: positionsX,
            positionsY: positionsY
        };

        this.positionX = [];
        this.positionY = [];
        
        this.generateNewLocation = function(){
            let i = 0;

            while(i!==1){
                this.positionX = Math.round((Math.random()*35)+4);
                this.positionY = Math.round((Math.random()*-39));

                let check =false;
                for(let j = 0; j<this.obstacles.positionsX.length; j++){
                    if(this.positionX === this.obstacles.positionsX[j] && this.positionY === this.obstacles.positionsY[j]){
                        check = true;
                    }
                }
                if(check === false) {
                    i=1;
                }
            }

        }
    }

    function PowerUp(positionsX, positionsY) {

        this.obstacles = {
            positionsX: positionsX,
            positionsY: positionsY
        };

        this.typeOfPowerUp = 0;
        this.positionX = 0;
        this.positionY = 0;
        this.powerUpMuliplier = 1;
        this.showPowerUp = false;
        this.powerUpTimer = 0;
        this.colorOfPowerUp = "rgb(255, 255 , 0)";
        this.specialSetting = 'random';

        this.generateProperties = function () {

            let i = 0;

            //Rand position of powerup until it's not on obstacle
            while(i!==1){
                this.positionX = Math.round((Math.random()*39));
                this.positionY = Math.round((Math.random()*-39));

                let check =false;
                for(let j = 0; j<this.obstacles.positionsX.length; j++){
                    if(this.positionX === this.obstacles.positionsX[j] && this.positionY === this.obstacles.positionsY[j]){
                        check = true;
                    }
                }

                if(check === false) {
                    i=1;
                }
            }

            //Check if special powerup was chosen. If not the pick is random
            if(this.specialSetting === 'random'){
                this.typeOfPowerUp = Math.random()*6;
            } else {
                switch (this.specialSetting) {
                    case 'lengthen':
                        this.typeOfPowerUp = 0.5;
                        break;

                        case 'shorten':
                            this.typeOfPowerUp = 1.5;
                            break;

                        case 'faster':
                            this.typeOfPowerUp = 2.5;
                            break;

                        case 'slower':
                            this.typeOfPowerUp = 3.5;
                            break;

                        case 'points':
                            this.typeOfPowerUp = 4.5;
                            break;

                        case 'invisibility':
                            this.typeOfPowerUp = 5.5;
                            break;
                }
            }

            //Set different colors to different types of powerups
            if(this.typeOfPowerUp<=1){
                this.colorOfPowerUp = "rgb(255,192,203)"; //Pink
            } else {
                if(this.typeOfPowerUp<2 && this.typeOfPowerUp>1){
                    this.colorOfPowerUp = "rgb(0,191,255)"; // Deepskyblue
                } else {
                    if(this.typeOfPowerUp<3 && this.typeOfPowerUp>=2){
                        this.colorOfPowerUp = "rgb(238,130,238)"; //Violet
                    } else {
                        if(this.typeOfPowerUp<4 && this.typeOfPowerUp>=3){
                            this.colorOfPowerUp = "rgb(255,69,0"; //Orangered
                        } else {
                            if(this.typeOfPowerUp<5 && this.typeOfPowerUp>=4){
                                this.colorOfPowerUp = "rgb(139,0,0)"; //Darkred
                            } else {
                                this.colorOfPowerUp = "rgb(255, 255 , 0"; //Yellow
                            }
                        }
                    }
                }

            }



        }

    }

    function ScoreBoard() {

        this.arrayOfBestScores = [];


        //Add result to scoreboard
        this.addResult = function (result) {

            this.arrayOfBestScores.push(result);

            this.arrayOfBestScores.sort(function (a,b) {
                return b-a;
            });

            //If the array is longer than 5 delete the lowest score
            if(this.arrayOfBestScores.length>5){
                this.arrayOfBestScores = this.arrayOfBestScores.slice(0,5);
            }

            //Clearing scoreboard
            while (scoreList.firstChild) {
                scoreList.removeChild(scoreList.firstChild);
            }

            //Filling scoreboard with array elements
            for(let i = 0; i<this.arrayOfBestScores.length; i++){

                let listElement = document.createElement("li");
                listElement.innerText = this.arrayOfBestScores[i];
                scoreList.appendChild(listElement);
            }
        }
    }

    function Game(){

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


        this.clearPowerUpTimer = function (){
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
                    snakeLength.innerHTML = "Długość węża: " + GameVar.snake.length;
                    console.log('Wydłużanie');

                } else {
                    if(this.powerUp.typeOfPowerUp<2 && this.powerUp.typeOfPowerUp>1){
                        this.snake.shortenSnake(self.settings.X);
                        snakeLength.innerHTML = "Długość węża: " + GameVar.snake.length;
                        console.log('Skracanie');
                    } else {
                        if(this.powerUp.typeOfPowerUp<3 && this.powerUp.typeOfPowerUp>=2){

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
                            if(this.powerUp.typeOfPowerUp<4 && this.powerUp.typeOfPowerUp>=3){
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
                                if(this.powerUp.typeOfPowerUp<5 && this.powerUp.typeOfPowerUp>=4){
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

            let counter = 0;

            this.time = 0;
            this.score =0;
            this.numberOfEatenApples =0;

            this.gameTimer = setInterval(function () {

                if(counter%(100*(1/(self.settings.speed*self.powerUp.powerUpMuliplier))) === 0){

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
            document.removeEventListener('keydown', keyDownReader);
        };

    }

    const GameVar = new Game();
    const Scoreboard = new ScoreBoard();

    //Set default values on settings inputs
    inputX.value = GameVar.settings.X;
    inputY.value = GameVar.settings.Y;
    speed.value = GameVar.settings.speed;


    timerElement.innerHTML="Rozpocznij grę";

    startButton.addEventListener('click', function () {

            //Hide "Start Button"
            startButton.style.visibility = "hidden";

            //Read set settings
            GameVar.settings.X = inputX.value;
            GameVar.settings.Y = inputY.value;
            GameVar.settings.speed = speed.value;
            GameVar.settings.level = level.value;

            //Generation of obstacles
            GameVar.board =  new Board(GameVar.settings.level);

            //Generation of snake
            GameVar.snake =  new Snake(GameVar.settings.X);

            //Send information about obstacles to apple
            GameVar.apple =  new Apple(GameVar.board.obstaclePositionX, GameVar.board.obstaclePositionY,);

            GameVar.powerUp = new PowerUp(GameVar.board.obstaclePositionX, GameVar.board.obstaclePositionY,);

            //Generate Apple position
            GameVar.apple.generateNewLocation();

            //Get info if special type of powerUp is chosen
            GameVar.powerUp.specialSetting = document.querySelector('input[name="powerup"]:checked').value;

            //Change text on page
            rewardInfo.innerHTML = 'Podstawa punktowa: '+ (50*GameVar.settings.level*GameVar.settings.speed);
            snakeLength.innerHTML = "Długość węża: " + GameVar.snake.length;

            //Rendering game
            GameVar.render();

            //Add keydown listener
            document.addEventListener('keydown', keyDownReader);

            //Start of game
            GameVar.startGame();

    });

});