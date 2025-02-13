// Get the correct tile in the grid
export function getTile(x, y) {
  const grid = document.querySelector('.grid');
  if (grid && grid.children) {
    return grid.children[y * 23 + x];
  }
  return null;
}
