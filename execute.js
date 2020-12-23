//  Checks the command line for the dataset number (defaults to 0);
//  runs a puzzle solution, reports the elapsed time.
'use strict'

const { basename } = require('path')
const { format } = require('util')
const assert = require('assert-fine')

const MAXN = BigInt(Number.MAX_SAFE_INTEGER)

const print = msg => process.stdout.write(msg)

const usecsFrom = t0 => {
  const t1 = process.hrtime(t0)
  return (t1[0] * 1e9 + t1[1]) / 1000
}

const appName = basename(require.main.filename)
const usage = `usage: node ${appName} [dataset-number, ...] [help] [debug]\n`

let cliArgs = [], debug = false, help

//  label, fn, algorithm, ...defaults)
const execute = (label, fn, ...parms) => {
  let args = [0], [algorithm, ...defaults] = parms

  if (typeof algorithm !== 'function') defaults = parms, algorithm = undefined

  for (let i = 0; i < defaults.length; ++i) {
    args[i] = i < cliArgs.length ? cliArgs[i] : defaults[i]
  }

  const t0 = process.hrtime()
  let result = algorithm ? fn(algorithm, ...args) : fn(...args)
  const usecs = Math.floor(usecsFrom(t0)) + ''

  if (typeof result === 'bigint' && result < MAXN) {
    result = Number(result)
  }

  print(format('\n%s / dataset %i: %o\n  t:%s µsecs\n',
    label, args[0], result, usecs.padStart(12)))
}

const assertionHook = (callback) => {
  assert.hook(callback)
  return assert
}

if (process.argv.length > 2) {
  let bad = false, v
  for (const arg of process.argv.slice(2)) {
    if (arg[0] === 'd') {
      debug = true
    } else if (arg[0] === 'h') {
      help = true
    } else {

      cliArgs.push(v = 1 * arg)
      if (!(v >= 0)) bad = true
    }
  }
  if (help) {
    process.stdout.write(usage)
    process.exit(0)
  }
  if (bad) {
    process.stderr.write(`bad cliArgs: '` + process.argv.slice(2).join(' ') + `'\n`)
    process.stdout.write(usage)
    process.exit(1)
  }
}

exports = module.exports = execute

Object.assign(exports,
  { assert, assertionHook, debug, execute }
)
