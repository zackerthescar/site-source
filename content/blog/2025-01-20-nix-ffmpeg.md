+++
title = "FFmpeg dependency management with Nix overlays"
date = 2025-01-20

[taxonomies]
tags = [ "nix", "ffmpeg" ]
+++

## FFmpeg is weird...

...and it has to be! As the undisputed multimedia tool that interfaces with
tons of other dependencies, it needs to work alongside, and with, conflicting
licenses, patents, etc. 

The result is that to access the best of what the multimedia world has to
offer, you'd need to compile FFmpeg yourself - a tedious process that has
spawned [tons](https://github.com/markus-perl/ffmpeg-build-script) and
[tons](https://github.com/slyfox1186/ffmpeg-build-script) of scripts that
purport to "help" users who need specific FFmpeg dependencies.

I personally find these schemes to be terrible, and working with FFmpeg
to be terrible as a whole (not the CLI - I actually think the
FFmpeg CLI is pretty intuitive if you have a good understanding of 
multimedia fundamentals) as such. It took me *working on FFmpeg itself*
to understand how to actually compile FFmpeg with specific dependencies.

## Enter: Nix

Pulling out the "Purely Functional Software Deployment Model" paper is 
now kind of a meme at this point - but deterministic environments like
the ones afforded to us by Nix actually solves the FFmpeg issue!

> Wait, but isn't this just a variation of the "build scripts" that you
> purport to hate?

It's roughly in the same idea-space, but since we're piggybacking
outselves onto the Nix package manager rather than some script that
is undocumented and easy to break

> Wait but the Nix package manager is pretty inscrutible itself

Yeah. I hope it gets better too. I don't think Nix's issues with
being absolutely difficult to use is quite the same as my gripe
with the typical build scripts, though.

## Example 1: Dev flake

This example only requries the presense of the Nix package manager,
and is how I invoke FFmpeg on my server. We define a flake our usual
way:
```nix
{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem
      (system:
        let
          pkgs = import nixpkgs {
            inherit system;
          };
        in
        with pkgs;
        {
          devShells.default = mkShell {
            buildInputs = [
                # We add our packages here
            ];
          };
        }
      );
}
```

then add an overlay to the output

```nix
    ...
    flake-utils.lib.eachDefaultSystem
      (system:
        let
          pkgs = import nixpkgs {
            inherit system;
            overlays = [
                (self: super: {ffmpeg-c = super.ffmpeg.override {
                    ## We define the build options here
                    withUnfree = true; 
                    withDav1d = true;
                };})
            ];
          };
        in
    ...
```

and then add this newly defined package to our devShell

```nix
        ...
        with pkgs;
        {
          devShells.default = mkShell {
            buildInputs = [
                ffmpeg-c
            ];
          };
        }
        ...
```

> Hey, why are we defining the package to a new name? I thought the
> point with overlays is to override packages?

I'm glad you asked! In this example, because only the `devShell`
is depenedent on our new `ffmpeg-c` package, we don't see big
issues by naming it `ffmpeg`, but of course, this just forshadowing
for the next part, where...

## Example 2: Overriding in NixOS

...we're no longer just defining just a `devShell`, but a NixOS
system as a whole.

In a "system" flake for NixOS or nix-darwin, instead of `devShells.default`
as the output of our flake, we have `nixOSConfigurations` and 
`darwinConfigurations`. Also remember - FFmpeg is *everywhere*. Most fresh
Linux systems have a non-encumbered version of FFmpeg *somewhere* to handle
video - the first step in making a system usable is making it play cat videos.

So let's try defining an overlay module in `overlays/default.nix` that overrides
`ffmpeg`!

```nix
# ./overlays/default.nix
{ config, pkgs, lib, ... }:

{
  nixpkgs.overlays = [
    (self: super: {
        ffmpeg = super.ffmpeg.override {
            withUnfree = true;
            withDav1d = true;
        };
    })
  ];
}
```

and let our system use it,

```nix
    ...
    mySystem = nixpkgs.lib.nixosSystem {
        specialArgs = { inherit inputs; }; # Pass flake inputs to our config
        modules = [
            ...
            ./nixos/atlantis/configuration.nix
            (import ./overlays/default.nix)
            ...
        ];
    };
    ...
```

then try running `nixos-rebuild switch`...

> Hey, it's been three hours and nixos is trying to rebuild all of
> KDE from source. What the hell is going on?

We're running into the issue that the `ffmpeg` package is no longer what
`nixpkgs` says it is - we've overridden it, and NixOS needs to evaluate
if the system even compiles with the new config. Obviously, we want to 
avoid that. We want to use binaries that other people spent their precious
machine hours on.

The solution is what I alluded to earlier in Example 1: 

```nix
# ./overlays/default.nix
{ config, pkgs, lib, ... }:

{
  nixpkgs.overlays = [
    (self: super: {
        ffmpeg-c = super.ffmpeg.override {
            withUnfree = true;
            withDav1d = true;
        };
    })
  ];
}
```

Introducing a new package that other packages don't depend on. This
does mean that you'll have two FFmpeg binaries floating around in
your system, but that's a small price to pay.

Despite all that, this system of managing FFmpeg's dependencies is
still the cleanest and most robust solution to the FFmpeg dependency
problem. Not only that, but you also learn a little bit about how
to manage your own `devShells` for niche use cases - something that
will almost certainly help.

Have fun with your multimedia!

-r/c/s
