'use strict'

export default (req, res, next) => {
  req.taskInRequest = {
    description: req.body.description,
    estimated_time: req.body.estimated_time,
    registered_time: req.body.registered_time,
    status: req.body.status
  }

  return next()
}

// '.- -- -.. --.'
