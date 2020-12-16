'use strict'

const input = require('./data/day_05').replace(/F|L/g, '0').replace(/B|R/g, '1').split('\n')
const codes = input.map(c => Number.parseInt(c, 2))

const maxID = Math.max.apply(null, codes)

console.log('max', maxID, '\n', maxID.toString(2))

const minID = Math.min.apply(null, codes)

console.log('min', minID, '\n', minID.toString(2).padStart(10, '0'))

for (let i = minID; i < maxID; ++i) {
  if (!codes.includes(i)) console.log('My seat', i)
}
