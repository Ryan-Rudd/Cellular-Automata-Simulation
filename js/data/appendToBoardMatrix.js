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

  function toggleCellIntersectionState({val_x, val_y, matrix})
  {
    try{
        matrix[val_y][val_x] = matrix[val_y][val_x] === 0 ? 1 : 0;

    } catch
    {
        console.warn("Caugh Error: converting cell state")
        return
    }
  }
  
  const matrix = drawMatrixGrid(3, 3);
  
  /* toggleCellIntersectionState(
    {
        val_x: 0,
        val_y: 0,
        matrix: matrix
    }
  ) */


  console.log(formatMatrixGrid(matrix));
  
  
