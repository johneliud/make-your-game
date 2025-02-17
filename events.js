import { getTile } from './pacman.js';
import {
  pacmanMunchSound,
  intermissionSound,
  deathSound,
  eatingGhostSound,
} from './sound.js';
import { checkWinCondition } from './win.js';

let lastDirection = null;
let autoMoveInterval = null;

export function move(direction, maze, pacman) {
  lastDirection = direction;

  if (autoMoveInterval) {
    clearInterval(autoMoveInterval);
  }

  autoMoveInterval = setInterval(() => {
    if (lastDirection) {
      performMove(lastDirection, maze, pacman);
    }
  }, 200);
}

function performMove(direction, maze, pacman) {
  if (maze[pacman.y][pacman.x] === 'O') {
    if (pacman.x === 0 && direction === 'left') {
      pacman.x = maze[pacman.y].length - 1;
      updatePacmanPosition(pacman);
      return;
    } else if (
      pacman.x === maze[pacman.y].length - 1 &&
      direction === 'right'
    ) {
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
    return;
  }

  const tile = maze[moveRow][moveCol];

  if (
    tile === 'W' ||
    tile === 'G' ||
    (direction === 'down' && maze[moveRow][moveCol] === 'T')
  ) {
    return;
  }

  pacman.prevX = pacman.x;
  pacman.prevY = pacman.y;
  pacman.x = moveCol;
  pacman.y = moveRow;

  if (maze[pacman.y][pacman.x] === 'P' || maze[pacman.y][pacman.x] === 'X') {
    pacmanMunchSound.play();

    maze[pacman.y] =
      maze[pacman.y].substring(0, pacman.x) +
      ' ' +
      maze[pacman.y].substring(pacman.x + 1);

    pacman.score += maze[pacman.y][pacman.x] === 'P' ? 10 : 50;
    document.getElementById('score').textContent = pacman.score;

    const currentTile = getTile(pacman.x, pacman.y);
    if (currentTile) {
      currentTile.classList.remove('path', 'power-pellet');
      currentTile.classList.add('empty');
    }

    if (checkWinCondition(maze)) {
      intermissionSound.play();
      document.getElementById('message').textContent = 'You Win!';
      clearInterval(autoMoveInterval);
    }
  }

  updatePacmanPosition(pacman);

  window.ghosts.forEach((ghost) => {
    if (ghost.x === pacman.x && ghost.y === pacman.y) {
      if (ghost.frightenedMode) {
        eatingGhostSound.play();
        ghost.x = 10;
        ghost.y = 11;
        ghost.updatePosition();
        pacman.score += 200;
        document.getElementById('score').textContent = pacman.score;
      } else {
        deathSound.play();
        pacman.lives--;
        document.getElementById('lives').textContent = pacman.lives;
        if (pacman.lives === 0) {
          document.getElementById('message').textContent = 'Game Over!';
          clearInterval(autoMoveInterval);
        } else {
          pacman.x = 11;
          pacman.y = 13;
          window.ghosts.forEach((ghost) => {
            ghost.x = 10;
            ghost.y = 11;
            ghost.updatePosition();
          });
        }
      }
    }
  });
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

  pacman.prevX = pacman.x;
  pacman.prevY = pacman.y;
}
