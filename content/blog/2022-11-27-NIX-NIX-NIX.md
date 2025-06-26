+++
title = "NIX NIX NIX(OS)"
date = 2022-11-27

[taxonomies]
tags = [ "linux", "nixos", "functional" ]
+++

# A dive into the trinity

A joke that originated from my roomate Andrew goes something like this

![nixos trinitarianism](/img/nixos.svg)

Naturally, as with all things cursed, seeing that compelled me to try it.
As with anything new, it seemed scary at first - a massive departure from the
typical package management paradigm. However, having used it on-and-off for a
couple weeks or so, I can confidently say there's a lot to like about it!

# The motivation

So why `NixOS` over all the other distros out there? NixOS definitely pales in 
comparison to the mainstay distros (Debian, Ubutntu, RHEL, etc) in terms of 
official support from software vendors. 

The big motivation for `NixOS` is _avoiding DLL hell_. You think Linux doesn't
suffer from DLL hell? Think again! Think of the _multiple_ times you've seen
`apt` or `pacman` fail leaving you with a system full of garbage in your
`/usr/bin`! Think of the _multitude_ of precompiled Linux binaries that will
never run on your machine because of a different `libc`! Think of the amount
of library packages you installed for schoolwork once and never touched
again! That's what Nix is trying to avoid, in the big picture.

Of course, there's been other efforts to prevent this - most notably,
Fedora's [Silverblue](https://silverblue.fedoraproject.org/) aims to do
something similar - with an immutable root and 
[flatpaks](https://flatpak.org/) to manage a package's dependencies.
However, `NixOS`'s approach to doing this differs from Silverblue significantly.

`NixOS` attempts to avoid this DLL (or rather, package) hell by taking
inspiration from the world of functional programming - the seminal paper that
describes [Nix as a whole](https://edolstra.github.io/pubs/phd-thesis.pdf)
lays out the _functional_ `nix` language that `NixOS` uses to determine package
dependecies and settings.

The DevOps and sysadmin people will be immediately drawn to the _reproducability_ 
that NixOS provides - the "godfile" `configuration.nix` is all that is needed to
re-create an OS (sans any user data, obviously), and a typical `NixOS` development
environment strives to be completely reproducable - the same source code should
yield the same binary.

# Great, how do I get started?

There is no substitute for hands-on experience! Trust me, unlike other distros, this
isn't something that you can learn by osmosis! It's very much equivalent to learning
your first functional language!

You'd want to get the [NixOS ISO](https://nixos.org/download.html) and write it to
a boot USB, then follow [the instructions](https://nixos.org/manual/nixos/stable/) to
install it. These instructions are _very sparse_, so don't be afraid to Google!

Some installation notes and stumbling blocks:

1. The live ISO automatically assumes DHCP. While this is to be expected, it's a bit of a
stumbling block for people without DHCP (ahem, ACM UMN server closet). To get
around this, we first tell the live system the static IP

    ```
    ifconfig <dev name> xxx.xxx.xxx.xxx netmask xxx.xxx.xxx.xxx
    route add default gw xxx.xxx.xxx.xxx
    echo "nameserver 8.8.8.8 >> /etc/resolv.conf
    ```

    Then, in `configuration.nix`, we need to specify the same parameters.

    ```
    {
        ...
        networking.hostName = "hostname";
        networking.useDHCP = false;
        networking.defaultGateway = {
            address = "xxx.xxx.xxx.xxx"
            interface = "eth0";
        }
        networking.interfaces.eth0.ipv4.addresses = [{
            address = "xxx.xxx.xxx.xxx";
            prefixLength = 24;
        }];
        networking.nameservers = [ "8.8.8.8" "8.8.4.4" ];
        ...
    }
    ```

2. Early KMS - [early KMS](https://gist.github.com/LarryIsBetter/218fda4358565c431ba0e831665af3d1), where the display driver and
KMS is initialized during the initramfs stage, has some benefits in terms of 
laptop power savings, DRI2, and some alleged kernel space power savings. To
enable early KMS on a NixOS configuration, edit `configuration.nix`

    ```
    ...
    boot.initrd.availableKernelModules = [ "i915" ];
    boot.initrd.kernelModules = [ "i915" ];
    ...
    ```

    Note that `i915` is the Intel kernel module! Do `lsmod` to investigate
    what modules you need rather than blindly using `i915`!

# Even more to talk about

There is a _lot_ to the Nix ecosystem, as you can see from the trinity at the
top of the post. We've only scratched the _surface_ of `NixOS`! Not the Nix
ecosystem, just one piece of it. I really do encourage you to try it out on
your own, and do stay tuned for my `NixOS` updates!

Til next time, 

r/c/s