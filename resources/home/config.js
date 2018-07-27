'use strict'


module.exports = (req, res, next) => {
  req.message = 'Running...'
  req.status_code = 200
  req.status = 'success'

  next()
  return null
}

// '.- -- -.. --.'
