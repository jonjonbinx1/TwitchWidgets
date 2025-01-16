document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logo');
    const background = document.getElementById('background');
    const screenW = window.innerWidth - 10; // Adjust for border
    const screenH = window.innerHeight - 10; // Adjust for border

    // Resize the logo
    const logoWidth = 20; // Set your desired width
    const logoHeight = 20; // Set your desired height
    logo.style.width = `${logoWidth}px`;
    logo.style.height = `${logoHeight}px`;

    // Background box width and height to be same as logo
    background.style.width = logo.style.width;
    background.style.height = logo.style.height;
    
    let posX = Math.random() * (screenW - logoWidth - 10) + 5;
    let posY = Math.random() * (screenH - logoHeight - 10) + 5;
    let speedX = 2;
    let speedY = 1;

    function getRandomColor() {
        return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    }

    function moveLogo() {
        posX += speedX;
        posY += speedY;

        if (posX <= 5 || posX + logoWidth >= screenW - 5) {
            speedX = -speedX;
            background.style.backgroundColor = getRandomColor();
        }
        if (posY <= 5 || posY + logoHeight >= screenH - 5) {
            speedY = -speedY;
            background.style.backgroundColor = getRandomColor();
        }

        background.style.left = posX + 'px';
        background.style.top = posY + 'px';

        requestAnimationFrame(moveLogo);
    }

    moveLogo();
});
