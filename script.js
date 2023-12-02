let score = 0;
let isRodDropped = false;
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
  fishElement.style.left = '450px'; // Adjust initial position

  fishContainer.appendChild(fishElement);

  // Move the fish horizontally within the container
  let pos = 450; // Initial position
  const moveFish = setInterval(() => {
    if (pos <= 0) {
      clearInterval(moveFish);
      fishElement.parentNode.removeChild(fishElement);
    } else {
      pos -= 5; // Adjust movement speed
      fishElement.style.left = pos + 'px';
    }
  }, 100);
}

// Handle the fish click event
function fishClicked(event) {
  const fishElement = event.target;
  const fishType = fishElement.dataset.type;
  const fishPoints = parseInt(fishElement.dataset.points);

  fishElement.parentNode.removeChild(fishElement);
  updateScore(fishPoints);
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
    if (!isRodDropped) {
      isRodDropped = true;
      fishInterval = setInterval(addFish, 2000); // Adjust fish appearance interval
    }
    else {
      const fishContainer = document.getElementById('fishContainer');
      const fishElements = fishContainer.getElementsByClassName('fish');

      if (fishElements.length > 0) {
        const nearestFish = fishElements[fishElements.length - 1];

        const rodPosition = 250; // Adjust this value based on the rod position
        const fishPosition = nearestFish.getBoundingClientRect().left;

        if (fishPosition >= rodPosition && fishPosition <= rodPosition + 100) {
          const fishType = nearestFish.dataset.type;
          const fishPoints = parseInt(nearestFish.dataset.points);

          nearestFish.parentNode.removeChild(nearestFish);
          updateScore(fishPoints);
        }
      }
    }
  }
}

// Start the fishing game
function startGame() {
  score = 0;
  isRodDropped = false;
  clearInterval(fishInterval);

  const fishContainer = document.getElementById('fishContainer');
  fishContainer.innerHTML = '';

  const scoreElement = document.getElementById('score');
  scoreElement.textContent = 'Score: 0';

  document.addEventListener('keypress', handleKeyPress);
}