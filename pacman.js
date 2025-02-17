import { move } from './events.js';
import { maze } from './script.js';

export class Pacman {
  constructor() {
    this.x = 11;
    this.y = 13;
    this.score = 0;
    this.lives = 3;

    this.element = document.createElement('div');
    this.element.classList.add('pacman');

    const tile = getTile(this.x, this.y);
    if (tile) {
      tile.appendChild(this.element);
    }

    this.initializeControls();
  }

  initializeControls() {
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowUp':
          move('up', maze, this);
          break;
        case 'ArrowDown':
          move('down', maze, this);
          break;
        case 'ArrowLeft':
          move('left', maze, this);
          break;
        case 'ArrowRight':
          move('right', maze, this);
          break;
      }
    });
  }
}

// Get correct tile in the grid
export function getTile(x, y) {
  const grid = document.querySelector('.grid');
  if (grid && grid.children) {
    return grid.children[y * 23 + x];
  }
  return null;
}
