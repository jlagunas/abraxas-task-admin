'use strict'


export default (req, res, next) => {
  req.message = 'API is running'
  req.status_code = 200
  req.status = 'success'

  next()
  return null
}

// '.- -- -.. --.'
