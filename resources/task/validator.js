'use strict'

module.exports = (req, res, next) => {
  req.taskInRequest = {
    description: 'hola mundo',
    estimated_time: 120,
    registered_time: 60,
    status: 'Completed'
  }

  return next()
}

// '.- -- -.. --.'
