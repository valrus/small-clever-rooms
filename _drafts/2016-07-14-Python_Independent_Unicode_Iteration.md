---
layout: post.html
title: Python Build-Independent Unicode Iteration
tags: [python]
summary: Working around one of Python 2's uglier warts.
---

**Standard disclaimer:** This post is about some bad Python 2 behavior regarding Unicode
and how to work around it.
If you're starting a new project,
you should strongly prefer Python 3;
in particular, as of Python 3.3, the problem this post solves
is a complete non-issue.
Unfortunately, due to a lack of third-party library support
or just time to port legacy code,
some people are stuck on Python 2.

**The problem:** Prior to Python 3.3, there are two kinds of Python builds:
so-called "narrow" and "wide" ones.
Narrow builds use UTF-16 for their internal string storage;
wide builds use UTF-32.
