(() => {
    let timeStart = Date.now();

    window.onload = () => {
        let nodeItem = document.createElement('p');
        nodeItem.innerHTML = `Page load time <strong>${Date.now() - timeStart} ms</strong>`;
        
        document.querySelector('footer').appendChild(nodeItem);
    };
})();