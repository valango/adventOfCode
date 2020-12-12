//  Puzzle 12.1:
//  Move ship (x,y) according to instructions (cmd, val), where cmd:
//  North,East,South,West: move ship in given direction w/o changing ship direction;
//  Left, Right: change ship direction by amount of degrees w/o moving it;
//  Forward: move ship in current direction by amount of steps.
//
//  Find the manhattan distance the ship moved.
'use strict'

const rawInput = []
//  The actual input
rawInput[0] = require('./day_12.data')
//  The 1-st example
rawInput[1] = `F10
N3
F7
R90
F11`

const assert = require('assert-fine')

const tr = s => {
  return [s[0], s.substring(1) * 1]
}

let input = rawInput[0].split('\n').map(tr)

const q1 = () => {
  let dir = 1, x = 0, y = 0

  for (let i = 0; input[i] !== undefined; ++i) {
    let [d, v] = input[i], j

    //  Compute direction.
    if ('RL'.indexOf(d) >= 0) {
      v /= 90
      //  The good code.
      dir = (dir + (d === 'L' ? -v : v)) & 3
      //  The buggy code.
      // if (d === 'L') v += 2
      // dir = (dir + v) % 4
      continue
    }
    j = 'NESWF'.indexOf(d)
    assert(j >= 0, d, v)
    if (j === 4) {
      j = dir
    }
    if (j === 0) {
      y += v
    } else if (j === 1) {
      x += v
    } else if (j === 2) {
      y -= v
    } else {
      x -= v
    }
  }
  return { x, y, d: Math.abs(x) + Math.abs(y) }
}

assert.hook(() => {
  console.log('breakpoint place')
})

console.log('Q1', q1())
