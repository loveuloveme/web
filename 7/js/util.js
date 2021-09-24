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