'use strict'

require('rootpath')()
const data2xml = require('data2xml')
const _ = require('lodash')

const parse_to_xml = data2xml()

function get_correspond_content_type (headers) {
  if (is_xml_content_type(headers)) {
    return { 'Content-Type': 'text/xml' }
  } else {
    return { 'Content-Type': 'application/json' }
  }
}

function is_xml_content_type (headers) {
  return (_.has(headers, 'Accept') || _.has(headers, 'accept'))
    && (headers['Accept'] === 'text/xml' || headers['accept'] === 'text/xml')
}

function parse_data (data, headers) {
  if (is_xml_content_type(headers)) {
    return parse_to_xml('response', data)
  }

  return data
}

module.exports.get_correspond_content_type = get_correspond_content_type
module.exports.is_xml_content_type = is_xml_content_type
module.exports.parse_data = parse_data

// '.- -- -.. --.'
