class CELL 
{
    constructor()
    {
        this.STATE = 0;
        this.HAS_NEIGHBOOR = false;
    }

    TOGGLE_CELL_STATE() {
        CELL_STATE_ON_COLOR = "#2b2b2b";
        CELL_STATE_OFF_COLOR = "#ffffff";
        
        if (this.STATE) {
            this.STATE = false; 
            this.COLOR = CELL_STATE_OFF_COLOR;
        } else {
            this.STATE = true;
            this.COLOR = CELL_STATE_ON_COLOR;
        }
    }

    CHECK_STATE()
    {
        return self.STATE;
    }

    CHECK_IF_NEIGHBOOR()
    {
        return self.HAS_NEIGHBOOR;
    }
    
}

function drawMatrixGrid(size_x, size_y) {
    const MATRIX = [];

    for (let y = 0; y < size_y; y++) {
        const row = [];
        for (let x = 0; x < size_x; x++) {
            row.push(0);
        }
        MATRIX.push(row);
    }

    return MATRIX;
}

function formatMatrixGrid(matrix) {
    return matrix.map(row => row.join(', ')).join('\n');
}

function toggleCellIntersectionState({ val_x, val_y, matrix }) {
    try {
        matrix[val_y][val_x] = matrix[val_y][val_x] === 0 ? 1 : 0;
    } catch {
        console.warn('Caught Error: converting cell state');
        return;
    }
}

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// Function to calculate and update canvas dimensions
function updateCanvasDimensions() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    redrawBoard();
}

// Function to redraw the board
function redrawBoard() {
    const tileSize = 20;
    const rows = Math.floor(canvas.height / tileSize);
    const columns = Math.floor(canvas.width / tileSize);

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the tiles
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            drawTile(col, row, tileSize, '#FFFFFF');
        }
    }
}

// Function to draw a single tile
function drawTile(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * size, y * size, size, size);
    ctx.strokeStyle = '#00000038';
    ctx.strokeRect(x * size, y * size, size, size);
}

// Update the canvas dimensions initially and on window resize
updateCanvasDimensions();
window.addEventListener('resize', updateCanvasDimensions);
