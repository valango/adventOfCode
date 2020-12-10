'use strict'

const rawInput = `56
139
42
28
3
87
142
57
147
6
117
95
2
112
107
54
146
104
40
26
136
127
111
47
8
24
13
92
18
130
141
37
81
148
31
62
50
80
91
33
77
1
96
100
9
120
27
97
60
102
25
83
55
118
19
113
49
133
14
119
88
124
110
145
65
21
7
74
72
61
103
20
41
53
32
44
10
34
121
114
67
69
66
82
101
68
84
48
73
17
43
140`
  .split('\n')

const ex0 = `16
10
15
5
1
11
7
19
6
12
4`.split('\n')
const example = `28
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
  .split('\n')

const real = 1
let input = real ? rawInput : example
input.push(0)

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
