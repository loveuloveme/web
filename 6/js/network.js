function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function users(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((res) => {
        shuffleArray(res);
        res.forEach(user => {
            let userNode = document.createElement('div');
            userNode.className ='table-row';

            userNode.innerHTML = `
                <div class="table-item">
                    <span>${user.username}</span>
                </div>
                <div class="table-item">${user.name}</div>
                <div class="table-item">${user.phone}</div>
                <div class="table-item">${user.company.name}</div>
            `;

            document.querySelector('.users .table').append(userNode);
        })
    })
    .catch(e => {
        document.querySelector('.users__error').style.display = 'flex';
    })
    .finally(() => {
        document.querySelector('.preloader').style.display = 'none';
    });
}

setTimeout(users, 1500);