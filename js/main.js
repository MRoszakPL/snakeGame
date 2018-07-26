document.addEventListener('DOMContentLoaded', function () {

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
            console.log('Poruszam się' + this.direction);

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
                console.log(this.lastOppositeDirection);

                this.arraylength = this.positionsX.length;

                console.log(this.arraylength);
                console.log(this.length);

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

    }

    function Apple() {

        this.positionX = [];
        this.positionY = [];
        
        this.setNewPosition = function(){
            
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

        this.startGame = function () {
                this.gameTimer = setInterval(function () {
                self.snake.move();
            }, 1000)
        };

        this.gameOver = function () {
            clearInterval(this.gameTimer);
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