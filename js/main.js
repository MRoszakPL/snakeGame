document.addEventListener('DOMContentLoaded', function () {



    const game = document.getElementById('game');
    const context = game.getContext('2d');

    const inputX = document.querySelector('#valueX');
    const inputY = document.querySelector('#valueY');
    const speed = document.querySelector('#speed');
    const level = document.querySelector('#level');
    const time = document.querySelector('#timer');
    const score = document.querySelector('#score');
    const startButton = document.querySelector('.startButton');


    function Snake( variableX) {

        this.positionsX = [1,2,3];
        this.positionsY = [0,0,0];
        this.length = 3 + parseInt(variableX);
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


                console.log(this.positionsX);
                console.log(this.positionsY);

                this.arraylength = this.positionsX.length;

                //Shorten table of positions if needed
                if(this.arraylength === this.length){
                    this.positionsX = this.positionsX.slice(1,this.arraylength);
                    this.positionsY = this.positionsY.slice(1,this.arraylength);
                }

        };

        this.shortenSnake = function (length) {
            this.length= this.length - length;
        };

        this.lengthenSnake = function (length) {
            this.length= this.length + length;
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
        }

        this.positionX = [];
        this.positionY = [];
        
        this.generateNewLocation = function(){
            let i = 0;

            while(i!==1){
                this.positionX = Math.round((Math.random()*35)+4);
                this.positionY = Math.round((Math.random()-39));
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

    function Game(){

        this.snake = 0;
        this.board = 0;
        this.apple = 0;

        const self = this;
        this.time = 0;
        this.settings = {
            X: 1,
            Y: 1,
            level: 1,
            speed: 1
        };

        this.score = 0;
        this.scoreboard = [];
        this.gameTimer= 0;
        this.stateOfGame = 0;

        this.render = function () {
            self.renderObstacles();
            self.renderSnake();
            self.renderApple();
        };

        this.renderObstacles = function () {
            context.fillStyle = "rgb(0,0,0)"; //Black
            for(let i = 0; i<this.board.obstaclePositionX.length; i++){
                context.fillRect(this.board.obstaclePositionX[i]*10,this.board.obstaclePositionY[i]*-10, 10, 10);
            }
        };

        this.renderSnake = function () {
            context.fillStyle = "rgb(0,128,0)"; //Dark Green
            for(let i = 0; i<this.snake.length-this.settings.X; i++){
                context.fillRect(this.snake.positionsX[i]*10,this.snake.positionsY[i]*-10, 10, 10);
            }
        };

        this.renderApple = function () {
            context.fillStyle = "rgb(0,255,0)"; //Green
            context.fillRect(this.apple.positionX*10,this.apple.positionY*-10, 10, 10);

        };


        this.renderPowerUp = function () {
            context.fillStyle = "rgb(255,255,102)"; //Yellow
        };


        this.checkColisionApple = function () {
            if(self.apple.positionX === self.snake.positionsX[self.snake.positionsX.length-1] && self.apple.positionY === self.snake.positionsY[self.snake.positionsY.length-1] ){
                self.apple.generateNewLocation();
                self.score+=50;
            }
        }

        this.startGame = function () {
            let counter = 0;
            this.gameTimer = setInterval(function () {

                    if(counter%10 === 0){
                        self.time ++;
                        time.innerHTML = 'Gra trwa ' + self.time + 's';
                    }

                    if(counter%1 === 0){
                        self.snake.move();
                        context.clearRect(0, 0, 400, 400);
                        self.render();
                        self.checkColisionApple();
                        score.innerHTML = 'Twój wynik: ' + self.score;
                    }
                    counter++;

            }, 100)
        };

        this.gameOver = function () {
            clearInterval(this.gameTimer);
            context.clearRect(0, 0, 400, 400);
        };

    }


    const GameVar = new Game();

    //Set default values on settings inputs
    inputX.value = GameVar.settings.X;
    inputY.value = GameVar.settings.Y;
    speed.value = GameVar.settings.speed;

    startButton.addEventListener('click', function () {

        if(GameVar.stateOfGame === 0) {

            //Read set settings
            GameVar.settings.X = inputX.value;
            GameVar.settings.Y = inputY.value;
            GameVar.settings.speed = speed.value;
            GameVar.settings.level = level.value;


            //Initialization of game

            //Generation of obstacles
            GameVar.board =  new Board(GameVar.settings.level);

            //Genertation of snake
            GameVar.snake =  new Snake(GameVar.settings.X);

            //Send information about obstacles to apple
            GameVar.apple =  new Apple(GameVar.board.obstaclePositionX, GameVar.board.obstaclePositionY,);

            //Generate Apple position
            GameVar.apple.generateNewLocation();

            //Rendering game
            GameVar.render();

            //Add keydown listener
            document.addEventListener('keydown', function (event) {
                GameVar.snake.setDirection(event.keyCode);
            });

            //Start of game
            GameVar.startGame();

            //Change local variabels and look
            startButton.innerHTML = 'Zakończ';
            GameVar.stateOfGame = 1;

        } else {

            //End game
            GameVar.gameOver();
            GameVar.stateOfGame = 0;
            GameVar.score = 0;
            GameVar.time = 0;
            //Change look
            startButton.innerHTML = 'Rozpocznij od nowa';
        }
    });

});