function PowerUp (positionsX, positionsY) {
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
    this.colorOfPowerUp = 'rgb(255, 255 , 0)';
    this.specialSetting = 'random';

    this.generateProperties = function () {
        let i = 0;

        // Rand position of powerup until it's not on obstacle
        while (i !== 1) {
            this.positionX = Math.round((Math.random() * 39));
            this.positionY = Math.round((Math.random() * -39));

            let check = false;
            for (let j = 0; j < this.obstacles.positionsX.length; j++) {
                if (this.positionX === this.obstacles.positionsX[j] && this.positionY === this.obstacles.positionsY[j]) {
                    check = true;
                }
            }

            if (check === false) {
                i = 1;
            }
        }

        // Check if special powerup was chosen. If not the pick is random
        if (this.specialSetting === 'random') {
            this.typeOfPowerUp = Math.round(Math.random() * 5);
            this.colorOfPowerUp = 'rgb(0,0,255)'; // Blue
        } else {
            switch (this.specialSetting) {
                case 'lengthen':
                    this.typeOfPowerUp = 0;
                    this.colorOfPowerUp = 'rgb(255,192,203)';// Pink
                    break

                case 'shorten':
                    this.typeOfPowerUp = 1;
                    this.colorOfPowerUp = 'rgb(0,191,255)';// Deepskyblue
                    break

                case 'faster':
                    this.typeOfPowerUp = 2;
                    this.colorOfPowerUp = 'rgb(238,130,238)';// Violet
                    break

                case 'slower':
                    this.typeOfPowerUp = 3;
                    this.colorOfPowerUp = 'rgb(255,69,0'; // Orangered
                    break

                case 'points':
                    this.typeOfPowerUp = 4;
                    this.colorOfPowerUp = 'rgb(139,0,0)'; // Darkred
                    break

                case 'invisibility':
                    this.typeOfPowerUp = 5;
                    this.colorOfPowerUp = 'rgb(255, 255 , 0';// Yellow
                    break
            }
        }
    }
}

module.exports = PowerUp;
