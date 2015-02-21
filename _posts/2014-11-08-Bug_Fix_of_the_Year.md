---
layout: post.html
title: My Best Bug Fix of the Year
tags: [unicode, microsoft, bugs]
summary: I tracked down and worked around a gloriously esoteric bug in Microsoft's C libraries.
---

_If you don't know what UTF-16 surrogates are and how they work, consider [my Unicode essay]({{ get_url('study/essays/unicode') }}) required reading for this post._

This is a story about the most confounding bug that I fixed at work this year.

### Mangled Emoji

I had a problem with a [Visual C++](http://en.wikipedia.org/wiki/Visual_C%2B%2B) program at work: it was mangling some emoji characters that it wrote to a text file using the probably non-standard [ccs flag](http://msdn.microsoft.com/en-us/library/yeby3zcb.aspx) (see the "Unicode Support" sub-section of that document) to encode them as UTF-16. The mangling happened like this example: instead of writing a 🎨, the program would write ��.

That's not your browser failing to display two characters. That's what I saw in the text file, and I thought the same thing as you might have just now: that my editor was failing to display characters because it didn't have a font for them or something. But I opened that file up in a hex editor: those two characters were supposed to look like that, because they were both the Unicode [replacement character](http://en.wikipedia.org/wiki/Specials_(Unicode_block)#Replacement_character), code point U+FFFD. So it wasn't that the text editor couldn't display the output correctly. My C++ code was writing two replacement characters instead of an emoji for some reason.

### Fruitless Debugging

I spent the better part of an afternoon trying fruitlessly to figure out why this was happening, going so far as to follow the debugger down into the depths of Microsoft's file-handling C code where every variable and function is prefixed by between one and three underscores and all data processing happens on the byte level.

(I am ordinarily a Python weenie, but this code was actually surprisingly easy to follow. Still, when you're used to processing an entire file using one or two lines of code, it does all seem unbearably tedious.)

Anyway, I was able to ascertain to the best of my understanding that at the time the emoji's bytes were actually copied to the file pointer, those bytes were indeed `d8 3c df a8`, the UTF-16 encoding of 🎨, with the first two bytes constituting a surrogate. Nevertheless, when I opened that file after letting the program finish, there were those ��s like a pair of malevolent  eyes, mocking me. Tormenting me.

I called it a day and went home.

### Sleeping on it

The next day I was able to look at the problem with fresh eyes. It's a [commonly](http://www.manchester.ac.uk/discover/news/article/?id=10609) [reiterated](http://www.theguardian.com/science/2005/oct/27/uk.research)—but [scientifically](http://www.telegraph.co.uk/science/science-news/8910111/Why-sleeping-on-a-problem-is-best.html) [defensible](http://www.dailymail.co.uk/health/article-188135/Got-problem-Sleep-it.html)—[truism](http://lifehacker.com/5953699/sleeping-on-difficult-problems-actually-helps-solve-them)<sup id="ref1"><a href="#foot1" class="ref"></a></sup> that if you get stuck on a problem, one of the most helpful things to do is sleep on it. I believe this and I've experienced it myself several times, but I'm still always surprised when it works, and this time was no exception.

Here is what my sleep-freshened eyes were able to see and synthesize the next day:

* The problem happened _inconsistently_, in that if an emoji appeared twice in an input file, one of them might turn into ��s in the output file but the other might not.
* But it also happened _reliably_, in that I could reproduce it in the same place every time I ran the program with the same input.
* Even down in the murky depths of the C libraries, there was no point at which I saw anything corresponding to �� in any buffer in the debugger.
* The problem happened _only_ for the emoji in the output files. No other characters were affected.
* I mentioned this before, but to reiterate: the output file did actually contain the bytes corresponding to ��, and their appearing was not due to an issue with rendering or fonts.
* Perhaps the key insight I hadn't had before: at no point during my debugging did I _actually see_ any code that would handle the encoding of the text (which was stored in arrays of 2-byte `wchar_t`s in the code) to UTF-16 bytes.

Because of the last point in that list, it seemed like the problem _had_ to be in the UTF-16 encoding process that I wasn't seeing, because it didn't seem to be anywhere else. A problem with the encoding would certainly explain how the four bytes in the UTF-16 encoding of 🎨—two `wchar_t`s' worth—could turn into two replacement characters used to indicate an incorrect encoding. If you were to split those bytes in half in some reason, you'd get `d8 3c` and `df a8`, neither of which are valid on their own in UTF-16 and would therefore get turned into replacement characters by an encoder.

Putting this all together, I realized that the UTF-16 encoding must have been happening in an even murkier place than the ones I'd previously plumbed: when the emoji was flushed from a buffer onto the disk. This is common when writing to a file: when you send characters to a file handle, they're actually sneakily just stored in memory until you have a big chunk of them that you can dump to the disk all at the same time and make that relatively slow disk IO worth the time it takes.

If it just so happened that the C internals decided to flush my buffer in between the two `wchar_t`s that constituted my emoji, they'd see a `d8 3c` at the end of the first buffer and a `df a8` at the beginning of the second one. The UTF-16 encoding process wouldn't know what to do with either of them on their own, and by way of saying so, it'd turn both to replacement characters.

As with many bugs that you work on consciously for six hours and subconsciously for another eight, the fix for this one took fewer than ten lines of code to manually flush the file buffer a little more often in order to ensure that it didn't do so in the middle of a UTF-16 surrogate pair. It was kind of a lot of work to fix a very minor problem, but on the other hand, based on my fruitless Google searching to try to figure out what was going on here, I think I may have been the first one to find this bug in Microsoft's UTF-16 handling, and that's kind of exciting.

Anyway, not with a bang but with a whimper does this post about my best bug fix of the year end. Sleep on your problems, folks. It works.

-----

<ol>
<li class="foot" id="foot1"><p>This is the footiest footnote I think I've ever written in that it has nothing whatsoever to do with the main body of this post, but: when compiling these links from the front page of a Google search, the following did not escape my notice:
<ul>
<li>People in the UK seem to be <em>really</em> fond of this idea; of the 5 links I used here, which constituted most of the aforementioned first page of search results, 4 are from UK websites; is "sleep on a problem" a British phrase?</li>
<li>Also, 3 of the 5 articles I linked are accompanied by a stock photo of a conventionally attractive young white woman sleeping (it was 4 out of 5, but I replaced a Telegraph link with a Guardian one so I'd have 5 different sources)</li>
<li>Of the two articles that <em>weren't</em> accompanied by photos of that description, one (the Guardian) was written by a woman, and the other (the Daily Mail) has a whole side bar of crass and exploitative articles about celebs showing off their beach bods or whatever. Sooo I guess what I'm saying is I'm not trying to draw any sweeping conclusions from these observations, they just amused me when I was looking up these articles. <a href="#ref1">↩</a></li>
</ul></li>
</ol>