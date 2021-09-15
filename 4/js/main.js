(() => {
    let timeStart = Date.now();

    window.onload = () => {
        document.querySelector('footer').innerHTML = `<p>Page load time <strong>${Date.now() - timeStart} ms</strong></p>`;
    };
})();