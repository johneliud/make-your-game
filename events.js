import { GetTile } from './pacman.js';
import { pacmanMunchSound, intermissionSound } from './sound.js';
import { checkWinCondition } from './win.js';

let lastDirection = null; // Store the last valid direction
let autoMoveInterval = null; // Store the interval for auto-moving

export function Move(direction, maze, pacman) {
  // Store the last valid direction
  lastDirection = direction;

  // Clear any existing auto-move interval
  if (autoMoveInterval) {
    clearInterval(autoMoveInterval);
  }

  // Start auto-moving Pac-Man in the last valid direction
  autoMoveInterval = setInterval(() => {
    if (lastDirection) {
      performMove(lastDirection, maze, pacman);
    }
  }, 200); // Adjust the interval for smoother movement
}

function performMove(direction, maze, pacman) {
  if (maze[pacman.y][pacman.x] === 'O') {
    if (pacman.x === 0) {
      if (direction === 'left') {
        pacman.x = maze[pacman.y].length - 1;
        updatePacmanPosition(pacman);
        return;
      }
    } else if (direction === 'right') {
      pacman.x = 0;
      updatePacmanPosition(pacman);
      return;
    }
  }

  const moves = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1],
  };

  const [row, col] = moves[direction];
  const moveRow = pacman.y + row;
  const moveCol = pacman.x + col;

  if (
    moveRow < 0 ||
    moveRow >= maze.length ||
    moveCol < 0 ||
    moveCol >= maze[0].length
  ) {
    console.log(`Cannot move ${direction}, out of bounds.`);
    return;
  }

  const tile = maze[moveRow][moveCol];

  if (
    tile === 'W' ||
    tile === 'G' ||
    (direction === 'down' && maze[moveRow][moveCol] === 'T')
  ) {
    console.log(`Cannot move ${direction}, invalid tile.`);
    return;
  }

  // Store previous position
  pacman.prevX = pacman.x;
  pacman.prevY = pacman.y;

  // Update Pacman's position
  pacman.x = moveCol;
  pacman.y = moveRow;

  // Check if Pacman is on a pellet (P)
  if (maze[pacman.y][pacman.x] === 'P') {
    // Play munch sound
    pacmanMunchSound.play();

    // Remove the pellet from the maze
    maze[pacman.y] =
      maze[pacman.y].substring(0, pacman.x) +
      ' ' +
      maze[pacman.y].substring(pacman.x + 1);

    // Update the score
    pacman.score += 10;
    document.getElementById('score').textContent = pacman.score;

    // Remove the pellet from the DOM
    const currentTile = GetTile(pacman.x, pacman.y);
    if (currentTile) {
      currentTile.classList.remove('path');
      currentTile.classList.add('empty');
    }

    // Check for win condition
    if (checkWinCondition(maze)) {
      intermissionSound.play();
      document.getElementById('message').textContent = 'You Win!';
      clearInterval(autoMoveInterval); // Stop auto-moving when the game is won
    }
  }

  // Move Pacman in the grid
  updatePacmanPosition(pacman);
}

function updatePacmanPosition(pacman) {
  // Find the previous tile Pacman was on
  const oldTile = GetTile(pacman.prevX, pacman.prevY);
  if (oldTile) {
    oldTile.innerHTML = ''; // Clear previous Pacman from the old tile
  }

  // Find the new tile and move Pacman there
  const newTile = GetTile(pacman.x, pacman.y);
  if (newTile) {
    newTile.appendChild(pacman.element);
  }

  // Update previous position
  pacman.prevX = pacman.x;
  pacman.prevY = pacman.y;
}
