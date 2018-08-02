function ScoreBoard () {
    const scoreList = document.querySelector('#scoreList');
    this.arrayOfBestScores = [];

    //Add result to scoreboard
    this.addResult = function (result) {
        this.arrayOfBestScores.push(result);

        this.arrayOfBestScores.sort(function (a, b) {
            return b - a;
        });

        //If the array is longer than 5 delete the lowest score
        if (this.arrayOfBestScores.length > 5) {
            this.arrayOfBestScores = this.arrayOfBestScores.slice(0, 5);
        }

        //Clearing scoreboard
        while (scoreList.firstChild) {
            scoreList.removeChild(scoreList.firstChild);
        }

        //Filling scoreboard with array elements
        for (let i = 0; i < this.arrayOfBestScores.length; i++) {
            let listElement = document.createElement('li');
            listElement.innerText = this.arrayOfBestScores[i];
            scoreList.appendChild(listElement);
        }
    }
}

module.exports = ScoreBoard;
