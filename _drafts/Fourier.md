---
layout: post.images.html
title: Notes On Fourier Transforms
tags: [math, music]
summary: Some notes about Fourier transforms.
---

The following GIF was posted in a Facebook group I'm in:

<img class="fullwidth" src="{{ get_asset('images/posts/Fourier/fourier_series_square_wave.gif') }}" />

So I think this GIF is probably from here: https://en.wikipedia.org/wiki/Fourier_series#Convergence (and note there's another pretty cool one right next to it!)

You can infer from the pattern that as the odd number increases, the resulting shape gets closer and closer to a square wave:
_|‾|_|‾|_|‾|_

More crazily, what Fourier analysis tells us is that you can approximate ANY function arbitrarily closely just by adding up a lot of sine waves. (The second example in that Wikipedia link does so for a sawtooth wave.)

This is tremendously useful in a lot of places, but the one I'm most familiar with is music. Any sound is just a fantastically wiggly function of amplitude over time, so you can do something called a Fourier transform to figure out the different sine waves that add up to it. From there, you can do all kinds of things. A couple examples:

- Broadly speaking, this is how MP3s achieve such good compression. If you Fourier transform a song and just throw out all the sine waves with frequencies that humans can't hear, the un-transformed result will sound more or less identical but can be a lot smaller because you tossed all that useless extra information about the inaudible frequencies.
- I'm not sure, but I suspect this is how you can automatically process songs for use in karaoke. Because human voices use a fairly narrow spectrum of frequencies, you can dampen those frequencies to make the vocals quieter without making the song unrecognizable.
- Digitally simulating effects like reverb probably relies on Fourier transforms too. Since different frequencies behave differently in different physical spaces, you can change the "feel" of the space by boosting or dampening specific frequency bands in the sound you add to simulate reverb.

Whew, this turned out longer than I expected. But I might turn it into a blog post, so that's ok.
