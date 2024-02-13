// script.js
// Dynamic background color change every 2 seconds
setInterval(() => {
    console.log('Changing background color...');
    const body = document.body;
    const friendlyColors = ['#a68df7', '#ffa07a', '#98fb98', '#ffcccb'];
    const randomColor = friendlyColors[Math.floor(Math.random() * friendlyColors.length)];
    body.style.backgroundColor = randomColor;
}, 1000);

async function fetchMessages() {
    try {
        const response = await fetch('messages.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
}

const heartsContainer = document.getElementById('heartsContainer');

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heartsContainer.appendChild(heart);

    // Randomize starting position
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    heart.style.left = `${startX}px`;
    heart.style.top = `${startY}px`;

    // Randomize animation duration
    const duration = Math.random() * 2 + 3; // Between 3 and 5 seconds

    // Animate the heart
    heart.style.animation = `float ${duration}s linear infinite, rotate ${duration * 2}s linear`;

    // Remove heart after animation ends
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Create a heart every 2 seconds
setInterval(createHeart, 2000);

async function revealMessage() {
    const messageDisplay = document.getElementById("messageDisplay");
    const heartsContainer = document.getElementById('heartsContainer');
    const messages = await fetchMessages();

    if (messages.length === 0) {
        messageDisplay.textContent = "Oops! Something went wrong.";
        return;
    }

    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];
    messageDisplay.textContent = randomMessage;

    // Create a burst of cute hearts
    createHeartsBurst(heartsContainer, 5); // You can adjust the number of hearts in the burst
}

function createHeartsBurst(container, count) {
    for (let i = 0; i < count; i++) {
        createHeart(container);
    }
}
