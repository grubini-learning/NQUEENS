window.findNQueensSolution = function (n) {
  if (n === 1) {
    return [[1]];
  }
  const matrix = Array(9).fill().map(() => Array(9).fill(1));

  console.log(matrix);

  const boardInstance = new Board({ n });
  const board = boardInstance.rows();

  let changesCaptured = false;
  let viableSnapshot = [];

  const plays = col => {
    if (col === n) {
      return true;
    }

    for (let row = 0; row < board.length; row++) {
      boardInstance.togglePiece(row, col);
      // we are going ask the folowing:
      if (boardInstance.hasAnyQueensConflicts()) {
        boardInstance.togglePiece(row, col);
      } else {
        if (!plays(++col)) {
          boardInstance.togglePiece(row, col);
        } else {
          return true;
        }
      }
    }
    return false;
  };
  plays(0);
  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return board;
};