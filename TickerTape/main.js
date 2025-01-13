document.addEventListener('DOMContentLoaded', () => {
    const ticker = document.getElementById('ticker');
    const dataUrl = 'https://jonjonbinx1.github.io/TwitchWidgets/TickerTape/ticker-data.txt';

    function fetchAndDisplayTicker() {
        fetch(dataUrl)
            .then(response => response.text())
            .then(data => {
                ticker.innerHTML = '';

                const lines = data.split('\n');
                lines.forEach(line => {
                    if (line.trim() !== '') {
                        const tickerItem = document.createElement('div');
                        tickerItem.className = 'ticker-item';
                        tickerItem.textContent = line;
                        ticker.appendChild(tickerItem);
                    }
                });

                const clone = ticker.cloneNode(true);
                ticker.appendChild(clone);

                resetTickerAnimation();
            })
            .catch(error => console.error('Error fetching text file:', error));
    }

    function resetTickerAnimation() {
        ticker.style.animation = 'none';
        ticker.offsetHeight;
        ticker.style.animation = null;
    }

    fetchAndDisplayTicker();
    setInterval(fetchAndDisplayTicker, 60000); // Adjust interval as needed
});
