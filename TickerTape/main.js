document.addEventListener('DOMContentLoaded', () => {
    const ticker = document.getElementById('ticker');
    const dataUrl = 'https://jonjonbinx1.github.io/TwitchWidgets/ticker-data.txt'; // Update with your actual URL

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

                // Split lines and join them with pipes
                const lines = data.split('\n').filter(line => line.trim() !== '');
                const continuousText = lines.join(' | ');

                // Create ticker item and set text content with safe plain text
                const tickerItem = document.createElement('div');
                tickerItem.className = 'ticker-item';
                tickerItem.textContent = continuousText;
                ticker.appendChild(tickerItem);

                // Calculate and apply animation duration based on text length
                const tickerWidth = ticker.offsetWidth;
                const containerWidth = document.getElementById('newsContainer').offsetWidth;
                const animationDuration = (tickerWidth + containerWidth) / 20; // Adjust speed as needed
                
                ticker.style.animation = `ticker ${animationDuration}s linear infinite`;
            })
            .catch(error => {
                console.error('Error fetching text file:', error);
            });
    }

    // Initial fetch and display
    fetchAndDisplayTicker();
});
