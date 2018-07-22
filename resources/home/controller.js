'use strict'

module.exports = (req, res, next) => {
  req.data = {
    resource: req.resource_name
  }

  req.is_success_getted = true

  return next()
}

// '.- -- -.. --.'
