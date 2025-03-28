document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.querySelector('.floating-items-container'); // Renamed container
    // Increase interval slightly to reduce density now that we have two item types
    const creationInterval = 650; // Milliseconds between creating a new item (heart or cat)
    const catEmojis = ['🐱', '🐈', '😻', '🐾']; // Add paw print for variety

    // --- Function to create a floating heart ---
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤'; // Heavy heart symbol

        setupFloatingItem(heart); // Use common setup function

        itemsContainer.appendChild(heart);
        removeElementAfterAnimation(heart, heart.style.animationDuration);
    }

    // --- Function to create a floating cat ---
    function createCat() {
        const cat = document.createElement('div');
        cat.classList.add('cat');
        // Select a random cat emoji from the list
        cat.innerHTML = catEmojis[Math.floor(Math.random() * catEmojis.length)];

        setupFloatingItem(cat, true); // Pass 'true' to indicate it's a cat for potentially smaller size

        itemsContainer.appendChild(cat);
        removeElementAfterAnimation(cat, cat.style.animationDuration);
    }

    // --- Common setup function for positioning and animation ---
    function setupFloatingItem(element, isCat = false) {
        // Randomize starting position (along the bottom edge)
        element.style.left = `${Math.random() * 100}vw`;

        // Randomize animation duration (how long it takes to float up)
        const duration = Math.random() * 6 + 8; // Between 8 and 14 seconds
        element.style.animationDuration = `${duration}s`;

        // Randomize size (make cats slightly smaller on average)
        let baseSize = isCat ? 8 : 10; // Cats start at 8px, hearts at 10px
        let sizeRange = isCat ? 10 : 12; // Cats vary by 10px, hearts by 12px
        const size = Math.random() * sizeRange + baseSize; // e.g. Cats: 8-18px, Hearts: 10-22px
        element.style.fontSize = `${size}px`;

        // Randomize animation delay (stagger the start)
        element.style.animationDelay = `${Math.random() * 3}s`; // Increased delay range slightly
    }

    // --- Function to remove element after animation ---
    function removeElementAfterAnimation(element, durationString) {
        const durationInMs = parseFloat(durationString.replace('s', '')) * 1000;
        const delayInMs = parseFloat(element.style.animationDelay.replace('s', '')) * 1000;
        // Remove after duration + delay + a small buffer
        setTimeout(() => {
            element.remove();
        }, durationInMs + delayInMs + 500);
    }

    // --- Periodically create either a heart or a cat ---
    setInterval(() => {
        // Adjust the probability (e.g., 60% hearts, 40% cats)
        if (Math.random() < 0.6) {
            createHeart();
        } else {
            createCat();
        }
    }, creationInterval);

    // Optional: Create an initial burst of items on load
    for (let i = 0; i < 15; i++) {
         const delay = Math.random() * 1000;
         setTimeout(() => {
            if (Math.random() < 0.6) {
                createHeart();
            } else {
                createCat();
            }
         }, delay); // Stagger initial burst
    }
});