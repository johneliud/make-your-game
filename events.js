import { Maze } from './script.js';
import { GetTile, BufferDir, pacman, clearBuffer } from './pacman.js';
import { pacmanMunchSound, intermissionSound } from './sound.js';
import { checkWinCondition } from './win.js';

export let IsInMotion = false;
let autoMoveInterval = null;

const moves = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};

export function Move(direction) {
  if (autoMoveInterval) {
    clearInterval(autoMoveInterval);
  }

  autoMoveInterval = setInterval(() => {
    console.log(`Direction: ${direction}`)

    if (BufferDir) {
      if (tryMove(BufferDir)) {
        clearBuffer()
        return
      }
    }

    // If no buffer or buffer move failed, try original direction
    if (!direction) {
      clearInterval(autoMoveInterval);
      return;
    }

    if (!tryMove) {
      direction = ''
      console.log('Cleard')
      return
    }

    tryMove(direction);

  }, 200);
}

function tryMove(direction) {
  if (handleTunnelMovement(direction)) {
    return true;
  }
  
  return performMove(direction);
}

function performMove(direction) {
  const [row, col] = moves[direction];
  const moveRow = pacman.y + row;
  const moveCol = pacman.x + col;
  const tile = Maze[moveRow][moveCol];

  if (!validateMove(tile, direction, moveRow, moveCol)) {
    console.log(`Cannot move ${direction} invalid tile`)
    IsInMotion = false;
    return false;
  }

  // Store previous position
  pacman.prevX = pacman.x;
  pacman.prevY = pacman.y;

  // Update position
  pacman.x = moveCol;
  pacman.y = moveRow;

  // Handle pellet collection
  if (Maze[pacman.y][pacman.x] === 'P') {
    collectPellet();
  }

  updatePacmanPosition();
  return true;
}

function collectPellet() {
  pacmanMunchSound.play();
  
  // Remove pellet from maze
  Maze[pacman.y] =
    Maze[pacman.y].substring(0, pacman.x) +
    ' ' +
    Maze[pacman.y].substring(pacman.x + 1);
  
  // Update score
  pacman.score += 10;
  document.getElementById('score').textContent = pacman.score;
  
  // Update visuals
  const currentTile = GetTile(pacman.x, pacman.y);
  if (currentTile) {
    currentTile.classList.remove('path');
    currentTile.classList.add('empty');
  }
  
  // Check win condition
  if (checkWinCondition()) {
    intermissionSound.play();
    document.getElementById('message').textContent = 'You Win!';
    clearInterval(autoMoveInterval);
  }
}

function updatePacmanPosition() {
  IsInMotion = true;
  
  // Clear old position
  const oldTile = GetTile(pacman.prevX, pacman.prevY);
  if (oldTile) {
    oldTile.innerHTML = '';
  }

  // Update new position
  const newTile = GetTile(pacman.x, pacman.y);
  if (newTile) {
    newTile.appendChild(pacman.element);
  }
}

function validateMove(tile, direction, moveRow, moveCol) {
  // Check bounds
  if (moveRow < 0 || moveRow >= Maze.length || 
      moveCol < 0 || moveCol >= Maze[0].length) {
    return false;
  }

  // Check collisions
  if (tile === 'W' || tile === 'G' || 
      (direction === 'down' && tile === 'T')) {
    return false;
  }

  return true;
}

function handleTunnelMovement(direction) {
  if (Maze[pacman.y][pacman.x] === 'O') {
    if (pacman.x === 0 && direction === 'left') {
      pacman.x = Maze[pacman.y].length - 1;
      updatePacmanPosition();
      return true;
    } else if (pacman.x === Maze[pacman.y].length - 1 && direction === 'right') {
      pacman.x = 0;
      updatePacmanPosition();
      return true;
    }
  }
  return false;
}
