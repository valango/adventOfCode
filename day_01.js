'use strict'

const nums = require('./data/day_01').split('\n').map(s => 1 * s)

const len = nums.length

for (let i = 0; i < len; ++i) {
  const a = nums[i], b = 2020 - a
  if (nums.slice(i).includes(b)) {
    console.log(a, b, a * b)
  }
} /* Q1.1 */

const sorted = nums.sort((a, b) => a - b), v3 = Math.floor(2020 / 3)

const fn = () => {
  for (let i0 = 0; i0 < len; ++i0) {
    const v0 = nums[i0]
    if (v0 > v3) {
      console.log('shit')
      return
    }
    for (let i1 = i0 + 1; i1 < len; ++i1) {
      const v1 = nums[i1]
      for (let i2 = i1 + 1; i2 < len; ++i2) {
        const v2 = nums[i2], v = v0 + v1 + v2
        if (v === 2020) {
          console.log(v0, v1, v2, v0 * v1 * v2)
          return
        }
      }
    }
  }
}

fn()
/* Q1.2 */
