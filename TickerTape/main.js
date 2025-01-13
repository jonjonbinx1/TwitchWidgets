document.addEventListener('DOMContentLoaded', () => {
    const ticker = document.getElementById('ticker');
    const dataUrl = 'https://jonjonbinx1.github.io/TwitchWidgets/ticker-data.txt'; // Update with your actual URL

    function fetchAndDisplayTicker() {
        fetch(dataUrl)
            .then(response => response.text())
            .then(data => {
                ticker.innerHTML = '';
                
                const lines = data.split('\n').filter(line => line.trim() !== '');
                const continuousText = lines.join(' | '); // Join lines with a pipe as separator
                const tickerItem = document.createElement('div');
                tickerItem.className = 'ticker-item';
                tickerItem.textContent = continuousText;
                ticker.appendChild(tickerItem);

                // Adjust animation duration based on text length
                const tickerWidth = ticker.offsetWidth;
                const containerWidth = document.getElementById('newsContainer').offsetWidth;
                const animationDuration = (tickerWidth + containerWidth) / 20; // Slow scrolling
                
                ticker.style.animation = `ticker ${animationDuration}s linear infinite`;
            })
            .catch(error => console.error('Error fetching text file:', error));
    }

    fetchAndDisplayTicker();
});
