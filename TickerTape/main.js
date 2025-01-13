document.addEventListener('DOMContentLoaded', () => {
    const ticker = document.getElementById('ticker');
    const dataUrl = 'https://raw.githubusercontent.com/jonjonbinx1/TwitchWidgets/main/TickerTape/ticker-data.txt'; // Update with your actual URL

    function fetchAndDisplayTicker() {
        fetch(dataUrl)
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Network response was not OK');
                }
            })
            .then(data => {
                ticker.innerHTML = '';

                const lines = data.split('\n').filter(line => line.trim() !== '');
                const continuousText = lines.join(' | ');

                const tickerItem = document.createElement('div');
                tickerItem.className = 'ticker-item';
                tickerItem.textContent = continuousText;
                ticker.appendChild(tickerItem);

                const tickerWidth = ticker.offsetWidth;
                const containerWidth = document.getElementById('newsContainer').offsetWidth;
                const animationDuration = (tickerWidth + containerWidth) / 20;

                ticker.style.animation = `ticker ${animationDuration}s linear infinite`;
            })
            .catch(error => {
                console.error('Error fetching text file:', error);
            });
    }

    fetchAndDisplayTicker();
});
