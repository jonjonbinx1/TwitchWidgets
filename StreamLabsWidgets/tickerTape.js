document.addEventListener('DOMContentLoaded', () => {
    const ticker = document.getElementById('ticker');

    function fetchAndDisplayTicker() {
        fetch('tickerTape.json')
            .then(response => response.json())
            .then(data => {
                ticker.innerHTML = '';
                
                data.forEach(entry => {
                    const tickerItem = document.createElement('div');
                    tickerItem.className = 'ticker-item';
                    tickerItem.textContent = entry.text;
                    ticker.appendChild(tickerItem);
                });

                // Clone the ticker content for looping effect
                const clone = ticker.cloneNode(true);
                ticker.appendChild(clone);

                // Restart the ticker animation
                resetTickerAnimation();
            })
            .catch(error => console.error('Error fetching JSON:', error));
    }

    function resetTickerAnimation() {
        // Trigger reflow to restart CSS animation
        ticker.style.animation = 'none';
        ticker.offsetHeight; // Trigger reflow
        ticker.style.animation = null;
    }

    // Fetch and display the ticker on load
    fetchAndDisplayTicker();

    // Set an interval to reload the ticker data every X seconds (e.g., 60 seconds)
    setInterval(fetchAndDisplayTicker, 60000);
});
