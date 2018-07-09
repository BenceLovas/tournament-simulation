const dom = {
    init: () => {
        dom.addEventListenerToControlButtons();
        dom.addEventListenerToModalCloseButton();
        dom.addEventListenerToWindow();
    },
    addEventListenerToControlButtons: () => {
        const playButton = document.getElementById('play');
        playButton.addEventListener('click', game.play);
        const pauseButton = document.getElementById('pause');
        pauseButton.addEventListener('click', game.pause);
    },
    addEventListenerToModalCloseButton: () => {
        const modalCloseButton = document.getElementById('modal-close');
        modalCloseButton.addEventListener('click', dom.closeModal);
    },
    addEventListenerToWindow: () => {
        const modal = document.getElementById('modal');
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                dom.closeModal();
            }
        });
    },
    addEventListerToTeams: () => {
        const teamCards = document.getElementsByClassName('team-card');
        for (let i = 0; i < teamCards.length; i++) {
            teamCards[i].addEventListener('click', request.send);
            teamCards[i].classList.add('pointer');
        }
    },
    removeEventListenerFromTeams: () => {
        const teamCards = document.getElementsByClassName('team-card');
        for (let i = 0; i < teamCards.length; i++) {
            teamCards[i].removeEventListener('click', request.send);
            teamCards[i].classList.remove('pointer');
        }
    },
    disablePause: () => {
        document.getElementById("pause").disabled = true;
        document.getElementById("play").disabled = false;
    },
    disablePlay: () => {
        document.getElementById("pause").disabled = false;
        document.getElementById("play").disabled = true;
    },
    showModal: () => {
        const modal = document.getElementById('modal');
        modal.style.display = "block";
    },
    closeModal: () => {
        const modal = document.getElementById('modal');
        const modalText = document.getElementById('modal-text');
        modalText.innerHTML = '';
        modal.style.display = 'none';
    },
    populateModalWithTeamMembers: (array) => {
        const modalText = document.getElementById('modal-text');
        array.forEach((user) => {
            const paragraph = document.createElement('p');
            paragraph.innerText = user.name.first.concat(' ', user.name.last);
            modalText.appendChild(paragraph);
        });
    },
    populateModalWithWinner: () => {
        const modalText = document.getElementById('modal-text');
        const paragraph = document.createElement('p');
        paragraph.innerText = 'The winner is: ' + state.winner;
        modalText.appendChild(paragraph);
    },
    getColumnSelector: () => {
        let selector;
        switch (state.currentPairs.length) {
            case 8: selector = 'eight-finals'; break;
            case 4: selector = 'quarter-finals'; break;
            case 2: selector = 'semi-finals'; break;
            case 1: selector = 'final'; break;
            default: return;
        }
        return selector;
    },
    addTeamsToTable: () => {
        const selector = dom.getColumnSelector();
        const parentDiv = document.getElementById(selector);
        for (let i = 0; i < state.currentPairs.length; i++) {
            dom.createTeamPairCard(parentDiv, i);
        }
    },
    createTeamPairCard: (parentDiv, index) => {
        const isFirstTeamWin = state.currentPairs[index][0].score > state.currentPairs[index][1].score;
        const firstTeam = dom.createTeamCard(state.currentPairs[index], 0, isFirstTeamWin);
        const secondTeam = dom.createTeamCard(state.currentPairs[index], 1, isFirstTeamWin);
        const teamsContainer = document.createElement('div');
        teamsContainer.className = 'pair-card';
        teamsContainer.appendChild(firstTeam);
        teamsContainer.appendChild(secondTeam);
        parentDiv.appendChild(teamsContainer);
    },
    createTeamCard: (element, index, isFirstTeamWin) => {
        const teamName = document.createElement('div');
        teamName.innerText = element[index].name;
        const teamScore = document.createElement('div');
        teamScore.className = 'score';
        teamScore.innerText = element[index].score;
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';
        teamCard.appendChild(teamName);
        teamCard.appendChild(teamScore);
        if ((isFirstTeamWin && index === 0) || (!isFirstTeamWin && index === 1)) {
            teamCard.classList.add('winner');
        }
        return teamCard;
    },
    resetTable: () => {
        document.getElementById('eight-finals').innerHTML = '';
        document.getElementById('quarter-finals').innerHTML = '';
        document.getElementById('semi-finals').innerHTML = '';
        document.getElementById('final').innerHTML = '';
    },
};

state.teams = JSON.parse(localStorage.getItem('teams'));
console.log(state.teams);
dom.init();
