---
layout: post.html
title: MIDI in Python
tags: [midi, python, tone_poem]
summary: The situation is... not fantastic.
---

[Python](python.org) prides itself on having "batteries included", which means it comes with a bunch of well-tested modules that can handle most use cases for a wide variety of common tasks. Some examples:

- [`argparse`](http://docs.python.org/dev/library/argparse.html), for command-line option and argument handling
- [`elementtree`](http://docs.python.org/dev/library/xml.etree.elementtree.html), for XML parsing and generation
- [`urllib2`](http://docs.python.org/dev/library/urllib.request.html), for fetching data from the Web (and elsewhere)

All these helpful and robust modules can spoil programmers and leave them stymied when they run up against a task which isn't well-supported by the standard library. I bumped into this when I tried to use Python to handle some MIDI.

Briefly, MIDI is a standard format for transmitting musical data. It's been around for I think two or three decades, but it's still sufficiently esoteric and its uses rare enough that it was never added to Python's standard library. As a result, it occupies a kind of tool netherworld: trying to find Python code that handles all the things you can do with MIDI led me into a funhouse with "Unmaintained since 2006" or "Not well-tested" or "Does most of what I need, but" scrawled on every dead-end and shadowy corridor.

After a quick survey of the existing tools, I settled on working with two of them to do mutually exclusive MIDI-related tasks:

- [`rtmidi`](https://pypi.python.org/pypi/python-rtmidi) to handle reading data from a MIDI keyboard in realtime. The version number was worrisome, but it seemed like a simple enough task.
- [`mingus`](https://pypi.python.org/pypi/mingus) to handle the transformation of MIDI files into musical data structures that can be manipulated using music theory. Again, ominous version number, but it seemed to be fairly robust and actually had unit tests.

This went well until I put together a brief track in Logic Pro and exported it to MIDI; mingus, on trying to read the resulting .mid file, failed with a complaint about a chunk of MIDI data that it couldn't handle. I did some research into the [MIDI file format](http://www.sonicspot.com/guide/midifiles.html), looked at mingus's source code, and determined that while it was possible that there were events in my file that mingus couldn't handle, the one it actually complained about wasn't even present. Unfortunately, it seemed that mingus's unit tests did not have great coverage in the area of MIDI file importing. I did not want to try to fix it myself.

I went out in search of a finer-grained tool. Mingus's main job, it seems to me, is doing music theory; MIDI handling is ancillary and it shouldn't have surprised me much that it was poorly tested. I found another library, mido, which handles MIDI without all the music theory, and tried to use it to read my problematic .mid file and pipe the messages into Mingus. I was able to get a "composition" in Mingus this way, but the note durations were screwy. I realized that Mingus's representation of music data, as a purely linear series of "note containers", was not really sufficient to represent an arbitrary piece of MIDI music. Even something as simple as having a note sound while the previous one is still ringing is not, as far as I can tell, representable by a Mingus data structure.

I'm reconsidering my choices now. What I absolutely need out of MIDI handling code is the ability to detect and handle basic (note data only) input from a MIDI keyboard, but it actually occurs to me that most other tasks are just nice to have. If I have a soundtrack in MIDI format, I don't need to be able to read it into a data structure that can recognize and manipulate its music-theoretical properties. I really just need to be able to play it. Basic transposition or tempo changes are things I'd like to have the option of doing (and they would be much more difficult with audio data than with MIDI), but they don't require sophisticated insight into the data. So I think perhaps I need to consider instead a configuration like this one:

- [`mido`](https://pypi.python.org/pypi/mido) for handling all MIDI, be it realtime or file-based. It has a promising version number, for what that's worth, and has been worked on recently enough that there's some hope of getting help if I run into trouble with it. I think I can use it to replace rtmidi as well.
- `mingus` for any music-theoretical shenanigans I want to do. Its MIDI handling seems like an afterthought now that I've checked it out, and so I'll probably ignore it completely.
- [`pyfluidsynth`](https://pypi.python.org/pypi/pyFluidSynth) for playing MIDI sound. I think it's included in mingus and it should be safe to use from there. I don't know how robust it is but I'm pretty sure it's just a thin wrapper around the quite old and well-tested fluidsynth.

Needless to say, this has all been kind of frustrating, but I think it's also worth it for forcing me to think a little more precisely what I need to be able to do.