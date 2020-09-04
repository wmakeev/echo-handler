/* eslint node/no-unpublished-import:0 */

import test from 'blue-tape'

import index from '../src'

test('index', async t => {
  const params = { foo: 'bar' }

  const result = await index(params, null)

  t.deepEqual(result, params, 'should echo result')
})

test('index (throw)', async t => {
  t.plan(1)

  const params = {
    '@echo/throw': 'My error',
    'foo': 'bar'
  }

  try {
    await index(params, null)
  } catch (err) {
    t.pass(err.message)
  }
})

test('index (http)', async t => {
  const params = {
    '@echo/http': {
      statusCode: 202,
      headers: {
        'Content-Type': 'application/json'
      }
    },
    'foo': 'bar'
  }

  const result = await index(params, null)

  t.deepEqual(
    result,
    {
      statusCode: 202,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params, null, 2)
    },
    'should echo http result'
  )
})
