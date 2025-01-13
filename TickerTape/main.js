document.addEventListener('DOMContentLoaded', () => {
    const ticker = document.getElementById('ticker');
    const dataUrl = 'https://jonjonbinx1.github.io/TwitchWidgets/ticker-data.txt'; // Update with your actual URL

    async function fetchAndDisplayTicker() {
        try {
            const response = await fetch(dataUrl);
            if (!response.ok) {
                throw new Error(`Network response was not OK: ${response.statusText}`);
            }
            
            const data = await response.text();
            console.log("Fetched Data:", data); // Diagnostic log

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
        } catch (error) {
            console.error('Error fetching text file:', error); // Enhanced error logging
        }
    }

    // Initial fetch and display
    fetchAndDisplayTicker();
});
