+++
title = "Sysadmining is fun!"
date = 2022-11-07

[taxonomies]
tags = ["posts", "blog", "sysadmin"]
+++

# Preface

A great importance of being a sysadmin is documenting how your systems
work. I've never been much of a fan of the "oh I know how to do it in
my mind" mentality that most sysadmins have, and I don't blame them - 
I do it too, sometimes.

I just learned that a "rite" of being the sysadmin of ACM is that I get
to pave over everything on every system and do things my way. Being the
"benevolent dictator" for the year I'm sysadmin. I don't quite agree
with that, and I intend for the next sysadmin to know the ins and outs
of ACM UMN's server closet.


# Peg DHCP

Peg DHCP is a [joke RFC](https://www.rfc-editor.org/rfc/rfc2322) describing a
hilariously impractical way to hand out IP addresses using clothespins. It also
works surprisingly well in describing how ACM UMN's IP block is set up. Yep, no
DHCP, no dynamic allocation of IP addresses.

The spreadsheets detailing which IP is assigned to who is hilariously outdated,
and the seemingly agreed-upon way of tracking IPs was "find an IP in our range,
if it doesn't respond to ping, assign it." I've _finally_  created a new
spreadsheet detailing what IPs are in use, but it seems like everyone else is
as clueless as me on what some IPs are being used for...


# A deep dive into some of ACM UMN's systems

1. `argo`: This is the main system of ACM UMN. Members, on request, can
get a free VM with up to 4 cores and up to 4GB of RAM, as well as a public IP
under UMN's IP range. This is a 24-core Sandy Bridge based machine with roughly 6TB of
storage. It runs Rocky Linux, a downstream of RHEL. 

2. `vm`: Nicknamed `"vehicular manslaugheter"`, this is a new-ish system
(Broadwell IIRC?) that was supposed to be the replacement for `argo`, but
it now just sits there being used as a NixOS build machine. Work is ongoing
in migrating all active student VMs to `vm`, but it's going to be a while, 
as I need to get used to `NixOS` and also document _everything_ I do and why.

3. `medusa`: A machine held together with duct tape and magic. Currently runs
Debian 11 and has roughly 6TB of space, which will be helpful when we start
an activitypub thing as a club.


4. `garlic`: Our all-purpose CUDA machine! Currently has a GTX 1080 and an RTX
3080, and has `docker-nvidia` for all sorts of CUDA shenanigans!

# The big mess

It seems that the previous sysadmins knew their security craft well, because I
can't seem to actually be able to get into the management interfaces of the various
switches we use. Mind you - this is mostly a matter of communication (TL; DR I haven't
actually asked how they did it.) 

What I do know: A Raspberry Pi named `WOPR` (Wargames 👀) hosts `sshuttle`, a VPN-over-SSH
server that allows me to transparently access most of the management IPs in the `10.99.99.X` range.

What I don't know: Actually accessing the Cisco switch management interfaces. These switches
have not been updated in a _long_ time, and Chrome/Firefox refuses to work with the web
interfaces of these managed switches. :\ (This is a subtle reminder for you all to update
the firmware on your various networking devices.)

# The `TO-DO`s

1. Gaining access to the network switch management interfaces.

2. Re-working the networking setup in the server closet such that we don't rely on 
Peg DHCP anymore. (This is a project in the works with multiple people on the new 
ACM UMN Systems Committee. Stay tuned to see how this goes.
