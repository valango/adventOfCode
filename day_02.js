'use strict'
const assert = require('assert')

const input = require('./data/day_02').split('\n')

const toTest = input.map(s => {
  const r = /^(\d+)-(\d+)\s+(\w):\s+(\w+)/.exec(s)
  assert(r, s)
  return { a: r[1], b: r[2], c: r[3], pwd: r[4] }
})

/*
const cnt = (c, pwd) => {
  let n = 0, i = 0, v
  while ((v = pwd[i++]) !== undefined) {
    if (v === c) n += 1
  }
  return n
}
const fn = () => {
  let count = 0

  for (const { a, b, c, pwd } of toTest) {
    const n = cnt(c, pwd)
    if (n <= b && n >= a) ++count
  }
  return count
} /* Q 2.1 */

const fn = () => {
  let count = 0

  for (const { a, b, c, pwd } of toTest) {
    if (pwd[a - 1] === c) {
      if (pwd[b - 1] !== c) ++count
    } else if (pwd[b - 1] === c) ++count
  }
  return count
}

console.log(fn())
