'use strict'
const THIS = 'day_18'

const rawInput = []
//  The actual input
rawInput[0] = require('./data/' + THIS)
//  The 1-st example
rawInput[1] = `1 + 2 * 3 + 4 * 5 + 6
1 + (2 * 3) + (4 * (5 + 6))`
//  The 2-nd example
rawInput[2] = ``

const { datasetNumber, execute } = require('./execute')

//  A really simple interpreter - just evaluate the leftmost tuple
//  and replace with the result.
const algorithm1 = (input) => {
  let text = input

  for (let r; (r = /^\s*(\d+)\s*([+*])\s*(\d+)/.exec(text));) {
    const v = r[2] === '*' ? (1 * r[1]) * (1 * r[3]) : (1 * r[1]) + (1 * r[3])
    text = v + text.substring(r[0].length)
  }
  return text
}

//  An 'advanced' one - the '+' is more important than '*'.
const algorithm2 = (input) => {
  let text = input, r, v

  while ((r = /\s*(\d+)\s*\+\s*(\d+)/.exec(text))) {
    v = (1 * r[1]) + (1 * r[2])
    text = text.substring(0, r.index) + v + text.substring(r.index + r[0].length)
  }

  while ((r = /\s*(\d+)\s*\*\s*(\d+)/.exec(text))) {
    v = (1 * r[1]) * (1 * r[2])
    text = text.substring(0, r.index) + v + text.substring(r.index + r[0].length)
  }
  return text
}

const compute = (inputNumber, algorithm) => {
  let lines = rawInput[inputNumber].split('\n')

  return lines.reduce((acc, line, num) => {
    let text = line, r

    //  Find the innermost parentheses and replace with their computed value.
    while ((r = /\(([^()]+)\)/.exec(text)) !== null) {
      const flat = algorithm(r[1])
      text = text.substring(0, r.index) + flat + text.substring(r.index + r[0].length)
    }

    text = algorithm(text)    //  Compute the flattened expression.
    inputNumber && console.log(`${num}:`, line, '-->', text)

    return acc + 1 * text.trim()
  }, 0)
}

execute('puzzle #1', compute, datasetNumber, algorithm1)
execute('puzzle #2', compute, datasetNumber, algorithm2)
/*
puzzle #1: 53660285675207
	elapsed:            6895 µsecs

puzzle #2: 141993988282687
	elapsed:            6371 µsecs
*/
