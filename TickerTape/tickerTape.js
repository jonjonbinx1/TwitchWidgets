document.addEventListener('DOMContentLoaded', () => {
    const ticker = document.getElementById('ticker');
    const fileInput = document.getElementById('fileInput');

    function readFileContent(file) {
        const reader = new FileReader();
        
        reader.onload = (event) => {
            const lines = event.target.result.split('\n');
            ticker.innerHTML = '';

            lines.forEach(line => {
                if (line.trim() !== '') {
                    const tickerItem = document.createElement('div');
                    tickerItem.className = 'ticker-item';
                    tickerItem.textContent = line;
                    ticker.appendChild(tickerItem);
                }
            });

            const clone = ticker.cloneNode(true);
            ticker.appendChild(clone);

            resetTickerAnimation();
        };

        reader.readAsText(file);
    }

    function resetTickerAnimation() {
        ticker.style.animation = 'none';
        ticker.offsetHeight;
        ticker.style.animation = null;
    }

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            readFileContent(file);
        } else {
            console.error('Please select a valid text file.');
        }
    });
});
