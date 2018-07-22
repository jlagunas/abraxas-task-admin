'use strict'

function get_success_standard_response (message, data, code) {
  return {
    message: message,
    data: data,
    status: 'success',
    code: code
  }
}

function get_fail_standard_response (message, data, code) {
  return {
    message: message,
    data: data,
    status: 'fail',
    code: code
  }
}

module.exports.get_success_standard_response = get_success_standard_response
module.exports.get_fail_standard_response = get_fail_standard_response

// '.- -- -.. --.'
