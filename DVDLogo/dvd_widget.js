document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logo');
    const background = document.getElementById('background');
    const screenW = 800;  // Width for the horizontal box
    const screenH = 200;  // Height for the horizontal box

    const logoWidth = 75; // Set the desired logo width
    const logoHeight = 75; // Set the desired logo height
    logo.style.width = `${logoWidth}px`;
    logo.style.height = `${logoHeight}px`;

    background.style.width = `${logoWidth}px`;
    background.style.height = `${logoHeight}px`;

    let posX = Math.random() * (screenW - logoWidth - 10) + 5;
    let posY = Math.random() * (screenH - logoHeight - 10) + 5;
    let speedX = 2;
    let speedY = 2;
    const pauseDuration = 1000; // Pause duration in milliseconds

    function getRandomColor() {
        return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    }

    function checkCornerHit() {
        return ((posX <= 0 && posY <= 0) || 
                (posX <= 0 && posY + logoHeight >= screenH - 1) || 
                (posX + logoWidth >= screenW - 1 && posY <= 0) || 
                (posX + logoWidth >= screenW - 1 && posY + logoHeight >= screenH - 1));
    }

    function triggerConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
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

        if (checkCornerHit()) {
            triggerConfetti();
            // Pause before restarting
            setTimeout(() => {
                posX = Math.random() * (screenW - logoWidth - 10) + 5;
                posY = Math.random() * (screenH - logoHeight - 10) + 5;
                background.style.backgroundColor = getRandomColor();
                moveLogo();
            }, pauseDuration);
            return;
        }

        background.style.left = posX + 'px';
        background.style.top = posY + 'px';

        requestAnimationFrame(moveLogo);
    }

    moveLogo();
});
