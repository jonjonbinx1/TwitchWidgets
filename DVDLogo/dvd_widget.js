document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logo');
    const background = document.getElementById('background');
    const bounceCountDisplay = document.getElementById('bounceCount'); // Reference to the bounce count display
    const maxBounceCountDisplay = document.getElementById("maxBounceCount");

    let bounceCount = 0;
    let maxBounceCount = 0;

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
    const pauseDuration = 8000; // Pause duration in milliseconds

    function getRandomColor() {
        return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    }

    function adjustForce(currentForce) {
        // Apply a small random adjustment to the current force
        let adjustment = (Math.random() * 0.5) + 1.5; // Generate a value between 1.5 and 3
        let direction = Math.random() < 0.5 ? -1 : 1; // Randomly choose -1 or 1

        // Adjust the force while keeping the same general path
        return currentForce + (adjustment * direction);
    }
    
    function checkCornerHit() {
        return ((posX <= 0 && posY <= 0) || 
                (posX <= 0 && posY + logoHeight >= screenH) || 
                (posX + logoWidth >= screenW && posY <= 0) || 
                (posX + logoWidth >= screenW && posY + logoHeight >= screenH));
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

        if (posX <= 0) {
            speedX = Math.abs(speedX); // Ensure it moves right
            background.style.backgroundColor = getRandomColor();
            bounceCount++;
            bounceCountDisplay.innerText = `Bounces: ${bounceCount}`; // Update bounce count display
        } else if (posX + logoWidth >= screenW) {
            speedX = -Math.abs(speedX); // Ensure it moves left
            background.style.backgroundColor = getRandomColor();
            bounceCount++;
            bounceCountDisplay.innerText = `Bounces: ${bounceCount}`; // Update bounce count display
        }

        if (posY <= 0) {
            speedY = Math.abs(speedY); // Ensure it moves down
            background.style.backgroundColor = getRandomColor();
            bounceCount++;
            bounceCountDisplay.innerText = `Bounces: ${bounceCount}`; // Update bounce count display
        } else if (posY + logoHeight >= screenH) {
            speedY = -Math.abs(speedY); // Ensure it moves up
            background.style.backgroundColor = getRandomColor();
            bounceCount++;
            bounceCountDisplay.innerText = `Bounces: ${bounceCount}`; // Update bounce count display
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
            bounceCount = 0;
            bounceCountDisplay.innerText = `Bounces: ${bounceCount}`; // Reset bounce count display
            speedX = adjustForce(speedX);
            speedY = adjustForce(speedY);
            return;
        }

        if (bounceCount % 50 === 0 && bounceCount !== 0) {
            // Slightly alter the trajectory
            speedX = adjustForce(speedX);
            speedY = adjustForce(speedY);
        }

        if (bounceCount > maxBounceCount){
            maxBounceCount = bounceCount;
            maxBounceCountDisplay.innerText = `Max This Stream: ${maxBounceCount}`
        }

        background.style.left = posX + 'px';
        background.style.top = posY + 'px';

        requestAnimationFrame(moveLogo);
    }

    moveLogo();
});
