'use strict'
const THIS = 'day_19'

const rawInput = []
//  The actual input
rawInput[0] = require('./data/' + THIS)
//  The 1-st example
rawInput[1] = `0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb`
//  The 2-nd example
rawInput[2] = `42: 9 14 | 10 1
9: 14 27 | 1 26
10: 23 14 | 28 1
1: "a"
11: 42 31
5: 1 14 | 15 1
19: 14 1 | 14 14
12: 24 14 | 19 1
16: 15 1 | 14 14
31: 14 17 | 1 13
6: 14 14 | 1 14
2: 1 24 | 14 4
0: 8 11
13: 14 3 | 1 12
15: 1 | 14
17: 14 2 | 1 7
23: 25 1 | 22 14
28: 16 1
4: 1 1
20: 14 14 | 1 15
3: 5 14 | 16 1
27: 1 6 | 14 18
14: "b"
21: 14 1 | 1 14
25: 1 1 | 1 14
22: 14 14
8: 42
26: 14 22 | 1 20
18: 15 15
7: 14 5 | 1 21
24: 14 1

abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa
bbabbbbaabaabba
babbbbaabbbbbabbbbbbaabaaabaaa
aaabbbbbbaaaabaababaabababbabaaabbababababaaa
bbbbbbbaaaabbbbaaabbabaaa
bbbababbbbaaaaaaaabbababaaababaabab
ababaaaaaabaaab
ababaaaaabbbaba
baabbaaaabbaaaababbaababb
abbbbabbbbaaaababbbbbbaaaababb
aaaaabbaabaaaaababaa
aaaabbaaaabbaaa
aaaabbaabbaaaaaaabbbabbbaaabbaabaaa
babaaabbbaaabaababbaabababaaab
aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba`

const { assert, datasetNumber, execute } = require('./execute')

assert.hook(() => {
  console.log('--- BREAKPOINT ---') //  Yeah, sometimes I have to use this!
})

const inputLines = []
const lexemes = [], rules = new Map()
const dictionary = new Map(), reverse = new Map()

let visited = new Set(), show

//  Returns the length of match from the beginning.
const match = (rule, input) => {
  let res = 0, key

  if (typeof rule === 'number') {     //  Just a rule ID.
    key = rule + ':' + input.map(v => reverse.get(v)).join('')
    // if (rule === 11) console.log('B', key)

    if (!visited.has(key)) {
      visited.add(key)  //  Detect if a rule with the same input is cycling...

      if (lexemes.includes(rule)) {   //  The rule ID is a terminal symbol.
        if (rule === input[0]) res = 1
      } else {
        res = match(rules.get(rule), input)
      }
    } else {
      console.log('REC', key)  //  ... this never happened!
      key = undefined
    }

  } else {
    if (typeof rule[0] === 'number') {  //  Array of rule ID-s: all must match.
      let index = 0
      for (const part of rule) {
        if (!(res = match(part, input.slice(index)))) break
        index += res
      }
      if (res) res = index
    } else {                            //  Array of rules: just one must match.
      for (const part of rule) {
        if ((res = match(part, input))) break
      }
    }
  }
  if (show && res && typeof rule !== 'number') console.log(rule, input, '->', res)
  if (key) {
    visited.delete(key)
  }
  // if (rule === 11) console.log('E', rule, res)
  return res
}

const makeRules = (input) => {
  let line, i = 0, r

  while ((line = input[i++]) !== undefined) {
    if ((r = /^(\d+):\s+(.+)$/.exec(line))) {
      let ruleNum = r[1] * 1, rule
      if ((r[2][0] * 1) >= 0) {
        rule = r[2].split('|').map(p => p.trim().split(' ').map(s => 1 * s))
        rules.set(ruleNum, rule)
      } else {
        assert((r = /^"(\S)"/.exec(r[2])), 'syntax2')
        dictionary.set(r[1], ruleNum)
        reverse.set(ruleNum, r[1])
        lexemes.push(ruleNum)
      }
    } else {
      assert(line === '', 'syntax1')
      break
    }
  }

  return i
}

const compute = (input) => {
  let sum = 0

  for (let i = 0; (input[i]) !== undefined; ++i) {
    visited.clear()
    let y = match(0, input[i]), l = input[i].length
    // console.log('***** %i: %s', i, input[i].map(v => reverse.get(v)).join(''), '--->', y, l, y === l)
    y = y === l
    if (y) {
      ++sum
      // console.log('***** %i: %s', i, input[i].map(v => reverse.get(v)).join(''))
    }
  }

  return sum
}

const compute1 = (dataSet = datasetNumber) => {
  let input = rawInput[dataSet].split('\n')

  input = input.slice(makeRules(input))

  input.forEach(line => inputLines.push(Array.from(line).map(v => dictionary.get(v))))

  return compute(inputLines)
}

const compute2 = () => {
  makeRules(['8: 42 | 42 8', '11: 42 31 | 42 11 31'])
  return compute(inputLines)
}

execute('puzzle #1', compute1)
execute('puzzle #2', compute2)

/*
0: 203
1: 225 wrong
*/
// by #1: 3305 1879
