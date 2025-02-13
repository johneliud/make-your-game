import { maze, tileClasses } from "./script.js";

export function createMaze() {
  const grid = document.querySelector('.grid');

  // Clear previous grid before creating a new
  grid.innerHTML = '';

  maze.forEach((row) => {
    row.split('').forEach((cell) => {
      const div = document.createElement('div');
      div.classList.add('tile', tileClasses[cell]);
      grid.appendChild(div);
    });
  });
}
