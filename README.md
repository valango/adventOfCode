# Advent Of Code

My [adventofcode.com](https://adventofcode.com) adventures.

the files named like `day_xx.js` contain daily quiz solutions as they were born -
quick and dirty - with no afterwards-makeup.
Sometimes a `day_xx.nice.js` is there, though.

_**NB:** Somehow, I managed to break the `day_22.js` code. Will get back to this later._ 

### Diary

* `day 04:` joined the races, with just 80 hrs of delay 🐌🐌🐌
* `day 05:` feeling sooo competent 😎
* `day 06:` made _a lot_ of horrible typos... all the time!
* `day 07:` met something like never before - but I made it - yay! 🙃.
* `day 08:` lost 4 hours, sleeping well. Quiz was not too hard, but on part #2,<br />
 I got stuck at my _"super-simple"_ solution for way too long.
* `day 09:` I _hate_ numbers - I always did!
* `day 10:` Almost flunked the part#2, wasting several hours trying to apply a tree traversal
approach that was inadequate. The right solution was much simpler. But, I still hate numbers. 😝
* `day 11:` I love simulations! Lost some time because of invalid looping condition (a typo).
* `day 12:` I was about to go nuts! The puzzle #1 solution worked w example data; but with real data I received:
_"Wrong answer! Curiously enough, this is correct answer for somebody else - make sure you
logged in with right account!"_ After losing an insane amount of time, I finally figured out
there was a tiny error in my ingenious direction computing ([day_12.1.js](day_12.1.js) line 40,41).
<br />This clearly shows, how even testing your code won't guarantee it's correct. 
* `day 13:` The first part was simple, but I failed with the second part -
my solution worked with sample data but did not reach the end with the actual one.
Finally, I used an absolutely fantastic solution from another guy (see code), and it still
took quite an effort to understand how and why it worked. Btw, my initial code worked
correctly, too, when using reasonable initial time value from that one. 😝
* `day 14:` Enjoyed that one - except losing about an hour on part#1 because
of not noticing my typo in looping condition (line 28 of [day_14.js](day_14.js))!<br />
Interesting: the _`algorithm2()`_ in my code would melt down with sample dataset for
the puzzle#1, but works fine with the real data ... I wonder if a good generic solution exists?
* `day 15:` This was an absolutely awesome puzzle! The hardest part was to understand
the wording. I was able to code only after executing the solution path on paper! 
* `day 16:` I liked that one! As usual, typos (inside the _regExpr_ - this time),
were my worst enemies. 👻 👺 💩
* `day 17:` That was even better - a simulation in 4-D hyperspace 🌘 👽 🌒 
is pretty cool - isn't it?<br />
The hyperspace challenge unveiled only after solving the part #1 (3D)
and I felt a strong temptation to write a _generalized n-dimensional 
algorithm_, but it turned out to be a bit too challenging, so I rolled back to fixed dimensions.
* `day 18:` Nothing particularly hard, but... those damn RegExpr lines -
I always leave some tiny 🐛🐛🐛 bugs in there - I might need 🐓🐓🐓 an assistance! 
* `day 19:` _No, no, no!_ Writing yet another [yacc](https://en.wikipedia.org/wiki/Yacc)
from the scratch on Sunday morning is just no fun! Could not make the part #2, because my code
never choked at recursive rules. 🤡
* `day 20:` An exciting one! I was sweating blood, working on general solution,
before I got hint, that there is exactly 4 tiles easily recognizable as corners,
in _the real data_ (not in the example data). Have no time left for the puzzle #2 today. 😑
<br />It always pays off to take a break from coding and play w data.
* `day 21:` I took my time with the puzzle text, but just could not fully understand it.
So I took a nap instead. After this, everything was so much better.
* `day 22:` The part #1 was almost trivial, but it really took some time to understand
the rules of part #2. Perhaps I should play more cards and code less? 🤔
* `day 23:` The part #1 was almost trivial, I made lot of stupid mistakes of course.
I failed to solve the computational complexity problem with #2, though. 🥶
* `day 24:` A relatively simple simulation, similar to day 19.
I wasted some time on my hyper-simple coordinates space presentation, which turned out
to be flawed 😳. Otherwise, it was fun. 🌮🍺
* `day 25:` Omg... yet another number crunching madness! Painfully, I finally
completed the part #1, only to learn I can't get to part#2 w/o solving all the previous
puzzles (I still have 2 pending 😝) first.<br />
_**Merry Christmas, everybody!**_ 🌲🌲🌲🌲🌲✨🌲🌲🌲🌲🌲

### Track record
My ranking placements and final times for puzzle 1 and 2 by days. The '_%_'
column shows the ratio of people done w both puzzles, from all participants,
by the time I made it. Of course the time zone difference gives us
the Europeans (and Africans, too) an unfair advantage here. 😜

| day | Rank 1 | Time 1 | Rank 2 | Time 2 | % |
| ---: | ---: | :---: | ---: | :---: |---: |
| 25 | 5662 | 04:06:02 |  |  |  |
| 24 | 3816 | 01:51:21 | 3751 | 03:00:44 | 3 |
| 23 | 4643 | 03:02:59 |  |  |  |
| 22 | 4163 | 01:02:30 | 5008 | 04:22:07 | **2** |
| 21 | 7867 | 08:50:59 | 7895 | 09:35:48 | 6 |
| 20 | 6655 | 08:15:59 |  |  |  |
| 19 | 5172 | 04:36:09 | 5753 | 09:28:53 |  |
| 18 | 4214 | 01:27:38 | 3477 | 01:48:42 | 3 |
| 17 | 2848 | 01:04:57 | 3667 | 01:50:22 | **2** |
| 16 | 4950 | 00:49:02 | 3362 | 02:30:14 | **2** |
| 15 | 6816 | 01:29:30 | 5554 | 01:33:16 | 4 |
| 14 | 6743 | 01:44:14 | 5484 | 06:36:47 | 4 |
| 13 | 4840 | 00:23:21 | 8208 | 06:36:47 | 5 |
| 12 | 7251 | 01:27:40 | 6781 | 02:16:59 | 5 |
| 11 | 5046 | 00:58:41 | 3947 | 01:18:42 | 3 |
| 10 | 8294 | 00:40:41 | 8831 | 03:26:43 | 7 |
| 9 | 5870 | 00:23:56 | 6821 | 00:51:37 | 6 |
| 8 | 21227 | 04:26:04 | 19390 | 05:28:19 | 17 |
| 7 | 4964 | 00:55:00 | 5006 | 01:29:10 | 4 |
| 6 | 5561 | 00:15:15 | 5897 | 00:32:36 | 6 |
| 5 | **1704** | 00:11:54 | **2684** | 00:22:54 | 7 |
| 4 | 43747 | 11:32:00 | 35730 | 12:21:18 | |
| 3 | 68239 | - | 66053 | - | |
| 2 | 85973 | - | 83496 | -| |
| 1 | 108496 | - | 101541 | - | |

![](quote.png)
