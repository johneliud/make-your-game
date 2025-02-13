export function Move(direction, maze, pacman) {
    const moves = {
        up: [-1, 0],
        down: [1, 0],
        left: [0, -1],
        right: [0, 1]
    };
    
    const [dx, dy] = moves[direction];
    const newX = pacman.x + dx;
    const newY = pacman.y + dy;

    console.log(maze[pacman])

    //console.log(`Moving ${direction} from (${pacman.x}, ${pacman.y}) to (${newX}, ${newY})`);

    if (maze[newX][newY] === 'W') {
        console.log(`Cannot move ${direction}, there is a wall.`);
        return;
    }

    if (maze[newX][newY] === 'G') {
        console.log(`Cannot move ${direction}, there is a ghost pen.`);
        return;
    }

    if (direction === 'down' && maze[newX][newY] === 'T') {
        console.log(`Cannot move down, there is a ghost gate.`);
        return;
    }
    
    // Update the existing Pacman position
    pacman.x = newX;
    pacman.y = newY;

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
