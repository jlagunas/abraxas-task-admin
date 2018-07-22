'use strict'

require('rootpath')()
const { get_fail_standard_response } = require('lib/hooks/payloads/response_payload_standard')
const {
  get_success_created_response,
  get_fail_created_response
} = require('lib/hooks/payloads/response_payload_created')
const {
  get_success_updated_response,
  get_fail_updated_response
} = require('lib/hooks/payloads/response_payload_updated')
const {
  get_success_getted_response,
  get_fail_getted_response
} = require('lib/hooks/payloads/response_payload_getted')

function get_fail_server_response (req) {
  const data = {}

  return get_fail_standard_response(
    'Ha ocurrido un error en el servidor.',
    data,
    500
  )
}

module.exports.get_fail_created_response = get_fail_created_response
module.exports.get_fail_server_response = get_fail_server_response
module.exports.get_success_created_response = get_success_created_response
module.exports.get_success_getted_response = get_success_getted_response
module.exports.get_success_updated_response = get_success_updated_response

// '.- -- -.. --.'
