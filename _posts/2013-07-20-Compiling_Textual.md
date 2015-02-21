---
layout: post.images.html
title: Compiling Textual
summary: Circumventing the App Store for an Open-Source IRC Client.
tags: [textual, irc, xcode, tutorial]
---

Okay, I'm sure that by the time I need this again it will be defunct in some way because such is the nature of XCode, but nevertheless I've done this twice and struggled for way longer than necessary with what I think was more or less the same thing both times. So, for my own reference and that of anyone trying this for themselves, here's the steps for how I successfully compiled [Textual](https://github.com/Codeux/Textual) 3.1.0 with XCode 4.6.3. These instructions assume you have XCode and Git installed and some basic familiarity with the command line.

1. Clone [the Textual repo](https://github.com/Codeux/Textual.git) into some directory. I used `~/Code/Textual` and did it with the [Mac Github app](http://mac.github.com/) by clicking the "Clone in Desktop" button on the right side of [Textual's Github page](https://github.com/Codeux/Textual).
2. Check out a released version of Textual. Go to the folder where you checked it out and issue the command `git tag -l` to list the available tags. Pick one (probably the one with the biggest number, I dunno) and do `git checkout tags/<tag>` where <tag> is the tag you chose. In this case it was `v3.1.0`.
3. Follow steps 3–5 in [these instructions](http://www.numlock.ch/news/mac_os_x/how-to-compile-textual-open-source-irc-client-on-mac-os-x/).
4. Open the "Frameworks" folder in your checked out Textual folder. It will have some subfolders in it: five, as of this writing. You care about three of them: "Auto Hyperlinks", "Blowfish Encryption" and "System Information". For each of these three, do the following:
    - Open the folder and then the "Source" subfolder.
    - Drag the file with the `.xcodeproj` extension onto the "Main Project (Textual)" project in the Project Navigator in XCode. The Project Navigator is the left-hand sidebar with the little folder icon at the top selected; you may have to left-most button above the "View" control in the toolbar to turn it on. <a href="{{ get_asset('images/posts/Compiling_Textual/Adding_Frameworks.png') }}" rel="bytebox">Here's a screenshot summing up what does where.</a>
    - Turn off code signing for the resulting (sub?)project in XCode. That means repeat step 5 from the instructions linked in step 3 above.
5. Follow steps 6–8 in the [aforementioned instructions](http://www.numlock.ch/news/mac_os_x/how-to-compile-textual-open-source-irc-client-on-mac-os-x/).
6. The app will be in the `Build Results/Release` subdirectory of your Textual checkout. Put it in your `Applications` folder.
