'use strict'

require('rootpath')()
const { get_correspond_content_type, parse_data } =  require('lib/response_utils')

function get_standard_response (req) {
  return {
    message: req.message,
    status: req.status,
    code: req.status_code,
    data: req.data || {}
  }
}

module.exports = (req, res, next) => {
  res
    .set(get_correspond_content_type(req.headers))

  res
    .status(req.status_code)
    .send(
      parse_data(
        get_standard_response(req),
        req.headers
      )
    )
}

// '.- -- -.. --.'
