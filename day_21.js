'use strict'
const THIS = 'day_21'

const rawInput = []
//  The actual input
rawInput[0] = require('./data/' + THIS)
//  The 1-st example
rawInput[1] = `mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`
//  The 2-nd example
rawInput[2] = ``

const { assert, execute } = require('./execute')

assert.hook(() => {
  console.log('--- BREAKPOINT ---') //  Yeah, sometimes I have to use this!
})

const shared = {}     //  Shared namespace for results forwarding.

//  --- End of boilerplate ---

//  Find the ingredients possibly not using any of allergens in foods list.
//  Return the total count these ingredients are used in foods list.
const algorithm1 = namespace => {
  const { foods } = namespace

  const ingredientsSet = new Set(
    foods.reduce((all, { ingredients }) => all.concat(ingredients), [])
  )

  const possibleUses = new Map()

  for (const { allergens } of foods) {
    for (const allergen of allergens) possibleUses.set(allergen, new Set(ingredientsSet))
  }

  //  If allergen is declared in food, delete all it's uses not in food.ingredients.
  for (const [alg, ings] of possibleUses.entries()) {
    for (const food of foods) {
      if (food.allergens.includes(alg)) {
        for (const ing of ings) {   //  Iterator is created _before_ the looping. ;)
          if (!food.ingredients.includes(ing)) ings.delete(ing)
        }
      }
    }
  }

  //  Remove all ingredients is use, leaving the possibly inert ones.
  for (const ings of possibleUses.values()) {
    for (const ing of ings) ingredientsSet.delete(ing)
  }

  let totalMentioned = 0    //  How many times the inert ingredients appeared in foods.

  for (const { ingredients } of foods) {
    for (const ing of ingredients) totalMentioned += ingredientsSet.has(ing)
  }

  Object.assign(namespace, { possibleUses })

  return totalMentioned
}

//  Find allergen is actually used in every ingredient.
//  Create list of ingredients sorted by their allergen, like : 'mxmxvkd,sqjhc,fvjkl'
const algorithm2 = namespace => {
  const { possibleUses } = namespace, ingredients = {}

  for (let alg, using; ; using = undefined) {
    for (const [allergen, uses] of possibleUses.entries()) {
      alg = allergen
      for (using of uses) {}        //  The keys() returns an iterator!
      if (uses.size === 1) break
      using = undefined
    }

    if (!using) break

    ingredients[alg] = using
    possibleUses.delete(alg)

    for (const uses of possibleUses.values()) uses.delete(using)
  }

  return Reflect.ownKeys(ingredients).sort().map(k => ingredients[k]).join(',')
}

const parseInput = line => {
  let r = assert(/^(.+)\s\(contains\s(.+)\)$/.exec(line), 'bad input', line)
  return { allergens: r[2].split(', '), ingredients: r[1].split(' ') }
}

const compute = (algorithm, dataSet) => {
  const input = rawInput[dataSet].split('\n')

  if (!shared.foods) {
    shared.foods = input.map(line => parseInput(line))
    return algorithm1(shared)
  }
  return algorithm(shared)
}

execute('puzzle #1', compute, algorithm1)
execute('puzzle #2', compute, algorithm2)

/*
puzzle #1 / dataset 0: 2436
	elapsed:            5745 µsecs
	7551 322
puzzle #2 / dataset 0: 'dhfng,pgblcd,xhkdc,ghlzj,dstct,nqbnmzx,ntggc,znrzgs'
	elapsed:             219 µsecs
	7962 336
*/
