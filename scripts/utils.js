const utils = {
    shuffle: (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },
    pair: (array) => {
        const pairs = [];
        for (let i = 0; i < array.length; i+=2) {
            const tempArray = [];
            tempArray.push(array[i]);
            tempArray.push(array[i + 1]);
            pairs.push(tempArray);
        }
        return pairs;
    },
    getScores: (array) => {
        for (let i = 0; i < array.length; i++) {
            let scoreOne = Math.floor(Math.random() * 8);
            let scoreTwo;
            do {
                scoreTwo = Math.floor(Math.random() * 8);
            } while(scoreOne === scoreTwo);
            array[i][0].score = scoreOne;
            array[i][1].score = scoreTwo;
        }
        return array;
    },
    eliminate: (array) => {
        const remaining = [];
        for (let i = 0; i < array.length; i++) {
            remaining.push(array[i][0].score > array[i][1].score ? array[i][0] : array[i][1]);
        }
        return remaining;
    },
    getWinner: (array) => {
        return array[0][0].score > array[0][1].score ? array[0][0].name : array[0][1].name;
    }
};