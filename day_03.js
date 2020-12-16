'use strict'

const input = require('./data/day_03').split('\n')
// const codes = input.map(s => Number.parseInt('0' + s.replace(/\./g, '0').replace(/#/g, '1'), 2))

const width = input[0].length

const qz1 = () => {
  let count = 0, pos = 0

  for (const row of input) {
    if (row[pos] === '#') count += 1
    if ((pos += 3) >= width) pos -= width
  }
  return count
}

const slope = (right, down) => {
  let count = 0, pos = 0, i = 0, row

  while ((row = input[i]) !== undefined) {
    if (row[pos] === '#') count += 1
    if ((pos += right) >= width) pos -= width
    i += down
  }
  return count
}

const qz2 = () => {
  const a = slope(1, 1)
  const b = slope(3, 1)
  const c = slope(5, 1)
  const d = slope(7, 1)
  const e = slope(1, 2)
  console.log(a, b, c, d, e, a * b * c * d * e)
}

qz2()
// console.log(qz1())
