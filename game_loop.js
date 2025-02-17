export class GameState {
  constructor() {
    this.isPaused = false;
    this.gameTime = 0;
    this.lastFrameTime = 0;
    this.fps = 0;
    this.frameCount = 0;
    this.LastFpsUpdate = 0;
    this.movementAccumulator = 0;
    this.movementUpdateRate = 1000 / 60;
  }

  static getInstance() {
    if (!GameState.instance) {
      GameState.instance = new GameState();
    }
    return GameState.instance;
  }
}

let gameState = GameState.getInstance();

export function startGameLoop() {
  requestAnimationFrame(gameLoop);
}

function gameLoop(timestamp) {
  if (!gameState.lastFrameTime) {
    gameState.lastFrameTime = timestamp;
  }

  const deltaTime = timestamp - gameState.lastFrameTime;
  gameState.lastFrameTime = timestamp;

  gameState.frameCount++;

  if (timestamp - gameState.LastFpsUpdate >= 1000) {
    gameState.fps = gameState.frameCount;
    gameState.frameCount = 0;
    gameState.LastFpsUpdate = timestamp;
    document.getElementById('fps').textContent = `FPS: ${gameState.fps}`;
  }

  if (!gameState.isPaused) {
    gameState.gameTime += deltaTime;
    updateTimer(gameState.gameTime);

    // Accumulate movement time
    gameState.movementAccumulator += deltaTime;

    // Update movement at fixed intervals
    while (gameState.movementAccumulator >= gameState.movementUpdateRate) {
      updateGame();
      gameState.movementAccumulator -= gameState.movementUpdateRate;
    }
  }

  requestAnimationFrame(gameLoop);
}

function updateGame() {
  if (window.ghosts) {
    window.ghosts.forEach((ghost) => ghost.move());
  }
}

function updateTimer(gameTime) {
  const seconds = Math.floor(gameTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  document.getElementById('timer').textContent = `${minutes
    .toString()
    .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}
