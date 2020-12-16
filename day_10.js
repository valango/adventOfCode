//  20.10
'use strict'

const rawInput = []
//  The actual input
rawInput[0] = require('./data/day_10')
//  The 1-st example
rawInput[1] = `16
10
15
5
1
11
7
19
6
12
4`
//  The 2-nd example
rawInput[2] = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`

let input = rawInput[0].split('\n')
input.push(0)   //  Make the power source a part of input array.

input = input.map(v => 1 * v).sort((a, b) => a - b)

//  Find the count of 1 and 3 step intervals between adapter ratings.
const q1 = () => {
  let d1 = 1, d3 = 1, last = 0, d

  for (const v of input) {
    d = v - last
    if (v && d === 0) console.log('THE SAME!', v)
    if (last) {
      if (d === 3) {
        ++d3
      } else if (d === 1) ++d1
    }
    last = v
  }
  return { d1, d3 }
}

const end = Math.max.apply(0, input) + 3
console.log('device', end)
const a1 = q1(input)
console.log('Q1:', a1.d1 * a1.d3)

//  Find number of all possible adapter sequences.

let reachables = [[end, 1]], variantsCount

for (let i = input.length, v; (v = input[--i]) !== undefined;) {
  const max = v + 3
  reachables = reachables.filter(([w]) => w <= max)
  variantsCount = reachables.reduce((a, [, n]) => a + n, 0)
  reachables.push([v, variantsCount])
}

console.log('Q2', variantsCount)
