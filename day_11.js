'use strict'

const rawInput = []
//  The actual input
rawInput[0] = require('./data/day_11')
//  The 1-st example
rawInput[1] = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`

const rows = m => m.forEach(row => console.log(row.join('')))

const round = (matrix, puzzle) => {
  const h = matrix.length, w = matrix[0].length
  const limit = puzzle === 1 ? 5 : 6   //  Including yourself!
  const freq = new Array(h)

  for (let i = 0; i < h; ++i) freq[i] = new Uint16Array(w)

  const affect = (i, j, di, dj) => {
    for (let m = 0; ++m;) {
      if (m > 1 && puzzle === 1) break
      const row = i + m * di, col = j + m * dj
      if (row < 0 || row >= h) break
      if (col < 0 || col >= w) break
      if (matrix[row][col] !== '.') {
        freq[row][col] += 1
        break
      }
    }
  }

  for (let i = 0; i < h; ++i) {
    for (let j = 0; j < w; ++j) {
      if (matrix[i][j] === '#') {
        affect(i, j, -1, -1)
        affect(i, j, -1, 0)
        affect(i, j, -1, 1)
        affect(i, j, 0, -1)
        affect(i, j, 0, 0)
        affect(i, j, 0, 1)
        affect(i, j, 1, -1)
        affect(i, j, 1, 0)
        affect(i, j, 1, 1)
      }
    }
  }
  // rows(freq)

  for (let i = 0; i < h; ++i) {
    for (let j = 0; j < w; ++j) {
      if (matrix[i][j] !== '.') {
        const f = freq[i][j]
        if (f === 0) {
          matrix[i][j] = '#'
        } else if (f >= limit) {matrix[i][j] = 'L'}
      }
    }
  }

  let count = 0

  for (let i = 0; i < h; ++i) {
    for (let j = 0; j < w; ++j) {
      if (matrix[i][j] === '#') {
        ++count
      }
    }
  }
  // rows(matrix)
  return count
}

const run = (puzzle) => {
  let input = rawInput[0].split('\n'), res

  input = input.map(row => row.split(''))

  for (let i = 0; i < 140; ++i) {   //  Just beg enough number by trial/error
    res = round(input, puzzle)
    // console.log(res)
  }
  return res
}

console.log(run(1), '\nQ1')

console.log(run(2), '\nQ2')
