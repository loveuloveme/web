window.addEventListener('load', () => {
    
    fadeOut(document.querySelector('.page-loader'))

    window.addEventListener('scroll', () => {
        let sections = document.querySelectorAll('section');

        let onScreenSection = null;

        sections.forEach((section, index) => {
            if(!index) onScreenSection = section;

            if(Math.abs(section.getBoundingClientRect().y) < Math.abs(onScreenSection.getBoundingClientRect().y)){
                onScreenSection = section;
            }
        });

        let name = onScreenSection.dataset.section;

        document.querySelectorAll('header ul > li').forEach(li => {
            li.classList.remove(`active`);
        });

        let liNode = document.querySelector(`header ul > li[data-section="${name}"]`);
        liNode.classList.add(`active`);
    })

    document.querySelectorAll('header ul > li').forEach(li => {
        li.addEventListener('click', () => {
            let element = document.querySelectorAll(`section[data-section="${li.dataset.section}"]`)[0];
            element.scrollIntoView({ behavior: 'smooth', block: 'start'});
            //
        })
    });

    new simpleParallax(document.querySelectorAll('.quote img'));

    elementEnter(document.querySelector(".quote"), {}, () => {});
    elementEnter(document.querySelector(".users"), {}, () => {
        setTimeout(loadUsers, 1500);
    });
});
