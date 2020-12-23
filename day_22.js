'use strict'
const THIS = 'day_22'

const rawInput = []
//  The actual input
rawInput[0] = require('./data/' + THIS)
//  The 1-st example
rawInput[1] = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`
//  The 2-nd example
rawInput[2] = ``

const { assert, debug, execute } = require('./execute')

assert.hook(() => {
  console.log('--- BREAKPOINT ---') //  Yeah, sometimes I have to use this!
})
//  --- End of boilerplate ---

const trace = (decks, rounds, level) => {
  rounds[level - 1] += 1
  console.log(`-- Round ${rounds[level]} (level ${level}) --`)
  decks.forEach((d, i) => console.log(i + 1 + ': ' + (d.length && d.join(' ') || 'empty')))
}

const decideWinner = cards => cards.reduce((r, v, i) => v > r[0] ? [v, i] : r, [0, 0])[1]

//  Returns values of the topmost cards or the empty deck index.
const dealCardsFrom = decks => decks.reduce(
  (top, deck, i) => typeof top === 'number' ? top
    : (deck[0] > 0 ? top.push(deck[0]) && top : i), [])

//  The current winner consumes everything on table.
const grabCards = (cards, decks, winner) => {
  decks[winner].push(cards[winner])
  if (!(cards instanceof Array)) {
    return
  }
  cards.forEach((v, i) => i === winner || decks[winner].push(cards[i]))
}

//  Solves the part #1. Returns a defined value on end.
const algorithm1 = (decks, data) => {
  const cards = dealCardsFrom(decks)

  if (debug) trace(decks, data.rounds, 1)
  if (typeof cards === 'number') {
    return 0
  }
  decks.forEach(deck => deck.shift())

  grabCards(cards, decks, data.winner = decideWinner(cards))
}

const hash = decks => decks.map((d, i) => i + ': ' + d.join(' ')).join(', ')

//  Solves the part #2. Returns a defined value on end.
//  NB: I managed to break this code after solving the puzzle!
const algorithm2 = (decks, data) => {
  let v
  const { rounds } = data, level = rounds.length, key = hash(decks)

  if (debug) trace(decks, rounds[level - 1], level)
  if (typeof (v = dealCardsFrom(decks)) === 'number') {
    return 0        //  There was direct assignment to data.cards, causing a crash!
  }
  data.cards = v    //  Todo: fix the algorithm!
  if (data.history.has(key) && data.history.get(key) <= level) {
    return (data.winner = 0)                //  Part 2, rule 1
  }
  data.history.set(key, level)

  decks.forEach(deck => deck.shift())
  data.winner = decideWinner(data.cards)

  if (decks.every((deck, i) => {            //  Check the rule 3.
    return deck.length >= data.cards[i]
  })) {
    const copies = data.cards.map((n, i) => decks[i].slice(0, n))
    rounds.push(0)
    while (algorithm2(copies, data) === undefined) {}
    rounds.pop()
  }
  grabCards(data.cards, decks, data.winner)
}

const parseInput = input => {
  const lines = input.split('\n')
  assert(/^Player\s\d:$/.test(lines[0]), 'syntax:', lines[0])
  return lines.slice(1).map(s => 1 * s)
}

const compute = (algorithm, dataSet) => {
  const decks = rawInput[dataSet].split('\n\n').map(v => parseInput(v))
  const recent = { history: new Map(), rounds: [0] }

  while (algorithm(decks, recent) === undefined) {}

  return decks[recent.winner].reverse().reduce((r, v, i) => r + v * (i + 1), 0)
}

execute('puzzle #1', compute, algorithm1)
execute('puzzle #2', compute, algorithm2)
/*
puzzle #1 / dataset 0: 32783
  t:         911 µsecs
  P1: 2365,  P2: 1830

puzzle #2 / dataset 0: 33455
  t:     2783425 µsecs
puzzle #1 / dataset 1: 306
	elapsed:             501 µsecs

  P1: 5012,  P2: 2935
*/
