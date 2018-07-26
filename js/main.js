document.addEventListener('DOMContentLoaded', function () {



    const game = document.getElementById('game');
    const context = game.getContext('2d');

    context.fillStyle = "rgb(0,128,0)"; //Green

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
                for(let i = 0; i<30; i++) {
                    this.obstaclePositionX.push( Math.round(Math.random()*(34))+5);
                    this.obstaclePositionY.push( Math.round(Math.random()*(-39)));
                }
                break;
            case 2:
                for(let i = 0; i<40; i++) {
                    this.obstaclePositionX.push( Math.round(Math.random()*(34))+5);
                    this.obstaclePositionY.push( Math.round(Math.random()*(-39)));
                }
                break;
            case 3:
                for(let i = 0; i<60; i++) {
                    this.obstaclePositionX.push( Math.round(Math.random()*(34))+5);
                    this.obstaclePositionY.push( Math.round(Math.random()*(-39)));
                }
                break;
            case 4:
                for(let i = 0; i<80; i++) {
                    this.obstaclePositionX.push( Math.round(Math.random()*(34))+5);
                    this.obstaclePositionY.push( Math.round(Math.random()*(-39)));
                }
                break;
            case 5:
                for(let i = 0; i<100; i++) {
                    this.obstaclePositionX.push( Math.round(Math.random()*(34))+5);
                    this.obstaclePositionY.push( Math.round(Math.random()*(-39)));
                }
                break;
        }
    }

    function Apple() {

        this.positionX = [];
        this.positionY = [];
        
        this.generateNewLocation = function(){
            
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
        }

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
        };


        this.renderPowerUp = function () {
            context.fillStyle = "rgb(255,255,102)"; //Yellow
        };

        this.startGame = function () {
                this.gameTimer = setInterval(function () {
                self.snake.move();
                self.time ++;
                context.clearRect(0, 0, 400, 400);
                self.render();

            }, 1000)
        };

        this.gameOver = function () {
            clearInterval(this.gameTimer);
            context.clearRect(0, 0, 400, 400);
        };



    }

    const GameVar = new Game();



    const inputX = document.querySelector('#valueX');
    const inputY = document.querySelector('#valueY');
    const speed = document.querySelector('#speed');
    const level = document.querySelector('#level');

    inputX.value = GameVar.settings.X;
    inputY.value = GameVar.settings.Y;
    speed.value = GameVar.settings.speed;

    const startButton = document.querySelector('.startButton');

    startButton.addEventListener('click', function () {

        if(GameVar.stateOfGame === 0) {

            //Read set settings
            GameVar.settings.X = inputX.value;
            GameVar.settings.Y = inputY.value;
            GameVar.settings.speed = speed.value;
            GameVar.settings.level = level.value;


            //Initialization of game
            GameVar.board =  new Board(GameVar.settings.level);
            GameVar.snake =  new Snake(GameVar.settings.X);
            GameVar.apple =  new Apple();

            GameVar.render();

            document.addEventListener('keydown', function (event) {
                GameVar.snake.setDirection(event.keyCode);
            });

            //Start of game
            GameVar.startGame();

            startButton.innerHTML = 'Zakończ';
            GameVar.stateOfGame = 1;

        } else {
            GameVar.gameOver();
            GameVar.stateOfGame = 0;
            startButton.innerHTML = 'Rozpocznij od nowa';
        }
    });

});