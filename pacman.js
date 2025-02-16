import { Move } from './events.js';
import { Maze } from './script.js';
import { IsInMotion } from './events.js';
import { IsMoved } from './events.js';

export let BufferDir = '';

export class Pacman {
  constructor() {
    // Starting position near the center of the Maze
    this.x = 11;
    this.y = 13;
    
    this.score = 0;
    this.lives = 3;

    // Create pacman element
    this.element = document.createElement('div');
    this.element.classList.add('pacman');

    // Append pacman to the correct tile
    const tile = GetTile(this.x, this.y);
    if (tile) {
      tile.appendChild(this.element);
      console.log('Pacman appended to tile:', tile);
    } else {
      console.error('Tile not found for Pacman');
    }
  }
}

// Function to get the correct tile in the grid
export function GetTile(x, y) {
  const grid = document.querySelector('.grid');
  if (grid && grid.children) {
    return grid.children[y * 23 + x];
  }
  return null;
}

const pacman = new Pacman();

document.addEventListener('keydown', (event) => {
  let dir = '';

  switch (event.key) {
    case 'ArrowUp':
      dir = 'up';
      break;
    case 'ArrowDown':
      dir = 'down';
      break;
    case 'ArrowLeft':
      dir = 'left';
      break;
    case 'ArrowRight':
      dir = 'right';
      break;
    default:
      console.log('Invalid key');
  }

  if (IsInMotion && !IsMoved) {
    BufferDir = dir;
  } else {
    Move(dir, pacman);
    BufferDir =  ''
  }
  
});
