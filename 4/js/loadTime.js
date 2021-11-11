(() => {
    window.onload = () => {
        let perf = performance.getEntriesByType("navigation")[0];

        let nodeItem = document.createElement('p');
        const pageLoadTime = perf.loadEventStart - perf.loadEventEnd;

        nodeItem.innerHTML = `Page load time <strong>${pageLoadTime} ms</strong>`;

        document.querySelector('footer').appendChild(nodeItem);
    };
})();