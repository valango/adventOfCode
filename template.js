'use strict'

const rawInput = ``
  .split('\n\n')

const rules = {
  a: /\a:(\d{4})\s/,
  z: /^z$/
}

const tr = s => {
  let v = s.replace(/a/g, '0').replace(/b/g, '1')
  return Number.parseInt(v, 2)
}

//  forin forof itar ritar sw try log

const real = 1
let input = real ? rawInput : []
input = input.map(v => tr(v)).sort((a, b) => a - b)

const q1 = (vi) => {
  return vi
}

console.log('Q1', q1(input))

process.exit(0)

const q2 = (vi) => {
  return vi
}

console.log('Q2', q2(input))
