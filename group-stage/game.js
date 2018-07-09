const game = {
    playOneRound: () => {
        for (let i = 0; i < state.groups.length; i++) {
            for (let j = state.matchesFinished; j < state.matchesFinished + 2; j++) {
                const homeTeamScore = Math.floor(Math.random() * 5);
                const awayTeamScore = Math.floor(Math.random() * 5);
                state.groups[i].games[j].home.score = homeTeamScore;
                state.groups[i].games[j].away.score = awayTeamScore;
            }
        }
        dom.updateFixtures(state.groups);
        state.update();
        dom.updateTable();
        state.matchesFinished += 2;
        if (state.matchesFinished === 6) {
            document.getElementById('stepper').disabled = true;
            const continueButton = document.getElementById('countinue');
            continueButton.disabled = false;
            continueButton.addEventListener('click', () => {
                const advancedTeams = [];
                for (let i = 0; i < state.groups.length; i++) {
                    advancedTeams.push({ name: state.groups[i].teams[0].name, score: null });
                    advancedTeams.push({ name: state.groups[i].teams[1].name, score: null });
                }
                localStorage.setItem('teams', JSON.stringify(advancedTeams));
                window.location = 'file:///home/bans/ge/git/tournament-simulation/index.html';
            });
        }
    }
};