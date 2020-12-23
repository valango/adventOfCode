'use strict'
const THIS = 'day_23'

const rawInput = []
//  The actual input
rawInput[0] = '253149867' // require('./data/' + THIS)
//  The 1-st example
rawInput[1] = '389125467'
//  The 2-nd example
rawInput[2] = `21`

const { assert, debug, execute } = require('./execute')

assert.hook(() => {
  console.log('--- BREAKPOINT ---') //  Yeah, sometimes I have to use this!
})

//  --- End of boilerplate ---

//  Simulate a round.
//  A simplistic code, not currently used.
const move1 = (data, roundNumber) => {
  let { currentIndex, cups, maxUsed } = data, picks, iDest
  const currentValue = cups[currentIndex]
  const old = debug && cups.slice()

  const trace = () => {
    console.log('-- move %i --', roundNumber)
    console.log('cups: ' + old.map((v, i) => i === currentIndex ? `(${v})` : v).join(' '))
    console.log('picks: ' + picks.join(' ') + ' dest: ' + cups[iDest])
  }

  const nextIndex = i => ++i < maxUsed ? i : 0

  const getPicks = () => {
    picks = []
    for (let n = 0, i = currentIndex; n < 3; ++n) {
      i = nextIndex(i)
      picks.push(cups[i])
      cups[i] = undefined
    }
  }

  const indexOfDest = () => {
    let v = currentValue, i

    for (; ;) {
      if (--v <= 0) v = maxUsed
      if ((i = cups.indexOf(v)) < 0) {
        continue
      }
      if (i === currentIndex) continue
      iDest = i
      return
    }
  }

  getPicks()
  cups = cups.filter(v => v !== undefined)
  indexOfDest()
  if (debug) trace()

  cups.splice(iDest + 1, 0, ...picks)
  data.currentIndex = nextIndex(cups.indexOf(currentValue))
  data.cups = cups
}

//  Instead of directly manipulating the `cups`, build a new array using a locator.
const move2 = (data, roundNumber) => {
  let { currentIndex, cups, maxValue, virtual } = data, dest
  const currentValue = cups[currentIndex], old = cups.slice()
  //  Indexes [...pick] to the `old` array.
  const loc = new Int32Array(3)

  const trace = () => {
    console.log('-- move %i --', roundNumber)
    console.log('cups: ' + old.map((v, i) => i === currentIndex ? `(${v})` : v).join(' '))
    console.log('picks: ' + loc.map(i => old[i]).join(' ') + ' dest: ' + dest)
  }

  const nextIndex = i => ++i < cups.length ? i : 0

  const getPicks = () => {
    for (let n = 0, i = currentIndex; n < 3; ++n) {
      if (++i < old.length) {                 //  We still have items left.
        // picks.push(cups[i])
        loc[n] = i
      } else if (virtual[0] < virtual[1]) {   //  Take the next value not used yet.
        // picks.push(++maxUsed)
        loc[n] = old.length
        old.push(++virtual[0])
      } else {
        // console.log('********', i, virtual)
        // picks.push(cups[i = 0])
        loc[n] = i = 0
      }
      // cups[i] = undefined
    }
  }

  const getDest = () => {
    let v = currentValue, i

    for (; ;) {
      if (--v <= 0) {
        v = maxValue
      }
      if ((i = old.indexOf(v)) < 0) {
        if (v === virtual[1] && virtual[0] < virtual[1]) {
          return old.push(dest = v) && virtual[1]--
        }
        assert(0, 'max value under-run', v, old.length, virtual[0], virtual[1])
      }
      if (i !== currentIndex && !loc.includes(i)) {
        return dest = v
      }
    }
  }

  getPicks()
  // cups = cups.filter(v => v !== undefined)
  getDest()
  if (debug) trace()

  cups = []
  for (let i = 0, v; i < old.length; ++i) {
    if (!loc.includes(i)) {
      cups.push(v = old[i])
      if (v === dest) {
        loc.forEach(j => cups.push(old[j]))
        dest = 0
      }
    }
  }
  // cups.splice(iDest + 1, 0, ...picks)
  data.currentIndex = nextIndex(cups.indexOf(currentValue))
  data.cups = cups
  if (roundNumber === 10000) {
    return roundNumber
  }
  //  well, it appears we have a growing reverse interval in the array end.
}

const algorithm1 = (labeling, limit) => {
  const cups = Array.from(labeling).map(v => v * 1)
  let maxValue = Math.max.apply(0, cups)
  const data = {
    cups,                               //  Array of allocated cups.
    currentIndex: 0,                    //  Index of the current cup.
    maxValue,
    virtual: [maxValue, maxValue]
  }

  for (let n = 1; n <= limit; ++n) {
    move2(data, n)
  }

  const res = [], nextIndex = i => ++i < data.cups.length ? i : 0

  for (let i0 = data.cups.indexOf(1), i = i0; (i = nextIndex(i)) !== i0;) {
    res.push(data.cups[i])
  }

  console.log(data.cups)
  return res.join('')
}

const algorithm2 = (labeling, limit) => {
  const maxValue = 1000000                   //  Test only
  const cups = Array.from(labeling).map(v => v * 1)
  let maxUsed = Math.max.apply(0, cups)
  // while(maxUsed < 8070) cups.push(++maxUsed)
  const data = {
    cups,                               //  Array of allocated cups.
    currentIndex: 0,                    //  Index of the current cup.
    maxValue,
    virtual: [maxUsed, maxValue]
  }

  for (let n = 1; n <= limit; ++n) {
    move2(data, n)
  }
  const nextIndex = i => ++i < data.maxUsed ? i : 0

  console.log(data.cups.length, data.maxUsed)
  console.log(data.cups.slice(0, 10))
  let i = data.cups.indexOf(1)
  console.log(i, data.cups.slice(i, 10))
  const v1 = data.cups[i = nextIndex(i)]
  const v2 = data.cups[nextIndex(i)]
  i = data.cups.indexOf(1)
  console.log(i, v1, v2)
  return v1 * v2
}

const compute = (algorithm, dataSet, limit) => {
  return algorithm(rawInput[dataSet], limit)
}

execute('puzzle #1', compute, algorithm1, 0, 100)
// (1, 10) -> 92658374; (1, 100) -> 67384529; () -> 34952786
execute('puzzle #2', compute, algorithm2, 0, 10000000)

/*
puzzle #1 / dataset 0: '34952786'
  t:         604 µsecs
  2198 2453
*/
