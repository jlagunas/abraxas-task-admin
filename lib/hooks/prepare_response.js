'use strict'

require('rootpath')()
const { get_correspond_content_type } =  require('lib/response_utils')
const {
  get_success_created_response,
  get_fail_created_response,
  get_success_updated_response,
  get_success_getted_response,
  get_fail_server_response
} =  require('lib/hooks/payloads/response_payload')

module.exports = (req, res, next) => {
  res.set(get_correspond_content_type(req.headers))

  if (req.is_success_created) {
    res.status(201).send(get_success_created_response(req))
  } else if (req.is_fail_created) {
    res.status(400).send(get_fail_created_response(req))
  } else if (req.is_success_updated) {
    res.status(200).send(get_success_updated_response(req))
  } else if (req.is_success_getted) {
    res.status(200).send(get_success_getted_response(req))
  } else {
    res.status(500).send(get_fail_server_response(req))
  }
}

// '.- -- -.. --.'
