'use strict'

require('rootpath')()
const Model = require('./model')

module.exports = (req, res, next) => {
  req.Model = Model(__db)

  return next()
}

// '.- -- -.. --.'
