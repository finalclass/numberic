'use strict';

var numeric = require('numeric');

exports = module.exports = numeric;

exports.createMatrix = function (rows, cols, initialValue) {
  initialValue = initialValue || 0;
  var matrix = new Array(rows);

  for (var i = 0; i < rows; i += 1) {
    var row = new Array(cols);
    for (var j = 0; j < cols; j += 1) {
      row[j] = initialValue;
    }
    matrix[i] = row;
  }

  return matrix;
};

exports.createVector = function (cols, initialValue) {
  initialValue = initialValue || 0;
  var vector = new Array(cols);

  for (var i = 0; i < cols; i += 1) {
    vector[i] = initialValue;
  }

  return vector;
};

exports.rows = function (matrix) {
  return matrix.length;
};

exports.cols = function (matrix) {
  return matrix[0] ? matrix[0].length : 0;
};

/**
 * @returns {Number[][]}
 */
exports.augment = function () {
  if (arguments.length === 1) {
    return arguments[0];
  }
  var matrix = exports.clone(arguments[0]);
  var rows = exports.rows(matrix);

  for (var m = 1; m < arguments.length; m += 1) {
    var curMatrix = arguments[m];
    var curMatrixCols = exports.cols(curMatrix);
    for (var r = 0; r < rows; r += 1) {
      for (var c = 0; c < curMatrixCols; c += 1) {
        matrix[r].push(curMatrix[r][c]);
      }
    }
  }

  return matrix;
};

/**
 * Equivalent of MathCad's stack function
 *
 * @param {Number[][]} var_args
 */
exports.stack = function () {
  var elements = [];
  var matrices = Array.prototype.slice.call(arguments);
  var i;

  for (i = 0; i < matrices.length; i += 1) {
    elements = elements.concat(matrices[i]);
  }

  return elements;
};

/**
 * Equivalent of MathCad's submatrix function
 *
 * @param {Number[][]} matrix
 * @param {Integer} startRow upper indices of the rows to be extracted
 * @param {Integer} endRow lower indices of the rows to be extracted
 * @param {Integer} startCol upper indices of the columns to be extracted
 * @param {Integer} endCol lower indices of the columns to be extracted
 * @return {Number[][]}
 */
exports.subMatrix = function (matrix, startRow, endRow, startCol, endCol) {
  var outputMatrix = [];
  var outputRow;
  var rowStep = startRow < endRow ? 1 : -1;
  var colStep = startCol < endCol ? 1 : -1;
  var curRow;
  var curCol;

  endRow += rowStep; //include self in the loop
  endCol += colStep; //include self in the loop

  for (curRow = startRow; curRow !== endRow; curRow += rowStep) {
    outputRow = [];
    for (curCol = startCol; curCol !== endCol; curCol += colStep) {
      outputRow.push(matrix[curRow - 1][curCol - 1]);
    }
    outputMatrix.push(outputRow);
  }

  return outputMatrix;
};

/**
 *
 * @param {Number[]} vector
 * @param {Integer} startRow
 * @param {Integer} endRow
 * @returns {Number[]}
 */
exports.subVector = function (vector, startRow, endRow) {
  var out = new Array(endRow - startRow);
  var rowStep = startRow < endRow ? 1 : -1;

  endRow += rowStep; //include self in the loop

  for (var curRow = startRow; curRow !== endRow; curRow += rowStep) {
    out[curRow- startRow] = vector[curRow - 1];
  }

  return out;
};