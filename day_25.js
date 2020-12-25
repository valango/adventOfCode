'use strict'
module.exports = ``

const THIS = 'day_25'

const rawInput = []
//  The actual input
rawInput[0] = [14788856, 19316454]
//  The 1-st example
rawInput[1] = [5764801, 17807724]
//  The 2-nd example
rawInput[2] = ``

const { assert, execute } = require('./execute')

assert.hook(() => {
  console.log('--- BREAKPOINT ---') //  Yeah, sometimes I have to use this!
})

//  --- End of boilerplate ---
const MAGIC = 20201227

const computeKey = (loopSize, subNumber = 7) => {
  let n = 0, v = 1

  while (++n <= loopSize) v = (v * subNumber) % MAGIC

  return v
}

//  This one takes forever w real dataset.
const bruteForceGuess = pubKey => {
  let loopSize = 1, v

  while ((v = computeKey(loopSize, 7)) !== pubKey) loopSize++

  return loopSize
}


//  This works almost correctly, but explodes the stack!
const guess2 = (pubKey) => {
  let steps = 1

  if (pubKey <= 7) return steps
  for (let n = 1, v = pubKey; ; ++n) {
    if ((v % 7) === 0) {
      ++steps
      return guess2(v / 7)
    }
    v += MAGIC
  }
}

const guess = key => {
  let steps = 1, v
  const stack = [key]

  for (; (v = stack.pop()) !== undefined;) {
    if (v <= 7) {
      if (v === 7) break
    }
    while ((v % 7) !== 0) {
      v += MAGIC
    }
    ++steps
    stack.push(v / 7)
  }
  return steps
}

const algorithm1 = (pubKeys) => {
  const loopSizes = pubKeys.map(guess)
  const keys = pubKeys.map((pbk, i) => computeKey(loopSizes[i ^ 1], pbk))
  return keys[0] === keys[1] ? keys[0] : '?'
}

const compute = (algorithm, dataSet) => {
  return algorithm(rawInput[dataSet])
}

execute('puzzle #1', compute, algorithm1) // + argument defaults (dataset, ...)
// execute('puzzle #2', compute, algorithm2)

/*
puzzle #1 / dataset 0: 545789
  t:      667117 µsecs
4450 1216
*/
