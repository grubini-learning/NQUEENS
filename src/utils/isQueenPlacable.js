

const isQueenPlacable = function (board, tryRowIdx, tryColIdx) {

  //checks the current row given the current col
  for (let colIdx = tryColIdx; colIdx >= 0; colIdx--) {
    if (board[tryRowidx][colIdx] === 1) {
      return false;
    }
  }

  //checks major diagonal
  for (let rowIdx = tryRowIdx, colIdx = tryColIdx; rowIdx >= 0 && colIdx >= 0; rowIdx--, colIdx--) {
    if (board[rowIdx][colIdx] === 1) {
      return false;
    }

  }

  for (let rowIdx = tryRowIdx, colIdx = tryColIdx; rowIdx < board.length && colIdx >= 0; rowIdx++, colIdx--) {
    if (board[rowIdx][colIdx] === 1) {
      return false;
    }
  }
  return true;
};