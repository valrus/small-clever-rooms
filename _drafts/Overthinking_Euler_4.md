---
layout: post.images.math.html
title: Overthinking Project Euler #4
tags: [math]
summary: 
---

So I'm doing some mentoring for this thing called [exercism](https://exercism.io/)
that's basically a combination programming exercise/code review site,
and I came across a solution to a problem that said this:

> Given a range of numbers, find the largest and smallest palindromes which are products of numbers within that range.

For example, if the range is 1 to 12,
you're looking in what is for many people the standard multiplication table
that you have to memorize in elementary school for palindromes,
shown here with half omitted since for the purposes of this problem
we want to ignore duplicates.

<a href="{{ get_asset('images/posts/Overthinking_Euler_4/mult12.png') }}" rel="bytebox">
    <img class="fullwidth" src="{{ get_asset('images/posts/Overthinking_Euler_4/mult12.png') }}" />
</a>

The largest palindrome in there is 121 and the smallest is 1.
Fine, OK. If you _happen_ to be familiar with Project Euler,
this is basically [Project Euler problem #4](https://projecteuler.net/problem=4)
except for the Project Euler problem the range is fixed at 100 to 999
and in the Exercism one you need to be able to solve it regardless of the range.
Project Euler requires a single integer answer to each problem
so it can be checked automatically,
whereas Exercism has a whole test suite for each problem
and trusts its users not to submit solutions that don't pass it
or, at least, its mentors to double check.

Alright, fine. So I download this one solution and run the test suite.
It takes 78 seconds to run 12 tests
and at first I think it's got an infinite loop or something.
But no, it's just that one of the tests uses the range 1000 to 9999,
which means if you try to brute force this
and check every available product to see if it's a palindrome,
you're gonna be doing that about 80 million times.

So I tell the person, hey, this takes over a minute to run,
consider trying to find an algorithm that doesn't do so much unnecessary work.
Since you're only looking for the largest or smallest palindrome,
why not start with the largest or smallest products
so you can stop when you find the first palindrome?

No sooner had I left that comment than I started to think,
Hmm. Did I just give a glib suggestion that was actually bad?
How _would_ you just "start with the largest or smallest products?"
Sorting 80 million numbers isn't better than checking them all for palindromes.
So can you, I asked myself,
just write a function that spits out the products you care about in descending order?

Spoiler alert: the answer is yes, but there are _much_ easier ways
to solve the original problem.
This blog post will be about my attempt to solve that secondary problem
of generating a multiplication table in sorted order.

Say the range we're given is from $m$ to $n$.
It would be ideal to be able to solve this problem in $O((n - m)^2)$ time:
to spit out each item in the multiplication table in constant time.
I got pen and paper and started looking for a pattern.

I found one almost immediately:

<a href="{{ get_asset('images/posts/Overthinking_Euler_4/bad_pattern.png') }}" rel="bytebox">
    <img class="fullwidth" src="{{get_asset('images/posts/Overthinking_Euler_4/bad_pattern.png') }}" />
</a>

"Nice," I said, "I'll implement this tomorrow," and went to bed.

The next day, I picked this up again, started to implement it,
and in the process of engaging some brain cells
beyond the seventeen I'd apparently been employing the previous night,
discovered that the "pattern" I'd found was not so much of one:

<a href="{{ get_asset('images/posts/Overthinking_Euler_4/oh_no_1.png') }}" rel="bytebox">
    <img class="fullwidth" src="{{ get_asset('images/posts/Overthinking_Euler_4/oh_no_1.png') }}" />
</a>

Indeed, it was _very_ not one:

<a href="{{ get_asset('images/posts/Overthinking_Euler_4/oh_no_2.png') }}" rel="bytebox">
    <img class="fullwidth" src="{{ get_asset('images/posts/Overthinking_Euler_4/oh_no_2.png') }}" />
</a>

Folks, never find a pattern that works for half of one test case
and assume it works everywhere.
I shouldn't have needed to be reminded of this, 
but in my defense,
carelessness and hubris _are_ an essential part of the richness of the human condition.

So, is there a pattern at all?
Based on this small example and my shallow knowledge of assorted mathematical subjects,
I suspect the answer is no,
or at least not one concise enough to design a coherent algorithm around.
Why? This isn't a super complicated problem,
sorting a multiplication table.
What makes me suspect that there's no good pattern to be found?
A few reasons:

