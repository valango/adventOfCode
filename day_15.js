'use strict'

const rawInput = []
//  The actual input
rawInput[0] = [2, 0, 1, 9, 5, 19]
//  The 1-st example
rawInput[1] = [0, 3, 6]
//  The 2-nd example
rawInput[2] = [2, 3, 1]

let INPUT = 0                      //  Input data selector.

const execute = require('./execute')

let diffOfLastSpoken

const algorithm1 = (said, value, turn, firstEound) => {
  let say

  if (firstEound) {
    say = value
    diffOfLastSpoken = 0
  } else {
    say = diffOfLastSpoken
    diffOfLastSpoken = said.has(say) ? turn - said.get(say) : 0
  }
  said.set(say, turn)

  return say
}

const compute = (algorithm, interesting) => {
  let input = rawInput[INPUT], num
  const spoken = new Map(), len = input.length

  for (let i = 0; i < interesting; ++i) {
    const j = i % len
    num = algorithm(spoken, input[j], i, i < len)
  }
  return num
}

execute('puzzle #1', compute, algorithm1, 2020)
execute('puzzle #2', compute, algorithm1, 30000000)
//  puzzle #1: 1009
// 	  elapsed:             547 µsecs
//
//  puzzle #2: 62714
// 	  elapsed:         5476375 µsecs

// 5567 golds, 1391 silvers by that time
