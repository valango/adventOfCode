'use strict'

const rawInput = require('./data/day_08').split('\n')

const examp = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`
  .split('\n')

const assert = require('assert-fine')

const real = 1
let input = real ? rawInput : examp

const program = []

for (const str of input) {
  const r = /^(\w+)\s(.)(\d+)/.exec(str)
  assert(r, 'BAD', str)
  let v = r[3] * ((r[2] === '-') ? -1 : 1)
  program.push([r[1], v])
}

const exec = (prog) => {
  const nums = new Set(), top = prog.length
  let acc = 0, i = 0, last, loop = false, high = 0, jmpM = 0, nopM = 0

  while (prog[i] !== undefined) {
    if ((loop = nums.has(i))) break
    nums.add(last = i)
    high = Math.max(i, high)
    const [cmd, val] = prog[i]
    switch (cmd) {
      case 'acc':
        acc += val
        break
      case'nop':
        // if ((val + i) >= top)
        nopM = Math.max(i, nopM)
        break
      case'jmp':
        jmpM = Math.max(i, jmpM)
        i += val
        continue
      default:
        assert(0, 'Unknown', cmd)
    }
    i += 1
  }
  return { acc, i, last, high, loop, jmpM, nopM }
}

let res = exec(program)

console.log('Q1', res.acc)

for (let i = program.length; --i >= 0;) {
  const cmd = program[i][0]
  if (cmd === 'jmp') {
    program[i][0] = 'nop'
  } else if (cmd === 'nop') {
    program[i][0] = 'jmp'
  } else {
    continue
  }

  const res = exec(program)
  if (!res.loop) {
    console.log(res)
    break
  }
  program[i][0] = cmd
}

console.log('all')
