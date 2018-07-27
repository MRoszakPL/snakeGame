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

        //Creating random obstacles on the board
        switch(parseInt(level)){
            case 1:
                for(let i = 0; i<40; i++) {
                    let positionX = Math.round(Math.random()*(39));
                    this.obstaclePositionX.push( positionX );
                    if(positionX > 5){
                        this.obstaclePositionY.push( Math.round(Math.random()*(-39)));
                    } else {
                        this.obstaclePositionY.push( Math.round(Math.random()*(-37))-2);
                    }
                }
                break;
            case 2:
                for(let i = 0; i<80; i++) {
                    let positionX = Math.round(Math.random()*(39));
                    this.obstaclePositionX.push( positionX );
                    if(positionX > 5){
                        this.obstaclePositionY.push( Math.round(Math.random()*(-39)));
                    } else {
                        this.obstaclePositionY.push( Math.round(Math.random()*(-37))-2);
                    }
                }
                break;
            case 3:

                for(let i = 0; i<120; i++) {
                    let positionX = Math.round(Math.random()*(39));
                    this.obstaclePositionX.push( positionX );
                    if(positionX > 5){
                        this.obstaclePositionY.push( Math.round(Math.random()*(-39)));
                    } else {
                        this.obstaclePositionY.push( Math.round(Math.random()*(-37))-2);
                    }
                }
                break;
            case 4:

                for(let i = 0; i<160; i++) {
                    let positionX = Math.round(Math.random()*(39));
                    this.obstaclePositionX.push( positionX );
                    if(positionX > 5){
                        this.obstaclePositionY.push( Math.round(Math.random()*(-39)));
                    } else {
                        this.obstaclePositionY.push( Math.round(Math.random()*(-37))-2);
                    }
                }
                break;
            case 5:

                for(let i = 0; i<200; i++) {
                    let positionX = Math.round(Math.random()*(39));
                    this.obstaclePositionX.push( positionX );
                    if(positionX > 5){
                        this.obstaclePositionY.push( Math.round(Math.random()*(-39)));
                    } else {
                        this.obstaclePositionY.push( Math.round(Math.random()*(-37))-2);
                    }
                }
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
                            this.typeOfPowerUp = 4.5;
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


            this.addResult = function (result) {

                this.arrayOfBestScores.push(result);

                this.arrayOfBestScores.sort(function (a,b) {
                    return b-a;
                });

                if(this.arrayOfBestScores.length>5){
                    this.arrayOfBestScores = this.arrayOfBestScores.slice(0,5);
                }

                while (scoreList.firstChild) {
                    scoreList.removeChild(scoreList.firstChild);
                }

                for(let i = 0; i<this.arrayOfBestScores.length; i++){

                    let listElement = document.createElement("li");
                    listElement.innerText = this.arrayOfBestScores[i];
                    scoreList.appendChild(listElement);
                }

            }


    }

    function Game(){

        this.snake = 0;
        this.board = 0;
        this.apple = 0;
        this.powerUp = 0;
        this.numberOfEatenApples = 0;
        this.invisible = false;


        const self = this;
        this.time = 0;
        this.settings = {
            X: 1,
            Y: 1,
            level: 1,
            speed: 1,

        };

        this.score = 0;
        this.gameTimer= 0;


        this.renderObstacles = function () {
            context.fillStyle = "rgb(0,0,0)"; //Black
            for(let i = 0; i<this.board.obstaclePositionX.length; i++){
                context.fillRect(this.board.obstaclePositionX[i]*15,this.board.obstaclePositionY[i]*-15, 15, 15);
            }
        };

        this.renderSnake = function () {
            context.fillStyle = "rgb(0,128,0)"; //Dark Green
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
            if( this.powerUp.showPowerUp){
                this.renderPowerUp();
            }
        };

        //Checking collisions with specific of snake
        this.checkCollisionApple = function () {

            if(this.apple.positionX === this.snake.positionsX[this.snake.positionsX.length-1] && this.apple.positionY === this.snake.positionsY[this.snake.positionsY.length-1] ){

                this.snake.lengthenSnake(1);
                this.apple.generateNewLocation();
                this.score= this.score + (50*this.settings.level*this.settings.speed);

                this.numberOfEatenApples++;

                if(this.numberOfEatenApples%2 === 0){
                    this.powerUp.generateProperties();
                    this.powerUp.showPowerUp = true;
                }
            }
        };

        this.checkCollisionWithSnake = function () {
            for(let i = 0; i< self.snake.positionsX.length-1; i++){
                if(self.snake.positionsX[self.snake.positionsX.length-1] === self.snake.positionsX[i] && self.snake.positionsY[self.snake.positionsY.length-1] === self.snake.positionsY[i]){
                    self.gameOver();
                }
            }
        };

        this.checkCollisionWithObstacles = function () {
            for(let i = 0; i< self.board.obstaclePositionX.length; i++){
                if(self.snake.positionsX[self.snake.positionsX.length-1] === self.board.obstaclePositionX[i] && self.snake.positionsY[self.snake.positionsY.length-1] === self.board.obstaclePositionY[i]){
                    self.gameOver();
                }
            }
        };

        this.checkCollisionWithPowerUp = function () {

            if(this.powerUp.positionX === this.snake.positionsX[this.snake.positionsX.length-1] && this.powerUp.positionY === this.snake.positionsY[this.snake.positionsY.length-1] ){

                this.powerUp.showPowerUp = false;
                if(this.powerUp.typeOfPowerUp<=1){
                    this.snake.lengthenSnake(this.settings.X);
                    console.log('Wydłużanie');

                } else {
                    if(this.powerUp.typeOfPowerUp<2 && this.powerUp.typeOfPowerUp>1){
                        this.snake.shortenSnake(self.settings.X);
                        console.log('Skracanie');
                    } else {
                        if(this.powerUp.typeOfPowerUp<3 && this.powerUp.typeOfPowerUp>=2){

                            this.powerUp.powerUpMuliplier = 2;
                            this.powerUp.powerUpTimer= setTimeout(
                                function () {
                                    self.powerUp.powerUpMuliplier = 1;
                                    clearTimeout(self.powerUp.powerUpTimer);
                                }
                            , 1000*this.settings.Y);

                            console.log('Przyspieszenie');
                        } else {
                            if(this.powerUp.typeOfPowerUp<4 && this.powerUp.typeOfPowerUp>=3){

                                this.powerUp.powerUpMuliplier = 0.5;
                                this.powerUp.powerUpTimer= setTimeout(
                                    function () {
                                        self.powerUp.powerUpMuliplier = 1;
                                        clearTimeout( self.powerUp.powerUpTimer);
                                    }
                                    , 1000*this.settings.Y);

                                console.log('Spowolnienie');
                            } else {
                                if(this.powerUp.typeOfPowerUp<5 && this.powerUp.typeOfPowerUp>=4){
                                    this.score+= (50*this.settings.level*this.settings.speed)*this.settings.X;
                                    console.log('Punkty');
                                } else {
                                    this.invisible = true;
                                    this.powerUp.powerUpTimer= setTimeout(
                                        function () {
                                            self.invisible = false;
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

            rewardInfo.innerHTML = 'Podstawa punktowa: '+ (50*GameVar.settings.level*GameVar.settings.speed);

            //Generation of obstacles
            GameVar.board =  new Board(GameVar.settings.level);

            //Generation of snake
            GameVar.snake =  new Snake(GameVar.settings.X);

            //Send information about obstacles to apple
            GameVar.apple =  new Apple(GameVar.board.obstaclePositionX, GameVar.board.obstaclePositionY,);

            GameVar.powerUp = new PowerUp(GameVar.board.obstaclePositionX, GameVar.board.obstaclePositionY,);

            GameVar.powerUp.specialSetting = document.querySelector('input[name="powerup"]:checked').value;

            //Generate Apple position
            GameVar.apple.generateNewLocation();

            //Rendering game
            GameVar.render();

            //Add keydown listener
            document.addEventListener('keydown', keyDownReader);

            //Start of game
            GameVar.startGame();

    });

});