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

const execute = (label, fn, ...args) => {
  const t0 = process.hrtime(), n = exports.datasetNumber
  let result = fn.apply(null, args)
  const usecs = Math.floor(usecsFrom(t0)) + ''

  if (typeof result === 'bigint' && result < MAXN) {
    result = Number(result)
  }

  print(format('\n%s / dataset %i: %o\n  t:%s µsecs\n',
    label, n, result, usecs.padStart(12)))
}

const assertionHook = (callback) => {
  assert.hook(callback)
  return assert
}
const appName = basename(require.main.filename)
const usage = `usage: node ${appName} [<number-of-dataset>] [help] [debug]\n`

let datasetNumber = 0, debug = false, help

if (process.argv.length > 2) {
  for (const arg of process.argv.slice(2)) {
    if (arg[0] === 'd') {
      debug = true
    } else if (arg[0] === 'h') {
      help = true
    } else {
      datasetNumber = 1 * arg
    }
  }
  if(help){
    process.stdout.write(usage)
    process.exit(0)
  }
  if (!(datasetNumber >= 0)) {
    process.stderr.write(`bad arguments: '` + process.argv.slice(2).join( ' ') + `'\n`)
    process.stdout.write(usage)
    process.exit(1)
  }
}

exports = module.exports = execute

Object.assign(exports,
  { assert, assertionHook, datasetNumber, debug, execute }
)
