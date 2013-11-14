'use strict';

var nb = require('../');
var bu = require('benchmark-utils');

bu.verbose = true;

bu.measureTime('createMatrix', function () {
  for (var i = 0; i < 1e6; i += 1) {
    nb.createMatrix(12, 12, 0);
  }
});
