//  day_16.js
'use strict'

const rawInput = []
//  The actual input
rawInput[0] = require('./day_16.data')
//  The 1-st example
rawInput[1] = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`
//  The 2-nd example
rawInput[2] = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`

const execute = require('./execute')
const assert = execute.hook(() => {
  console.log('--- BREAKPOINT ---') //  Yeah, sometimes I have to use this!
})

const parse = input => {
  const blocks = input.split('\n\n')
  let rules = {}, ruls, myTicket, others

  ruls = blocks[0].split('\n')

  ruls.forEach((row, i) => {
    let r = /^([^:]+):\s+(\d+)-(\d+)\s+or\s+(\d+)-(\d+)$/.exec(row)
    assert(r, '%i: %o', i, row)
    const key = r[1]
    assert(rules[key] === undefined, i, 'dup')
    rules[key] = [r[2], r[3], r[4], r[5]].map(v => 1 * v)
  })

  myTicket = blocks[1].split('\n')[1].split(',').map(v => 1 * v)
  others = blocks[2].split('\n').slice(1).map(s => s.split(',').map(v => 1 * v))

  return { rules, myTicket, others }
}

//  Scans for error rate, find bad tickets as by-product.
const algorithm1 = ({ rules, others }) => {
  let rate = 0, bads = new Set()

  for (let i = 0, ticket; (ticket = others[i]) !== undefined; ++i) {
    for (const value of ticket) {
      let ok = false
      for (const rule in rules) {
        const limits = rules[rule]
        if (value >= limits[0] && value <= limits[1] ||
          value >= limits[2] && value <= limits[3]) {
          ok = true
          break
        }
      }
      if (!ok) {
        bads.add(i)
        rate += value
      }
    }
  }
  return { rate, bads }
}

//  Scan the valid tickets, and
//  find the exact match between rules and columns, and
//  compute the magic number requested.
const algorithm2 = (rules, tickets, myTicket) => {
  const ruleNames = Reflect.ownKeys(rules)
  const rulesArray = ruleNames.map(key => rules[key])
  const fieldsCount = tickets[0].length
  //  columnIndex -> possible rule numbers
  const mayFit = tickets[0].map(() => ruleNames.map((v, i) => i))

  for (const ticket of tickets) {
    for (let ic = 0, v; (v = ticket[ic]) !== undefined; ++ic) {
      //  Check all hypotheses for given column.
      const hypos = mayFit[ic]
      for (let hi = 0, hypo; (hypo = hypos[hi]) >= 0; ++hi) {
        const [a, b, c, d] = rulesArray[hypo]
        if ((v >= a && v <= b) || v >= c && v <= d) continue
        // exclude the rule from hypos
        hypos.splice(hi, 1)
        hi -= 1
      }
    }
  }
  //  Review the hypotheses, excluding the exact fits from all others.
  let changed, exactColumns = [], exactRules = []
  do {
    changed = false

    for (let ic = 0; ic < fieldsCount; ++ic) {
      if (exactColumns.includes(ic)) continue

      const variants = mayFit[ic]
      if (variants.length === 1) {
        exactColumns.push(ic)
        exactRules.push(variants[0])
        changed = true
        continue
      }
      for (let i = 0, ruleIndex; (ruleIndex = variants[i]) !== undefined; ++i) {
        if (exactRules.includes(ruleIndex)) {
          variants.splice(i, 1)
          changed = true
        }
      }
    }
  } while (changed)

  assert(exactColumns.length === fieldsCount, 'exactColumns.length')
  assert(exactRules.length === ruleNames.length, 'exactRules.length')

  //  Do the required magic.
  const depRules = ruleNames.map((n, i) => [n, i])
    .filter(v => v[0].indexOf('departure') === 0).map(v => v[1])

  let product = 1

  for (const ruleIndex of depRules) {
    const i = exactRules.indexOf(ruleIndex)
    const ic = exactColumns[i]
    product *= myTicket[ic]
  }
  return product
}

const compute = (dataSet, algorithm) => {
  let input = parse(rawInput[dataSet])

  let { bads, rate } = algorithm1(input)
  if (algorithm === algorithm1) return rate

  const valids = input.others.filter((v, i) => !bads.has(i))
  valids.push(input.myTicket)

  return algorithm2(input.rules, valids, input.myTicket)
}

execute('puzzle #1', compute, 1, algorithm1)
execute('puzzle #2', compute, 0, algorithm2)
/*
puzzle #1: 71
	elapsed:             675 µsecs

puzzle #2: 1429779530273
	elapsed:           29247 µsecs
*/
