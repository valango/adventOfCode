'use strict'

const rawInput = []
//  The actual input
rawInput[0] = require('./day_14.data')
//  The 1-st example
rawInput[1] = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`
//  The 2-nd example
rawInput[2] = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`

let INPUT = 0                       //  Input data selector.

const assert = require('assert-fine')
assert.hook(() => {
  console.log('breakpoint place')   //  Yeah, sometimes I have to use this!
})

const algorithm1 = (mem, aMask, addr, value) => {
  let bit = 1n

  //  Typing '35' instead of '36' cost me about a hour... :/
  for (let i = 0; i < 36; ++i, bit <<= 1n) {
    if (aMask[i] === '0') {
      value &= ~bit
    } else if (aMask[i] === '1') {
      value |= bit
    }
  }
  mem.set(addr, value)
}

const algorithm2 = (mem, aMask, addr, value) => {
  for (let i = 0, bit = 1n; i < 36; ++i, bit <<= 1n) {
    if (aMask[i] === '1') addr |= bit
  }

  const variants = [addr]

  const add = (v) => {
    if (!variants.includes(v)) variants.push(v)
  }

  for (let i = 0, bit = 1n; i < 36; ++i, bit <<= 1n) {
    if (aMask[i] !== 'X') continue

    for (let i = 0, n = variants.length, v; i < n; ++i) {
      v = variants[i]
      add(v | bit)
      add(v & ~bit)
    }
  }

  for (const a of variants) {
    mem.set(a, value)
  }
}

const compute = (algorithm) => {
  const mem = new Map()
  const M = 'mask = ', L = M.length
  let lines = rawInput[INPUT].split('\n'), aMask = 0

  for (let i = 0, line; (line = lines[i]) !== undefined; ++i) {
    if (line.indexOf(M) === 0) {
      aMask = Array.from(line.substring(L)).reverse()
      assert(aMask.length === 36, line, i)
    } else {
      const r = /^mem\[(\d+)]\s=\s(\d+)$/.exec(line)
      assert(r, line, i)

      let value = BigInt(r[2] * 1), addr = BigInt(r[1])

      algorithm(mem, aMask, addr, value)
    }
  }

  let sum = 0n
  for (const value of mem.values()) {
    sum = (sum + value)
  }
  return sum
}

console.log('Q1', compute(algorithm1)) // 14925946402938n

console.log('Q2', compute(algorithm2)) // 3706820676200
