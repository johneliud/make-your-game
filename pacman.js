import { move } from './events.js';
import { maze } from './script.js';

export class Pacman {
  constructor() {
    this.x = 11;
    this.y = 13;
    this.score = 0;
    this.lives = 3;

    // Create Pac-Man element
    this.element = document.createElement('div');
    this.element.classList.add('pacman');

    // Append Pac-Man to the correct tile
    const tile = getTile(this.x, this.y);
    if (tile) {
      tile.appendChild(this.element);
    }
  }
}

// Function to get the correct tile in the grid
export function getTile(x, y) {
  const grid = document.querySelector('.grid');
  if (grid && grid.children) {
    return grid.children[y * 23 + x];
  }
  return null;
}

const pacman = new Pacman();

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      move('up', maze, pacman);
      break;
    case 'ArrowDown':
      move('down', maze, pacman);
      break;
    case 'ArrowLeft':
      move('left', maze, pacman);
      break;
    case 'ArrowRight':
      move('right', maze, pacman);
      break;
  }
});
