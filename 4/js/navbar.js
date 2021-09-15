(() => {
    let reference = document.location.href.split('/')[4].split('.')[0];

    switch(reference){
        case '':
        case 'index':
            document.querySelectorAll('nav ul li')[0].classList.add('active');
            break;
        case 'about':
            document.querySelectorAll('nav ul li')[1].classList.add('active');
            break;
        case 'armor':
            document.querySelectorAll('nav ul li')[2].classList.add('active');
            break;
    }
})();