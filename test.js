var chai = require('chai')
  , should = chai.should()
require('mocha-as-promised')()
chai.use(require('chai-as-promised'))

var Concur = require('./')
  , Promise = require('promise')

var sentinel
  , sentinelError
beforeEach(function() {
  sentinel = { inspect: function() { return '[Sentinel]' } }
  sentinelError = new Error('Sentinel')
  sentinelError.inspect = function() { return '[Error Sentinel]' }
})

it('should return a promise', function() {
  Concur.run(function*() {}).should.be.an.instanceof(Promise)
})

it('should resolve with return values', function() {
  var prom = Promise.from(sentinel)
  return Concur.run(function*() {
    return prom
  }).should.become(sentinel)
})

it('should resolve promises with yield', function() {
  var prom = Promise.from(sentinel)
  return Concur.run(function*() {
    ;(yield prom).should.equal(sentinel)
  })
})

it('should reject with thrown errors', function() {
  return Concur.run(function *() {
    throw sentinelError
  }).should.be.rejected.with(sentinelError)
})

it('should throw rejections', function() {
  return Concur.run(function *() {
    try {
      yield Promise(function() { throw sentinelError })
    }
    catch(e) {
      if (e === sentinelError)
        return sentinel
    }
  }).should.become(sentinel)
})
