import { Move } from './events.js';
import { IsInMotion } from './events.js';

export let BufferDir = '';
const GRID_WIDTH = 23;

export class Pacman {
  constructor() {
    this.x = 11;
    this.y = 13;
    this.prevX = 11;
    this.prevY = 13;
    this.score = 0;
    this.lives = 3;
    this.element = this.createPacmanElement();
  }

  createPacmanElement() {
    const element = document.createElement('div');
    element.classList.add('pacman');
    const tile = GetTile(this.x, this.y);
    if (tile) {
      tile.appendChild(element);
    } else {
      console.error('Starting tile not found for Pacman');
    }
    return element;
  }
}

export function GetTile(x, y) {
  const grid = document.querySelector('.grid');
  if (grid?.children) {
    return grid.children[y * GRID_WIDTH + x];
  }
  return null;
}

export const pacman = new Pacman();

// Handle keyboard input
document.addEventListener('keydown', (event) => {
  const keyMap = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right'
  };
  
  const dir = keyMap[event.key];
  if (!dir) return;

  if (IsInMotion && BufferDir === '') {
    BufferDir = dir;
  } else {
    Move(dir);
  }
});

export function clearBuffer() {
  BufferDir = ''
  return BufferDir
}
