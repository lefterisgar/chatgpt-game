let score = 0;
let isRodDropped = false;
let fishInterval;
let isFishingRodExtended = false;

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

  // Move the fish randomly within the container
  const moveFish = setInterval(() => {
    const newX = Math.floor(Math.random() * containerWidth);
    const newY = Math.floor(Math.random() * containerHeight);
    fishElement.style.top = newY + 'px';
    fishElement.style.left = newX + 'px';
  }, 1000);

  // Remove the fish when clicked
  fishElement.addEventListener('click', () => {
    clearInterval(moveFish);
    fishElement.parentNode.removeChild(fishElement);
    const fishPoints = parseInt(fishElement.dataset.points);
    updateScore(fishPoints);
  });
}

// Update the score
function updateScore(points) {
  score += points;
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = `Score: ${score}`;
}

// Handle the space key press event
function handleKeyPress(event) {
  if (event.keyCode === 32) { // Space key
    if (!isRodDropped && !isFishingRodExtended) {
      dropFishingRod();
    }
    else if (isRodDropped && isFishingRodExtended) {
      retractFishingRod();
    }
  }
}

// Drop the fishing rod into the water
function dropFishingRod() {
  const fishingRod = document.getElementById('fishingRod');
  fishingRod.style.transform = 'translateY(300px)';
  isRodDropped = true;
  isFishingRodExtended = true;
}

// Retract the fishing rod from the water
function retractFishingRod() {
  const fishingRod = document.getElementById('fishingRod');
  fishingRod.style.transform = 'translateY(0)';
  isRodDropped = false;
  isFishingRodExtended = false;
}

// Start the fishing game
function startGame() {
  score = 0;
  isRodDropped = false;
  isFishingRodExtended = false;
  clearInterval(fishInterval);

  const fishContainer = document.getElementById('fishContainer');
  fishContainer.innerHTML = '<div id="fishingRod"></div>';

  const scoreElement = document.getElementById('score');
  scoreElement.textContent = 'Score: 0';

  document.addEventListener('keypress', handleKeyPress);
}