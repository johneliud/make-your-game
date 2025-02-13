import { GetTile } from "./pacman.js";

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

    if (moveRow < 0 || moveRow >= maze.length || moveCol < 0 || moveCol >= maze[0].length) {
        console.log(`Cannot move ${direction}, out of bounds.`);
        return;
    }

    if (maze[moveRow][moveCol] === 'W' || maze[moveRow][moveCol] === 'G' || (direction === 'down' && maze[moveRow][moveCol] === 'T')) {
        console.log(`Cannot move ${direction}, invalid tile.`);
        return;
    }

    // Store previous position
    pacman.prevX = pacman.x;
    pacman.prevY = pacman.y;

    // Update Pacman's position
    pacman.x = moveCol;
    pacman.y = moveRow;

    // Move Pacman in the grid
    updatePacmanPosition(pacman);
}

function updatePacmanPosition(pacman) {
    // Find the previous tile Pacman was on
    const oldTile = GetTile(pacman.prevX, pacman.prevY);
    if (oldTile) {
        oldTile.innerHTML = ''; // Clear previous Pacman from the old tile
    }

    // Find the new tile and move Pacman there
    const newTile = GetTile(pacman.x, pacman.y);
    if (newTile) {
        newTile.appendChild(pacman.element);
    }

    // Update previous position
    pacman.prevX = pacman.x;
    pacman.prevY = pacman.y;
}

