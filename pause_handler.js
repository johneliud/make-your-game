import { GameState } from './game_loop.js';

export function initializePauseMenu() {
  const gameState = GameState.getInstance();
  const pauseMenu = document.getElementById('pauseMenu');
  const continueBtn = document.getElementById('continueBtn');
  const restartBtn = document.getElementById('restartBtn');

  // Pause game on ESC key click
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      togglePause();
    }
  });

  continueBtn.addEventListener('click', () => {
    togglePause();
  });

  restartBtn.addEventListener('click', () => {
    restartGame();
  });

  function togglePause() {
    gameState.isPaused = !gameState.isPaused;
    pauseMenu.classList.toggle('active', gameState.isPaused);
  }

  function restartGame() {
    gameState.gameState = 0;
    gameState.isPaused = false;

    window.pacman.score = 0;
    window.pacman.lives = 3;
    window.pacman.y = 13;
    window.pacman.x = 11;

    window.ghosts.forEach((ghost) => {
      ghost.x = 11 + Math.floor(Math.random() * 3);
      ghost.y = 11;
      ghost.isInPen = true;
      ghost.frightenedMode = false;
      ghost.updateAppearance();
      ghost.updatePosition();
    });

    document.getElementById('score').textContent = '0';
    document.getElementById('lives').textContent = '3';
    document.getElementById('message').textContent = '';
    pauseMenu.classList.remove('active');

    requestAnimationFrame(gameLoop);
  }
}
