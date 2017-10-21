---
layout: post.images.html
title: Sorting Vertices Radially... Without The Arctangent
tags: [tone_poem, maps, python, roguelikes, math]
summary: 
---

Problem: You have a convex polygon *P* and a point *c* in its interior. You want to sort the vertices of *P* radially, meaning in either clockwise or counterclockwise order.

The canonical solution to this that's easy to explain in mathematical terms is: convert all points of *P* to polar coordinates with *c* as the origin, then sort by *&theta;*.
