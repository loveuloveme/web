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
            transform: 'scale(1)'
        })
        .set(document.querySelectorAll('.intro > video')[0], {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)',
            transform: 'scale(1)'
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
            ease: animEase,
            transform: 'scale(2)'
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
            clipPath: 'polygon(1% 0%, 100% 0%, 100% 100%, 1% 100%, 1% 0%)',
            delay: -0.3,
            duration: 0.01,
            ease: animEase
        })
        .to(document.querySelectorAll('.intro > video')[0], {
            clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 0%)',
            delay: -0.3,
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
            duration: 100,
            ease: 'Linear.none'
        })
        
        timeline.play();
    }

    document.querySelectorAll('.intro > video')[1].play();

    
    setTimeout(() => {
        animate();
    }, 1000);
});