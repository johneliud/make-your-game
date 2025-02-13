import { getTile } from './utils.js';

export class Pacman {
  constructor() {
    // Starting position near the center of the maze
    this.x = 11;
    this.y = 13;

    this.score = 0;
    this.lives = 3;

    // Create pacman element
    this.element = document.createElement('div');
    this.element.classList.add('pacman');

    // Append pacman to the correct tile
    const tile = getTile(this.x, this.y);
    if (tile) {
      tile.appendChild(this.element);
    } else {
      console.error('Tile not found for Pacman');
    }
  }
}
