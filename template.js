'use strict'

const rawInput = []
//  The actual input
rawInput[0] = require('./day_.data')
//  The 1-st example
rawInput[1] = ``
//  The 2-nd example
rawInput[2] = ``

let INPUT = 0                       //  Input data selector.

const execute = require('./execute')
const assert = execute.hook(() => {
  console.log('--- BREAKPOINT ---') //  Yeah, sometimes I have to use this!
})

const tr = s => {
  let v = s.replace(/a/g, '0').replace(/b/g, '1')
  return Number.parseInt(v, 2)
}

const algorithm1 = () => {
  return
}

const algorithm2 = () => {
  return
}

const compute = algorithm => {
  let input = rawInput[INPUT].split('\n\n')

  input = input.map(v => tr(v)).sort((a, b) => a - b)

  return algorithm(input)
}

execute('puzzle #1', compute, algorithm1)
execute('puzzle #2', compute, algorithm2)

/*
**PROJECT TITLE:** $project_title

**DESCRIPTION:** $short_desc_here_(max_140_characters)

**SUBMITTED BY:** /u/$your_username{, $submitter2, $submitter3...}

**MEGATHREADS:** [$day1]($link1) [$day2]($link2) [$day3]($link3) [$day4]($link4) [$day5]($link5) {...}

***

**SUBMISSION:**

{$your_text_submission_here}

***

**ADDITIONAL COMMENTS:**

{$include_more_details_if_necessary}
*/
