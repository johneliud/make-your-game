export function Move(direction, maze, pacman) {
    const moves = {
        up: [-1, 0],
        down: [1, 0],
        left: [0, -1],
        right: [0, 1]
    };
    
    const [row, col] = moves[direction];
    const moveRow = pacman.y + row;
    const moveCol = pacman.x + col;

    console.log(`Moving ${direction} from (${pacman.x}, ${pacman.y}) to (${moveCol}, ${moveRow}) got  ${maze[moveRow][moveCol]}`);

    if (maze[moveRow][moveCol] === 'W') {
        console.log(`Cannot move ${direction}, there is a wall.`);
        return;
    }

    if (maze[moveRow][moveCol] === 'G') {
        console.log(`Cannot move ${direction}, there is a ghost pen.`);
        return;
    }

    if (direction === 'down' && maze[moveRow][moveCol] === 'T') {
        console.log(`Cannot move down, there is a ghost gate.`);
        return;
    }
    
    // Update the existing Pacman position
    pacman.x = moveCol;
    pacman.y = moveRow;

    // Move the Pacman element in the grid
    updatePacmanPosition(pacman);
}

// Function to update Pacman's position in the grid
function updatePacmanPosition(pacman) {
    const newTile = getTile(pacman.x, pacman.y);
    if (newTile) {
        newTile.appendChild(pacman.element);
    }
}
