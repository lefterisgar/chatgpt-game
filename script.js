document.addEventListener('DOMContentLoaded', function () {
    const bobber = document.getElementById('bobber');
    const rodString = document.querySelector('.string');
    const scoreDisplay = document.getElementById('score-display');
    const messageDisplay = document.getElementById('message-display');
    const timerDisplay = document.getElementById('timer-display');
    const timerBar = document.querySelector('#timer-bar .progress');
    const highestScoreDisplay = document.getElementById('highest-score');
    const fishCatchSound = document.getElementById('fishCatchSound');
    const bobberCastSound = document.getElementById('bobberCastSound');

    let gameTimer; // Variable to store the game timer interval
    let timeLeft = 60; // Set the initial game time in seconds
    let isCasting = false;
    let isFishCaught = false;
    let score = 0;
    let timer;
    let awesomeCatchCount = 0;
    let gameStarted = false;

    // Retrieve the highest score from localStorage
    let highestScore = localStorage.getItem('highestScore');

    if (!highestScore) {
        highestScore = 0;
    }
    
    // Display the highest score in the main menu
    highestScoreDisplay.textContent = `Highest Score: ${highestScore}`;
    
    // Function to update the highest score
    function updateHighestScore() {
        if (score > highestScore) {
                highestScore = score;
                localStorage.setItem('highestScore', highestScore);
                highestScoreDisplay.textContent = `Highest Score: ${highestScore}`;
        }
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `Time left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function updateProgressBar() {
        const progressBarWidth = (timeLeft / 30) * 100; // Calculate the width percentage
        timerBar.style.width = `${progressBarWidth}%`;
    }

    // Function to start the game
    function startGame() {
        // Reset game-related variables and elements
        clearInterval(gameTimer);
        updateScore();
        updateTimerDisplay();
        updateProgressBar();
        setFishingRodPosition();
        resetMessage();
        startGameTimer();

        gameStarted = true;
        isCasting = false;
        isFishCaught = false;

        timerDisplay.style.display = 'block';
        scoreDisplay.style.display = 'block';
    }

    // Function to end the game
    function endGame() {
        retractBobber();

        // Add any game-ending logic here
        showMessage(`Game over! Your final score: ${score}`);

        // Update the highest score
        updateHighestScore();
    
        // Show the main menu with an opening animation
        document.getElementById('main-menu').style.display = 'flex';
        document.getElementById('main-menu').classList.add('opening');

        timerDisplay.style.display = 'none';
        scoreDisplay.style.display = 'none';
        gameStarted = false;
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

        // Play the bobber cast sound
        bobberCastSound.play();

        // Simulate a random fish catch after a delay
        timer = setTimeout(() => {
            isFishCaught = true;
            fishCatchTime = Date.now();
            showMessage('Fish caught! Press space to retract the rod.');
            // Add the animation class to start continuous bouncing
            bobber.classList.add('bounce');

            // Play the fish catch sound
            fishCatchSound.play();
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
        if (gameStarted) {
            if (event.key === ' ') {
                if (!isCasting) {
                    isCasting = true;
                    castBobber();
                } else {
                    isCasting = false;
                    retractBobber();
                }
            }
        }
    });

    // Display the highest score in the main menu
    highestScoreDisplay.textContent = `Highest Score: ${highestScore}`;

    // Call setFishingRodPosition to set the initial position when the page loads
    setFishingRodPosition();

    // Event listener for the Play button
    document.getElementById('play-button').addEventListener('click', function () {
        // Get the position of the main menu
        const menuPosition = document.getElementById('main-menu').getBoundingClientRect();

        document.getElementById('main-menu').classList.remove('opening');

        // Set the closing animation position to the menu position
        document.getElementById('main-menu').style.left = `${menuPosition.left}px`;
        document.getElementById('main-menu').style.top = `${menuPosition.top}px`;

        // Add a class to trigger the closing animation
        document.getElementById('main-menu').classList.add('closing');

        // Wait for the animation to complete, then start the game
        setTimeout(function () {
            // Reset the main menu
            document.getElementById('main-menu').classList.remove('closing');
            document.getElementById('main-menu').style.display = 'none';

            // Start the game
            startGame();
        }, 1000); // Adjust the timeout based on your closing animation duration
    });
});
