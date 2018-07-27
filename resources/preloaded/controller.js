'use strict'

require('rootpath')()
const _ = require('lodash')
const moment = require('moment')
const { to } = require('await-to-js')

function generate_n_random_task(n) {
  const data = []

  for (let i = 1; i <= n; i++) {
    const today = moment()
    const estimated_time = _.random(100, 1000, false)
    const registered_time = _.round((estimated_time * _.random(80, 100, false)) / 100)
    const days =  _.random(0, 7, false)
    const created_at = today.add(days, 'day').format('YYYY-MM-DD')
    const updated_at = created_at

    data.push({
      description: `task ${i}`,
      estimated_time: estimated_time,
      registered_time: registered_time,
      status: 'pending',
      created_at: created_at,
      updated_at: updated_at
    })
  }

  return data
}

async function reset_and_populate (req, res, next) {
  if (_.has(req, 'status') && req.status === 'fail') {
    next()
    return null
  }

  const [errSync, sync] = await to(req.Model.sync({ force: true }))

  if (errSync) {
    req.message = 'Ha ocurrido un error al sincronizar con la base de datos'
    req.status = 'fail'
    req.status_code = 500

    next()
    return null
  }

  const random_task = generate_n_random_task(50)

  const [err_create, task_created] = await to(
    req.Model.bulkCreate(random_task)
  )

  if (err_create) {
    req.message = 'Ha ocurrido un error al crear la tarea'
    req.status = 'fail'
    req.status_code = 400

    next()
    return null
  }

  const [err_get_tasks, all_tasks] = await to(req.Model.findAll({ raw: true }))

  req.message = 'Se ha reseteado y precargado correctamente'
  req.status = 'success'
  req.status_code= 201
  req.data = all_tasks

  next()
  return null
}

module.exports = reset_and_populate

// '.- -- -.. --.'
