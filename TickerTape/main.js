document.addEventListener('DOMContentLoaded', () => {
    const ticker = document.getElementById('ticker');
    const tickerContainer = document.getElementById('tickerContainer');
    const dataUrl = 'https://jonjonbinx1.github.io/TwitchWidgets/TickerTape/ticker-data.txt'; // Update with your actual URL

    async function fetchAndDisplayTicker() {
        try {
            console.log("Starting to fetch data...");

            const response = await fetch(dataUrl);
            if (!response.ok) {
                throw new Error(`Network response was not OK: ${response.statusText}`);
            }

            const data = await response.text();
            console.log("Fetched Data:", data); // Log fetched data

            ticker.innerHTML = '';

            const lines = data.split('\n').map(line => line.trimStart()).filter(line => line);
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

                const animationDuration = (tickerWidth + containerWidth) / 25; // Faster speed

                // Apply animation with synchronous reflow
                ticker.style.transition = 'none'; // Disable initial transition
                ticker.offsetHeight; // Force synchronous reflow
                ticker.style.transition = ''; // Re-enable transition
                ticker.style.animation = `ticker ${animationDuration}s linear infinite`;
                console.log("Ticker Animation Started Immediately");

                ticker.addEventListener('animationiteration', () => {
                    console.log("Animation Iteration - Continuing");
                    fetchAndDisplayTicker();
                });
            } else {
                console.warn("No lines to display.");
            }
        } catch (error) {
            console.error('Error fetching text file:', error);
        }
    }

    fetchAndDisplayTicker();
    console.log("Fetching Data and Immediately Displaying Ticker..."); 
});
