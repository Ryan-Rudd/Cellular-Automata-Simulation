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