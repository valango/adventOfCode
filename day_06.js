'use strict'

const input = require('./data/day_06').split('\n\n')

let counts = []
let total = 0

for (const group of input) {
  const acc = {}
  for (let i = 0, c; (c = group[i]) !== undefined; ++i) {
    if (c >= 'a' && c <= 'z') {
      acc[c] = acc[c] || 1
    }
  }
  const n = Reflect.ownKeys(acc).length
  counts.push(n)
  total += n
}

console.log('sum', total, counts)

counts = []
total = 0

for (const group of input) {
  const answers = group.split('\n')
  const yes = {}
  answers[0].split('').forEach(k => yes[k] = 1)

  for (let i = 1; i < answers.length; ++i) {
    Reflect.ownKeys(yes).forEach(k => {
      if (!answers[i].includes(k)) delete yes[k]
    })
  }
  const n = Reflect.ownKeys(yes).length
  counts.push(n)
  total += n
}
console.log('sum', total, counts)
