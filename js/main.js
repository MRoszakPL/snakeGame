
document.addEventListener('DOMContentLoaded', function () {

    function Snake( variableX) {

        this.positionsX = [1,2,3];
        this.positionsY = [0,0,0];
        this.length = 3 + variableX;
        this.direction = 'right';

        this.setDirection = function (direction) {
            switch (direction) {
                case 37:
                    this.direction = 'left';
                    break;

                case 38:
                    this.direction = 'up';
                    break;

                case 39:
                    this.direction = 'right';
                    break;

                case 40:
                    this.direction = 'down';
                    break;
            }
        };

        this.move = function () {
            console.log('Poruszam się' + this.direction);

                switch(this.direction){

                    case "right":
                        this.positionsX.push(this.positionsX[this.positionsX.length-1]+1);
                        this.positionsY.push(this.positionsY[this.positionsY.length-1]);
                        break;

                    case "left":
                        this.positionsX.push(this.positionsX[this.positionsX.length-1]-1);
                        this.positionsY.push(this.positionsY[this.positionsY.length-1]);
                        break;

                    case "up":
                        this.positionsY.push(this.positionsY[this.positionsY.length-1]+1);
                        this.positionsX.push(this.positionsX[this.positionsX.length-1]);
                        break;

                    case "down":
                        this.positionsY.push(this.positionsY[this.positionsY.length-1]-1);
                        this.positionsX.push(this.positionsX[this.positionsX.length-1]);
                        break;
                }

                this.arraylength = this.positionsX.length;
                console.log(this.positionsX);
                console.log(this.positionsY);
                if(this.arraylength > this.length){
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

    function Apple() {

        this.positionX = [];
        this.positionY = [];
        
        this.setNewPosition = function(){
            
        }

    }

    function Game(){



        this. snake = 0;
        this.apple = new Apple();

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


        this.stopGame = function () {
            clearInterval(this.gameTimer);
        }

        this.gameOver = function () {
            clearInterval(this.gameTimer);
        };

    }

    const GameVar = new Game();

    const inputX = document.querySelector('#valueX');
    const inputY = document.querySelector('#valueY');
    const speed = document.querySelector('#speed');

    inputX.value = GameVar.settings.X;
    inputY.value = GameVar.settings.Y;
    speed.value = GameVar.settings.speed;

    const startButton = document.querySelector('.startButton');

    startButton.addEventListener('click', function () {
        if(GameVar.stateOfGame === 0) {
            console.log(GameVar.settings.X);
            GameVar.snake =  new Snake(GameVar.settings.X);
            document.addEventListener('keydown', function (event) {
                GameVar.snake.setDirection(event.keyCode);
            });
            GameVar.startGame();
            startButton.innerHTML = 'Zakończ';
            GameVar.stateOfGame = 1;
        } else {
            GameVar.stopGame();
            GameVar.stateOfGame = 0;
            startButton.innerHTML = 'Rozpocznij od nowa';
        }
    });

});