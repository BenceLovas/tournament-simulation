const request = {
    send: (event) => {
        const target = event.currentTarget;
        target.removeEventListener('click', request.send);
        fetch(config.randomUserLink, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
            .then(res => res.json())
            .then(response => {
                request.callback(response);
                target.addEventListener('click', request.send);
            })
            .catch(err => {
                console.log(err);
                target.addEventListener('click', request.send);
            });
    },
    callback: (response) => {
        dom.populateModalWithTeamMembers(response.results);
        dom.showModal();
    }
};