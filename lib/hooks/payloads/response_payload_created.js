'use strict'

require('rootpath')()
const {
  is_xml_content_type,
  get_correspond_content_type,
  parse_data
} =  require('lib/response_utils')
const {
  get_fail_standard_response,
  get_success_standard_response
} = require('lib/hooks/payloads/response_payload_standard')

function get_success_created_response (req) {
  const payload = get_success_standard_response(
    req.getted_successful_message,
    req.data,
    201)

  return parse_data(payload, req.headers)
}

function get_fail_created_response (req) {
  const payload = get_success_standard_response(
    req.getted_successful_message,
    req.errors,
    400)

  return parse_data(payload, req.headers)
}

module.exports.get_success_created_response = get_success_created_response
module.exports.get_fail_created_response = get_fail_created_response

// '.- -- -.. --.'
