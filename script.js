document.addEventListener('DOMContentLoaded', function () {
    const bobber = document.getElementById('bobber');
    const rodString = document.querySelector('.string');
    const scoreDisplay = document.getElementById('score-display');
    const messageDisplay = document.getElementById('message-display');

    let isCasting = false;
    let isFishCaught = false;
    let score = 0;
    let timer;
    let fishCatchTime;

    function updateScore() {
        scoreDisplay.textContent = 'Score: ' + score;
    }

    function showMessage(message) {
        messageDisplay.textContent = message;
    }

    function resetMessage() {
        messageDisplay.textContent = '';
    }

    function setFishingRodPosition() {
        const rod = document.getElementById('fishing-rod');
        const rodRect = rod.getBoundingClientRect();
        bobber.style.left = rodRect.left + rodRect.width / 2 + 'px';
        bobber.style.top = rodRect.bottom + 'px';
    }

    function castBobber() {
        setFishingRodPosition();

        bobber.style.transition = 'transform 1s ease-in-out, opacity 0.5s ease-in-out';
        rodString.style.transition = 'height 0.8s ease-in-out';

        bobber.style.opacity = '1';
        bobber.style.transform = 'translate(-50%, -50%) translateY(65px)'; // Adjusted position
        rodString.style.height = '100px';
        resetMessage();

        // Simulate a random fish catch after a delay
        timer = setTimeout(() => {
            isFishCaught = true;
            bobber.style.transform = 'translate(-50%, -50%) translateY(50px)';
            fishCatchTime = Date.now();
            showMessage('Fish caught! Press space to retract the rod.');
        }, Math.floor(Math.random() * 5000) + 2000); // Random delay between 2 and 7 seconds
    }

    function retractBobber() {
        setFishingRodPosition();

        bobber.style.transition = 'transform 0.8s ease-in-out, opacity 1s ease-in-out';
        rodString.style.transition = 'height 1s ease-in-out';

        bobber.style.opacity = '0';
        bobber.style.transform = 'translate(-50%, -50%) translateY(0)';
        rodString.style.height = '0';
        clearTimeout(timer);

        if (isFishCaught) {
            isFishCaught = false;
            const reactionTime = Date.now() - fishCatchTime;
            const points = Math.max(0, Math.floor((5000 - reactionTime) / 100)); // Calculate points based on reaction time
            score += points;
            updateScore();
            showMessage(`Fish retrieved! You gained ${points} points.`);
        }
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === ' ') {
            if (!isCasting) {
                isCasting = true;
                castBobber();
            } else {
                isCasting = false;
                retractBobber();
            }
        }
    });

    // Call setFishingRodPosition to set the initial position when the page loads
    setFishingRodPosition();
});
