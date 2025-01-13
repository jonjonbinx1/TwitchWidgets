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
            const formattedLine = line.replace(/</g, "&lt;").replace(/>/g, "&gt;"); // Ensure HTML is not interpreted
            const tickerItem = document.createElement('div');
            tickerItem.className = 'ticker-item';
            tickerItem.textContent = formattedLine + ' |'; // Add pipe at the end
            ticker.innerHTML = '';
            ticker.appendChild(tickerItem);

            // Calculate animation duration to slow down the text
            const tickerWidth = ticker.offsetWidth;
            const containerWidth = document.getElementById('newsContainer').offsetWidth;
            const animationDuration = (tickerWidth + containerWidth) / 50; // Adjust speed as needed
            
            ticker.style.animation = `ticker ${animationDuration}s linear`;
            
            setTimeout(() => {
                currentIndex++;
                displayNextTickerItem();
            }, animationDuration * 1000); // Match interval to the animation time
        } else {
            fetchAndDisplayTicker(); // Fetch new data when all lines have been displayed
        }
    }

    fetchAndDisplayTicker();
});
