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

        switch(this.direction) {

            case "right":
                if(this.positionsX[this.positionsX.length-1] === 39) {
                    this.positionsX.push(0);
                } else {
                    this.positionsX.push(this.positionsX[this.positionsX.length-1]+1);
                }
                this.positionsY.push(this.positionsY[this.positionsY.length-1]);
                this.lastOppositeDirection = 'left';
                break;

            case "left":
                if(this.positionsX[this.positionsX.length-1] === 0) {
                    this.positionsX.push(39);
                } else {
                    this.positionsX.push(this.positionsX[this.positionsX.length-1]-1);
                }
                this.positionsY.push(this.positionsY[this.positionsY.length-1]);
                this.lastOppositeDirection = 'right';
                break;

            case "up":
                if(this.positionsY[this.positionsY.length-1] === 0) {
                    this.positionsY.push(-39);
                } else {
                    this.positionsY.push(this.positionsY[this.positionsY.length-1]+1);
                }
                this.positionsX.push(this.positionsX[this.positionsX.length-1]);
                this.lastOppositeDirection = 'down';
                break;

            case "down":
                if(this.positionsY[this.positionsY.length-1] === -39) {
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

};


module.exports = Snake;