document.addEventListener('DOMContentLoaded', () => {
    const ticker = document.getElementById('ticker');
    const dataUrl = 'https://jonjonbinx1.github.io/TwitchWidgets/ticker-data.txt'; 
    let lines = []; // Store lines of text
    let currentIndex = 0; // Track current line being displayed

    function fetchAndDisplayTicker() {
        fetch(dataUrl)
            .then(response => response.text())
            .then(data => {
                ticker.innerHTML = '';

                lines = data.split('\n');
                currentIndex = 0;
                displayNextTickerItem();
            })
            .catch(error => console.error('Error fetching text file:', error));
    }

    function displayNextTickerItem() {
        if (currentIndex < lines.length) {
            const line = lines[currentIndex];
            if (line.trim() !== '') {
                const tickerItem = document.createElement('div');
                tickerItem.className = 'ticker-item';
                tickerItem.textContent = line;
                ticker.innerHTML = '';
                ticker.appendChild(tickerItem);

                // Animate ticker item
                ticker.style.animation = 'ticker 10s linear infinite';
                ticker.style.animationPlayState = 'running';

                // Wait for the animation to complete before displaying the next item
                setTimeout(() => {
                    currentIndex++;
                    ticker.style.animation = 'none';
                    displayNextTickerItem();
                }, 10000); // Match the duration to the animation time
            } else {
                currentIndex++;
                displayNextTickerItem();
            }
        } else {
            fetchAndDisplayTicker(); // Fetch new data when all lines have been displayed
        }
    }

    fetchAndDisplayTicker();
});
