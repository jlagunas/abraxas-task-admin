'use strict'

require('rootpath')()
const { parse_data } =  require('lib/response_utils')
const {
  get_fail_standard_response,
  get_success_standard_response
} = require('lib/hooks/payloads/response_payload_standard')

function get_success_updated_response (req) {
  const payload = get_success_standard_response(
    req.getted_successful_message,
    req.data,
    200)

  return parse_data(payload, req.headers)
}

function get_fail_updated_response (req) {
  const payload = get_success_standard_response(
    req.getted_successful_message,
    req.errors,
    400)

  return parse_data(payload, req.headers)
}

module.exports.get_success_updated_response = get_success_updated_response
module.exports.get_fail_updated_response = get_fail_updated_response

// '.- -- -.. --.'
