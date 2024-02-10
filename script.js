document.addEventListener('DOMContentLoaded', function() {
    let isAnimating = false; // Flag to prevent animation restart while running

    document.getElementById('startButton').addEventListener('click', function() {
        if (isAnimating) return; // Exit if an animation is currently in progress
        isAnimating = true; // Set flag to indicate animation is in progress

        // Start playing the audio
        const audioElement = document.getElementById('audioElement');
        audioElement.currentTime = 0; // Reset audio to start to ensure it plays from the beginning
        audioElement.play();

        document.getElementById('svgContainer').style.visibility = 'visible'; // Ensure the SVG is visible

        let changeCount = 0; // Initialize counter for the color changes
        const st0Element = document.querySelector('.st0'); // Select the .st0 element
        const originalColor = st0Element.style.fill; // Store the original color to reset later
        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF']; // Color cycle
        
        // Function to change color
        function changeColor() {
            if (changeCount < 4) { // Check to ensure we only change colors four times
                st0Element.style.fill = colors[changeCount];
                changeCount++;
            } else {
                clearInterval(colorChangeInterval); // Clear the color changing interval
                startFlashing(); // Start flashing after the last color change
            }
        }

        // Start changing colors every 30 seconds
        const colorChangeInterval = setInterval(changeColor, 30000);
        changeColor(); // Invoke immediately to change without waiting

        // Function to start flashing
        function startFlashing() {
            let flashCount = 0;
            const flashInterval = setInterval(() => {
                st0Element.style.fill = st0Element.style.fill === 'none' ? colors[changeCount - 1 % colors.length] : 'none';
                flashCount++;
                if (flashCount >= 10) { // 10 toggles for 5 flashes
                    clearInterval(flashInterval); // Stop flashing
                    st0Element.style.fill = originalColor; // Reset to the original color
                    isAnimating = false; // Reset flag to allow animation to be restarted
                }
            }, 200); // Flash every 200ms
        }
    });
});
