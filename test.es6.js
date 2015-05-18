'use strict';//jshint esnext:true
/* global beforeEach, describe, it */
var chai = require('chai')
  , should = chai.should()

var Concur = require('./')
  , Sync = Concur.sync
  , Promise = require('promise')

var sentinel
  , sentinelError
beforeEach(function() {
  sentinel = { inspect: function() { return '[Sentinel]' } }
  sentinelError = new Error('Sentinel')
  sentinelError.inspect = function() { return '[Error Sentinel]' }
})

describe('Concur', function() {
  it('should return a promise', function() {
    Concur.run(function*() {}).should.be.an.instanceof(Promise)
  })

  it('should resolve with return values', function(done) {
    var prom = Promise.resolve(sentinel)
    Concur.run(function*() {
      return prom
    }).then(function(ret) {
      should.equal(ret, sentinel)
    }).nodeify(done)
  })

  it('should resolve promises with yield', function(done) {
    var prom = Promise.resolve(sentinel)
    Concur.run(function*() {
      ;(yield prom).should.equal(sentinel)
    }).nodeify(done)
  })

  it('should reject with thrown errors', function(done) {
    Concur.run(function*() {
      throw sentinelError
    }).then(function() {
      throw new Error("should've been rejected")
    }, function(err) {
      should.equal(err, sentinelError)
    }).nodeify(done)
  })

  it('should throw rejections', function(done) {
    Concur.run(function*() {
      try {
        yield new Promise(function() { throw sentinelError })
      }
      catch(e) {
        if (e === sentinelError)
          return sentinel
      }
    }).then(function(ret) {
      should.equal(ret, sentinel)
    }).nodeify(done)
  })
})

describe('Sync', function() {
  it('should return return values', function() {
    Sync.run(function*() {
      return sentinel
    }).should.equal(sentinel)
  })
  it('should throw exceptions', function() {
    Sync(function*() {
      throw sentinelError
    }).should.throw(sentinelError)
  })
  it('should pass yielded values back in', function() {
    Sync.run(function*() {
      ;(yield sentinel).should.equal(sentinel)
    })
  })
})
