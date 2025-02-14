import { GetTile } from './pacman.js';
import { pacmanMunchSound, intermissionSound } from './sound.js';
import { checkWinCondition } from './win.js';
import { BufferDir } from './pacman.js';  
import { Maze } from './script.js';

const moves = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};

let lastDirection = null; // Store the last valid direction
let autoMoveInterval = null; // Store the interval for auto-moving
export let IsInMotion = false;
export let IsMoved = false;

export function Move(direction, pacman) {
  // Store the last valid direction
  lastDirection = direction;

  // Clear any existing auto-move interval
  if (autoMoveInterval) {
    clearInterval(autoMoveInterval);
  }

  // Start auto-moving Pac-Man in the last valid direction
  autoMoveInterval = setInterval(() => {
    if (lastDirection) {
      performMove(lastDirection, pacman);
    }
  }, 200); // Adjust the interval for smoother movement
}


function performMove(direction, pacman) {
  if (Maze[pacman.y][pacman.x] === 'O') {
    if (pacman.x === 0) {
      if (direction === 'left') {
        pacman.x = Maze[pacman.y].length - 1;
        updatePacmanPosition(pacman);
        return;
      }
    } else if (direction === 'right') {
      pacman.x = 0;
      updatePacmanPosition(pacman);
      return;
    }
  }

  const [row, col] = moves[direction];
  const moveRow = pacman.y + row;
  const moveCol = pacman.x + col;
  const tile = Maze[moveRow][moveCol];

  if (!validateMove(tile, direction, moveRow, moveCol)) {
    return
  }

  // Store previous position
  pacman.prevX = pacman.x;
  pacman.prevY = pacman.y;

  // Update Pacman's position
  pacman.x = moveCol;
  pacman.y = moveRow;

  // Check if Pacman is on a pellet (P)
  if (Maze[pacman.y][pacman.x] === 'P') {
    // Play munch sound
    pacmanMunchSound.play();

    // Remove the pellet from the Maze
    Maze[pacman.y] =
      Maze[pacman.y].substring(0, pacman.x) +
      ' ' +
      Maze[pacman.y].substring(pacman.x + 1);

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
    if (checkWinCondition()) {
      intermissionSound.play();
      document.getElementById('message').textContent = 'You Win!';
      clearInterval(autoMoveInterval); // Stop auto-moving when the game is won
    }
  }

  // Move Pacman in the grid
  IsMoved = true;
  updatePacmanPosition(pacman);
}

function updatePacmanPosition(pacman) {
  IsInMotion = true;
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


function validateMove(tile, direction, moveRow, moveCol) {
  if (
    moveRow < 0 ||
    moveRow >= Maze.length ||
    moveCol < 0 ||
    moveCol >= Maze[0].length
  ) {
    console.log(`Cannot move ${direction}, out of bounds.`);
    return false;
  }

  if (
    tile === 'W' ||
    tile === 'G' ||
    (direction === 'down' && Maze[moveRow][moveCol] === 'T')
  ) {
    console.log(`Cannot move ${direction}, invalid tile.`);
    return false;
  }

  return true;
}