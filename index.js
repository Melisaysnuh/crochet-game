const A = 'A'; // navy blue
const B = 'B'; // white
const C = 'C'; // pink
const D = 'D'; // blue
const myDiagonal = 29
const myLength = calculateL(29)


// Helper: sides from diagonal - the pattern for each square starts at a diagonal and reduces stitches in order to make a triangle. Because it's easier to create the squares in Javascript as rows, we need to use some math to calculate the length from the diagonal.

function calculateL(diagonalStitches) {
  const length = Math.round(diagonalStitches / Math.sqrt(2));
  return length;
}

//Helper - rotatesquare

function rotate90(L, mat) {
  for (let x = 0; x < Math.floor(L / 2); x++) {
    for (let y = x; y < L - x - 1; y++) {
          let temp = mat[x][y];
      mat[x][y] = mat[L - 1 - y][x];
      mat[L - 1 - y][x] = mat[L - 1 - x][L - 1 - y];
      mat[L - 1 - x][L - 1 - y] = mat[y][L - 1 - x];
      mat[y][L - 1 - x] = temp;
    }
  }
  return mat;
}

//  create squares, with 2 motifs

function square(length, stripe1, stripe2, solid) {
  const matrix = []

  for (let i = 0; i < length; i++) {
    let row = [];
    for (let j = 0; j < length; j++) {
      row.push(solid)
      console.log(row)
    }
    matrix.push(row)
  }

  let right = length - 1;
  let left = 0;
  let stripeCount = 0

  for (let k = right; k >= left; k--) {
    let rightToLeft = k;
    let topToBottom = 0;


    if (stripeCount === 2) {
      while (rightToLeft >= left && topToBottom <= right) {
        matrix[topToBottom][rightToLeft] = stripe1;
        topToBottom++;
        rightToLeft--
      }
      stripeCount = 0;
    } else  {
      while (rightToLeft >= left && topToBottom <= right) {
        matrix[topToBottom][rightToLeft] = stripe2;
        topToBottom++;
        rightToLeft--;
      }
      stripeCount++;
    }
  }

  return matrix
}


// * organize the motifs

const pinkOddRow = square(myLength, A, B, C);
const pinkEvenRow = rotate90(
  myLength,
  rotate90(myLength, square(myLength, A, B, C))
);
const blueOddRow = rotate90(myLength, square(myLength, A, B, D));
const blueEvenRow = rotate90(
  myLength,
  rotate90(myLength, rotate90(myLength, square(myLength, A, B, D)))
);


// * stitch blanket together

function buildBlanket(square1, square2, square3, square4) {
  let finalMatrix = [];
  let length = 4;

  for (let i = 0; i < length; i++) {
    let rowBlock = [];

    for (let j = 0; j < length; j++) {
      let block;
      if (i % 2 === 0) {
        block = j % 2 === 0 ? square1 : square2;
      } else {
        block = j % 2 === 0 ? square3 : square4;
      }
      rowBlock.push(block);
    }

    // Combine blocks into final matrix
    for (let row = 0; row < rowBlock[0].length; row++) {
      let blanketRow = [];
      for (let block of rowBlock) {
        blanketRow = blanketRow.concat(block[row]);
      }
      finalMatrix.push(blanketRow);
    }
  }

  renderMatrix(finalMatrix);
}
// * put it all together
buildBlanket(pinkEvenRow, blueOddRow, blueEvenRow, pinkOddRow)



















function renderMatrix(matrix) {
  const matrixContainer = document.getElementById('matrixContainer');
  matrixContainer.innerHTML = '';
  const totalCellsPerRow = matrix[0].length;
  matrixContainer.style.gridTemplateColumns = `repeat(${totalCellsPerRow}, 0.5vw)`;

  matrix.forEach((row) => {
    row.forEach((cell) => {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      cellDiv.classList.add(cell);
      matrixContainer.appendChild(cellDiv);

    });
  });
}

function renderSquare(matrix) {
  const squareContainer = document.getElementById('squareContainer');
  squareContainer.innerHTML = '';

  const totalCellsPerRow = matrix[0].length;
  squareContainer.style.display = 'grid';
  squareContainer.style.gridTemplateColumns = `repeat(${totalCellsPerRow}, 0.5vw)`;

  matrix.forEach((row) => {
    row.forEach((cell) => {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      cellDiv.classList.add(cell);
      squareContainer.appendChild(cellDiv);
    });
  });
}

