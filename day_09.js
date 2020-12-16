'use strict'

const rawInput = require('./data/day_09').split('\n')

const example = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`
  .split('\n')

const inp2 = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`.split('\n').map(v => 1 * v)

//  forin forof itar ritar sw try log

const real = 1
let input = real ? rawInput : example

const blockSize = real ? 25 : 5
input = input.map(v => 1 * v)

//  Find a number which is not a sum of any numbers in preceding block.
const q1 = () => {
  let first = -blockSize, val, found = false

  for (let i = 0; (val = input[i]) !== undefined; ++i, ++first) {
    found = false
    if (first < 0) continue

    for (let j = first, v0; j < i; ++j) {
      v0 = val - input[j]
      if (v0 < 0) continue
      for (let k = j + 1; k < i; ++k) {
        if (input[k] === v0) {
          found = true
          j = k = i
        }
      }
    }
    if (!found) {
      return val
    }
  }
}

//  A little hairy code here, bcs there was TWO example inputs in this puzzle.
const badNum = real ? q1(input) : 127
console.log('Q1', badNum)

//  Find a contiguous sequence summing up to the 'bad' value from step #1
const q2 = (nums) => {
  const len = nums.length

  for (let i = 0; i < len; ++i) {
    let sum = nums[i]
    if (sum >= (badNum - 1)) continue
    for (let k = i + 1; k < len; ++k) {
      if ((sum += nums[k]) === badNum) {
        return nums.slice(i, k + 1)
      }
      if (sum > badNum) break
    }
  }
}

const seq = q2(real ? input : inp2)
const a = Math.max.apply(null, seq), b = Math.min.apply(null, seq)
console.log('sequence', seq)

console.log('min %i, max %i\nQ2: sum %i', a, b, a + b)
