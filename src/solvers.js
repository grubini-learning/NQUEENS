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
window.findNRooksSolution = function(n) {
  const boardInstance = new Board({n});
  const board = boardInstance.rows();
  // iterate through the board
  // so we will toggle from 0 to 1
  // we can ask if that created a conflict
  // if it did then we can togle back to 0 and continue
  // if it didnt then continue
  // do this until we have look at all the squares or we reached n
  /**
     [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ]
    */

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
window.countNRooksSolutions = function(n) {
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
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
