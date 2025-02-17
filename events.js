import { getTile } from './pacman.js';
import { pacmanMunchSound, intermissionSound } from './sound.js';
import { checkWin } from './check_win.js';

let lastDirection = null;
let autoMoveInterval = null;
let bufferedDirection = null;

export function move(direction, maze, pacman) {
  bufferedDirection = direction;

  // Clear any existing auto-move interval
  if (autoMoveInterval) {
    clearInterval(autoMoveInterval);
  }

  // Start auto-moving Pac-Man in the last valid direction
  autoMoveInterval = setInterval(() => {
    if (lastDirection) {
      performMove(lastDirection, maze, pacman);
    }
  }, 200);
}

function performMove(direction, maze, pacman) {
  // Check if the buffered direction is valid
  if (bufferedDirection && canMove(bufferedDirection, maze, pacman)) {
    direction = bufferedDirection;
    lastDirection = direction;
    bufferedDirection = null;
  }

  if (maze[pacman.y][pacman.x] === 'X') {
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

  pacman.prevX = pacman.x;
  pacman.prevY = pacman.y;

  pacman.x = moveCol;
  pacman.y = moveRow;

  // Check if Pacman is on a pellet (P) or power pellet (X)
  if (maze[pacman.y][pacman.x] === 'P' || maze[pacman.y][pacman.x] === 'X') {
    pacmanMunchSound.play();

    // Update the score based on the type of pellet
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

    // Remove the pellet from the DOM
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

  // Move Pacman in the grid
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

  if (
    moveRow < 0 ||
    moveRow >= maze.length ||
    moveCol < 0 ||
    moveCol >= maze[0].length
  ) {
    return false;
  }

  const tile = maze[moveRow][moveCol];

  return !(
    tile === 'W' ||
    tile === 'G' ||
    (direction === 'down' && tile === 'T')
  );
}

function updatePacmanPosition(pacman) {
  // Find the previous tile Pacman was on
  const oldTile = getTile(pacman.prevX, pacman.prevY);
  if (oldTile) {
    oldTile.innerHTML = ''; // Clear previous Pacman from the old tile
  }

  // Find the new tile and move Pacman there
  const newTile = getTile(pacman.x, pacman.y);
  if (newTile) {
    newTile.appendChild(pacman.element);
  }

  // Update previous position
  pacman.prevX = pacman.x;
  pacman.prevY = pacman.y;
}
