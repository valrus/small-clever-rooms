---
layout: post.html
title: My Own Personal Editor War
tags: [vim, sublime_text]
summary: The nutshell summary of several years' worth of agonizing about text editors.
---

I'm a stickler for dev tools, in particular text editors, almost to a fault. Okay, definitely to a fault. Okay, probably well past the point where any reasonable person would call it a fault.

For a long time after Vim opened my eyes to the power of a Real Text Editor and the fun and effortless feeling of modal editing, I tried to do as much code and longform writing as possible in it, or at least some editor with a decent emulation of its keybindings. But at some point in the last several years there's been an explosion of good editors, many of which fit that latter criteria. So I took the opportunity to explore a few of them and try to find one that would do away with Vim's shortcomings while still giving me that sweet, sweet modal editing that I so crave.

## What's Wrong With Vim?

Why did I want to move away from Vim? It's the original modal editor (well, not counting vi) and it has a [hugely](http://vim.wikia.com/wiki/Vim_Tips_Wiki) [robust](http://vimawesome.com) [ecosystem](http://www.vim.org/scripts/) and userbase that makes the solution to almost any problem a Google search away.

But it also has some limitations, baked in at a very low level, that grated on me more and more until I finally wanted to see if I could do better. Some of those limitations:

* Bluntly, Vim is Just a Text Editor and attempts to [turn it into an IDE](http://unlogic.co.uk/2013/02/08/vim-as-a-python-ide/) are doomed to kludginess at best and frustration and failure at worst as you tack on dozens of plugins in order to achieve what any IDE worth its salt would call basic functionality.
* Perhaps the situation in the above point would be okay if the dozens of plugins I alluded to had better cross-platform support. But due to circumstances beyond my control I have to use Windows at work, and time and time again while trying to set up a Vim plugin I'd see something to the effect of "Tested on OS X and Linux, seems to work on Windows, but YMMV" in its GitHub readme. Pile enough code with disclaimers like that on top of itself and it's a recipe for disaster.
* I know, I know: it's open source, fix it yourself, yadda yadda. But Vim plugins are mostly written in [Vimscript](http://stevelosh.com/blog/2011/09/writing-vim-plugins/#making-vimscript-palatable), a wonky, frustrating, Vim-exclusive language that I really have no interest in learning.
* At some point in my investigation of other editors, I got addicted to having [a linter](http://www.pylint.org) running alongside my editing in realtime. Since I code mostly in Python at work, a linter can catch a lot of errors before I run anything, which can save me a lot of time. But the only way to get the kind of asynchronous/multi-threaded process support that you need for real-time linting in Vim is to use an [experimental fork](https://news.ycombinator.com/item?id=7057051) that will probably never be merged into Vim proper or some kind of other [kludge](http://www.vim.org/scripts/script.php?script_id=3307) which requires compiling an "external c helper application" and I bet works just *great* on Windows.
* Related to that last point: Vim dates from 1991, and looks it. It's based on vi, which is from the late 1970s and ran only in a terminal. Vim has a "GUI" mode, but it's little more than a glorified terminal: its rendering is strictly grid-based; it supports only one font at a time; and any "graphics" that you can get in it are actually just text, so even many of the [most attractive](https://raw.githubusercontent.com/kepbod/ivim/master/snapshot.jpg) Vim setups have rough edges and a feeling of being dated.
* Like a lot of other people, I have my fingers crossed that [Neovim](http://neovim.org) will get off the ground, because I think it will solve a lot of these problems. But I want an editor I can use and enjoy *now*.
* The final nail in Vim's coffin, as far as using it for heavier IDE-type coding, was trying out [Sublime Text](http://www.sublimetext.com) for a while.

## Sublime

Sublime Text's main advantages over Vim, for me:

* Its cross-platform support is better.
* Its IDE-esque capabilities are better. In particular, I don't think I've ever found a project management system that I like as much as ST's, and its Goto Anything feature is really slick.
* It starts up faster than a Vim that's sufficiently tricked out to be equally capable.
* It strikes a good balance between "just a text editor" and "fucking [Eclipse](http://fbksoft.com/6-tips-to-make-eclipse-lighter-prettier-and-more-efficient/)".
* It uses Python as an extension language.
* It's much prettier than Vim. This is something that I've been led to believe I shouldn't care about as a Coder, but I'm also a lifelong Mac user, so I *do* care. Sue me.

Like Vim, though, Sublime started to show cracks after a while. Unfortunately this happened after I already paid for it, but I got enough use out of it (and learned enough from it about what I will and won't put up with in my tools) that I consider that money reasonably well spent. For the record, though, a list of my grievances:

* The vi emulation plugin, "[Vintage mode](https://www.sublimetext.com/docs/2/vintage.html)," seems decent at first glance but after sustained use turns out to be pretty [deficient](https://github.com/sublimehq/Vintage/issues): many commands are missing or behave incorrectly, and the plugin has had very few updates to fix them in the last couple years. (More on this later.) There's an [alternative](https://github.com/guillermooo/Vintageous) third-party plugin that's more complete, but it still has a brace of bugs and shortcomings that are frustrating to anyone used to actual Vim, particularly in the area of defining new keybindings. Basically, the vi emulation situation in Sublime is spotty at best.
* The cross-platform situation is better than Vim, but there are still some patchy bits of the preferences system that made sharing prefs in Dropbox between my work Windows machine and my home Mac a chore. In particular: the User preferences, where you're *supposed* to make your personal configuration changes, are shared on all platforms, which is suboptimal. To get platform-specific settings, I had to configure them in a place I wasn't supposed to, which of course caused problems elsewhere.
* The developer is almost completely incommunicado. Bugs and feature requests are slow to be addressed if they're addressed at all.
* Relatedly, documentation is often outdated or incomplete and shows no signs of being updated, so a [community documentation](http://docs.sublimetext.info/en/latest/index.html) project has arisen to fill in the gaps. This and the previous point are pretty unacceptable for a paid product, in my opinion. [This review](http://yfl.bahmanm.com/Members/ttmrichter/software-reviews/sublime-text-2-review) concurs, a little more frothily than this blog post. (NB: at least some of the quotes in the "Stupid, stupid docs" section have been excised from the unofficial docs, but I can corroborate that they were once there. Hell, I even submitted a [pull request](https://github.com/guillermooo/sublime-undocs/pull/54) to remove the worst of them myself.)

I probably could have lived with these problems. Sublime has the nice asynchronous linting I crave and just the right amount of IDE features, and I encounter few enough bugs in my routine ST usage that my last two complaints were mostly ideological rather than practical. But still. There's got to be something better, right?

Well, spoiler alert: after years as a Vim user hearing about how it's a ridiculous nonsense program that's too big for its britches, I'm currently using [Emacs](http://www.gnu.org/software/emacs/) and, on the whole, liking it more than I did Vim or ST when I got fed up with them. But because Emacs is not a text editor but a tiny universe, it took me four or five false starts before I finally found a way in that worked for me. I'll describe it in a future post.
