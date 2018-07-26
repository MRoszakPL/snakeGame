function Snake() {

    this.positionX = [];
    this.positionY = [];
    this.length = [];

    
    this.move = function (direction) {
        switch(direction){

            case "right":
                this.positionX.push(this.positionX[this.positionX.length-1]+1);
                this.positionX.push(this.positionY[this.positionY.length-1]);
                break;

            case "left":
                this.positionX.push(this.positionX[this.positionX.length-1]-1);
                this.positionX.push(this.positionY[this.positionY.length-1]);
                break;

            case "up":
                this.positionY.push(this.positionX[this.positionY.length-1]+1);
                this.positionX.push(this.positionX[this.positionX.length-1]);
                break;

            case "down":
                this.positionY.push(this.positionX[this.positionY.length-1]-1);
                this.positionX.push(this.positionX[this.positionX.length-1]);
                break;
        }
    }
}


export default Snake;