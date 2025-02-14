import { Pacman } from './pacman.js';

export const Maze = [
  'WWWWWWWWWWWWWWWWWWWWWWW',
  'WPPPWPPPPPPPPPPPPPWPPPW',
  'WPWPWPWWWWWPWWWWWPWPWPW',
  'WPPPPPPPWPPPPPWPPPPPPPW',
  'WWWPWPWPWPWWWPWPWPWPWWW',
  'WPPPWPWPWPW WPWPWPWPPPW',
  'WPWPWPWPWPWWWPWPWPWPWPW',
  'WPPPWPWPPPPPPPPPWPWPPPW',
  'WWWWWPWPWWWWWWWPWPWWWWW',
  'WPPPPPWPPPPPPPPPWPPPPPW',
  'WPWWWWWPGGGTGGGPWWWWWPW',
  'OPPPPPPPG     GPPPPPPPO',
  'WPWWWWWPGGGGGGGPWWWWWPW',
  'WPPPPPWPPPPPPPPPWPPPPPW',
  'WWWWWPWPWWWWWWWPWPWWWWW',
  'WPPPWPWPPPPPPPPPWPWPPPW',
  'WPWPWPWPWPWWWPWPWPWPWPW',
  'WPPPWPWPWPW WPWPWPWPPPW',
  'WWWPWPWPWPWWWPWPWPWPWWW',
  'WPPPPPPPWPPPPPWPPPPPPPW',
  'WPWPWPWWWWWPWWWWWPWPWPW',
  'WPPPWPPPPPPPPPPPPPWPPPW',
  'WWWWWWWWWWWWWWWWWWWWWWW',
];

const tileClasses = {
  W: 'wall',
  P: 'path',
  G: 'ghost-pen',
  T: 'gate',
  O: 'warp',
};

const grid = document.querySelector('.grid');
Maze.forEach((row) => {
  row.split('').forEach((cell) => {
    const div = document.createElement('div');
    div.classList.add('tile', tileClasses[cell]);
    grid.appendChild(div);
  });
});

function createMaze() {
  const grid = document.querySelector('.grid');

  // Clear previous grid before creating a new
  grid.innerHTML = '';
  Maze.forEach((row) => {
    row.split('').forEach((cell) => {
      const div = document.createElement('div');
      div.classList.add('tile', tileClasses[cell]);
      grid.appendChild(div);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  createMaze();
  window.Pacman = new Pacman();
  const pacman = new Pacman();
  console.log('Pacman created at:', pacman.x, pacman.y);
});
