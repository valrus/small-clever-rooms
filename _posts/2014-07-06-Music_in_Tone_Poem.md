---
layout: post.html
title: Music in Tone Poem
tags: [midi, python, tone_poem]
summary: A combination of modules and hacks to get Kivy to do what I need with MIDI.
---

In [my last post about Tone Poem]({{ get_url('2014/02/20/MIDI_in_Python/index.html') }}) I was struggling with being able to use MIDI files as background music. The main problem was that [`mingus`](https://code.google.com/p/mingus/), the module I was using to read and represent MIDI, didn't actually work very well for either of those things. Its MIDI file reading was [so deficient it was effectively broken](https://code.google.com/p/mingus/issues/detail?id=24), and its model of a composition was too simple to represent even some pretty basic occurrences. In this post I'll outline a couple more things I tried. Spoiler alert: the first one failed and the second seems to be working.

## Independent MIDI Handling in a Separate Thread

The MIDI handler I ended up using, [`mido`](https://github.com/olemb/mido/), does basic decoding of the inscrutable stream of bytes that makes up a MIDI file. It converts them into `Message` objects, easily inspectable representations of what the raw bytes actually mean.

`mido` has a method, `play`, that applies this conversion to the data in a MIDI file and sends each message in turn to a function of your choosing *at the time it would occur* if you were listening to the MIDI file normally. Times in MIDI messages are specified in something called "ticks", and converting those to real time involves some annoying calculation, but `mido`'s `play` method handles all that for you. To use it, all I had to do was start a second thread and run `play` in it, supplying a little boring logic to turn `Messages` into `pyfluidsynth` calls.

The trouble came when I tried to sync the thread playing the music with the one where the rest of the game's logic happens. Beastie attacks, which were supposed to happen in time with the music, sounded off: worse, when I tried to make the music repeat, it did so too soon. In fact, though, I was correctly scheduling it to play every eight seconds. I'm pretty sure its sounding like it restarted too soon actually meant that it was playing too slow relative to Kivy's scheduling clock.

## Doing it Myself With Kivy

If, as it seemed, eight seconds was enough for my MIDI thread to get out of sync with Kivy, the only sure solution I could think of was to clamp the MIDI down more tightly to Kivy's clock. Fortunately, I had a rough model for how to do that in `mido`'s [`play`](https://github.com/olemb/mido/blob/master/mido/midifiles.py#L362) method; unfortunately, because that method used `sleep` to trigger messages at the right time, it effectively did its own scheduling so it wasn't simple to substitute Kivy's. I ended up doing two things I hate: copying code (`play`), and using bits of `mido` that were technically private code.

I'll spare you (any more of) the details, but suffice to say that making this work was probably the hardest thing I've yet had to do while making Tone Poem. MIDI timing is idiosyncratic and finicky and I had to do a bunch of things myself that I thought I'd brought `mido` on to take care of. On the other hand, the end result:

* keeps MIDI background music in sync with the events in the main thread
* does everything using Kivy's clock, keeping me from having to coordinate two different scheduling systems
* schedules MIDI events on the fly, which should allow me to manipulate them in realtime

That last item means that I should be able to change the key or tempo of background music and have it take effect on the very next MIDI event, which may not be necessary but opens up a few interesting options in the future. It's not a bad tradeoff for just over a hundred lines of somewhat gnarly code and a couple private API calls, and I'll probably able to refactor that code to reduce some of the gnarliness. I'm cautiously happy about how it turned out.
