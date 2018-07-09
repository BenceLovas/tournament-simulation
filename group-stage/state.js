const config = {
    tableColumnHeaders: ['Pld', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts'],
    groupsOfTeams: [
        [
            'Uruguay',
            'Russia',
            'Saudi Arabia',
            'Egypt',
        ],
        [
            'Spain',
            'Portugal',
            'Iran',
            'Morocco',
        ],
        [
            'France',
            'Denmark',
            'Peru',
            'Australia',
        ],
        [
            'Croatia',
            'Argentina',
            'Nigeria',
            'Iceland',
        ],
        [
            'Brazil',
            'Switzerland',
            'Serbia',
            'Costa Rica',
        ],
        [
            'Sweden',
            'Mexico',
            'South Korea',
            'Germany',
        ],
        [
            'England',
            'Belgium',
            'Tunisia',
            'Panama',
        ],
        [
            'Japan',
            'Senegal',
            'Colombia',
            'Poland',
        ]
    ],
    groupSigns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',],
}

const state = {
    matchesFinished: 0,
    groups: [],
    fillGroups: (groupsOfTeams, groupSigns) => {
        const groups = [];
        for (let i = 0; i < groupsOfTeams.length; i++) {
            const group = {
                title: 'Group ' + groupSigns[i],
                teams: [],
                games: [],
            }
            for (let j = 0; j < groupsOfTeams[i].length; j++) {
                const team = {
                    name: groupsOfTeams[i][j],
                    played: 0,
                    won: 0,
                    drawn: 0,
                    lost: 0,
                    goalsFor: 0,
                    goalsAgainst: 0,
                    goalDifference: 0,
                    points: 0,
                }
                group.teams.push(team);
            }

            groups.push(group);
        }

        return groups;
    },
    fillGames: (array) => {
        for (let i = 0; i < array.length; i++) {
            const gamesIndex = [[0, 1], [2, 3], [0, 3], [1, 2], [0, 2], [1, 3]];
            for (let k = 0; k < gamesIndex.length; k++) {
                const game = { 
                    home: { team: array[i].teams[gamesIndex[k][0]], score: null },
                    away: { team: array[i].teams[gamesIndex[k][1]], score: null },
                };
                array[i].games.push(game);
            }
        }
    },
    init: () => {
        state.groups = state.fillGroups(config.groupsOfTeams, config.groupSigns);
        state.fillGames(state.groups);
    },
    update: () => {
        for (let groupIndex = 0; groupIndex < state.groups.length; groupIndex++) {
            for (let gameIndex = state.matchesFinished; gameIndex < state.matchesFinished + 2; gameIndex++) {
                
                const home = state.groups[groupIndex].games[gameIndex].home;
                const away = state.groups[groupIndex].games[gameIndex].away;
                for (let teamIndex = 0; teamIndex < state.groups[groupIndex].teams.length; teamIndex++) {
                    if (state.groups[groupIndex].teams[teamIndex].name === home.team.name) {
                        const homeTeam = state.groups[groupIndex].teams[teamIndex];
                        homeTeam.played += 1;
                        homeTeam.goalsFor += home.score;
                        homeTeam.goalsAgainst += away.score;
                        homeTeam.goalDifference = homeTeam.goalsFor - homeTeam.goalsAgainst;
                        if (home.score > away.score) {
                            homeTeam.won += 1;
                            homeTeam.points += 3;
                        } else if (home.score < away.score) {
                            homeTeam.lost += 1;
                        } else {
                            homeTeam.drawn += 1;
                            homeTeam.points += 1;
                        }
                    }

                    if (state.groups[groupIndex].teams[teamIndex].name === away.team.name) {
                        const awayTeam = state.groups[groupIndex].teams[teamIndex];
                        awayTeam.played += 1;
                        awayTeam.goalsFor += away.score;
                        awayTeam.goalsAgainst += home.score;
                        awayTeam.goalDifference = awayTeam.goalsFor - awayTeam.goalsAgainst;
                        if (away.score > home.score) {
                            awayTeam.won += 1;
                            awayTeam.points += 3;
                        } else if (home.score < away.score) {
                            awayTeam.lost += 1;
                        } else {
                            awayTeam.drawn += 1;
                            awayTeam.points += 1;
                        }
                    }
                }
            }
            state.groups[groupIndex].teams.sort((a, b) => {return b.points - a.points || b.goalDifference - a.goalDifference})
        }
        console.log('state after update ', state);
    }
}

state.init();
console.log(state);