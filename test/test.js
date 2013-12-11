'use strict';

var opex = require('../'),
  expect = require('expect.js');

describe('opex:', function () {

  describe('when `opex` is called', function () {

    it('returns a new object', function () {
      var original = {},
        i = 1;
      while (i--) {
        expect(original === opex(original)).to.be(false);
      }
    });

    it('supports any number of arguments and overwrites with right-most args\' values', function () {
      var original = {}, v1 = {
          x: 1
        }, v2 = {
          y: 2
        }, v3 = {
          z: 3
        }, v4 = {
          y: 5
        }, res = opex(original, v1),
        i = 1;
      while (i--) {
        expect(res.x).to.be(1);
        res = opex(original, v1, v2, v3);
        expect(res.x).to.be(1);
        expect(res.y).to.be(2);
        expect(res.z).to.be(3);
        res = opex(res, v4);
        expect(res.y).to.be(5);
      }
    });

    it('ignores non-object and non-function input', function () {
      var original = {},
        o = {
          data: 'data'
        },
        f = function testFunc() {},
        i = 1;
      f.data = 'asdf';
      while (i--) {
        expect(opex(original, o, f, i).data).to.be('asdf');
      }
    });

    it('deep copies simple object but not complex ones (new Object(), {}, and Object.create() vs anything else)', function () {
      var original = {
        inner: {
          data: 'stuff',
          other: 'morestuff',
          more: 5,
          array: ['a']
        }
      },
        o = {
          inner: {
            data: 'newstuff',
            other: 'newmorestuff',
            foo: null
          }
        },
        f = function testFunc() {},
        i = 1,
        extended;
      f.inner = {
        data: 'asdf',
        array: ['b'],
        bar: undefined
      };
      while (i--) {
        extended = opex(original, o, f, i);
        expect(extended.inner.data).to.be('asdf');
        expect(extended.inner.other).to.be('newmorestuff');
        expect(extended.inner.more).to.be(5);
        expect(extended.inner.foo).to.be(null);
        expect(extended.inner.array.length).to.be(1);
        expect(extended.inner.array[0]).to.be('b');
        expect(extended.inner.bar).to.be(undefined);
      }
    });

    it('throws for circular references', function (done) {
      var x = {},
        y = {},
        errCb = function errCb(err) {
          expect(err.message).to.be('opex exceeded 99 levels of depth -- most likely a circular reference error');
          done();
        },
        i = 1,
        extended;
      x.y = y;
      y.x = x;
      while (i--) {
        expect(opex.bind(null, x, y)).to.throwError(errCb);
      }
    });
  });
});
