const isQueenPlacable = function (board, tryRowIdx, tryColIdx) {

  //checks the current row given the current col
  for (let colIdx = tryColIdx; colIdx >= 0; colIdx--) {
    if (board[tryRowIdx][colIdx] === 1) {
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

/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


//n = size of board, items can be either 0 or 1.
//n is also number of rooks to place;
// O(n^2), where n = length of matrix
window.findNRooksSolution = function (n) {
  const boardInstance = new Board({ n });
  const board = boardInstance.rows();

  const placeRookHelper = function (col) {
    if (col === n) {
      return false;
    }

    for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
      // const insertAttempt = board[rowIdx][col];
      boardInstance.togglePiece(rowIdx, col);
      if (boardInstance.hasRowConflictAt(rowIdx)) {
        boardInstance.togglePiece(rowIdx, col);
      } else {
        placeRookHelper(col + 1);
      }
    }
  };
  placeRookHelper(0);
  return board;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// O(n^n), where n = length of matrix
window.countNRooksSolutions = function (n) {
  const boardInstance = new Board({ n });
  const board = boardInstance.rows();
  var solutionCount = 0;

  const placeRookHelper = function (col) {
    if (col === n) {
      solutionCount++;
      return false;
    }

    for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
      // const insertAttempt = board[rowIdx][col];
      boardInstance.togglePiece(rowIdx, col);
      if (boardInstance.hasRowConflictAt(rowIdx)) {

        boardInstance.togglePiece(rowIdx, col);
      } else {

        if (!placeRookHelper(col + 1)) {
          boardInstance.togglePiece(rowIdx, col);
        }
      }

    }

    return false;
  };
  placeRookHelper(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
// O(n^n), where n = length of matrix
window.findNQueensSolution = function (n) {
  if (n === 1) {
    return [[1]];
  } else if (n === 0) {
    return [];
  }

  const board = Array(n).fill().map(() => Array(n).fill(0));

  const plays = col => {
    if (col === n) {
      return true;
    }

    for (let row = 0; row < board.length; row++) {
      if (!isQueenPlacable(board, row, col)) {
        continue;
      }

      board[row][col] = 1;
      if (!plays(col + 1)) {
        board[row][col] = 0;
      } else {
        return true;
      }

    }
    //tells previous stack to backtrack after not finding
    return false;
  };
  plays(0);
  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return board;
};



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
// O(n^n), where n = length of matrix
window.countNQueensSolutions = function (n) {
  let solutionCount = 0; //fixme

  const board = Array(n).fill().map(() => Array(n).fill(0));
  const plays = col => {
    if (col === n) {
      solutionCount += 1;
      return false;
    }

    for (let row = 0; row < board.length; row++) {
      if (!isQueenPlacable(board, row, col)) {
        continue;
      }

      board[row][col] = 1;
      if (!plays(col + 1)) {
        board[row][col] = 0;
      } else {
        return true;
      }

    }
    return false;
  };
  plays(0); //returns false;
  return solutionCount;
};
