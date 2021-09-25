function scaleIn(element){
    let animEase = 'power2.inOut';

    let timeline = gsap.timeline({paused:true});
    timeline
    .to(element, {
        transform: 'scale(1)',
        delay: 0,
        duration: 0.7,
        ease: animEase
    })

    timeline.play();
}

window.addEventListener('load', () => {
    document.querySelectorAll('.scale-in').forEach(element => {
        gsap.set(element, {
            transform: 'scale(1.7)'
        });

        elementEnter(document.querySelector('.scale-in'), {repeat: false}, () => {
            scaleIn(element);
        }, 0.5);
    });
})