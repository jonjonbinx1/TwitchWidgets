document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logo');
    const background = document.getElementById('background');
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    // Resize the image and the background box
    const logoWidth = 15; // Set your desired width
    const logoHeight = 15; // Set your desired height
    logo.style.width = `${logoWidth}px`;
    logo.style.height = `${logoHeight}px`;
    background.style.width = `${logoWidth + 6}px`;  // Adjust for border
    background.style.height = `${logoHeight + 6}px`;  // Adjust for border
    
    let posX = Math.random() * (screenW - logoWidth - 6) + 3;
    let posY = Math.random() * (screenH - logoHeight - 6) + 3;
    let speedX = 2;
    let speedY = 1;

    function getRandomColor() {
        return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    }

    function moveLogo() {
        posX += speedX;
        posY += speedY;

        if (posX <= 3 || posX + logoWidth + 3 >= screenW) {  // Consider border width
            speedX = -speedX;
            background.style.backgroundColor = getRandomColor();
        }
        if (posY <= 3 || posY + logoHeight + 3 >= screenH) {  // Consider border width
            speedY = -speedY;
            background.style.backgroundColor = getRandomColor();
        }

        background.style.left = posX + 'px';
        background.style.top = posY + 'px';

        requestAnimationFrame(moveLogo);
    }

    moveLogo();
});
