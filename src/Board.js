// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    //time complexity - O(n), where n = length of matrix
    hasRowConflictAt: function (rowIndex) {
      const row = this.get(rowIndex);

      let count = 0;
      for (const item of row) {
        if (item === 0) {
          continue;
        }

        if (count === 0) {
          count++;
        } else {
          return true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    // O(n^2), where n = length of matrix
    hasAnyRowConflicts: function () {
      const board = this.rows();

      for (let i = 0; i < board.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    // O(n), where n = length of matrix
    hasColConflictAt: function (colIndex) {
      const board = this.rows();

      let count = 0;
      for (let row = 0; row < board.length; row++) {
        if (board[row][colIndex] === 0) {
          continue;
        }
        if (count === 0) {
          count++;
        } else {
          return true;
        }

      }

      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    // O(n^2), where n = length of matrix
    hasAnyColConflicts: function () {
      let rowLength = this.rows().length;

      for (let i = 0; i < rowLength; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }

      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    // O(n), where n = length of matrix
    hasMajorDiagonalConflictAt: function (startingCol, startingRow) {
      //assume column is at 0, and you are given the index.
      //with major diagonal, you are going topleft -> bottom right
      const board = this.rows();
      let count = 0;
      for (let rowIdx = startingRow, colIdx = startingCol; colIdx < board.length && rowIdx < board.length; rowIdx++, colIdx++) {
        let value = board[rowIdx][colIdx];
        if (!value) {
          continue;
        }

        if (count === 0) {
          count++;
        } else {
          return true;
        }
      }

      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    // O(n^2), where n = length of matrix
    hasAnyMajorDiagonalConflicts: function () {
      // check all the diags so we need to start from somwhere
      // we get starts at (0, 0) end at (4, 4)
      const boardLength = this.rows().length;

      for (let col = 0; col < boardLength; col++) {
        if (this.hasMajorDiagonalConflictAt(col, 0)) {
          return true;
        }
      }

      for (let row = 1; row < boardLength; row++) {
        if (this.hasMajorDiagonalConflictAt(0, row)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    // O(n), where n = length of matrix
    hasMinorDiagonalConflictAt: function (startingCol, startingRow) {
      const board = this.rows();
      let count = 0;
      for (let rowIdx = startingRow, colIdx = startingCol; colIdx >= 0 && rowIdx < board.length; rowIdx++, colIdx--) {
        let value = board[rowIdx][colIdx];
        if (!value) {
          continue;
        }

        if (count === 0) {
          count++;
        } else {
          return true;
        }
      }

      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    // O(n^2), where n = length of matrix
    hasAnyMinorDiagonalConflicts: function () {
      const boardLength = this.rows().length;

      for (let col = 0; col < boardLength; col++) {
        if (this.hasMinorDiagonalConflictAt(col, 0)) {
          return true;
        }
      }

      for (let row = 1; row < boardLength; row++) {
        if (this.hasMinorDiagonalConflictAt(boardLength - 1, row)) {
          return true;
        }
      }
      return false; // fixme

    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {

      return _(_.range(n)).map(function () {
        return 0;
      });

    });
  };

}());
