var nb = require('../');

describe('augment', function () {

  it('augment', function () {
    var a = [
      [1, 2],
      [11, 12]
    ];
    var b = [
      [3, 4],
      [13, 14]
    ];
    var c = [
      [5, 6],
      [15, 16]
    ];
    var expected = [
      [1, 2, 3, 4, 5, 6],
      [11, 12, 13, 14, 15, 16]
    ];

    var actual = nb.augment(a, b, c);

    expect(nb.all(nb.eq(actual, expected))).toBeTruthy();
  });

});