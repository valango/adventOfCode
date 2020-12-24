'use strict'
module.exports = ``

const THIS = 'day_24'

const rawInput = []
//  The actual input
rawInput[0] = require('./data/' + THIS)
//  The 1-st example
rawInput[1] = `sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew`
//  The 2-nd example
rawInput[2] = `nwwswee`

const { assert, execute } = require('./execute')

assert.hook(() => {
  console.log('--- BREAKPOINT ---') //  Yeah, sometimes I have to use this!
})
//  --- End of boilerplate ---

//  Directions stuff.
const dirs = [[0, 2], [0, -2], [-1, 1], [-1, -1], [1, 1], [1, -1]]
const add = ([a, b], [c, d]) => [a + c, b + d]
const shf = (r, [c, d]) => {
  r[0] += c
  r[1] += d
}
const regExp = /^(e)?(w)?(ne)?(nw)?(se)?(sw)?/

//  Parse one line into tile coordinate.
const parseLine = line => {
  let xy = [0, 0]

  for (let s = line, r; s && (r = regExp.exec(s)) && r[0];) {
    const i = r.findIndex((v, i) => i && v) - 1
    assert(i >= 0, 'dirs')
    assert(dirs[i], 'dirs1')
    const d = dirs[i]
    shf(xy, d)
    s = s.slice(r[i + 1].length)
  }
  return xy
}

/**
 * Computes the tiles w black side up.
 * @param {Set} blacks
 * @param {number[][]} tilesToFlip
 */
const algorithm1 = ({ blacks, tilesToFlip }) => {
  for (const xy of tilesToFlip) {
    const key = xy.join(',')
    if (blacks.has(key)) {
      blacks.delete(key)
    } else {
      blacks.add(key)
    }
  }
}

/**
 * Simulates one day
 * @param {Object<{blacks:Set}>} shared
 */
const algorithm2 = (shared) => {
  let old = shared.blacks, blacks = shared.blacks = new Set(), q
  const whites = new Map()

  for (const thisKey of old.values()) {
    const xy = thisKey.split(',').map(s => 1 * s)
    const blacksNearBlack = dirs.reduce((n, d) => {
      const key = add(xy, d).join(',')
      if (old.has(key)) {
        ++n
      } else {
        whites.set(key, (whites.get(key) || 0) + 1)
      }
      return n
    }, 0)
    if (!(blacksNearBlack === 0 || blacksNearBlack > 2)) blacks.add(thisKey)
  }
  for (const [key, n] of whites.entries()) {
    assert(!blacks.has(key), 'already')
    assert(!old.has(key), 'was')
    if (n === 2) {
      blacks.add(key)
    }
  }
}

const compute = (algorithm, dataSet) => {
  const shared = {
    blacks: new Set(),
    tilesToFlip: rawInput[dataSet].split('\n').map(v => parseLine(v))
  }

  algorithm1(shared)

  if (algorithm === algorithm2) {
    for (let n = 1; n <= 100; ++n) {
      algorithm(shared)
    }
  }
  return shared.blacks.size
}

execute('puzzle #1', compute, algorithm1) // + argument defaults (dataset, ...)
execute('puzzle #2', compute, algorithm2)

/*
puzzle #1 / dataset 0: 351
  t:       12098 µsecs

puzzle #2 / dataset 0: 3869
  t:      454501 µsecs
2827 991
3890 1018
*/
