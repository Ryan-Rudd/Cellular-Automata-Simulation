const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const tileSize = 40;
const rows = canvas.height / tileSize;
const columns = canvas.width / tileSize;

// Draw the tiles
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
        drawTile(col, row, tileSize, '#CCCCCC');
    }
}

// Function to draw a single tile
function drawTile(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * size, y * size, size, size);
    ctx.strokeStyle = '#000000';
    ctx.strokeRect(x * size, y * size, size, size);
}