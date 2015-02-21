---
layout: longform-page.images.html
title: A Contextual, Narrative Introduction to Unicode
---

There's no shortage of good, informative, fairly easy-to-understand posts about Unicode in the wild, but this essay is an attempt to take a somewhat different approach than most of the ones I've seen. We'll start by peeking under the hood of a normal text file and seeing a general principle that applies to any text stored on a computer, then go through some increasingly complicated ways that principle is applied to store text in better and better ways.

This essay is probably most useful for programmers, but it's intended to be accessible to people who've never written code in their lives. Because the path to Unicode touches on a lot of other interesting concepts in computer science with which I think it's useful to be passingly familiar, I go off on a lot of tangents (usually in footnotes). And because Unicode was born out of frustration with the shortcomings of its predecessors, I try to explain those shortcomings in such a way that justifies the complexity of Unicode.

## Layers of Abstraction

I'm actually starting out this essay with a tangent of sorts by leading in with layers of abstraction, which are basically more or less "zoomed out" perspectives on a concept. Layers of abstraction are a hugely important way to compartmentalize the mind-boggling complexity of all that goes on in a computer, so I'm taking the opportunity to introduce them to anyone who's unfamiliar.

The following shows some of the layers of abstraction involved in a plain text file stored on a computer; the perspectives zoom out as you go up the stack.

<img class="right" src="{{ get_asset('images/posts/Unicode/encoding_layers.png') }}" />

Starting at the bottom—the real nuts and bolts detail of how compurers store information<sup id="ref1"><a href="#foot1" class="ref"></a></sup>—each layer zooms out and brings us one step closer to something humans are used to looking at and extracting information from. This post will focus on the top two layers and the idea that an encoding is a relationship or translation between them.

## The Content Of A File Is Numbers

At a level of abstraction one layer down from the characters you see when you open a text file on your computer, it actually contains nothing but a series of bytes: numbers with values between 0 and 255 (2<sup>8</sup> - 1, as there are eight binary bits in a byte) inclusive<sup id="ref2"><a href="#foot2" class="ref"></a></sup>. You can see this for yourself if you open a text (or, indeed, _any_) file with something called a hex editor, but there's no reason for most normal people to have one of those, so here's an example of what some of the text of this post might look like in one:

<img class="fullwidth" src="{{ get_asset('images/posts/Unicode/hex.png') }}" /></a>

The righthand column is the text, and the lefthand column shows the bytes corresponding to that text. The bytes are displayed in [hexadecimal](http://en.wikipedia.org/wiki/Hexadecimal) format (hence "hex editor"), which it's not really important for you to understand for this essay besides recognizing that it's just a [different way of writing numbers](http://www.mathsisfun.com/binary-decimal-hexadecimal-converter.html) that uses the letters `a` through `f` in addition to the ten decimal digits.

An encoding describes how those bytes are translated into the next abstraction layer up, the characters like letters, digits, and punctuation in the right column of the hex editor. Most of the rest of this essay will explore increasingly sophisticated and capable encodings, culminating in a look at one which is rapidly becoming the most common way to store and distribute the world's digital text.

## ASCII is a (simple, naïve) encoding

You have maybe heard of [ASCII](https://en.wikipedia.org/wiki/ASCII). It, like every other text encoding, is just a way of converting bytes into characters, or vice versa. It's "simple" in that it's a basic one-to-one correspondence between the numbers 0–127 and 128 specific characters: for example, the number 41 represents a capital A. (Other encodings are not so simple, but I'll get to some of them later.) You can see what numbers correspond to what characters using a tool like this [ASCII to decimal converter](http://www.stringfunction.com/ascii-decimal.html). If you don't want to do that, here's what the bytes of the word "text" look like when encoded using ASCII:

<code>74 65 78 74</code>

But the tradeoff for that simplicity is that ASCII is naïve: because it only knows about 128 different characters, and almost half of those 128 characters are your basic Eurocentric Latin letters A–Z in upper and lower case, it's _impossible_ to accurately represent most text in almost any language other than English using ASCII. Even most other languages that use Latin script have accents that you have to throw away in order to get ASCII characters. For languages that don't use Latin script at all—Russian, Chinese, etc.—it's totally hopeless.

A text encoding that can't represent text in the vast majority of the world's languages is pretty naïve. In today's world, it should probably be considered obsolete.

## The Dark Age: Single-Byte Encodings

To reiterate the kernel of the last section: Bytes in text files are values from 0–255, but ASCII only covers half of them, 0–127. ASCII also only maps unaccented Latin letters.

Where will we get other letters from? _Hmmmm._ Considering the 128 possible bytes that ASCII doesn't touch, there would seem to be an obvious solution. For a long time, that solution came in the form of single-byte encodings.

A single-byte encoding uses all 256 numbers afforded us by a byte to represent twice as many characters as ASCII can. Almost all such encodings use ASCII for 0 to 127 and map other letters (often accented ones) to the numbers above 127<sup id="ref3"><a href="#foot3" class="ref"></a></sup>; the most common example in the Western world is probably Microsoft's [Windows-1252](http://en.wikipedia.org/wiki/Windows-1252) or CP-1252, of which we'll be seeing a bit more later. It extends ASCII with a bunch of handy symbols like the sophisticated `é`, the cosmopolitan `€`, and the enigmatic and vaguely Taoist `±`.

So that's a pretty reasonable way to support more than your basic ABCs using just bytes. The trouble is, there are [about a zillion single-byte encodings](http://en.wikipedia.org/wiki/SBCS) and, to a computer, a message in any of them just looks like a series of bytes. That means if someone sends you a message in a single-byte encoding but doesn't tell you which one, your computer has about a one in a zillion chance of not presenting you with a screen of outright nonsense when you try to view it.

Granted, if you're receiving a message that you actually want to read, you _probably_ know what language it's in and therefore (if you're aware of code pages) what encoding to use. Even if you're multilingual, you can probably figure it out from trial and error. Nevertheless, the situation was bad enough that [at least seven languages have a term](https://en.wikipedia.org/wiki/Mojibake), the most widely-used being Japanese's _mojibake_, for the mangled or unreadable text resulting from attempting to interpret bytes using the wrong encoding.

## CJK and Multi-Byte Encodings

Single-byte encodings are fine for most languages of Europe and India, which have alphabets that fit comfortably into the 256 "slots" allowed by a byte, but what about languages of East Asia? Chinese, Japanese, Korean (usually shortened to CJK when discussing character sets): all these languages use characters that can represent entire words or concepts and therefore number [in the tens or even hundreds of thousands](https://en.wikipedia.org/wiki/Chinese_characters#Number_of_characters).

The huge variety of CJK characters means one byte per character isn't sufficient to represent them. I don't actually know enough about [CJK character encodings](http://en.wikipedia.org/wiki/CJK_characters#Encoding) to be comfortable covering them in any great detail in this post, but they fall into two broad categories: a few are fixed-width encodings, which use the same number of bytes for each encoded character (often 2, for CJK); and most are variable-width encodings, which use different numbers of bytes for different characters.

But if you're reading this, chances are you don't want to use any of them if you can avoid it. You want to use:

## Unicode

Unicode is, in short, an attempt to bring us out of the Dark Age I described in the previous section. It's a huge undertaking which is still in progress, and I'm going to drastically oversimplify and elide a lot of its intricacies in order to wedge it into my narrative and avoid introducing a lot of new terms to describe it fully.

<img class="right" src="{{ get_asset('images/posts/Unicode/unicode_encoding_layers.png') }}" />
Unicode is an attempt to devise one system that supports all the characters necessary to represent the world's text. Part of the Unicode project is a one-to-one mapping of numbers (in Unicode, these numbers are referred to as code points, prefixed with "U+" and often shown in hexadecimal) to characters<sup id="ref4"><a href="#foot4" class="ref"></a></sup>. Code points are an abstraction (because only bytes are actually stored on disk), an intermediary that allows us to map all of the huge amount of characters supported by Unicode to bytes.

(Note that Unicode is NOT the name of an encoding. The methods of turning code points into bytes are properly called "Unicode encodings", but there are several of them, and they have names, and none of those names are "Unicode".)

Unicode, in principle, supports 1,114,112 code points.<sup id="ref5"><a href="#foot5" class="ref"></a></sup>. 

How does it do this? Well, one thing is for sure: as with CJK, one byte per character ain't going to cut it anymore.

## Encoding Unicode Code Points: UTF-32, Easy but Wasteful

The most obvious way to encode Unicode code points (that is, turn them into bytes so that a computer can handle them) is just to take as many bytes per character as are required to get numbers up to 1,114,112. Every bit doubles the number of characters we can support, so at eight bits per byte, three bytes suffices with plenty of margin for error. But computers tend to do things in groups of powers of two; for [that and other reasons](http://stackoverflow.com/questions/10143836/why-is-there-no-utf-24), the most straightforward Unicode encoding, UTF-32, is a fixed-width encoding that uses four bytes per character. (UTF stands for Unicode Transformation Format; 32 refers to the number of bits used for each character.)

Encoding in UTF-32 is as simple as using ASCII or a single-byte encoding. A character's UTF-32 value is just the bytes representing a number equal to its code point. That's nice because it's easy. It's less nice because it uses four bytes for _every character_, which is a pretty big waste of space. Here's what bytes are used to encode the word "text" in UTF-32, with underlines to group together the multiple bytes corresponding to each character:

<code><u>00 00 00 74</u> <u>00 00 00 65</u> <u>00 00 00 78</u> <u>00 00 00 74</u></code>

Compare that with the four bytes needed for ASCII way earlier in this essay. UTF-32 is almost the same thing, but with a bunch of extra zeroes which convey no useful information.<sup id="ref6"><a href="#foot6" class="ref"></a></sup>

On the other hand, the five-character [emoji](http://en.wikipedia.org/wiki/Emoji) short story "`👀❗🚌💀.`" _can't_ be written using ASCII. In UTF-32, it looks like this:

<code><u>00 01 f4 40</u> <u>00 00 27 57</u> <u>00 01 f6 8c</u> <u>00 01 f4 80</u> <u>00 00 00 46</u></code>

which is the same length as the mundane string "text" above. But notice that fewer of these bytes are zeroes. The code points for emoji characters are much higher than for Latin-script letters, so we don't need so many zeroes to pad them out to fill four bytes each.

UTF-32 is simple as Unicode encodings go, but it's also rarely used in anything you can actually see. Let's move on.

## UTF-16: The Dangers of Early Adoption and the Worst of Both Worlds

After wrestling with the multitude of single-byte encodings needed for international software, Microsoft was understandably eager to jump to the Unicode standard when it started getting off the ground, and they should be commended for that decision even though it kind of turned out badly for them and they kind of ended up looking like a bunch of Unicode Neanderthals.

Back when MS got on the Unicode train in the mid 1990s, Unicode was in its very early stages, and in accordance with an original plan to include only characters in modern use<sup id="ref7"><a href="#foot7" class="ref"></a></sup>, it was thought that there wouldn't be more than 65,536 code points and so there could be a fixed-width encoding using only two bytes. So Microsoft, in a decision that was reasonable at the time, designated a two-byte data type as a "wide character". Well, as we saw in the previous section, UTF-32 actually requires 4 bytes per character. The Unicode Consortium decided that, nope, actually 16 bits wouldn't cut it, and Microsoft was left with a wide character type that wasn't wide enough.

(Note: Remember how I said "Unicode" isn't an encoding name? Well, I think they've stopped doing it at this point, but for a long time Microsoft referred to their use of UTF-16 as "Unicode encoding". This is wrong. Please don't do it. The encoding Microsoft generally uses is named UTF-16.)

MS's wide character is wide enough for a whole lot of characters, to be sure. For those, the encoding called UTF-16 just does the same thing as UTF-32, but with two bytes instead of four. So the string "text" in UTF-16 just looks like this:

<code><u>00 74</u> <u>00 65</u> <u>00 78</u> <u>00 74</u></code>

and you can compare it to the UTF-32 version above and see it's the same thing but with a lot fewer zeroes.

But to store characters with big code points like the emoji story in the previous section using UTF-16, you need something called "surrogates" introduced in Unicode version 2.0. Surrogates are 2-byte pairs that are reserved just for telling a computer decoding UTF-16 "hold on, the next two bytes are part of this character too," and they make UTF-16 the first example of a variable-width encoding that I mention in any detail here. That emoji story “`👀❗🚌💀.`” looks like this in UTF-16:

<code><u><b>d8 3d</b> dc 40</u> <u>27 57</u> <u><b>d8 3d</b> de 8c</u> <u><b>d8 3d</b> dc 80</u> <u>00 46</u></code>

The "❗" has a small enough code point that it fits in two bytes (`27 57`), and the period is just ASCII and actually needs to be padded out with a zero byte. But the other three characters all need a surrogate. They each take four bytes to represent in UTF-16.

Compare UTF-32 and UTF-16. UTF-32 is a huge waste of space, but at least you can be sure that any character in it will take exactly four bytes. That makes it easier to, say, find the fifth character in a UTF-32 encoded string: you just have to count by fours. UTF-16 uses less space, but you can see from the encoding of "text" above that it still has a bunch of relatively useless zeroes when you're just working with ASCII, which is a waste. And because of its being variable-width, it doesn't even have the nice indexability that UTF-32 does: in order to get to the fifth character in a UTF-16 string, you need to know how many of the first four characters have surrogates. It's the worst of both worlds, but because of a bold and forward-looking decision on Microsoft's part, they're stuck with it. I trust they've learned their lesson.

## UTF-8, World Domination and the New Mojibake

The last encoding is the most complicated (by far), the most space efficient (almost always) and the most widely used for text that actually gets stored on a disk (as opposed to in temporary memory). UTF-8 takes the surrogates from UTF-16 and kicks them into overdrive; whereas UTF-16 uses two or four bytes per character, UTF-8 can use anywhere from one to six<sup id="ref8"><a href="#foot8" class="ref"></a></sup> by reserving some of the bits in each byte to tell any interested parties "hold on, more coming in the encoding of this character".

Pushing surrogates to their limit allows UTF-8 to pull off a very, _very_ nice trick, and one that will probably ensure its dominance in the world's digital text for the foreseeable future: unlike either of the other two UTFs, UTF-8 can encode any ASCII character the same way ASCII does.<sup id="ref9"><a href="#foot9" class="ref"></a></sup> To drive the point home, here's "text" encoded using UTF-8:

<code>74 65 78 74</code>

Note the lack of zeroes for padding. In fact, as promised, this is identical to the ASCII encoding. In software, which places great value in backwards compatibility, that's huge. It means all the old ASCII-encoded text which has been sitting around for decades is _already_ legitimate UTF-8.

But unlike ASCII, UTF-8 can also handle our fancy emoji story, which looks like this:

<code><u>f0 9f 91 80</u> <u>e2 9d 97</u> <u>f0 9f 9a 8c</u> <u>f0 9f 92 80</u> <u>2e</u></code>

This takes one byte more than UTF-16 because the second character takes three bytes instead of two. But consider the 50% savings in the "text" example and the fact that ASCII characters are far more prevalent than emoji, and UTF-8 is the clear winner for efficiency of general-purpose text storage.<sup id="ref10"><a href="#foot10" class="ref"></a></sup> A [sharp increase](http://www.w3.org/blog/2008/05/utf8-web-growth/) in UTF-8-encoded text on the Web from 2004–2008 reflects this, and [more recent statistics](http://w3techs.com/technologies/details/en-utf8/all/all) seem to show that that trend has only continued.

The transition from single-byte encodings to UTF-8 isn't always smooth, and you yourself may have occasionally seen a new breed of mojibake: garbled text resulting from multi-byte UTF-8 text being decoded as if it were single-byte encoded. See, for example, the following picture, spotted in the wild in a [comment on a recipe website](http://the-toast.net/2014/09/04/eighteen-kinds-people-comment-recipe-blog/) (link only tangentially related):

<img class="fullwidth" src="{{ get_asset('images/posts/Unicode/rosti.png') }}" />
<br class="fullwidth" />

That last word should be "[Rösti](http://www.theguardian.com/lifeandstyle/wordofmouth/2011/oct/13/how-to-cook-perfect-rosti)", but at some point it was encoded to the following bytes as UTF-8:

<code><u>52</u> <u>c3 b6</u> <u>73</u> <u>74</u> <u>69</u></code>

and then decoded using the single-byte [CP-1252](http://en.wikipedia.org/wiki/Windows-1252) encoding. You can see in the table at that link that the second and third bytes (the UTF-8 encoding of ö) do indeed correspond to the Ã and ¶ characters in CP-1252, more's the pity.

UTF-8 is becoming more common but much of the old, Unicode-naïve software used to read text is still hanging around and [doing the wrong thing](http://www.hanselman.com/blog/WhyTheAskObamaTweetWasGarbledOnScreenKnowYourUTF8UnicodeASCIIAndANSIDecodingMrPresident.aspx) with it. This seems to be getting less and less common as UTF-8 becomes the new normal, but it will perhaps never go away entirely. Still, Unicode in general and [UTF-8 in particular](http://utf8everywhere.org) are two of the closest things to an unambiguous good that we've got in software these days.

## Other Good Information About Unicode

Joel Spolsky's article [The Absolute Minimum Every Software Developer Absolutely, Positively Must Know About Unicode and Character Sets (No Excuses!)](http://www.joelonsoftware.com/articles/Unicode.html) is probably the canonical entry-level Unicode intro and, though I didn't consult it when writing this essay, I'm sure I unwittingly borrowed a lot from it.

David C. Zentgraf has a similarly-titled essay, [What Every Programmer Absolutely, Positively Needs To Know About Encodings And Character Sets To Work With Text](http://kunststube.net/encoding/), which goes a little more in depth than my essay or Spolsky's. It has some PHP-centric stuff at the end, but that stuff does come along with some conceptual content which is of general interest.

If you write Python, you might enjoy ten-year Python vet Ned Batchelder's annotated presentation on [Pragmatic Unicode](http://nedbatchelder.com/text/unipain.html).

-----

<ol>
<li class="foot" id="foot1"><p>I could include several layers below this one, I think, but they would involve materials science, physics and other things about which I can't really claim any knowledge. <a href="#ref1">↩</a></p></li>

<li class="foot" id="foot2"><p>Another way to look at a file's content is that it is just <em>one huge, colossal number</em>, where by "huge, colossal" I mean that the number representing a single average English sentence would be in the vicinity of the number of atoms in the Universe.

This perspective leads to some pretty interesting results. <a href="https://en.wikipedia.org/wiki/RSA_%28cryptosystem%29">One of the most widely used cryptosystems</a> treats a message as a single huge number and thereby gets a lot of mileage out of how hard it is to reverse some operations involving huge numbers. Somewhat more obliquely, <a href="https://en.wikipedia.org/wiki/Gödel's_incompleteness_theorems">Gödel's incompleteness theorems</a>, which prove very deep mathematical results by viewing entire mathematical systems as very large numbers. <a href="#ref2">↩</a></p></li>

<li class="foot" id="foot3"><p>Fun fact: the "ASCII to decimal converter" I linked in the previous section is a liar, or at least it's not telling the whole truth. If you type a character like é into the top box, it will happily convert it into a number larger than 127 in the "Result" box. But ASCII does not designate characters corresponding to such numbers. In fact the tool uses the Microsoft-devised single-byte encoding <a href="https://en.wikipedia.org/wiki/Windows-1252">CP-1252</a>. <a href="#ref3">↩</a></p></li>

<li class="foot" id="foot4"><p>Among the complications I'm glossing over in this explanation: Should <code>é</code> be considered one character or two (<code>e</code> + <code>´</code>)? How do you account for the fact that the uppercase version of <code>i</code> is <code>I</code> in every language except Turkish, where it is <code>İ</code> (and it is <a href="http://gizmodo.com/382026/a-cellphones-missing-dot-kills-two-people-puts-three-more-in-jail">very important</a> to get things like this right)? What about the case of the Greek letter sigma, which should be written as <code>σ</code> in the middle of a word and <code>ς</code> at the end? What about the German <code>ß</code>, which is usually written as <em>two</em> characters, <code>SS</code>, in uppercase? These considerations and many others are addressed in the full Unicode spec. <a href="#ref4">↩</a></p></li>

<li class="foot" id="foot5"><p>"In principle" because as of this writing (Unicode version 7.0) only about a tenth of the code points are currently assigned to characters. But even the 113,021 characters claiming those code points are enough to represent a <a href="http://www.unicode.org/standard/supported.html">whole lot</a> of the world's scripts. <a href="#ref5">↩</a></p></li>

<li class="foot" id="foot6"><p>I'm omitting another detail here: something called a <a href="http://en.wikipedia.org/wiki/Byte_order_mark">byte order mark</a>, which (for reasons you'll have to click that link to read about because they're outside the scope even of this footnote) is necessary just to tell computers how to read UTF-32-encoded text correctly. That's just one more reason UTF-32 isn't widely used. <a href="#ref6">↩</a></p></li>

<li class="foot" id="foot7"><p>c.f. <em><a href="http://www.unicode.org/history/earlyyears.html">Early Years of Unicode</a></em> <a href="#ref7">↩</a></p></li>

<li class="foot" id="foot8"><p>"<em>Six??</em>", you might say. "Even UTF-32, enormous waste of space that it is, only needs four!" Well, it <em>could</em> take six, if you needed to support over two billion different characters. For the mere million or so that actually exist in Unicode as of this writing, four bytes suffice. <a href="#ref8">↩</a></p></li>

<li class="foot" id="foot9"><p>There are one and a half interesting related concepts worth mentioning here. One is that UTF-8 is an example of a <a href="http://en.wikipedia.org/wiki/Prefix_code">prefix code</a>, which is an important thing for an encoding to be to reduce ambiguity when you're trying to decode it. The half-related concept is that of <a href="http://en.wikipedia.org/wiki/Huffman_coding">Huffman coding</a>, which is a way of devising an encoding for each character in a text so that the encoded text takes up as little space as possible. UTF-8 is not a Huffman code, because a Huffman code is specific to a particular message. But its use of only one byte for the most common characters and more bytes for more esoteric ones seems similarly motivated. <a href="#ref9">↩</a></p></li>

<li class="foot" id="foot10"><p>There are two possible exceptions to this. One is CJI text: many CJI characters take three bytes in UTF-8 and only two in UTF-16. But on the Web, there's often enough plain ASCII in the HTML and other cruft required to turn plain text into a Web page to still make UTF-8 competitive with UTF-16, space-wise. The other exception is the dystopian near-future where everyone communicates entirely using emoji. But in that case we can probably do better than any encodings currently in use. <a href="#ref10">↩</a></p></li>
</ol>