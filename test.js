'use strict'
module.exports = require('has-generators')
  ? require('./test.es6')
  : require('./test.es5')
