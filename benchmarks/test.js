'use strict';

var bu = require('benchmark-utils');

bu.verbose = true;

function varVarVar() {
  var a = 1;
  var b = 2;
  var c = 3;
}

function var1() {
  var a = 1, b = 2, c = 3;
}

bu.measureTime('var var var', function () {
  for (var i = 0; i < 1e8; i += 1) {
    varVarVar();
  }
});


bu.measureTime('var', function () {
  for (var i = 0; i < 1e8; i += 1) {
    var1();
  }
});


