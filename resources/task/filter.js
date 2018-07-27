'use strict'

require('rootpath')()
const _ = require('lodash')
const { to } = require('await-to-js')

async function update (req, res, next) {
  if (_.has(req, 'status') && req.status === 'fail') {
    next()
    return null
  }

  const [errTask, taskInDb] = await to(
    req.Model.findById(req.params.taskId)
  )

  if (errTask) {
    req.message = 'Error: hubo un error al actualizar la tarea'
    req.status_code = 400
    req.status = 'fail'

    next()
    return null
  }

  if (_.isNull(taskInDb)) {
    req.message = 'Error: la tarea no existe'
    req.status_code = 404
    req.status = 'fail'

    next()
    return null
  }

  if (taskInDb.dataValues.status === 'completed') {
    req.message = 'Error: no se puede actualizar una tarea completada'
    req.status_code = 409
    req.status = 'fail'

    next()
    return null
  }

  next()
  return null
}

async function del (req, res, next) {
  if (_.has(req, 'status') && req.status === 'fail') {
    next()
    return null
  }

  const [errTask, taskInDb] = await to(
    req.Model.findById(req.params.taskId)
  )

  if (errTask) {
    req.message = 'Error: hubo un error al eliminar la tarea'
    req.status_code = 400
    req.status = 'fail'

    next()
    return null
  }

  if (_.isNull(taskInDb)) {
    req.message = 'Error: la tarea no existe'
    req.status_code = 404
    req.status = 'fail'

    next()
    return null
  }

  next()
  return null
}

module.exports.update =  update
module.exports.delete =  del

// '.- -- -.. --.'
