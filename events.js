import { getTile } from './pacman.js';
import { pacmanMunchSound, intermissionSound } from './sound.js';
import { checkWin } from './check_win.js';

let lastDirection = null;
let autoMoveInterval = null;
let bufferedDirection = null;

export function move(direction, maze, pacman) {
  if (canMove(direction, maze, pacman)) {
    lastDirection = direction;
    performMove(direction, maze, pacman);
  } else {
    // Store direction as buffered if we cannot move in that direction immediately
    bufferedDirection = direction;
  }

  if (autoMoveInterval) {
    clearInterval(autoMoveInterval);
  }

  autoMoveInterval = setInterval(() => {
    // Try the buffered direction if it exists
    if (bufferedDirection && canMove(bufferedDirection, maze, pacman)) {
      lastDirection = bufferedDirection;
      performMove(bufferedDirection, maze, pacman);
      bufferedDirection = null;
    }
    // Continue in the last valid direction
    else if (lastDirection && canMove(lastDirection, maze, pacman)) {
      performMove(lastDirection, maze, pacman);
    }
  }, 200);
}

function performMove(direction, maze, pacman) {
  if (maze[pacman.y][pacman.x] === 'O') {
    if (pacman.x === 1 && direction === 'left') {
      pacman.x = maze[pacman.y].length - 2;
      updatePacmanPosition(pacman);
      return;
    } else if (
      pacman.x === maze[pacman.y].length - 2 &&
      direction === 'right'
    ) {
      pacman.x = 1;
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

  // Store previous position before moving
  pacman.prevX = pacman.x;
  pacman.prevY = pacman.y;

  // Update position
  pacman.x = moveCol;
  pacman.y = moveRow;

  // Handle pellet collection
  if (maze[pacman.y][pacman.x] === 'P' || maze[pacman.y][pacman.x] === 'X') {
    pacmanMunchSound.play();

    if (maze[pacman.y][pacman.x] === 'P') {
      pacman.score += 10;
    } else if (maze[pacman.y][pacman.x] === 'X') {
      pacman.score += 50;
    }

    // Remove the pellet from the maze
    maze[pacman.y] =
      maze[pacman.y].substring(0, pacman.x) +
      ' ' +
      maze[pacman.y].substring(pacman.x + 1);

    // Update the score display
    document.getElementById('score').textContent = pacman.score;

    // Update tile appearance
    const currentTile = getTile(pacman.x, pacman.y);
    if (currentTile) {
      currentTile.classList.remove('path', 'power-pellet');
      currentTile.classList.add('empty');
    }

    // Check for win condition
    if (checkWin(maze)) {
      intermissionSound.play();
      document.getElementById('message').textContent = 'You Win!';
      clearInterval(autoMoveInterval);
    }
  }

  // Update Pacman's position in the grid
  updatePacmanPosition(pacman);
}

function canMove(direction, maze, pacman) {
  const moves = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1],
  };

  const [row, col] = moves[direction];
  const moveRow = pacman.y + row;
  const moveCol = pacman.x + col;

  // Check bounds
  if (
    moveRow < 0 ||
    moveRow >= maze.length ||
    moveCol < 0 ||
    moveCol >= maze[0].length
  ) {
    return false;
  }

  const tile = maze[moveRow][moveCol];

  // Allow movement through warp tiles
  if (tile === 'O') return true;

  // Check for walls and other obstacles
  return !(
    tile === 'W' ||
    tile === 'G' ||
    (direction === 'down' && tile === 'T')
  );
}

function updatePacmanPosition(pacman) {
  const oldTile = getTile(pacman.prevX, pacman.prevY);
  if (oldTile) {
    oldTile.innerHTML = '';
  }

  const newTile = getTile(pacman.x, pacman.y);
  if (newTile) {
    newTile.appendChild(pacman.element);
  }
}
