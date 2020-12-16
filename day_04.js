'use strict'

const input = require('./data/day_04').split('\n\n')

const scans = input.map(s => ' ' + s.replace(/\n+/g, ' ') + ' ')

const hasField = (scan, prefix) => {
  const l = 4, i = scan.indexOf(prefix)
  return (i >= 0 && scan[i + l]) ? 1 : 0
}

const qz1 = () => {
  let count = 0

  for (const scan of scans) {
    const n = 'byr: iyr: eyr: hgt: hcl: ecl: pid:'.split(' ')
      .reduce((a, p) => a + hasField(scan, p), 0)
    if (n === 7) ++count
  }
  console.log(scans.length, count)
}

qz1()

const rules = {
  byr: /\sbyr:(\d\d\d\d)\s/,
  iyr: /\siyr:(\d\d\d\d)\s/,
  eyr: /\seyr:(\d\d\d\d)\s/,
  hgt: /\shgt:(\d+)(cm|in)\s/,
  hcl: /\shcl:#([a-f\d]{6})\s/,
  ecl: /\secl:(amb|blu|brn|gry|grn|hzl|oth)\s/,
  cid: /\scid:(\d+)\s/,
  pid: /\spid:(\d{9})\s/
}

const hgt = { cm: [150, 193], in: [59, 76] }

const chkField = (scan, key) => {
  let lim, res = 0
  const r = rules[key].exec(scan)

  if (r) {
    const v = r[1] * 1

    switch (key) {
      case'byr':
        if (v >= 1920 && v <= 2002) res = 1
        break
      case 'iyr':
        if (v >= 2010 && v <= 2020) res = 1
        break
      case 'eyr':
        if (v >= 2020 && v <= 2030) res = 1
        break
      case 'hgt':
        lim = hgt[r[2]]
        if (lim && v >= lim[0] && v <= lim[1]) res = 1
        break
      case 'ecl':
      case 'hcl':
      case 'pid':
        return 1
      case 'cid':
        return 0
      default:
        res = -1000
    }
  }
  if (res < 1) {
    return res      //  Debug breakpoint.
  }
  return res
}

const qz2 = () => {
  let count = 0

  for (const scan of scans) {
    const n = Reflect.ownKeys(rules).reduce((a, k) => a + chkField(scan, k), 0)
    if (n === 7) ++count
  }
  console.log(scans.length, count)
}

qz2()
