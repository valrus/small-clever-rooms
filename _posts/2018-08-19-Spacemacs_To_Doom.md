---
layout: post.images.html
title: Spacemacs to Doom Migration
tags: [emacs, spacemacs, doom-emacs]
summary: An intro to Doom Emacs geared towards Spacemacs refugees.
---

I've been trying out [Doom Emacs](https://github.com/hlissner/doom-emacs) recently,
because I guess I can't go more than like 2 years
without wanting to throw my current text editing situation out the window
and replace it with a new one.

That current text editing situation is [Spacemacs]({{ get_url('2015/04/07/Spacemacs/index.html') }}).
It's starting to feel kind of clunky,
with too many moving parts to configure straightforwardly,
slow to start up and slow to receive updates.
Aside from those complaints, though, it's honestly still pretty great:
it's Emacs so it has support for everything under the sun,
the "configuration layer" system is actually a very nice way to organize functionality,
and the "multi-tiered leader" keybinding paradigm is the best of any editor I've ever used,
so much so that I'm not sure I could switch to another one at this point.
That rather limits my options.

Doom is an Emacs configuration framework that,
in the words of its creator,

> strives to be fast, fabulous and hacker friendly.
> It is tailored for neckbeards with blue belts or better in command-line-fu, Elisp and git.

<span class="marginnote">
<a href="{{ get_asset('images/posts/Spacemacs_To_Doom_Migration/cacochan.png') }}" rel="bytebox">
    <img alt="Cute drawing of a Doom cacodemon saying 'Yay evil!'" src="{{ get_asset('images/posts/Spacemacs_To_Doom_Migration/cacochan.png') }}" />
</a>
Plus there's this guy! Aww!
</span>

I... guess I'm those things? I guess using this would be a good way to find out?
I don't know, "fast" just sounds really good right now.
Anyway here's a summary of what I found out in trying to switch
from Spacemacs to Doom, in case someone finds it useful.

## Should I bother?

First off, some subjective impressions
from easing into Doom over a period of one or two weeks.

It does generally feel faster. Definitely much quicker to start up,
though I think a lot of my long startup time with Spacemacs was
loading my workspace with a lot of open Ruby buffers.
On the other hand, loading a bunch of buffers shouldn't take as long
as it did (we're talking a minute or more), and...
  
If something goes wrong in Spacemacs, it can be very hard to figure out why.
There are a lot of moving parts all interacting with each other.
Doom feels more manageable, but this may just be because I haven't been using it
long enough to accrete a lot of possibly hacky changes of my own.

Spacemacs looked pretty nice, for Emacs, but Doom does (subjectively) look even better.
I haven't felt the need to mess with the aesthetics as much,
which is good because that was a source of considerable frustration with Spacemacs.

Spacemacs is definitely more "batteries included" than Doom,
and a more comprehensively customized Emacs experience.
The bindings are tweaked to be more "Vim-esque" in basically every mode
Spacemacs provides through its clever "evilification" process,
and language layers tend to have more functionality
out of the box (e.g. auto-closing tags in Web mode).
Still, there haven't been too many things I find myself really missing in Doom,
though I should say I've been mostly working with Ruby on Rails in it.

Doom's developer is very accessible via a
[Discord chat](https://discord.gg/bcZ6P3y).
Spacemacs's isn't so much --- it's kind of been a victim of its own success in that way
--- but it has a bigger community. On the other hand, I've found Doom's source
a little easier to inspect to figure things out for myself.
Ultimately, the amount of support available for each is a wash:
I've felt the need to ask for help less with Doom,
but there also seem to be fewer places to get it if I need it.

## How do I set it up

Doom is in a bit of a state of flux right now,
so I'm going to try to make these instructions future-proof:
Go to the [Doom github](https://github.com/hlissner/doom-emacs)
and follow the instructions in the README.
If they work, great!
If they don't, it might be because the `master` branch is broken.
Try switching to `develop` (using your _blue belt in Git_)
and follow the instructions in _that_ README.
If that doesn't work either,
I guess someone probably opened an issue about it? Find that.
It's the work of one person
so if you have a weird setup and it breaks and you don't want to figure out why,
Doom might just not be for you.
It definitely wasn't the first time I tried it,
so I don't mean that as a dig or anything!
There will just be a certain amount of figuring things out yourself
that will come with the territory,
and switching might not really be worth that friction.

## Where do I put my shit

What you know as "layers" in Spacemacs are, more or less, called "modules" in Doom.
You're going to be creating a private [module](https://github.com/hlissner/doom-emacs/wiki/Modules).
It will be located at either `~/.doom.d`
or `config/doom`
if you're doing the whole
[XDG base directory](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html)
thing.

Unlike in Spacemacs where a private layer is just the "recommended" way
of storing your configuration
(you could, in many cases, have it all in your `.spacemacs` if you wanted),
in Doom your configuration directory just _is_ a private module.
It has the following parts, each of which corresponds roughly to something
you know and love from Spacemacs:

* `init.el` - Every module has one, but for our basic purposes
  the one in your private module will be equivalent to the
  `setq dotspacemacs-configuration-layers` in your `.spacemacs`.
  Basically it's one call to the `doom!` macro to declare the features
  that you want to use.
  I guess you can put other very early configuration in there
  but I haven't yet seen a reason to do so.
* `packages.el` - You might _think_ this is like a Spacemacs layer's `packages.el`,
  but no! It is a simple declarative list of packages using the `package!` macro that does 
  little but add packages to be installed.
* `config.el` - A combination of `user-config` in `.spacemacs`,
  `config.el` in your private layer, and `packages.el` in your private layer.
  I think.
  That's a lot for one file but you can have other files starting with a `+`
  and load them manually, like `(load +more)` to load `+more.el`.
  Presumably this is to break up all the configuration
  that would otherwise be unceremoniously dumped in `config.el`.
* `autoload.el` - Equivalent to `funcs.el` in your private layer.
  Or you can have an `autoload` directory and put multiple files' worth
  of functions in it, just named whatever you want I guess.

## Keybindings

The keybindings in Doom are both like and unlike those in Spacemacs.
They have the same multi-level branching key sequence thing going on,
and a lot of the top-level "categorizing" bindings are the same:
`w` for windows, `b` for buffers, etc.

Unfortunately (for you and me as Spacemacs refugees)
the bindings are also _just_ different enough to trip you up.
`SPC b [` and `SPC b ]` go to the previous or next buffer instead of `SPC b p` and `SPC b n`.
You open Magit's status with `SPC g g` instead of `SPC g s`.
Perhaps worst of all, "save what I'm working on now"
is a _buffer_ command under `SPC b s` instead of a _file_ command at `SPC f s`.

Fortunately you're probably acquainted with both Vim _and_ Emacs
so remapping keys is second nature to you.
The Doom way to do it is to use the `map!` macro.

As of this writing, `map!` isn't terribly well documented in Doom's actual documentation,
but it is in the code, so search for `defmacro map!` in the repo and read the comment.
For supplementary material, refer to my example auxiliary config file,
in which I'm depositing all my bindings transferred over from Spacemacs
so all that muscle memory doesn't go to waste.
Feel free to [copy it for yourself](https://github.com/valrus/doom-private-module/blob/master/%2Bspacemacs-bindings.el),
and if you do, don't forget to `load` it from your `config.el`!

## Adding packages

Doom comes with a pretty good swath of functionality built in,
but since you're a Spacemacs user you'll probably find some things you miss
before too long. Here's the basics of how you add a package to Doom,
with `linum-relative` as an example:

1. Add `(package! linum-relative)` to your `packages.el`
2. Add a `def-package!` call to your `config.el`.
   This one turns on relative line numbers in all buffers
   and makes sure they use the new [native line numbers](https://www.gnu.org/software/emacs/news/NEWS.26.1) in Emacs 26:

```
(def-package! linum-relative
  :config
  (setq linum-relative-backend 'display-line-numbers-mode)
  (linum-relative-global-mode))
```

3. Important and completely different from Spacemacs!
   Run `make install` in your `~/.emacs.d` directory.
   This will actually install the new package.
4. Restart Emacs, or run the `doom/reload` command with `SPC :`.
   (Or use the key sequence `SPC h R`.)

## Other resources

If you're a Spacemacs user and thinking about trying Doom,
I hope this helps you!
Here are a couple other blog posts that could be helpful:

* Aria Edmonds's
  [Getting started with Doom Emacs](https://medium.com/@aria_39488/getting-started-with-doom-emacs-a-great-transition-from-vim-to-emacs-9bab8e0d8458)
* Justin DeMaris's
  [Emacs Doom for Newbies](https://medium.com/urbint-engineering/emacs-doom-for-newbies-1f8038604e3b)

Finally, please feel free to check out my [personal Doom config](https://github.com/valrus/doom-private-module)
if you want a starting point.
And here are some others that might provide inspiration:

* [the Doom developer's](https://github.com/hlissner/doom-emacs-private),
  assuredly a better canonical example than mine of How To Do Things
* [Emiller88's](https://github.com/Emiller88/doom-emacs-private),
  a fairly simple example of a "literate" config which looks lovely in GitHub
* [fuxialexander's](https://github.com/fuxialexander/doom-emacs-private-xfu),
  a more complex config with lots of customization and added features
* [ar1a's](https://github.com/ar1a/dotfiles/tree/master/emacs/.doom.d),
  as seen in her nice blog post linked above
  
Happy Dooming!
