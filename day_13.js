'use strict'

const rawInput = []
//  The actual input
rawInput[0] = require('./day_13.data')
//  The 1-st example
rawInput[1] = `939
7,13,x,x,59,x,31,19`
// 7,13,x,x,59,x,31,19`
//  The 2-nd example
rawInput[2] = ``

let input = rawInput[1].split('\n')
const time0 = input[0] * 1
let ids = input[1].split(',').map(s => s === 'x' ? 0 : s * 1)
// console.log(ids)

const q1 = () => {
  const buses = ids.filter(Boolean)
  const next = []

  for (let i = 0, t; (t = buses[i]) !== undefined; ++i) {
    while (t < time0) t += buses[i]
    next.push([t - time0, i])
  }
  next.sort((a, b) => a[0] - b[0])

  return next[0][0] * buses[next[0][1]]
}

console.log('Q1', q1())

//  This solution worked with sample data, but never made it with real data.
//  I tried some tricks to speed up this brute-force sh*t, but with no success.
//  The right stuff is q22() below. It's amazing!
const q2 = () => {
  let t = 0, found, t1, v

  do {
    for (let i = 0; (v = ids[i]) !== undefined; ++i) {
      t1 = t + i
      if (v !== 0 && (t1 % ids[i]) !== 0) {
        t += 1
        break
      }
    }
    if (v === undefined) {
      found = t
    }
  } while (found === undefined)

  return found
}

//  A working solution:
//  Absolutely beautiful code by @augmented-warlock
//  https://www.reddit.com/r/adventofcode/comments/kc4njx/2020_day_13_solutions/
const q22 = () => {
  const buses = ids.map((id, seq) => id && { id, seq }).filter(Boolean)

  let time = 0
  let multiplier = buses[0].id
  let unsatisfied = 1
  let next

  while (unsatisfied < buses.length) {
    time += multiplier
    next = buses[unsatisfied]

    if ((time + next.seq) % next.id === 0) {
      multiplier *= next.id
      //  The current bus will match all the further time values,
      //  because of its `id` is a factor in repetition and
      //  all this starts from the current initial match!
      unsatisfied++
    }
  }
  return time
}

console.log('\nQ2', q22())

