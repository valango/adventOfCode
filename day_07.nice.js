'use strict'

const rawInput = require('./data/day_07').split('\n')

const assert = require('assert-fine')

let real = 1
let example = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`
  .split('\n')

const dict = new Map()   //  of records: [count, key, ...]

for (const string of (real ? rawInput : example)) {
  let key, r = /^(.+)\sbags\scontain\s([^.]+)\.$/.exec(string)

  assert(r, 'Bad input: %o', string)

  if (dict.has(key = r[1])) {
    console.log('duplicate: %o in %o:', key, string)
  }
  const members = dict.get(key) || []

  for (const member of r[2].split(', ')) {
    r = /^(\d+)\s(.+)\sbag(s?)/.exec(member)
    if (r) members.push(r[1] * 1, r[2])
  }
  dict.set(key, members)
}

//  Finds all options directly containing the given color.
const outersFor = (color) => {
  const containers = []

  for (const [key, contents] of dict.entries()) {
    if (contents.includes(color)) containers.push(key)
  }
  return containers
}

//  Computes the number of options containing the given color.
const variants = (color) => {
  const outers = [color]

  for (let i = 0, c; (c = outers[i]) !== undefined; ++i) {
    outersFor(c).forEach(c => outers.includes(c) || outers.push(c))
  }
  return outers.length - 1
}

console.log('Q1', variants('shiny gold'))

//  Computes the number of bags the given one must contain altogether.
const contains = (givenColor) => {
  let inners = [[1, givenColor]], total = 0

  for (const [count, color] of inners) {
    let contents = dict.get(color), factor

    contents.forEach(v => {
      if (typeof v === 'number') {
        total += (factor = v * count)
      } else {
        inners.push([factor, v])
      }
    })
  }
  return total
}

console.log('Q2', contains('shiny gold'))
