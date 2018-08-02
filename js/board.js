function Board(level) {

    this.obstaclePositionX = [];
    this.obstaclePositionY = [];

    this.levels = {
        level1: {
            posX: [
                2, 3, 4, 5, 6, 7, 8, 9,
                2, 3, 4, 5, 6, 7, 8, 9,
                2, 2, 2, 2, 2, 2, 2, 2,
                2, 2, 2, 2, 2, 2, 2, 2,
                37, 37, 37, 37, 37, 37, 37, 37,
                37, 37, 37, 37, 37, 37, 37, 37,
                37, 36, 35, 34, 33, 32, 31, 30,
                37, 36, 35, 34, 33, 32, 31, 30
            ], posY: [
                -2, -2, -2, -2, -2, -2, -2, -2,
                -37, -37, -37, -37, -37, -37, -37, -37,
                -3, -4, -5, -6, -7, -8, -9, -10,
                -36, -35, -34, -33, -32, -31, -30, -29,
                -3, -4, -5, -6, -7, -8, -9, -10,
                -36, -35, -34, -33, -32, -31, -30, -29,
                -2, -2, -2, -2, -2, -2, -2, -2,
                -37, -37, -37, -37, -37, -37, -37, -37]
        },
        level2: {
            posX: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
                19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20],
            posY: [-19, -19, -19, -19, -19, -19, -19, -19, -19, -19, -19, -19, -19, -19, -19, -19, -19, -19, -19, -19,
                -17, -16, -15, -14, -13, -17, -16, -15, -14, -13, -21, -22, -23, -24, -25, -21, -22, -23, -24, -25]
        },
        level3: {
            posX: [19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20,
                15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
            posY: [-3, -4, -5, -6, -7, -3, -4, -5, -6, -7, -36, -35, -34, -33, -32, -36, -35, -34, -33, -32,
                -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -37, -37, -37, -37, -37, -37, -37, -37, -37, -37]
        },
        level4: {
            posX: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34],
            posY: [-8, -9, -10, -11, -12, -13, -14, -30, -29, -28, -27, -26, -25, -24, -8, -9, -10, -11, -12, -13, -14, -30, -29, -28, -27, -26, -25, -24]
        },
        level5: {
            posX: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
                10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
            posY: [-10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10, -10,
                -28, -28, -28, -28, -28, -28, -28, -28, -28, -28, -28, -28, -28, -28, -28, -28, -28, -28, -28, -28]
        }
    };

    //Creating obstacles on the board
    switch(level) {

        case '1':
            this.obstaclePositionX = this.levels.level1.posX;
            this.obstaclePositionY = this.levels.level1.posY;

            break;
        case '1.2':
            this.obstaclePositionX = this.obstaclePositionX.concat(this.levels.level1.posX, this.levels.level2.posX);
            this.obstaclePositionY = this.obstaclePositionY.concat(this.levels.level1.posY, this.levels.level2.posY);
            break;
        case '1.4':
            this.obstaclePositionX = this.obstaclePositionX.concat(this.levels.level1.posX, this.levels.level2.posX, this.levels.level3.posX);
            this.obstaclePositionY = this.obstaclePositionY.concat(this.levels.level1.posY, this.levels.level2.posY, this.levels.level3.posY);
            break;
        case '1.6':
            this.obstaclePositionX = this.obstaclePositionX.concat(this.levels.level1.posX, this.levels.level2.posX, this.levels.level3.posX, this.levels.level4.posX);
            this.obstaclePositionY = this.obstaclePositionY.concat(this.levels.level1.posY, this.levels.level2.posY, this.levels.level3.posY, this.levels.level4.posY);
            break;
        case '2':
            this.obstaclePositionX = this.obstaclePositionX.concat(this.levels.level1.posX, this.levels.level2.posX, this.levels.level3.posX, this.levels.level4.posX,this.levels.level5.posX);
            this.obstaclePositionY = this.obstaclePositionY.concat(this.levels.level1.posY, this.levels.level2.posY, this.levels.level3.posY, this.levels.level4.posY,this.levels.level5.posY);
            break;
    }
};


module.exports = Board;
