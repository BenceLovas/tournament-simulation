const dom = {
    createTable: (groups) => {
        for (let i = 0; i < groups.length; i++) {
            const groupWrapperDiv = document.createElement('div');
            groupWrapperDiv.className = 'group';
            groupWrapperDiv.id = config.groupSigns[i];

            const tableWrapperDiv = document.createElement('div');
            tableWrapperDiv.id = 'table' + config.groupSigns[i];

            const titleWrapperDiv = document.createElement('div');
            titleWrapperDiv.className = 'group-header';
            const titleDiv = document.createElement('div');
            titleDiv.className = 'group-title'; 
            titleDiv.innerText = groups[i].title;
            titleWrapperDiv.appendChild(titleDiv);
            for (let k = 0; k < config.tableColumnHeaders.length; k++) {
                const headerDiv = document.createElement('div');
                headerDiv.className = 'table-header'
                headerDiv.innerText = config.tableColumnHeaders[k];
                titleWrapperDiv.appendChild(headerDiv);
            }

            // groupWrapperDiv.appendChild(titleWrapperDiv);
            tableWrapperDiv.appendChild(titleWrapperDiv);

            for (let j = 0; j < groups[i].teams.length; j++) {
                const teamWrapperDiv = document.createElement('div');
                teamWrapperDiv.className = 'team-row';

                const teamNameDiv = document.createElement('div');
                teamNameDiv.innerText = groups[i].teams[j].name;
                teamNameDiv.className = 'team-name';

                const teamPlayedGamesDiv = document.createElement('div');
                teamPlayedGamesDiv.className = 'team-played-number';
                teamPlayedGamesDiv.innerText = groups[i].teams[j].played;

                const teamWonGamesDiv = document.createElement('div');
                teamWonGamesDiv.className = 'team-won-number';
                teamWonGamesDiv.innerText = groups[i].teams[j].won;

                const teamDrawnGamesDiv = document.createElement('div');
                teamDrawnGamesDiv.className = 'team-drawn-number';
                teamDrawnGamesDiv.innerText = groups[i].teams[j].drawn;

                const teamLostGamesDiv = document.createElement('div');
                teamLostGamesDiv.className = 'team-lost-number';
                teamLostGamesDiv.innerText = groups[i].teams[j].lost;

                const teamGoalsForDiv = document.createElement('div');
                teamGoalsForDiv.className = 'team-goals-for-number';
                teamGoalsForDiv.innerText = groups[i].teams[j].goalsFor;

                const teamGoalsAgainstDiv = document.createElement('div');
                teamGoalsAgainstDiv.className = 'team-goals-against-number';
                teamGoalsAgainstDiv.innerText = groups[i].teams[j].goalsAgainst;

                const teamGoalDifferenceDiv = document.createElement('div');
                teamGoalDifferenceDiv.className = 'team-goal-difference-number';
                teamGoalDifferenceDiv.innerText = groups[i].teams[j].goalDifference;

                const teamPointsDiv = document.createElement('div');
                teamPointsDiv.className = 'team-points-number';
                teamPointsDiv.innerText = groups[i].teams[j].points;


                teamWrapperDiv.appendChild(teamNameDiv);
                teamWrapperDiv.appendChild(teamPlayedGamesDiv);
                teamWrapperDiv.appendChild(teamWonGamesDiv);
                teamWrapperDiv.appendChild(teamDrawnGamesDiv);
                teamWrapperDiv.appendChild(teamLostGamesDiv);
                teamWrapperDiv.appendChild(teamGoalsForDiv);
                teamWrapperDiv.appendChild(teamGoalsAgainstDiv);
                teamWrapperDiv.appendChild(teamGoalDifferenceDiv);
                teamWrapperDiv.appendChild(teamPointsDiv);
                tableWrapperDiv.appendChild(teamWrapperDiv);
            }
            
            const parentDiv = document.getElementById('groups-wrapper');
            groupWrapperDiv.appendChild(tableWrapperDiv);
            parentDiv.appendChild(groupWrapperDiv);
        }
    },
    createFixtures: (groups) => {
        for (let i = 0; i < groups.length; i++) {
            const outerWrapper = document.createElement('div');
            outerWrapper.className = 'fixtures-wrapper';
            const wrapperDiv = document.createElement('div');  
            wrapperDiv.id = 'fixtures' + config.groupSigns[i];
            wrapperDiv.className = 'fixtures';
            wrapperDiv.style.display = 'none';
            const toggleButton = document.createElement('button');
            toggleButton.innerText = 'SHOW FIXTURES';
            toggleButton.style.width = '100%';
            toggleButton.addEventListener('click', (event) => {
                const button = event.currentTarget;
                button.innerText = button.innerText === 'SHOW FIXTURES' ? 'HIDE FIXTURES' : 'SHOW FIXTURES'; 
                const div = document.getElementById('fixtures' + config.groupSigns[i]);

                if (div.style.display === 'none') {
                    div.style.display = 'block';
                } else {
                    div.style.display = 'none';
                }
            })

            outerWrapper.appendChild(toggleButton);
            for (let j = 0; j < groups[i].games.length; j++) {
                const div = document.createElement('div');
                div.className = 'match';
                const homeTeamDiv = document.createElement('div');
                homeTeamDiv.innerText = groups[i].games[j].home.team.name;
                homeTeamDiv.className = 'home-team';
                const awayTeamDiv = document.createElement('div');
                awayTeamDiv.innerText = groups[i].games[j].away.team.name;
                const homeScoreDiv = document.createElement('div');
                homeScoreDiv.innerText = groups[i].games[j].home.score ? roups[i].games[j].home.score : '-';
                homeScoreDiv.className = 'score-home';
                const awayScoreDiv = document.createElement('div');
                awayScoreDiv.innerText = groups[i].games[j].away.score ? groups[i].games[j].away.score : '-';
                awayScoreDiv.className = 'score-away';
                const dashDiv = document.createElement('div');
                dashDiv.innerText = ' - ';
                dashDiv.className = 'dash';
            
                div.appendChild(homeTeamDiv);
                div.appendChild(homeScoreDiv);
                div.appendChild(dashDiv);
                div.appendChild(awayScoreDiv);
                div.appendChild(awayTeamDiv);

                wrapperDiv.appendChild(div);
            }
            outerWrapper.appendChild(wrapperDiv);
            const groupDiv = document.getElementById(config.groupSigns[i]);
            groupDiv.appendChild(outerWrapper);
        }
    },
    updateFixtures: (groups) => {
        for (let i = 0; i < groups.length; i++) {
            const wrapperDiv = document.getElementById('fixtures' + config.groupSigns[i]);
            wrapperDiv.innerHTML = '';
            for (let j = 0; j < groups[i].games.length; j++) {
                const div = document.createElement('div');
                div.className = 'match';
                const homeTeamDiv = document.createElement('div');
                homeTeamDiv.innerText = groups[i].games[j].home.team.name;
                homeTeamDiv.className = 'home-team';
                const awayTeamDiv = document.createElement('div');
                awayTeamDiv.innerText = groups[i].games[j].away.team.name;
                const homeScoreDiv = document.createElement('div');
                homeScoreDiv.innerText = groups[i].games[j].home.score !== null ? groups[i].games[j].home.score : '-';
                homeScoreDiv.className = 'score-home';
                const awayScoreDiv = document.createElement('div');
                awayScoreDiv.innerText = groups[i].games[j].away.score !== null ? groups[i].games[j].away.score : '-';
                awayScoreDiv.className = 'score-away';
                const dashDiv = document.createElement('div');
                dashDiv.innerText = ' - ';
                dashDiv.className = 'dash';
            
                div.appendChild(homeTeamDiv);
                div.appendChild(homeScoreDiv);
                div.appendChild(dashDiv);
                div.appendChild(awayScoreDiv);
                div.appendChild(awayTeamDiv);

                wrapperDiv.appendChild(div);
            }
        }
    },
    updateTable: () => {
        for (let i = 0; i < state.groups.length; i++) {
            const groupWrapperDiv = document.getElementById('table' + config.groupSigns[i]);
            groupWrapperDiv.innerHTML = '';
            const titleWrapperDiv = document.createElement('div');
            titleWrapperDiv.className = 'group-header';
            const titleDiv = document.createElement('div');
            titleDiv.className = 'group-title'; 
            titleDiv.innerText = state.groups[i].title;
            titleWrapperDiv.appendChild(titleDiv);
            for (let k = 0; k < config.tableColumnHeaders.length; k++) {
                const headerDiv = document.createElement('div');
                headerDiv.className = 'table-header'
                headerDiv.innerText = config.tableColumnHeaders[k];
                titleWrapperDiv.appendChild(headerDiv);
            }

            groupWrapperDiv.appendChild(titleWrapperDiv);

            for (let j = 0; j < state.groups[i].teams.length; j++) {
                const teamWrapperDiv = document.createElement('div');
                teamWrapperDiv.classList.add('team-row');

                if (j === 0 || j === 1) {
                    teamWrapperDiv.classList.add('advance-teams');
                }

                const teamNameDiv = document.createElement('div');
                teamNameDiv.innerText = state.groups[i].teams[j].name;
                teamNameDiv.className = 'team-name';

                const teamPlayedGamesDiv = document.createElement('div');
                teamPlayedGamesDiv.className = 'team-played-number';
                teamPlayedGamesDiv.innerText = state.groups[i].teams[j].played;

                const teamWonGamesDiv = document.createElement('div');
                teamWonGamesDiv.className = 'team-won-number';
                teamWonGamesDiv.innerText = state.groups[i].teams[j].won;

                const teamDrawnGamesDiv = document.createElement('div');
                teamDrawnGamesDiv.className = 'team-drawn-number';
                teamDrawnGamesDiv.innerText = state.groups[i].teams[j].drawn;

                const teamLostGamesDiv = document.createElement('div');
                teamLostGamesDiv.className = 'team-lost-number';
                teamLostGamesDiv.innerText = state.groups[i].teams[j].lost;

                const teamGoalsForDiv = document.createElement('div');
                teamGoalsForDiv.className = 'team-goals-for-number';
                teamGoalsForDiv.innerText = state.groups[i].teams[j].goalsFor;

                const teamGoalsAgainstDiv = document.createElement('div');
                teamGoalsAgainstDiv.className = 'team-goals-against-number';
                teamGoalsAgainstDiv.innerText = state.groups[i].teams[j].goalsAgainst;

                const teamGoalDifferenceDiv = document.createElement('div');
                teamGoalDifferenceDiv.className = 'team-goal-difference-number';
                teamGoalDifferenceDiv.innerText = state.groups[i].teams[j].goalDifference;

                const teamPointsDiv = document.createElement('div');
                teamPointsDiv.className = 'team-points-number';
                teamPointsDiv.innerText = state.groups[i].teams[j].points;

                teamWrapperDiv.appendChild(teamNameDiv);
                teamWrapperDiv.appendChild(teamPlayedGamesDiv);
                teamWrapperDiv.appendChild(teamWonGamesDiv);
                teamWrapperDiv.appendChild(teamDrawnGamesDiv);
                teamWrapperDiv.appendChild(teamLostGamesDiv);
                teamWrapperDiv.appendChild(teamGoalsForDiv);
                teamWrapperDiv.appendChild(teamGoalsAgainstDiv);
                teamWrapperDiv.appendChild(teamGoalDifferenceDiv);
                teamWrapperDiv.appendChild(teamPointsDiv);
                // console.log(teamWrapperDiv);
                groupWrapperDiv.appendChild(teamWrapperDiv);
            }
            
            // const parentDiv = document.getElementById('groups-wrapper');
            // parentDiv.appendChild(groupWrapperDiv);
        }
    },
    addEventListenerToRoundStepper: () => {
        const button = document.getElementById('stepper');
        button.addEventListener('click', game.playOneRound);
    }
}

dom.createTable(state.groups);
dom.createFixtures(state.groups);
dom.addEventListenerToRoundStepper();