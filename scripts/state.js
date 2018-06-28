const state = {
    teams: [
        {id: 1, name: 'Real Madrid', score: null},
        {id: 2, name: 'Chelsea', score: null},
        {id: 3, name: 'Barcelona', score: null},
        {id: 4, name: 'PSG', score: null},
        {id: 5, name: 'Manchester United', score: null},
        {id: 6, name: 'Arsenal', score: null},
        {id: 7, name: 'Liverpool', score: null},
        {id: 8, name: 'Manchester City', score: null},
        {id: 9, name: 'Juventus', score: null},
        {id: 10, name: 'Tottenham Hotspur', score: null},
        {id: 11, name: 'Milan', score: null},
        {id: 12, name: 'Inter', score: null},
        {id: 13, name: 'SSC Napoli', score: null},
        {id: 14, name: 'Atletico Madrid', score: null},
        {id: 15, name: 'Bayern Munich', score: null},
        {id: 16, name: 'Schalke 04', score: null},
    ],
    currentPairs: [],
    winner: '',
    intervalId: null,
    inProgress: false,
    reset: () => {
        state.currentPairs = [];
        state.winner = '';
        clearInterval(state.intervalId);
        state.inProgress = false;
    }
};
