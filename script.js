// Define the fish types and their point values
const fishTypes = [
  { type: 'salmon', points: 10 },
  { type: 'tuna', points: 20 },
  { type: 'shark', points: 50 },
];

let score = 0;

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
  fishElement.style.backgroundColor = fish.type === 'shark' ? 'red' : 'blue';
  fishElement.dataset.type = fish.type;
  fishElement.dataset.points = fish.points;

  fishContainer.appendChild(fishElement);

  // Move the fish randomly within the container
  const containerWidth = fishContainer.offsetWidth - fishElement.offsetWidth;
  const containerHeight = fishContainer.offsetHeight - fishElement.offsetHeight;

  const randomX = Math.floor(Math.random() * containerWidth);
  const randomY = Math.floor(Math.random() * containerHeight);

  fishElement.style.left = randomX + 'px';
  fishElement.style.top = randomY + 'px';

  // Remove the fish after a certain time
  setTimeout(() => {
    fishContainer.removeChild(fishElement);
  }, 2000);
}

// Update the score
function updateScore(points) {
  score += points;
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = `Score: ${score}`;
}

// Handle the fish click event
function fishClicked(event) {
  const fishElement = event.target;
  const fishType = fishElement.dataset.type;
  const fishPoints = parseInt(fishElement.dataset.points);

  fishElement.parentNode.removeChild(fishElement);
  updateScore(fishPoints);
}

// Start the fishing game
function startGame() {
  score = 0;
  const fishContainer = document.getElementById('fishContainer');
  fishContainer.innerHTML = '';
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = 'Score: 0';

  // Add fish every 1 second
  setInterval(addFish, 1000);

  // Add click event listener to each fish
  fishContainer.addEventListener('click', fishClicked);
}
