'use strict'
const { test } = require('tap')
const req = require('../req')

test('handle network errors', ({ strictSame, end }) => {
  req('http://error.com', (err) => {
    strictSame(err, Error('network error'))
    end()
  })
})

test('responds with data', ({ ok, strictSame, error, end }) => {
  req('http://example.com', (err, data) => {
    error(err)
    ok(Buffer.isBuffer(data))
    strictSame(data, Buffer.from('some data'))
    end()
  })
})