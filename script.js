let score = 0;
let isRodDropped = false;
let isFishCaught = false;
let isFishEscaped = false;
let fishInterval;

// Define the fish types and their point values
const fishTypes = [
  { type: 'salmon', points: 10 },
  { type: 'tuna', points: 20 },
  { type: 'shark', points: 50 },
];

// Randomly select a fish from the fishTypes array
function getRandomFish() {
  const randomIndex = Math.floor(Math.random() * fishTypes.length);
  return fishTypes[randomIndex];
}

// Add a fish to the fish container
function addFish() {
  const fishContainer = document.getElementById('fishContainer');
  const fish = getRandomFish();

  const fishElement = document.createElement('div');
  fishElement.className = 'fish';
  fishElement.style.backgroundColor = 'blue';
  fishElement.dataset.type = fish.type;
  fishElement.dataset.points = fish.points;

  const containerWidth = fishContainer.offsetWidth - fishElement.offsetWidth;
  const containerHeight = fishContainer.offsetHeight - fishElement.offsetHeight;

  const randomX = Math.floor(Math.random() * containerWidth);
  const randomY = Math.floor(Math.random() * containerHeight);

  fishElement.style.top = randomY + 'px';
  fishElement.style.left = randomX + 'px';

  fishContainer.appendChild(fishElement);

  // Remove the fish when clicked
  fishElement.addEventListener('click', () => {
    if (isFishCaught && !isFishEscaped) {
      fishElement.parentNode.removeChild(fishElement);
      const fishPoints = parseInt(fishElement.dataset.points);
      updateScore(fishPoints);
      updateStatus('Fish Caught!');
      stopFishInterval();
      setTimeout(() => {
        updateStatus('');
        retractFishingRod();
      }, 1000);
    }
  });
}

// Update the score
function updateScore(points) {
  score += points;
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = `Score: ${score}`;
}

// Update the game status
function updateStatus(text) {
  const statusElement = document.getElementById('status');
  statusElement.textContent = text;
}

// Update the visibility of bubbles
function updateBubbles(visible) {
  const bubbles = document.getElementById('bubbles');
  bubbles.style.display = visible ? 'block' : 'none';
}

// Handle the space key press event
function handleKeyPress(event) {
  if (event.keyCode === 32 && !isRodDropped && !isFishCaught) { // Space key
    dropFishingRod();
  } else if (event.keyCode === 32 && isRodDropped && !isFishCaught) { // Space key
    if (!isFishEscaped) {
      updateStatus('Fish Escaped!');
      stopFishInterval();
      isFishEscaped = true;
      setTimeout(() => {
        updateStatus('');
        retractFishingRod();
      }, 1000);
    }
  }
}

// Drop the fishing rod into the water
function dropFishingRod() {
  const fishingRod = document.getElementById('fishingRod');
  fishingRod.style.transform = 'translateY(150px)';
  isRodDropped = true;
  updateBubbles(true);
  setTimeout(() => {
    isFishCaught = true;
    updateStatus('Fish Caught! Retract the rod!');
    setTimeout(() => {
      if (isFishCaught && !isFishEscaped) {
        updateStatus('Fish Escaped!');
        stopFishInterval();
        isFishEscaped = true;
        setTimeout(() => {
          updateStatus('');
          retractFishingRod();
        }, 1000);
      }
    }, 1000);
  }, 2000);
}

// Retract the fishing rod from the water
function retractFishingRod() {
  const fishingRod = document.getElementById('fishingRod');
  fishingRod.style.transform = 'translateY(0)';
  isRodDropped = false;
  isFishCaught = false;
  isFishEscaped = false;
  updateBubbles(false);
}

// Start the fishing game
function startGame() {
  score = 0;
  isRodDropped = false;
  isFishCaught = false;
  isFishEscaped = false;
  clearInterval(fishInterval);

  const fishContainer = document.getElementById('fishContainer');
  fishContainer.innerHTML = '';

  const scoreElement = document.getElementById('score');
  scoreElement.textContent = 'Score: 0';

  const statusElement = document.getElementById('status');
  statusElement.textContent = '';

  document.addEventListener('keydown', handleKeyPress);
}

// Stop the fish interval
function stopFishInterval() {
  clearInterval(fishInterval);
}

// Initiate the fish interval
function startFishInterval() {
  fishInterval = setInterval(addFish, 2000);
}