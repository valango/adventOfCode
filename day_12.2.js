//  Puzzle 12.1:
//  Move ship (x,y) according to instructions (cmd, val), where cmd:
//  North,East,South,West: change ship direction vector;
//  Left, Right: rotate ship direction vector by amount of degrees;
//  Forward: move ship by amount of steps on direction vector.
//
//  The initial direction vector is [10, 1]
//  Find the Manhattan distance the ship moved.
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

const q2 = () => {
  let x = 0, y = 0, direction = [10, 1]

  for (let i = 0; input[i] !== undefined; ++i) {
    let [cmd, v] = input[i]

    switch (cmd) {
      case 'F':
        x += v * direction[0]
        y += v * direction[1]
        break
      case 'L':
        v = 360 - v
      // Fall through
      case 'R':
        switch (v) {
          case 0:
            break
          case 90:
            direction = [direction[1], -direction[0]]
            break
          case 180:
            direction = [-direction[0], -direction[1]]
            break
          case 270:
            direction = [-direction[1], direction[0]]
            break
          default:
            assert(0, 'bad angle [%i]', i, input[i])
        }
        break
      case 'N':
        direction[1] += v
        break
      case 'E':
        direction[0] += v
        break
      case 'S':
        direction[1] -= v
        break
      case 'W':
        direction[0] -= v
        break
      default:
        assert(0, 'bad command [%i]', i, input[i])
    }
  }
  return { x, y, d: Math.abs(x) + Math.abs(y) }
}

assert.hook(() => {
  console.log('breakpoint')
})

console.log('Q1', q2())
