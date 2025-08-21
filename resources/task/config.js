'use strict'

require('rootpath')()
import Model from './model'

export default (req, res, next) => {
  req.Model = Model(__db)

  return next()
}

// '.- -- -.. --.'
