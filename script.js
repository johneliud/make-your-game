import { Pacman } from './pacman.js';
import { createGhosts } from './ghosts.js';

export const maze = [
  'WWWWWWWWWWWWWWWWWWWWWWW',
  'WXPPWPPPPPPPPPPPPPWPPXW',
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
  'WXPPWPPPPPPPPPPPPPWPPXW',
  'WWWWWWWWWWWWWWWWWWWWWWW',
];

const tileClasses = {
  W: 'wall',
  P: 'path',
  G: 'ghost-pen',
  T: 'gate',
  O: 'warp',
  X: 'power-pellet',
};

const grid = document.querySelector('.grid');
maze.forEach((row) => {
  row.split('').forEach((cell) => {
    const div = document.createElement('div');
    div.classList.add('tile', tileClasses[cell]);
    grid.appendChild(div);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  window.pacman = new Pacman();
  window.ghosts = createGhosts();

  setInterval(() => {
    window.ghosts.forEach((ghost) => ghost.move());
  }, 500);
});
