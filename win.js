import { intermissionSound } from './sound.js';

export function checkWinCondition(maze) {
  // Check if all pellets and power pellets are collected
  for (let row of maze) {
    if (row.includes('P')) {
      return false; // Pellets still exist
    }
  }
  intermissionSound.play();
  return true; // All pellets are collected
}
