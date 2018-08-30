---
layout: post.math.html
title: Bayesian In-toot-ition
tags: [math]
summary: In which I exorcise an extreme case of someone-is-wrong-on-the-internet-itis.
---

Someone in [the Fediverse](https://fediverse.party/) tooted[^tooted] a probability problem:

[^tooted]:
  The Fediverse is, loosely speaking, a constellation of open source social media replacements,
  of which [Mastodon](https://joinmastodon.org/), on which [I have an account](https://icosahedron.website/@valrus), is one.
  Yes, the analogue of "tweeting" is called "tooting" there.

> A, B and C toot the truth with a probability of 1/3 and lie with a probability of 2/3.
> 
> A makes a toot and B toots an observation on whether or not A was tooting the truth or not. C toots that B confirmed A was truthful.
> 
> What is the actual probability that A's toot was truthful?

If you're into solving this kind of problem,
please stop reading this post and work it out for yourself now.
Subsequent paragraphs will discuss the solution in detail.

## The Obvious Answer

My first guess, and the obvious "this is a trick question" answer,
was ⅓, on the assumption that the only relevant information is in the first sentence.
But I second guessed myself,
because the question seemed naggingly similar to the infamous
[Monty Hall problem](http://marilynvossavant.com/game-show-problem/),
where the "obvious" answer is also wrong,
and quite counterintuitively so to most people including myself.
I worked out the problem in a different way,
and got a different answer.
But the poster of the original toot asserted that the correct answer is ⅓:
the information about B and C is all irrelevant,
and the answer is given to you in the first paragraph.

Still, that feeling of similarity to the Monty Hall problem bothered me,
and though my probability class is pretty far behind me now,
I did dimly recall learning about something called
[Bayesian inference](https://en.wikipedia.org/wiki/Bayesian_inference),
which basically lets you update the probability of a hypothesis
(in this case, "A told the truth")
as you get more information
with the use of a pretty simple equation.

## Bayes'd and Confused

[Bayes's Theorem](https://en.wikipedia.org/wiki/Bayes%27_theorem) isn't generally stated this way,
but I like the following statement of it:
think of $X$ as the event whose probability we're trying to determine
and $E$ as the event that we consider to be evidence for (or against) it.

$$P(X|E) = {P(E|X) \over P(E)} \cdot P(X) $$

Since $P(X|E)$ is the probability that $X$ occurred given that we've observed $E$
and $P(X)$ is the probability of $P(X)$ happening in absence of any other information,
this formulation is nice
because you can think of that factor $P(E|X) / P(E)$ as
the effect that our observing $E$ has on the likelihood that $X$ occurred.

What does that factor mean, though?
First off, it's not a probability.
If $X$ makes $E$ more likely, the numerator will be larger than the demoninator,
so it won't be less than 1 like a good probability should.
But that framing also lets us think of it as a regular old ratio:
since the numerator is "$E$ given $X$" and the demoninator is "$E$ alone,"
the ratio is basically "how much more likely does $X$ make $E$?"
So the full theorem, using this formulation, can be stated as:

> The conditional probability of some event $X$, given some evidence $E$,
> is equal to the unconditional probability of $X$
> times the effect of $X$ on the probability of $E$.

Given that $E$ has _already occurred_,
if we know that $X$'s occurring would have made it more likely,
then we have more reason to believe $X$ itself happened
than in the absence of any information about $E$ (and vice versa).
That's the intuition that Bayes's theorem makes precise;
regardless of whether the intuition is intuitive to you,
the theorem is true,
and I'm going to move on to applying it to the Toot Enigma
and determining whether the answer actually is ⅓.

## The Toot Enigma

Alright, so first off:
there is, I _suppose_, a case to be made that by saying "actual probability,"
the original tooter specifically meant "probability in the absense of any additional evidence,"
in which case all the Bayes stuff is irrelevant and the answer is straightforwardly, indeed _tautologically_ ⅓.
But I think that interpretation of the problem is not only
contrary to how probability problems are usually understood
(if you're trying to determine how likely something is,
wouldn't you _always_ want to take into account all relevant evidence?),
but also _painfully boring_.
So, Bayes to the rescue.

Here, $X$ is the event whose probability we're trying to determine: "A told the truth."
$E$ is the available evidence: "C said B confirmed A told the truth."
Since we're told that $E$ has occurred, we're interested in finding $P(X|E)$.
We're also given that $P(X) = 1/3$.
So to finish the calculation,
we need $P(E)$ and $P(E|X)$.

I made a truth table for this,
to take into account the eight ($2^3$) different combinations
of truth or falsehood on the part of A, B and C.
For each of these, "T" means "told the truth" and "F" means "lied."

+------+---+---+---+--------------+
|Case  |A  |B  |C  |Interpretation|
|number|   |   |   |              |
+:====:+:=:+:=:+:=:+:=============+
|1     |T  |T  |T  |A tells the   |
|      |   |   |   |truth. B      |
|      |   |   |   |confirms it. C|
|      |   |   |   |says B        |
|      |   |   |   |confirmed A.  |
+------+---+---+---+--------------+
|2     |T  |T  |F  |A tells the   |
|      |   |   |   |truth. B      |
|      |   |   |   |confirms it. C|
|      |   |   |   |lies that B   |
|      |   |   |   |didn't confirm|
|      |   |   |   |A.            |
+------+---+---+---+--------------+
|3     |T  |F  |T  |A tells the   |
|      |   |   |   |truth. B says |
|      |   |   |   |A lied. C says|
|      |   |   |   |B says A lied.|
+------+---+---+---+--------------+
|4     |T  |F  |F  |A tells the   |
|      |   |   |   |truth. B says |
|      |   |   |   |A lied. C lies|
|      |   |   |   |that B        |
|      |   |   |   |confirmed A.  |
+------+---+---+---+--------------+
|5     |F  |T  |T  |A lies. B says|
|      |   |   |   |A lied. C says|
|      |   |   |   |B didn't      |
|      |   |   |   |confirm A.    |
+------+---+---+---+--------------+
|6     |F  |T  |F  |A lies. B says|
|      |   |   |   |A lied. C lies|
|      |   |   |   |and says B    |
|      |   |   |   |confirmed A.  |
+------+---+---+---+--------------+
|7     |F  |F  |T  |A lies. B lies|
|      |   |   |   |that A told   |
|      |   |   |   |the truth. C  |
|      |   |   |   |says B        |
|      |   |   |   |confirmed A.  |
+------+---+---+---+--------------+
|8     |F  |F  |F  |A lies. B lies|
|      |   |   |   |that A told   |
|      |   |   |   |the truth. C  |
|      |   |   |   |lies that B   |
|      |   |   |   |didn't confirm|
|      |   |   |   |A.            |
+------+---+---+---+--------------+

First let's find $P(E)$.
$E$ is any case where C says B confirmed A: 1, 4, 6 and 7.
The probabilities of those cases are:

* 1: `TTT` - $(1/3)^3 = 1/27$
* 4: `TFF` - $(1/3)(2/3)^2 = 4/27$
* 6: `FTF` - $(2/3)(1/3)(2/3) = 4/27$
* 7: `FFT` - $(2/3)^2(1/3) = 4/27$

with a sum of $13/27$.

Next, $P(E|X)$: the conditional probability that C says B confirmed A,
given that A told the truth.
This is easiest to calculate as $P(E \cap X) / P(X)$:
$P(E \cap X)$, the probability that A tells the truth _and_ C says B confirms A,
is just the subset of the cases of $P(E)$ where A also told the truth: 1 and 4.
Those have a combined probability of $5/27$.
Finally, $P(X) = 1/3$.
So, $P(E|X) = P(E \cap X) / P(X) = (5/27) / (1/3) = 5/9$.

Putting this all together in Bayes's theorem:

$$P(X|E) = {P(E|X) \over P(E)} \cdot P(X) = { { 5 \over 9} \over {13 \over 27} } \cdot {1 \over 3 } = {5 \over 9} \cdot {27 \over 13} \cdot {1 \over 3} = { 5 \over 13 }$$

That's a bit more than ⅓:
the additional information about B and C
actually did give us a little more confidence
that A told the truth!

## Conclusion

Probability is complicated and counterintuitive.
Never trust your intuition
unless you've got a theorem backing it up.

## Epilogue: A Simpler Solution

We were looking for $P(X|E)$.
That doesn't actually require a detour through Bayes's theorem:
we could have just used the definition of conditional probability,
combined with the truth table above.
$P(X \cap E)$ and $P(E \cap X)$ are the same, so:

$$P(X|E) = {P(X \cap E) \over P(E)} = { {5 \over 27 } \over {13 \over 27} } = {5 \over 13}$$

But I just thought this post was more fun
with a detour through Bayes's theorem,
which is quite possibly the most important theorem
in probability theory.

(Thanks to [Ask MetaFilter](https://ask.metafilter.com/321013/Help-me-figure-out-whats-up-with-this-probability-question)
for backing me up when I was doubting myself on this one.
The discussion there is worth reading,
especially [this comment](https://ask.metafilter.com/321013/Help-me-figure-out-whats-up-with-this-probability-question#4629395)
for a concise justification of why we need to take the information about B and C into account.)
