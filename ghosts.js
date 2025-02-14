import { GetTile } from './pacman.js';
import { Maze } from './script.js';

export class Ghost {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.isInPen = true; // Track if the ghost is in the pen

    // Create ghost element
    this.element = document.createElement('div');
    this.element.classList.add('ghost', this.color);

    // Append ghost to tiles
    const tile = GetTile(this.x, this.y);
    if (tile) {
      tile.appendChild(this.element);
    }
  }

  // Move the ghost
  move() {
    const directions = [
      { x: 0, y: -1 }, // Up
      { x: 0, y: 1 }, // Down
      { x: -1, y: 0 }, // Left
      { x: 1, y: 0 }, // Right
    ];

    // Filter out invalid moves (walls, out of bounds)
    const validMoves = directions.filter((dir) => {
      const newX = this.x + dir.x;
      const newY = this.y + dir.y;

      if (
        newX < 0 ||
        newX >= Maze[0].length ||
        newY < 0 ||
        newY >= Maze.length
      ) {
        return false; // Out of bounds
      }

      const tile = Maze[newY][newX];

      // Allow ghosts to pass through the gate (T) when exiting the pen
      if (this.isInPen) {
        return tile === 'T' || tile === ' '; // Only allow gate and empty spaces
      } else {
        return tile !== 'W' && tile !== 'G'; // Avoid walls and ghost pen
      }
    });

    if (validMoves.length > 0) {
      // Choose a random valid move
      const move = validMoves[Math.floor(Math.random() * validMoves.length)];

      // Update ghost's position
      this.x += move.x;
      this.y += move.y;

      // Check if the ghost has exited the pen
      if (this.isInPen && Maze[this.y][this.x] === ' ') {
        this.isInPen = false; // Ghost is now out of the pen
      }

      // Move ghost in the DOM
      this.updatePosition();
    }
  }

  // Update ghost's position in the DOM
  updatePosition() {
    const tile = GetTile(this.x, this.y);
    if (tile) {
      tile.appendChild(this.element);
    }
  }
}

export function createGhosts() {
  const ghosts = [
    new Ghost(10, 11, 'red'), // Blinky
    new Ghost(11, 11, 'pink'), // Pinky
    new Ghost(12, 11, 'cyan'), // Inky
    new Ghost(13, 11, 'orange'), // Clyde
  ];
  return ghosts;
}
