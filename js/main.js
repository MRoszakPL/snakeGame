
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

    function keyDownReader(event) {
        event.preventDefault();
        GameVar.snake.setDirection(event.keyCode);
    }

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

                this.arraylength = this.positionsX.length;

                //Shorten table of positions if needed
                if(this.arraylength === this.length){
                    this.positionsX = this.positionsX.slice(1,this.arraylength);
                    this.positionsY = this.positionsY.slice(1,this.arraylength);
                }

        };

        this.shortenSnake = function (length) {


            console.log(this.positionsY);
            console.log(this.positionsX);


            console.log(this.length);
            this.length = this.length - parseInt(length);


            if(this.length<3){
                this.length = 3;
            }

            console.log(this.length)
            let arraylength = this.positionsX.length;

            console.log(this.positionsX.length);

            this.positionsX = this.positionsX.slice((-this.length+1));
            this.positionsY = this.positionsY.slice((-this.length+1));

            console.log(this.positionsX.length);
            console.log( this.positionsY);
            console.log( this.positionsX);
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
                console.log(this.positionY);

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

        this.generateProperties = function () {
            let i = 0;

            while(i!==1){
                this.positionX = Math.round((Math.random()*39));
                this.positionY = Math.round((Math.random()*-39));
                console.log(this.positionY);

                let check =false;
                for(let j = 0; j<this.obstacles.positionsX.length; j++){
                    if(this.positionX === this.obstacles.positionsX[j] && this.positionY === this.obstacles.positionsY[j]){
                        check = true;
                    }
                }

                this.typeOfPowerUp = 0.5;//Math.random()*6;

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
        this.powerUp = 0;
        this.numberOfEatenApples = 0;
        this.showPowerUp = false;
        this.powerUpTimer = 0;
        this.invisible = false;


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


        this.renderObstacles = function () {
            context.fillStyle = "rgb(0,0,0)"; //Black
            for(let i = 0; i<this.board.obstaclePositionX.length; i++){
                context.fillRect(this.board.obstaclePositionX[i]*15,this.board.obstaclePositionY[i]*-15, 15, 15);
            }
        };

        this.renderSnake = function () {
            context.fillStyle = "rgb(0,128,0)"; //Dark Green
            for(let i = 0; i<this.snake.length-this.settings.X; i++){
                context.fillRect(this.snake.positionsX[i]*15,this.snake.positionsY[i]*-15, 15, 15);
            }
        };

        this.renderApple = function () {
            context.fillStyle = "rgb(0,255,0)"; //Green
            context.fillRect(this.apple.positionX*15,this.apple.positionY*-15, 15, 15);

        };

        this.renderPowerUp = function () {
            context.fillStyle = "rgb(255,255,102)"; //Yellow
            context.fillRect(this.powerUp.positionX*15,this.powerUp.positionY*-15, 15, 15);
        };

        this.render = function () {
            console.log('Lol');
            self.renderObstacles();
            self.renderSnake();
            self.renderApple();
            if(this.showPowerUp){
                self.renderPowerUp();
            }
        };


        //Checking collisions with specific of snake
        this.checkCollisionApple = function () {
            if(this.apple.positionX === this.snake.positionsX[this.snake.positionsX.length-1] && this.apple.positionY === this.snake.positionsY[this.snake.positionsY.length-1] ){
                this.snake.lengthenSnake(1);
                this.apple.generateNewLocation();
                this.score= this.score + (50*this.settings.level*this.settings.speed);

                console.log(this.snake.length);
                this.numberOfEatenApples++;

                if(this.numberOfEatenApples%2 === 0){
                    this.powerUp.generateProperties();
                    this.showPowerUp = true;
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

                this.showPowerUp = false;
                if(self.powerUp.typeOfPowerUp<=1){
                    self.snake.lengthenSnake(self.settings.X);
                    console.log('Wydłużanie');

                } else {
                    if(self.powerUp.typeOfPowerUp<2 && self.powerUp.typeOfPowerUp>1){
                        self.snake.shortenSnake(self.settings.X);
                        console.log('Skracanie');
                    } else {
                        if(self.powerUp.typeOfPowerUp<3 && self.powerUp.typeOfPowerUp>=2){

                            self.powerUp.powerUpMuliplier = 2;
                            self.powerUpTimer= setTimeout(
                                function () {
                                    self.powerUp.powerUpMuliplier = 1;
                                    clearTimeout(self.powerUpTimer);
                                }
                            , 1000*self.settings.Y);

                            console.log('Przyspieszenie');
                        } else {
                            if(self.powerUp.typeOfPowerUp<4 && self.powerUp.typeOfPowerUp>=3){

                                self.powerUp.powerUpMuliplier = 0.5;
                                self.powerUpTimer= setTimeout(
                                    function () {
                                        self.powerUp.powerUpMuliplier = 1;
                                        clearTimeout(self.powerUpTimer);
                                    }
                                    , 1000*self.settings.Y);

                                console.log('Spowolnienie');
                            } else {
                                if(self.powerUp.typeOfPowerUp<5 && self.powerUp.typeOfPowerUp>=4){
                                    this.score+= (50*this.settings.level*this.settings.speed)*this.settings.X;
                                    console.log('Punkty');
                                } else {
                                    self.invisible = true;
                                    self.powerUpTimer= setTimeout(
                                        function () {
                                            self.invisible = false;
                                            clearTimeout(self.powerUpTimer);
                                        }
                                        , 1000*self.settings.Y);
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

            self.time = 0;
            self.score =0;

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
                        if(self.showPowerUp){
                            self.checkCollisionWithPowerUp();
                        }

                        score.innerHTML = 'Twój wynik: ' + self.score;
                    }

                if(counter%1000 === 0){
                    self.time ++;
                    time.innerHTML = 'Gra trwa ' + self.time + 's';
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
            time.innerHTML = 'Gra trwała ' + self.time + 's';
            score.innerHTML = 'Zdobyłeś ' + self.score + 'punktów';

            //Show "Start Button" again
            startButton.style.visibility = "visible";

            //Remove of keyDown listener after game
            document.removeEventListener('keydown', keyDownReader);
        };

    }



    const GameVar = new Game();

    //Set default values on settings inputs
    inputX.value = GameVar.settings.X;
    inputY.value = GameVar.settings.Y;
    speed.value = GameVar.settings.speed;

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

            //Rendering game
            GameVar.render();

            //Add keydown listener
            document.addEventListener('keydown', keyDownReader);

            //Start of game
            GameVar.startGame();

            //Change local variables
            GameVar.stateOfGame = 1;

    });

});