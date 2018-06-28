const game = {
    play: () => {
        if (!state.inProgress) {
            dom.resetTable();
            game.initialize();
        }
        dom.disablePlay();
        dom.removeEventListenerFromTeams();
        state.intervalId = setInterval(game.elimination, config.interval);
    },
    pause: () => {
        clearInterval(state.intervalId);
        dom.disablePause();
        dom.addEventListerToTeams();
    },
    initialize: () => {
        state.inProgress = true;
        const shuffledTeams = utils.shuffle(state.teams);
        const pairedTeams = utils.pair(shuffledTeams);
        state.currentPairs = utils.getScores(pairedTeams);
        dom.addTeamsToTable();
    },
    elimination: () => {
        if (state.currentPairs.length >= 2) {
            game.round();
            dom.addTeamsToTable();
        } else if (state.currentPairs.length === 1) {
            game.finalize();
        }
    },
    round: () => {
        const advancedTeams = utils.eliminate(state.currentPairs);
        const pairedTeams = utils.pair(advancedTeams);
        state.currentPairs = utils.getScores(pairedTeams);
    },
    finalize: () => {
        state.winner = utils.getWinner(state.currentPairs);
        dom.disablePause();
        dom.populateModalWithWinner();
        dom.showModal();
        state.reset();
    },
};