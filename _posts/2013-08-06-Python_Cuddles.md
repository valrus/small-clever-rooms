---
layout: post.html
title: Does Python Cuddle?
tags: [python, perl, cuddling]
summary: I coin a term for how a particular syntactic idiom applies to Python.
---

In one of my semi-regular Complain About Perl sessions with a coworker, we found ourselves looking at the [Perl Style Guide](http://perldoc.perl.org/perlstyle.html). Something caught my eye almost immediately:

* Uncuddled elses.

This is apparently one of Larry Wall's stylistic preferences for Perl code, which means the creator of Perl is on record as being _anti-cuddles_, which is just one more reason for me to despise Perl. I was led naturally to wonder whether Python is a pro-cuddle language. But what are cuddled elses? The venerable [c2 wiki](http://c2.com/cgi/wiki?CuddledElseBlocks) comes to the rescue:

> In an "if-then-else" statement, the following are examples of "cuddled" and "uncuddled" elses in C:

>     |  /* cuddled "else" */  |  /* uncuddled "else" */   
>     |  if (x > 0) {          |  if (x > 0) {   
>     |      x += y;           |      x += y;   
>     |  } else {              |  }   
>     |      y += x;           |  else {   
>     |  }                     |      y +=x;   
>                              |  }   

Well, Python doesn't have braces at all. But thanks to its syntactically significant indentation, its if/else statements more closely resemble the lefthand example than the one on the right. Because of this, I propose that Python can be said to have _phantom cuddles_ for its elses. Rest easy, Python fans. My tergiversation puts Python firmly in the pro-cuddle camp.
