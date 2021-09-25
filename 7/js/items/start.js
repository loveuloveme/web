gsap.config({
    force3D: false
});

window.addEventListener('load', () => {
    function animate(){
        let animEase = 'power2.inOut';
        let delay = 0;

        let timeline = gsap.timeline({paused:true});
        timeline
        .set(document.querySelectorAll('.intro > video')[0], {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)',
        })
        .set(document.querySelectorAll('.intro > video')[1], {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)',
        })
        .set(document.querySelector('.intro__bg'), {
            transform: 'scale(2)'
        })
        .to(document.querySelectorAll('.intro > video')[1], {
            clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%, 0% 0%)',
            delay,
            duration: 0.5,
            ease: animEase
        })
        .to(document.querySelectorAll('.intro > video')[1], {
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%, 0% 0%)',
            delay,
            duration: 1,
            ease: animEase,
            onStart: () => {
                document.querySelectorAll('.intro > video')[0].play();
            }
        })
        .to(document.querySelectorAll('.intro > video')[0], {
            clipPath: 'polygon(0% 0%, 99% 0%, 99% 100%, 0% 100%, 0% 0%)',
            delay,
            duration: 0.01,
            ease: animEase
        })
        .to(document.querySelectorAll('.intro > video')[0], {
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%, 0% 0%)',
            delay,
            duration: 0.7,
            ease: animEase
        })
        .to(document.querySelector('.intro__bg'), {
            transform: 'scale(1.8)',
            delay: -0.7,
            duration: 0.7,
            ease: animEase
        })
        .to(document.querySelector('.intro__bg'), {
            transform: 'scale(1)',
            delay: 0,
            duration: 30,
            ease: animEase
        })
        
        timeline.play();
    }

    document.querySelectorAll('.intro > video')[1].play();

    
    setTimeout(() => {
        animate();
    }, 1000);
});