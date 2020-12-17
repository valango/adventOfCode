## Getting N-dimensional

I ran out of imagination, but here is an idea from another guy
(@flwyd [reddit](https://www.reddit.com/r/adventofcode/comments/keqsfa/2020_day_17_solutions/)).

Language: kotlin.

```
data class DimensionalCube(private val coordinates: List<Int>) {
  fun neighbors(): Sequence<DimensionalCube> {
    suspend fun SequenceScope<DimensionalCube>.recurse(prefix: List<Int>) {
      val position = prefix.size
      if (position == coordinates.size) {
        if (prefix != coordinates) { // cube isn't a neighbor to itself
          yield(DimensionalCube(prefix))
        }
      } else {
        for (i in coordinates[position] - 1..coordinates[position] + 1) {
          recurse(prefix + i)
        }
      }
    }
    return sequence { recurse(listOf()) }
  }
}

fun countActiveAfter(rounds: Int, dimensions: Int, initialState: Sequence<String>): Int {
  var prevActive = initialState.withIndex().flatMap { (x, line) ->
    line.toCharArray().withIndex().filter { it.value == '#' }.map { it.index }
      .map { y -> DimensionalCube(listOf(x, y, *Array(dimensions - 2) { 0 })) }
  }.toSet()
  repeat(rounds) {
    // Active cells remain active with 2 or 3 neighbors, inactive cells become active with 3
    prevActive =
      prevActive.flatMap(DimensionalCube::neighbors).groupingBy { it }.eachCount()
        .filter { (cube, count) -> count == 3 || (count == 2 && cube in prevActive) }.keys
  }
  return prevActive.size
}

```
