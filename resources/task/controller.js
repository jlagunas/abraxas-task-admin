'use strict'

require('rootpath')()
const _ = require('lodash')
const sequelize = require('sequelize')
const { to } = require('await-to-js')

function get_where_filters(query) {
  if (query.q && query.q !== '') {
    return {
      description: { [sequelize.Op.like]: `%${query.q}%` } }
  }

  if (query.status && query.status !== '') {
    return {
      status: { [sequelize.Op.like]: `%${query.status}%` } }
  }

  return {}
}

async function destroy (req, res, next) {
  if (_.has(req, 'status') && req.status === 'fail') {
    next()
    return null
  }

  const [errDelete, Deleted] = await to(
    req.Model.destroy({ where: { id: req.params.taskId }, limit: 1 })
  )

  if (errDelete) {
    req.status = 'fail'
    req.status_code = 400
    req.errors = errDelete

    next()
    return null
  }

  req.message = 'La tarea se ha eliminado correctamente'
  req.status = 'success'
  req.status_code = 204
  req.data = {}

  next()
  return null
}

async function update (req, res, next) {
  if (_.has(req, 'status') && req.status === 'fail') {
    next()
    return null
  }

  const [errUpdate, rowsAffected] = await to(
    req.Model.update(req.taskInRequest, { where: { id: req.params.taskId } })
  )

  if (errUpdate) {
    req.message = 'Ha ocurrido un error al actualizar la tarea'
    req.status = 'fail'
    req.status_code = 400

    next()
    return null
  }

  const [errGetTask, taskUpdated] = await to(
    req.Model.findById(req.params.taskId)
  )

  req.message = 'La tarea se ha actualizado correctamente'
  req.status_code = 200
  req.status = 'success'
  req.data = taskUpdated.dataValues

  next()
  return null
}

async function create (req, res, next) {
  if (_.has(req, 'status') && req.status === 'fail') {
    next()
    return null
  }

  const [errSync, sync] = await to(req.Model.sync())

  if (errSync) {
    req.message = 'Ha ocurrido un error al sincronizar con la base de datos'
    req.status = 'fail'
    req.status_code = 500

    next()
    return null
  }

  const [errCreate, taskCreated] = await to(
    req.Model.create(req.taskInRequest)
  )

  if (errCreate) {
    req.message = 'Ha ocurrido un error al crear la tarea'
    req.status = 'fail'
    req.status_code = 400

    next()
    return null
  }

  req.message = 'La tarea se ha creado correctamente'
  req.status = 'success'
  req.status_code= 201
  req.data = taskCreated.dataValues

  next()
  return null
}

async function get (req, res, next) {
  if (_.has(req, 'status') && req.status === 'fail') {
    next()
    return null
  }

  const query_in_request = req.query
  const [errGet, tasksGetted] = await to(
    req.Model.findAll({
      where: get_where_filters(req.query),
      raw: true
    })
  )

  if (errGet) {
    req.message = 'Ha ocurrido un error al obtener las tareas'
    req.status = 'fail'
    req.status_code = 400

    next()
    return null
  }

  req.message = 'Las tareas se han obtenido correctamente'
  req.status = 'success'
  req.status_code = 200
  req.data = tasksGetted

  next()
  return null
}

module.exports.create =  create
module.exports.update =  update
module.exports.get =  get
module.exports.destroy =  destroy

// '.- -- -.. --.'
