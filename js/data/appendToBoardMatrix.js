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
  
  console.log(drawMatrixGrid(3, 3));
  