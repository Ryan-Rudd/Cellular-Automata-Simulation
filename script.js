let size = 200;
let interval;
let grid = Array(size).fill().map(() => Array(size).fill(0).map(() => Math.round(Math.random())));

function countAliveNeighbours(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i == 0 && j == 0)
                continue;
            if (x + i < 0 || y + j < 0 || x + i >= size || y + j >= size)
                continue;
            if (grid[x + i][y + j] == 1)
                count++;
        }
    }
    return count;
}

function step() {
    let newGrid = JSON.parse(JSON.stringify(grid));
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            let aliveNeighbours = countAliveNeighbours(x, y);
            if (grid[x][y] == 1) {
                if (aliveNeighbours < 2 || aliveNeighbours > 3)
                    newGrid[x][y] = 0;
            } else {
                if (aliveNeighbours == 3)
                    newGrid[x][y] = 1;
            }
        }
    }
    grid = newGrid;
    drawGrid();
}

function drawGrid() {
    let gridElement = document.getElementById('grid');
    gridElement.innerHTML = '';
    for(let x = 0; x < size; x++) {
        for(let y = 0; y < size; y++) {
            let cell = document.createElement('div');
            cell.className = 'cell ' + (grid[x][y] == 1 ? 'alive' : 'dead');
            cell.dataset.x = x;
            cell.dataset.y = y;
            gridElement.appendChild(cell);
        }
    }
}

window.onload = function() {
    drawGrid();
    interval = setInterval(step, 200);
}
