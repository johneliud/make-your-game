export function checkWin(maze) {
  for (let row of maze) {
    if (row.includes('P') || row.includes('X')) {
      return false;
    }
  }
  return true;
}
