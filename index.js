'use strict';
module.exports = Concur
var Promise = require('promise')

function Concur(Gen) {
  return function() {
    var gen = Gen.apply(this, arguments)
    return proceed({ value: undefined, done: false })

    function proceed(state) {
      var prom = Promise.resolve(state.value)
      return state.done
        ? prom
        : prom.then(success, failure)
    }
    function success(value) { return proceed(gen.next (value)) }
    function failure(value) { return proceed(gen.throw(value)) }
  }
}
Concur.run = function(Gen) { return Concur(Gen)() }

Concur.sync = Sync
function Sync(Gen) {
  return function() {
    var gen = Gen.apply(this, arguments)
      , ret = { value: undefined, done: false }
    do { ret = gen.next(ret.value) } while (!ret.done)
    return ret.value
  }
}
Sync.run = function(Gen) { return Sync(Gen)() }
