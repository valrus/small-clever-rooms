---
layout: post.html
title: Post Title
tags: []
summary: Post Summary
---

1.  Fix superficial syntax errors across all files.
    In particular, the syntax that used to be

    ::
       module ElmModule (..) where

    becomes::

      module ElmModule exposing (..)

2.  There may be ``Signal`` stuff all over the place,
    but ``Signal`` is now deprecated.
    Broadly, ``Signal`` has been replaced by ``Cmd``
    and the pattern of returning ``(Model, Cmd Msg)``
    rather than just ``Model`` from an ``update`` function
    and using ``Cmd.map`` in the caller
    to convert the returned ``Msg``\ s to something the caller understands.

3.  Also, any place you have a ``Signal.Address a``

3.  If you started your project in Elm 0.16,
    you may have gotten the crazy idea
    that you could structure your program by using
    `The Elm Architecture`_ to break out functionality into components
    each with their own ``Model``, ``update``, ``view`` and so on
    that can communicate with each other.

    The problem is that "communicate with each other,"
    which turns out to be way more of a problem than it sounds like.
    Per item 2 above, the most obvious place
    to have a child component trigger behavior in its parent
    is in the ``Cmd Msg`` part of the ``update`` return value.
    `But you should not do this`_.
    To make a long story short, the ``Cmd Msg`` in 

.. _The Elm Architecture: https://guide.elm-lang.org/architecture/
.. _But you should not do this: https://medium.com/elm-shorts/how-to-turn-a-msg-into-a-cmd-msg-in-elm-5dd095175d84#.od9uar7kj
