'use strict'
const THIS = 'day_20'

const rawInput = []
//  The actual input
rawInput[0] = require('./data/' + THIS + '.0')
//  The 1-st example
rawInput[1] = require('./data/' + THIS + '.1')
//  The 2-nd example
rawInput[2] = ``

const { assert, datasetNumber, execute } = require('./execute')

assert.hook(() => {
  console.log('--- BREAKPOINT ---') //  Yeah, sometimes I have to use this!
})
//  --- End of boilerplate ---

let tiles, tileWidth, tileHeight, sideLength
let cornerIndexes

//  Contiguous array of cube edges: [top, top.inv, r. r.inv, ...] - 8 values per tile.
//  Index to this array contains all the information needed for image composition, too.
let edges

//  Add the original edge and its reverse value to the edges array.
const addEdge = s => {
  edges.push(s) && edges.push(Array.from(s).reverse().join(''))
}

const parseInput = lines => {
  const block = lines.split('\n'), rows = block.slice(1)
  let id = /^Tile\s(\d+):$/.exec(block[0])

  assert(id, 'syntax', lines[0])
  id = id[1] * 1

  tileHeight = rows.length
  tileWidth = rows[0].length

  addEdge(rows[0])
  addEdge(rows.map(r => r.slice(tileWidth - 1)).join(''))
  addEdge(Array.from(rows[tileHeight - 1]).reverse().join(''))
  addEdge(rows.map(r => r.slice(0, 1)).reverse().join(''))

  return { id, rows }
}

const algorithm1 = () => {
  const freq = new Map(), uniqueEdgesNumber = new Int32Array(tiles.length)

  edges.forEach(v => freq.set(v, 1 + (freq.get(v) || 0)))
  freq.forEach((f, key) => {
    if (f === 1) {
      const j = edges.indexOf(key)
      uniqueEdgesNumber[j >> 3] += 1
    }
  })
  //  A lucky hack: there was exactly 4 tiles with 2 unique edges each...
  //  in the _real_ dataset! ;)
  cornerIndexes = []

  for (let i = 0; i < uniqueEdgesNumber.length; ++i) {
    if (uniqueEdgesNumber[i] === 4) {
      cornerIndexes.push(i)
    }
  }

  assert(cornerIndexes.length === 4, '%i corners detected!', cornerIndexes.length)

  return cornerIndexes.reduce((a, i) => a * tiles[i].id, 1)
}

const algorithm2 = () => '--- not implemented ---'

const compute = (algorithm, dataSet = datasetNumber) => {
  edges = []
  tiles = rawInput[dataSet].split('\n\n').map(parseInput)

  sideLength = Math.floor(Math.sqrt(tiles.length))
  assert((sideLength * sideLength) === tiles.length, 'width')

  let answer = algorithm1()

  return algorithm === algorithm1 ? answer : algorithm2()
}

execute('puzzle #1', compute, algorithm1)
execute('puzzle #2', compute, algorithm2)
/*
puzzle #1 / dataset 0: 4006801655873
	elapsed:            3637 µsecs

puzzle #2 / dataset 0: 'not implemented'
	elapsed:            2470 µsecs
*/
