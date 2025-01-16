document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logo');
    const background = document.getElementById('background');
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    // Resize the image and the background box
    const logoWidth = 100; // Set your desired width
    const logoHeight = 100; // Set your desired height
    logo.style.width = `${logoWidth}px`;
    logo.style.height = `${logoHeight}px`;
    background.style.width = `${logoWidth}px`;
    background.style.height = `${logoHeight}px`;
    
    let posX = Math.random() * (screenW - logoWidth);
    let posY = Math.random() * (screenH - logoHeight);
    let speedX = 2;
    let speedY = 2;

    function getRandomColor() {
        return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    }

    function moveLogo() {
        posX += speedX;
        posY += speedY;

        if (posX <= 0 || posX + logoWidth >= screenW) {
            speedX = -speedX;
            background.style.backgroundColor = getRandomColor();
        }
        if (posY <= 0 || posY + logoHeight >= screenH) {
            speedY = -speedY;
            background.style.backgroundColor = getRandomColor();
        }

        background.style.left = posX + 'px';
        background.style.top = posY + 'px';

        requestAnimationFrame(moveLogo);
    }

    moveLogo();
});
