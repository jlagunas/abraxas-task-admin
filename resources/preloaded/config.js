'use strict'

require('rootpath')()
import Model from 'resources/task/model'

export default (req, res, next) => {
  req.Model = Model(__db)

  return next()
}

// '.- -- -.. --.'
