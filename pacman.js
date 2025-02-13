class Pacman {
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
      console.log('Pacman appended to tile:', tile);
    } else {
      console.error('Tile not found for Pacman');
    }
  }
}

// Function to get the correct tile in the grid
function getTile(x, y) {
  const grid = document.querySelector('.grid');
  if (grid && grid.children) {
    return grid.children[y * 23 + x];
  }
  return null;
}
