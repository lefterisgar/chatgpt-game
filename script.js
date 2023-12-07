document.addEventListener('DOMContentLoaded', function () {
    const bobber = document.getElementById('bobber');
    const rodString = document.querySelector('.string');
    const scoreDisplay = document.getElementById('score-display');
    const messageDisplay = document.getElementById('message-display');
    const timerDisplay = document.getElementById('timer-display');
    const timerBar = document.querySelector('#timer-bar .progress');

    let gameTimer; // Variable to store the game timer interval
    let timeLeft = 60; // Set the initial game time in seconds

    let isCasting = false;
    let isFishCaught = false;
    let score = 0;
    let timer;
    let awesomeCatchCount = 0;
    let gameStarted = false;

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function updateProgressBar() {
        const progressBarWidth = (timeLeft / 30) * 100; // Calculate the width percentage
        timerBar.style.width = `${progressBarWidth}%`;
    }

    function startGameTimer() {
        gameTimer = setInterval(function () {
            timeLeft--;

            if (timeLeft < 0) {
                endGame();
            } else {
                updateTimerDisplay();
                updateProgressBar();
            }
        }, 1000); // Update every second
    }

    function endGame() {
        retractBobber();
        gameStarted = false;
        // Add any game-ending logic here
        showMessage(`Game over! Your final score: ${score}`);
        // You may want to reset the game or display a "Play Again" option.
    }

    function resetGame() {
        clearInterval(gameTimer);
        isCasting = false;
        isFishCaught = false;
        score = 0;
        timeLeft = 30; // Set your initial game time here
        updateScore();
        updateTimerDisplay();
        updateProgressBar();
        setFishingRodPosition();
        resetMessage();
    }

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
 
    // Modify castBobber to add the bounce class and initiate the animation
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
            fishCatchTime = Date.now();
            showMessage('Fish caught! Press space to retract the rod.');
            // Add the animation class to start continuous bouncing
            bobber.classList.add('bounce');
        }, Math.floor(Math.random() * 5000) + 2000); // Random delay between 2 and 7 seconds
    }

    function retractBobber() {
        // Remove the animation class to stop continuous bouncing
        bobber.classList.remove('bounce');
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
            if (points >= 43) awesomeCatchCount++;
            if (awesomeCatchCount == 3) {
                awesomeCatchCount = 0;
                timeLeft += 20;
                if (timeLeft > 40) timeLeft = 40;
            }
            score += points;
            updateScore();
            showMessage(`Fish retrieved! You gained ${points} points.`);
        }
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === ' ') {
            if (!gameStarted) {
                resetGame();
                gameStarted = true;
                startGameTimer();
            }

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
