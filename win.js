import { intermissionSound } from './sound.js';
import { Maze } from './script.js';

export function checkWinCondition() {
  // Check if all pellets and power pellets are collected
  for (let row of Maze) {
    if (row.includes('P')) {
      return false; // Pellets still exist
    }
  }
  return true; // All pellets are collected
}
