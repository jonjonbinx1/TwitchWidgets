document.addEventListener('DOMContentLoaded', () => {
    const ticker = document.getElementById('ticker');
    const tickerContainer = document.getElementById('tickerContainer');
    const dataUrl = 'https://jonjonbinx1.github.io/TwitchWidgets/TickerTape/ticker-data.txt'; // Update with your actual URL

    function fetchAndDisplayTicker() {
        fetch(dataUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not OK: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                console.log("Fetched Data:", data); 

                const lines = data.split('\n').filter(line => line.trim() !== '');
                console.log("Lines Array:", lines);

                if (lines.length > 0) {
                    const continuousText = lines.join(' | ');
                    console.log("Continuous Text:", continuousText);

                    const tickerItem = document.createElement('div');
                    tickerItem.className = 'ticker-item';
                    tickerItem.textContent = continuousText;
                    ticker.innerHTML = '';
                    ticker.appendChild(tickerItem);

                    const tickerWidth = ticker.offsetWidth;
                    const containerWidth = tickerContainer.offsetWidth;

                    return { tickerWidth, containerWidth, html: tickerItem.outerHTML };
                } else {
                    console.warn("No lines to display.");
                    return null;
                }
            })
            .then(({ tickerWidth, containerWidth, html }) => {
                if (html) {
                    const animationDuration = (tickerWidth + containerWidth) / 40; // Adjust speed as needed

                    ticker.innerHTML = html;
                    ticker.style.animation = `ticker ${animationDuration}s linear forwards`;

                    setTimeout(() => {
                        console.log("Animation completed.");
                        ticker.style.animation = 'none';
                    }, animationDuration * 1000);
                }
            })
            .catch(error => console.error('Error fetching text file:', error));
    }

    fetchAndDisplayTicker();
});
