'use strict'

const rawInput = []
//  The actual input
rawInput[0] = require('./day_.data')
//  The 1-st example
rawInput[1] = ``
//  The 2-nd example
rawInput[2] = ``

const assert = require('assert-fine')
assert.hook(() => {
  console.log('breakpoint place')
})

const tr = s => {
  let v = s.replace(/a/g, '0').replace(/b/g, '1')
  return Number.parseInt(v, 2)
}

let input = rawInput[1].split('\n\n')

input = input.map(v => tr(v)).sort((a, b) => a - b)

const q1 = (vi) => {
  return vi
}

console.log('Q1', q1(input))

process.exit(0)

const q2 = (vi) => {
  return vi
}

console.log('Q2', q2(input))

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
