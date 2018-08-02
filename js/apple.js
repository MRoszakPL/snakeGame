function Apple(positionsX, positionsY) {

    this.obstacles = {
        positionsX: positionsX,
        positionsY: positionsY
    };

    this.positionX = [];
    this.positionY = [];

    this.generateNewLocation = function() {
        let i = 0;

        while(i !== 1){
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
};

module.exports = Apple;