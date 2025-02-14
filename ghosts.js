import { GetTile } from './pacman.js';

export class Ghost {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;

    // Create ghost element
    this.element = document.createElement('div');
    this.element.classList.add('ghost', this.color);

    // Append ghost to tiles
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
