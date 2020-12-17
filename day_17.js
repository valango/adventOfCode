//  day_17
'use strict'
const rawInput = []
//  The actual input
rawInput[0] = `...#..#.
.....##.
##..##.#
#.#.##..
#..#.###
...##.#.
#..##..#
.#.#..#.`
//  The 1-st example
rawInput[1] = `.#.
..#
###`

const { format } = require('util')
const execute = require('./execute')

const parseInputLine = rows => {
  const cubes = new Set()

  for (let y = 0, row; (row = rows[y]) !== undefined; ++y) {
    for (let x = 0, v; (v = row[x]) !== undefined; ++x) {
      if (v === '#') cubes.add(format('%i %i %i %i', x, y, 0, 0))
    }
  }
  return cubes
}

/**
 * @param {number[]} p            - point coordinates
 * @param {number} [dimensions=3]
 * @returns {number[][]}          - coordinates array
 */
const getPossiblePeersOf = (p, dimensions) => {
  const peers = []

  for (let i = -1; i < 2; ++i) {
    for (let j = -1; j < 2; ++j) {
      for (let k = -1; k < 2; ++k) {
        if (dimensions === 4) {
          for (let l = -1; l < 2; ++l) {
            if (!(i || j || k || l)) continue
            peers.push([p[0] + i, p[1] + j, p[2] + k, p[3] + l])
          }
        } else {
          if (!(i || j || k)) continue
          peers.push([p[0] + i, p[1] + j, p[2] + k, 0])
        }
      }
    }
  }
  return peers
}

/** @returns {number} */
const countNeighbors = (dimensions, state, point, next) => {
  let count = 0
  const toBeChecked = getPossiblePeersOf(point, dimensions)

  toBeChecked.forEach((p) => {
    const key = format('%i %i %i %i', p[0], p[1], p[2], p[3])

    if (state.has(key)) {
      ++count
    } else if (next && !state.has(key)) {
      next.add(key)
    }
  })
  return count
}

//  Runs a simulation cycle.
const algorithm1 = (oldState, dimensions = 3) => {
  const newState = new Set(), theNextPossibleSet = new Set()

  oldState.forEach(key => {
    const coords = key.split(' ').map(v => 1 * v)
    const count = countNeighbors(dimensions, oldState, coords, theNextPossibleSet)
    if (count === 2 || count === 3) newState.add(key)
  })
  theNextPossibleSet.forEach(key => {
    const coords = key.split(' ').map(v => 1 * v)
    const count = countNeighbors(dimensions, oldState, coords)
    if (count === 3) newState.add(key)
  })
  return newState
}

//  Inter-dimensional travel has never been easier... ;)
const algorithm2 = (oldState) => {
  return algorithm1(oldState, 4)
}

const compute = (dataSet, algorithm, cycles = 6) => {
  //  Set of 'x y z'
  let state = parseInputLine(rawInput[dataSet].split('\n'))

  for (let i = 0; i < cycles; ++i) {
    state = algorithm(state)
  }
  return state.size
}

execute('puzzle #1', compute, 0, algorithm1)
execute('puzzle #2', compute, 0, algorithm2)
/*
puzzle #1: 269
	elapsed:           59668 µsecs

puzzle #2: 1380
	elapsed:         1225149 µsecs
 */
