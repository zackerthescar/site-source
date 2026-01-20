+++
title = "music production software just kinda sucks: a rant"
date = 2024-07-27

[taxonomies]
tags = [ "music", "professional audio", "saas" ]
+++

# update 01/19/2026

some parts of this is inaccurate, especially on the ilok cloud.
things haven't changed much in this space, and on the whole i
still stand by this piece, but beware that part on ilok cloud
is just wholely wrong.

# quick update

yeah I haven't updated my site in a year. i've gone thru quite a lot.
i doubt anyone really is keeping track tho, so w/e. i'll make a 
life update post at some point but right now i just need to rant.

(also shoutout to adam neely for the idea of labelling the subpoints
as chords :3)

# music production software sucks

## part I - the blissful, ignorant world of the FOSS-adjacent ecosystem

If you're reading this, chances are you come from the FOSS-adjacent 
ecosystem where DRM for software is more or less a non-issue - even 
with proprietary software (firmware, drivers, licensed software) 
it's just a matter of grabbing the package and installing the binary
first and performing the registration later. At worst, an AppImage,
or a flatpak (but that's a different issue compared to the hellworld
to """professional""" audio software).

In the music production world, the only analog to this paradism
is [REAPER](https://www.reaper.fm/).
It's a rather powerful, proprietary DAW that costs 225 dollars for
commercial use (which they define as generating over 20k dollars in
revenue yearly) or 60 dollars for noncommercial use. It's even available
on Linux (bless those guys for dealing with Linux audio bullshit).
They also provide a 60-day trial without needing you to even create
an account - you can just install the binary!

This is how software should be distributed. Unfortunately, this is
a rarity in the audio world.

## part IIm - the ilok

Everyone - meet the iLok.

Made by PACE, iLok is a DRM soulution that the audio companies all
fawn for.

Initially, the iLok was created as a USB hardware DRM storage pool
where your licenses are stored on the USB key itself - when the 
software in question (whether it is your DAW or it's one of the
many plugins you use) needs to authenticate, it will do some
shenanigans with the iLok USB key to verify that the computer is
authorized to use the plugin. (IDEA: R.E the iLok?)

We all know how flaky USB keys are. Countless horror iLok stories
can be found with a quick Google search. The music world does seem
to have settled on the iLok pretty early on though, so there really
wasn't a need to have 15 different proprietary hardware DRM schemes.

But you know what? For an era where software was mainly distributed
with firm releases (and a price tag to match), that was fair game.

## part IIIm7b5 - SaaS strikes

...and then the SaaS business model hits.

It's not a secret that the "as a service" model kinda doesn't work -
see the profitability figures of the barrage of streaming services, 
Xbox Game Pass, and other consumer-facing services for proof of that.
Generally speaking, the "as a service" model only really works if 
your product is on the cusp of taking over the entire market - 
the early days of Netflix comes to mind, with the less-thought-of
example of Ma Bell a close second (yes, all you SaaS companies are
just wannabe monopolies, come at me).

So it's not a surprise that in a world where name matters more than
technical superiority and subjective quality, the SaaS model works
_awfully_ well for pro audio companies - brand loyalty is one hell of
a drug and many-a-mixing engineer are guilty of this - even me!

It's also not a secret that SaaS demands a different scheme of
DRM as opposed to the big-box model of software - WideVine/Fairplay
is our analog to _the eldrich horror_ that I will explain in the
next part. WideVine and Fairplay both demand a certain set of
features from your device (namely - the OS you run, the level
of hardware acceleration, and most importantly the ability for
zero-copy) as well as a constant online-only connection - the
cardinal sin of SaaS is to go off the internet.

Of course the pro audio world has it's own analog to this.

## part IVmaj7 - iLok Cloud , or "Mom they SaaSed my hardware DRM!"

To be honest - I think that iLok Cloud is an improvement over the
design of the original iLok USB - it stores your licences on PACE's
servers and all you need to do is log in to gain access to all the
software you're licensed to! Sounds great, but remember the cardinal
sin of SaaS - you must never be offline.

iLok Cloud is completely inaccessible without the a connection to 
PACE servers. Not even for a second - you must have a constant
connection or the iLok software on your own computer will tell
all your plugins and even your DAW to stop working.

This. Is. A. Problem.

Especially since PACE servers aren't the most reliable.
Just look for "ilok server down" on Google for proof.

Always-online applications are unacceptable in the professional
world - work must always be done at work time, and the iLok Cloud
scheme is completely at odds with this scheme.

The silver lining is that the traditional iLok USB scheme is
still available as an option, but most pro audio companies
are trending toward iLok Cloud as the main option.

## part V - A symptom, not the cause.

Really, there isn't a pushback against SaaS even in the 
pro audio world - the effect of provenance and the status
of brands far outweight the technical deficiency of the
DRM scheme that cripples the industry and makes it less
accessible to all.

And this is not unique to the pro audio world - this is merely a foil
to get you, the reader, to think about how DRM affects you in personal
life - maybe you're a FOSShead and can't watch some sporting event
that's behind a restrictive FairPlay policy after already paying the monthly 
fee. Maybe you're an artist who needs to make ends meet by cutting out your 
Adobe subscription only to realize you can't pay the cancellation fee without
selling your soul to the devil.

SaaS is a cancer among the world of both consumer and professional software
alike. The best part? This is only one example!

## part VIm

So what do we do from here? 

I don't know the full answer to counter this monopolistic "as a service" 
model. But I know one thing for sure - we cannot let this terrible model 
stop us from consuming and creating - doing so will only mean that the 
monopolists win. 

Note that I'm _not_ advocating for piracy or breaking DRM here - I'm merely 
stating that isolating yourself from creating and enjoying works of art will
not help the cause. Some perfectly fine solutions are buying physical media,
purchasing perpetual licenses whenever available, and buying music off
Bandcamp - spending as much of your money outside the SaaS ecosystem and
making it as unappetizing to shareholders as possible is probbaly a good
start.

Keep doing you - watching, listening, enjoying, creating, by however
you see fit!

End of rant,

r/c/s
