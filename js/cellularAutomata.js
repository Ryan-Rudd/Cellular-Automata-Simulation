class CELL {
    constructor() {
      this.STATE = 0;
      this.NEXT_STATE = 0;
      this.HAS_NEIGHBOR = false;
      this.COLOR = "#ffffff";
      this.TRANSITION_DURATION = 500; // Transition duration in milliseconds
      this.transitionStartTime = null;
      this.isTransitioning = false;
    }
  
    TOGGLE_CELL_STATE() {
      const CELL_STATE_ON_COLOR = "#2b2b2b";
      const CELL_STATE_OFF_COLOR = "#ffffff";
  
      if (this.STATE) {
        this.STATE = 0;
        this.COLOR = CELL_STATE_OFF_COLOR;
      } else {
        this.STATE = 1;
        this.COLOR = CELL_STATE_ON_COLOR;
      }
    }
  
    CHECK_STATE() {
      return this.STATE;
    }
  
    CHECK_IF_NEIGHBOR() {
      return this.HAS_NEIGHBOR;
    }
  
    SET_NEXT_STATE(nextState) {
      this.NEXT_STATE = nextState;
      this.startTransition();
    }
  
    UPDATE_STATE() {
      this.STATE = this.NEXT_STATE;
      this.isTransitioning = false;
    }
  
    startTransition() {
      this.transitionStartTime = performance.now();
      this.isTransitioning = true;
    }
  
    isTransitionInProgress() {
      if (!this.isTransitioning) {
        return false;
      }
      const elapsedTime = performance.now() - this.transitionStartTime;
      return elapsedTime < this.TRANSITION_DURATION;
    }
  
    calculateTransitionProgress() {
      const elapsedTime = performance.now() - this.transitionStartTime;
      return Math.min(elapsedTime / this.TRANSITION_DURATION, 1);
    }
  
    getTransitionedColor(targetColor) {
      const progress = this.calculateTransitionProgress();
      const currentColor = this.COLOR;
  
      // Convert hex color values to RGB
      const currentRGB = hexToRGB(currentColor);
      const targetRGB = hexToRGB(targetColor);
  
      // Calculate the transitioned color
      const transitionedRGB = [];
      for (let i = 0; i < 3; i++) {
        transitionedRGB[i] = Math.round(
          currentRGB[i] + (targetRGB[i] - currentRGB[i]) * progress
        );
      }
  
      // Convert RGB back to hex color
      return RGBToHex(transitionedRGB);
    }
  }
  
  function hexToRGB(hexColor) {
    const hex = hexColor.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return [r, g, b];
  }
  
  function RGBToHex(rgbColor) {
    const r = Math.round(rgbColor[0]);
    const g = Math.round(rgbColor[1]);
    const b = Math.round(rgbColor[2]);
    return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
  }
  
  function drawMatrixGrid(size_x, size_y) {
    const MATRIX = [];
  
    for (let y = 0; y < size_y; y++) {
      const row = [];
      for (let x = 0; x < size_x; x++) {
        const cell = new CELL();
        row.push(cell);
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
      matrix[val_y][val_x].TOGGLE_CELL_STATE();
    } catch {
      console.warn('Caught Error: converting cell state');
      return;
    }
  }
  
  function updateCellNextState(cell, neighbors) {
    const aliveNeighbors = neighbors.filter(neighbor => neighbor.CHECK_STATE()).length;
    const currentState = cell.CHECK_STATE();
    let nextState = currentState;
  
    if (currentState === 1) {
      if (aliveNeighbors < 2 || aliveNeighbors > 3) {
        nextState = 0; // cell dies due to underpopulation or overpopulation
      }
    } else {
      if (aliveNeighbors === 3) {
        nextState = 1; // cell is born due to reproduction
      }
    }
  
    cell.SET_NEXT_STATE(nextState);
  }
  
  const canvas = document.getElementById('board');
  const ctx = canvas.getContext('2d');
  let generation = 0; // Current generation
  const maxGenerations = 100; // Total number of generations
  const generationDelay = 100; // Delay in milliseconds between generations
  
  // Function to calculate and update canvas dimensions
  function updateCanvasDimensions() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  // Function to redraw the board
  function redrawBoard() {
    const tileSize = Math.min(canvas.width, canvas.height) / 100;
    const rows = matrix.length;
    const columns = matrix[0].length;
  
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Update the next state of each cell based on neighbors
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const cell = matrix[row][col];
        const neighbors = getNeighbors(matrix, row, col);
        updateCellNextState(cell, neighbors);
      }
    }
  
    // Update the state of each cell
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const cell = matrix[row][col];
        if (cell.isTransitionInProgress()) {
          const targetColor = cell.COLOR;
          const transitionedColor = cell.getTransitionedColor(targetColor);
          const color = transitionedColor;
          drawTile(col, row, tileSize, color);
        } else {
          const color = cell.COLOR;
          drawTile(col, row, tileSize, color);
        }
      }
    }
  
    // Increment generation counter
    generation++;
  
    // Display current generation
    console.log(`Generation: ${generation}`);
  
    // Check if all generations have been displayed
    if (generation < maxGenerations) {
      requestAnimationFrame(redrawBoard);
    }
  }
  
  // Function to draw a single tile
  function drawTile(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * size, y * size, size, size);
    ctx.strokeStyle = '#00000038';
    ctx.strokeRect(x * size, y * size, size, size);
  }
  
  // Function to get the neighbors of a cell
  function getNeighbors(matrix, row, col) {
    const rows = matrix.length;
    const columns = matrix[0].length;
    const neighbors = [];
  
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue; // exclude the cell itself
        const neighborRow = (row + i + rows) % rows; // handle edge wrapping
        const neighborCol = (col + j + columns) % columns; // handle edge wrapping
        neighbors.push(matrix[neighborRow][neighborCol]);
      }
    }
  
    return neighbors;
  }
  
  // Create the matrix grid
  const matrix = drawMatrixGrid(10, 10);
  
  // Randomize initial cell states
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      const cell = matrix[row][col];
      if (Math.random() < 0.5) {
        cell.TOGGLE_CELL_STATE();
      }
    }
  }
  
  // Update the canvas dimensions initially and on window resize
  updateCanvasDimensions();
  window.addEventListener('resize', updateCanvasDimensions);
  
  // Start the animation
  redrawBoard();
  