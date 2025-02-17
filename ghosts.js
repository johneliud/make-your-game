import { maze } from './script.js';
import { getTile } from './pacman.js';

export class Ghost {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.isInPen = true;
    this.frightenedMode = false;

    this.element = document.createElement('div');
    this.element.classList.add('ghost', this.color);

    const tile = getTile(this.x, this.y);
    if (tile) {
      tile.appendChild(this.element);
    }
  }

  move() {
    const directions = [
      { x: 0, y: -1 }, // Up
      { x: 0, y: 1 }, // Down
      { x: -1, y: 0 }, // Left
      { x: 1, y: 0 }, // Right
    ];

    // Filter out invalid moves
    let validMoves = directions.filter((dir) => {
      const newX = this.x + dir.x;
      const newY = this.y + dir.y;

      if (
        newX < 0 ||
        newX >= maze[0].length ||
        newY < 0 ||
        newY >= maze.length
      ) {
        return false;
      }

      const tile = maze[newY][newX];

      if (this.isInPen) {
        return tile === 'T' || tile === ' ';
      } else {
        return tile !== 'W' && tile !== 'G';
      }
    });

    // Prioritize moving away from pacman when frightened
    if (this.frightenedMode && !this.isInPen) {
      const pacman = window.pacman;
      validMoves.sort((a, b) => {
        const distA =
          Math.abs(this.x + a.x - pacman.x) + Math.abs(this.y + a.y - pacman.y);
        const distB =
          Math.abs(this.x + b.x - pacman.x) + Math.abs(this.y + b.y - pacman.y);
        return distB - distA; // Sort in descending order to prefer moves that increase distance
      });
    }

    if (validMoves.length > 0) {
      const move = validMoves[Math.floor(Math.random() * validMoves.length)];
      this.x += move.x;
      this.y += move.y;

      if (this.isInPen && maze[this.y][this.x] === ' ') {
        this.isInPen = false;
      }

      this.updatePosition();
    }
  }

  updateAppearance() {
    if (this.frightenedMode) {
      this.element.classList.add('frightened');
    } else {
      this.element.classList.remove('frightened');
    }
  }

  updatePosition() {
    const tile = getTile(this.x, this.y);
    if (tile) {
      tile.appendChild(this.element);
    }
  }

  updateAppearance() {
    if (this.frightenedMode) {
      this.element.classList.add('frightened');
    } else {
      this.element.classList.remove('frightened');
    }
  }
}

export function createGhosts() {
  return [
    new Ghost(10, 11, 'red'),
    new Ghost(11, 11, 'pink'),
    new Ghost(12, 11, 'cyan'),
    new Ghost(13, 11, 'orange'),
  ];
}
