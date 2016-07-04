---
layout: post.images.html
title: Generating Level Maps for Tone Poem
tags: [tone_poem, maps, python, roguelikes]
summary: An approach to generating (and navigating) maps with a minimum of hassle for both dev and player.
---

Tone Poem needs to have areas to navigate. Because my primary inspiration for the overall game design is SNES-era console JRPGs, my first impulse was just to follow the lead of games like the venerable Final Fantasy VI. That game had a fair number of caves that looked something like this:

<a href="{{ get_asset('images/posts/Tone_Poem_Maps/umaro-cave.png') }}" rel="bytebox"><img class="fullwidth" src="{{ get_asset('images/posts/Tone_Poem_Maps/umaro-cave.png') }}" /></a>

But because it's intended to be a game that teaches the player some real-world knowledge, it's anticipated that the player may have to take multiple tries to get through Tone Poem's areas. So I'd like to pinch the idea of procedural level generation from the [roguelike genre]({{ get_url('study/essays/roguelikes/index.html') }}) and apply it here, to prevent the player from having to slog through the exact same area several times.

If you look again at the map linked above, there's kind of a lot going on in it. Even ignoring the matter of how doors link up different areas, there are tiers connected only by stairs, bridges connecting an upper tier that can be walked under if you're on a lower one, switches that have an effect on the layout, and chests placed so as not to block the narrow corridors. And then there are also the purely aesthetic elements like the lanterns and pipes across the ceilings.

It's certainly possible to generate this kind of thing on the fly, but it seems finicky and not at all fun to me, and the finickiness would only increase as I added more flavorful aspects. Perhaps more importantly, though, the more I thought about it, the more I didn't *want* my levels to be like this. One of the least fun things about classic JRPGs is trudging interminably across terrain at a frustratingly slow pace, being interrupted every ten seconds between points A and B to fight annoying pissant dudes when you really just want to get on with it. I want to try to avoid as much of that as I can.

So I want to take a completely different tack with my areas and base them on graphs, in the mathematical sense. <img src="{{ get_asset('images/posts/Tone_Poem_Maps/graph.png') }}" class="right" /> Actually, maybe it would be less ambiguous to say "in the computer science sense" or "in the discrete mathematical sense", because I'm not talking about the kind of graphs with *x* and *y* axes that we all dealt with in math class. I mean the kind that are covered in some detail in the [Wikipedia entry for "graph theory"](https://en.wikipedia.org/wiki/Graph_theory) and that are hugely important in things like search engines.

I'll try to give a sense of how I use graphs to generate maps, and what the advantages and disadvantages of them are, in a future post.
