'use strict'

const rawInput = require('./data/day_06').split('\n\n')

/** @type {string[][][]} */
const input = rawInput.map(group => Array.from(group.split('\n').map(person => Array.from(person))))

let total = 0

for (const group of input) {
  const yes = new Set()

  for (const answers of group) {
    for (const answer of answers) {
      yes.add(answer)
    }
  }
  total += yes.size
}

console.log('Q1: number of questions with at least one Y answer from a group', total)

total = 0

for (const group of input) {
  const yes = new Set(group[0])

  for (let i = 1; i < group.length; ++i) {
    for (const y of yes) {
      if (!group[i].includes(y)) yes.delete(y)
    }
  }
  total += yes.size
}

console.log('Q2: number of questions with Y answer from all members of group', total)
