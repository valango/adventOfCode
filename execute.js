//  Runs a puzzle solution, reporting the time.
'use strict'

const assert = require('assert-fine')
const { format } = require('util')

const MAXN = BigInt(Number.MAX_SAFE_INTEGER)

const print = msg => process.stdout.write(msg)

const usecsFrom = t0 => {
  const t1 = process.hrtime(t0)
  return (t1[0] * 1e9 + t1[1]) / 1000
}

const execute = (label, fn, ...args) => {
  const t0 = process.hrtime()
  let result = fn.apply(null, args)
  const usecs = Math.floor(usecsFrom(t0)) + ''

  if (typeof result === 'bigint' && result < MAXN) {
    result = Number(result)
  }

  print(format('\n%s: %o\n\telapsed: %s µsecs\n',
    label, result, usecs.padStart(15)))
}

execute.assert = assert

execute.hook = (callback)=>{
  assert.hook(callback)
  return assert
}

module.exports = execute
