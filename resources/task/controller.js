'use strict'

require('rootpath')()
const { to } = require('await-to-js')

async function create (req, res, next) {
  const [errSync, sync] = await to(req.Model.sync())

  if (errSync) {
    console.log(errSync)
  }

  const [errCreate, taskCreated] = await to(
    req.Model.create(req.taskInRequest)
  )

  if (errCreate) {
    req.is_success_created = false
    req.errors = errCreate

    next()
    return null
  }

  req.is_success_created = true
  req.data = taskCreated.dataValues

  next()
  return null
}

function get (req, res, next) {
  req.data = {
    resource: req.resource_name
  }

  req.is_success_getted = true

  return next()
}

module.exports.create =  create
module.exports.get =  get

// '.- -- -.. --.'
