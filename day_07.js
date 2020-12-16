'use strict'

const rawInput = require('./data/day_07').split('\n')

const dict = {}   //  key: [n, key, ...]
let real = 1
let exam = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`
  .split('\n')

for (const string of (real ? rawInput : exam)) {
  let r = /^(.+)\sbags\scontain\s([^.]+)\.$/.exec(string)
  if (!r) {
    console.log('BAD', string)
    process.exit(1)
  }
  let key = r[1]
  if (dict[key]) {
    console.log('in use: ', key)
  }
  let members = dict[key] || [], conts = r[2].split(', ')

  for (const cont of conts) {
    r = /^(\d+)\s(.+)\sbag(s?)/.exec(cont)
    if (r) members.push(r[1] * 1, r[2])
  }
  dict[key] = members
}

//  Finds all options directly containing the given color.
const outersFor = (color) => {
  const containers = []
  for (let key in dict) {
    if (dict[key].includes(color)) containers.push(key)
  }
  return containers
}

//  Computes the number of options containing the given color.
const variants = (color) => {
  let outers = [color]
  // const vars = new Set(outers)

  for (let i = 0, c; (c = outers[i]) !== undefined; ++i) {
    let outs = outersFor(c)
    outs.forEach(c => outers.includes(c) || outers.push(c))
    // outs.forEach(c => vars.has(c) ||  (outers.push(c) && vars.add(c)))
  }
  return outers.length - 1
  // return vars.size - 1
}

console.log('Q1', variants('shiny gold'))

//  Computes the number of bags the given one must contain altogether.
const contains = (color) => {
  // const vars = new Set()

  let inners = [[1, color]], count = 0
  // vars.add(color)

  for (let i = 0, col, n; (col = inners[i]) !== undefined; ++i) {
    n = col[0], col = col[1]
    let contents = dict[col], factor
    contents.forEach(v => {
      if (typeof v === 'number') {
        count += (factor = v * n)
      } else /* if (!vars.has(v)) */ {
        inners.push([factor, v])
        // vars.add(v)
      }
    })
  }
  return count
}

console.log('Q2', contains('shiny gold'))

//  My clever idea to use a Set actually caused contains() to fail by skipping some variants.
//  So I commented this stuff out from everywhere.
//  Now, after calming down, I can see the global dictionary itself should be a Map instance.
