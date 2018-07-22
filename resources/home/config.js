'use strict'

require('rootpath')()

module.exports = (req, res, next) => {
  req.data = undefined
  req.errors = undefined
  req.module_name = 'home'

  req.created_successful_message = `el recurso ${req.module_name} se ha creado correctamente.`
  req.deleted_successful_message = `el recurso ${req.module_name} se ha eliminado correctamente.`
  req.getted_successful_message = `el recurso ${req.module_name} se ha obtenido correctamente.`
  req.updated_successful_message = `el recurso ${req.module_name} se ha actualizado correctamente.`
  req.is_success_created = false
  req.is_success_getted = false
  req.is_success_deleted = false
  req.is_success_updated = false

  return next()
}

// '.- -- -.. --.'
