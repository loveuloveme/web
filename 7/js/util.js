function elementEnter(element, options, enterFunction, threshold = 1){
    let observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting === true){
            if(!options.repeat){
                if(!element.dataset.showed){
                    element.setAttribute('showed', 1);
                    enterFunction();
                }
            }else{
                enterFunction();
            }
            
        }
    },{
        threshold: threshold
    });
    
    observer.observe(element);

    return observer;
}