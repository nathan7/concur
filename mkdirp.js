'use strict';
// credit where credit is due: this is @ForbesLindesay's mkdirp example in alagator almost verbatim - https://github.com/ForbesLindesay/alagator#example
var Path = require('path')
  , Promise = require('promise')
  , Concur = require('concur')
  , Sync = Concur.sync
  , fs = require('then-fs')
  , syncFs = require('sync-fs')

var mkdirp = module.exports = mkdirpFactory(Concur, fs)
mkdirp.sync = mkdirpFactory(Sync, syncFs)

function mkdirpFactory(Concur, fs) {
  var mkdirp
  return mkdirp = Concur(function*(path, mode, made) {
    if (mode === undefined)
      mode = 0x1FF & ~process.umask()
    if (!made) made = null

    if (typeof mode == 'string') mode = parseInt(mode, 8)
    path = Path.resolve(path)

    try {
      yield fs.mkdir(path, mode)
      made = made || path
    }
    catch (err0) {
      if (err0.code == 'ENOENT') {
        made = yield mkdirp(Path.dirname(path), mode, made)
        yield mkdirp(path, mode, made)
      }
      else {
        var stat
        try { stat = yield fs.stat(path) }
        catch (err1) { throw err0 }
        if (!stat.isDirectory()) throw err0
      }
    }

    return made
  })
}
