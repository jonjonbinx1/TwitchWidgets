document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logo');
    const background = document.getElementById('background');
    const screenW = 800;  // Width for the horizontal box
    const screenH = 200;  // Height for the horizontal box

    const logoWidth = 50; // Set the desired logo width
    const logoHeight = 50; // Set the desired logo height
    logo.style.width = `${logoWidth}px`;
    logo.style.height = `${logoHeight}px`;

    background.style.width = `${logoWidth}px`;
    background.style.height = `${logoHeight}px`;

    let posX = Math.random() * (screenW - logoWidth - 10) + 5;
    let posY = Math.random() * (screenH - logoHeight - 10) + 5;
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
