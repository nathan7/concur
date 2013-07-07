'use strict';
var Promise = require('promise')
  , nextTick = require('next-tick')

module.exports = exports =
function Concur(Gen) {
  return function() {
    var gen = Gen.apply(this, arguments)
    return proceed({ value: undefined, done: false })

    function proceed(state) {
      var prom = Promise.from(state.value)
      return state.done
        ? prom
        : prom.then(success, failure)
    }
    function success(value) { return proceed(gen.next (value)) }
    function failure(value) { return proceed(gen.throw(value)) }
  }
}
