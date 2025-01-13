document.addEventListener('DOMContentLoaded', () => {
    const ticker = document.getElementById('ticker');
    const dataUrl = 'https://jonjonbinx1.github.io/TwitchWidgets/ticker-data.txt'; // Update with your actual URL
    let lines = []; // Store lines of text
    let currentIndex = 0; // Track current line being displayed

    function fetchAndDisplayTicker() {
        fetch(dataUrl)
            .then(response => response.text())
            .then(data => {
                ticker.innerHTML = '';

                lines = data.split('\n').filter(line => line.trim() !== '');
                currentIndex = 0;
                displayNextTickerItem();
            })
            .catch(error => console.error('Error fetching text file:', error));
    }

    function displayNextTickerItem() {
        if (currentIndex < lines.length) {
            const line = lines[currentIndex];
            const tickerItem = document.createElement('div');
            tickerItem.className = 'ticker-item';
            tickerItem.textContent = line + ' |'; // Add pipe at the end
            ticker.innerHTML = '';
            ticker.appendChild(tickerItem);

            // Adjust animation duration to slow down the text
            ticker.style.animation = 'ticker 20s linear infinite';
            
            setTimeout(() => {
                currentIndex++;
                displayNextTickerItem();
            }, 20000); // Adjust interval to match the slow animation time
        } else {
            fetchAndDisplayTicker(); // Fetch new data when all lines have been displayed
        }
    }

    fetchAndDisplayTicker();
});
