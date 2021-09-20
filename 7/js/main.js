function elementEnter(element, enterFunction, threshold = 1){
    let observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting === true){
            enterFunction();
        }
    },{
        threshold: threshold
    });
    
    observer.observe(element);

    return observer;
}

window.addEventListener('load', () => {

    // document.querySelectorAll('section').forEach(section => {
    //     elementEnter(section, () => {
    //         let name = section.dataset.section;

    //         console.log(name);
            // document.querySelectorAll('header ul > li').forEach(li => {
            //     li.classList.remove(`active`);
            // });

    //         let liNode = document.querySelector(`header ul > li[data-section="${name}"]`);
    //         liNode.classList.add(`active`);
    //     },  [0, 0.25, 0.5, 0.75, 1]);
    // });

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

    elementEnter(document.querySelector(".quote"), () => {});

    elementEnter(document.querySelector(".users"), () => {
        setTimeout(loadUsers, 1500);
    });
});
