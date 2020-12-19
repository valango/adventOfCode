//  Solution copied from:
//  @link(https://gist.github.com/p-a/a2a59736d358ae4b7f8bba23043157a2)
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
rawInput[2] = require('./data/day_19_2')

const { datasetNumber, execute } = require('./execute')

const algorithm1 = (ruleLines, messages) => {
  const rulesMap = ruleLines.map(r => r.split(': ')).reduce(
    (m, [key, def]) => m.set(key, def[0] === '"'
      ? def[1]
      : def.split(' | ').map(part => part.split(' '))
    ), new Map())

  const isValid = (msg, [rule, ...rest]) => {
    if (!rule) return !msg

    const next = rulesMap.get(rule)

    return next instanceof Array
      ? next.some(r => isValid(msg, r.concat(rest)))
      : msg[0] === next && isValid(msg.slice(1), rest)
  }

  return messages
    .map(msg => rulesMap.get('0').some(r => isValid(msg, r))).filter(Boolean).length
}

const algorithm2 = (ruleLines, messages) => {
  ['8: 42 | 42 8', '11: 42 31 | 42 11 31'].forEach(r => ruleLines.push(r))

  return algorithm1(ruleLines, messages)
}

const compute = (algorithm, dataSet = datasetNumber) => {
  const [ruleLines, messages] = rawInput[dataSet].split('\n\n').map(s => s.split('\n'))

  return algorithm(ruleLines, messages)
}

execute('puzzle #1', compute, algorithm1)
execute('puzzle #2', compute, algorithm2)

/*
0: 203
1: 225 too low
1: 304 is correct!
*/
// by #1: 3305 1879
