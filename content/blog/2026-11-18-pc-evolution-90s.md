+++
title = "How to Kill God: Evolving the PC to crush Unix 1993-2003"
date = 2026-11-18
+++

Contrary to popular belief, the Catholic Church wasn't as opposed to the
existence of the printing press as the later Protestant reformation lore
tells you - the Gutenberg Bible was printed chiefly for Catholic 
monasteries,  clergymen, and the already literate (which, in 
per-reformation western Europe, basically means wealthy and in cahoots 
with the Church). It got to a point where these bibles had buyers before
they were complete (sounds kinda familiar if you ask me). 

Nevertheless, the Protestant framing of the printing press as a divine
implement to break Rome's grip was very much useful to the Lutherans, 
Anglicans, and later anti-theists who started the Enlightenment. Latching onto
the one writer who wrote that the Pope "must destroy the printing press
least printing destroys the Church" thus becomes an extremely useful
narrative device for many. Technology has always had an undertone of it
being utilized by a lower, oppressed class to ultimately usurp the "order of 
things," which is why I find the framing so fascinating.

---

By 1993, the Amiga and the Atari ST computers were breathing their last
breaths. Apple was like a fish on land not knowing how to exist despite
their formidable creative base, and the market more or less coalesced
into two camps.

The first camp were the sages - these were people who lived the computers
in the minicomputer days and finally found themselves with their Suns
and SGIs and RS/6000s on their desks. Sophisticated boxes designed for
reliability and performance similar to the VAXen and PDPs that they were
used to, shrunken to the desktop format. Most of these boxes lived in 
university and commercial research labs, but that was also where the
"hacker culture" formed in the first place - where the practical jokes
and ethos was shaped.

On the other, the unwashed, unenlightened masses. At this point the only game
left in the market was the IBM PC compatible. A machine for the paper-pushers.
To the hacker, the PC was a dead end. Spreadsheets, word processors, a good
game or two on occasion, but nothing like how we romanticize DOS gaming now.

Just to put into perspective, this was what the hacker saw in 1993:

|   | Unix Workstation | IBM PC Compatible |
|---|------------------|-------------------|
|CPU| RISC Superscalar CPU 50-200MHz, out-of-order |  386-486 @ 33-66MHz  |
|  | | Pentium @ 60-66MHz
|RAM| 16MB - 64MB  | 4MB - 16MB |
|HDD| SCSI Bus Mastering 400MB-1GB | IDE, ~100MB-400MB |
|GFX| 16-bit or 24-bit color, >= 1152x900 | ISA or VLB VGA, 256 colors, 320x240, 640x480  |
|3D| SGI Indigo2 XL, XZ, Extreme | lmao, no |
|NET| 10BASE-2 or 10BASE-T network | 2400 - 14.4k modem |
| | always on, NFS storage | mostly BBSes, maybe NetWare in an office |
|OS| Preemptive multitasking | No multitasking or cooperative multitasking
|  | Paged virtual memory | No paging |
|  | Kernelspace/Userspace separation | lmao, no. you have DOS. |
 
The future really did seem, if you were one of the sages, to be that a
scaled-down Unix machine would be the machines that everyone would have on
their desks, and not the other way around. Here's a quote from a famous mailing
list thread:

> Of course 5 years from now that will be different, but 5 years from now 
> everyone will be running free GNU on their 200 MIPS, 64M SPARCstation-5.

But of course, we know that the PC was the platform that won the war, and
not the Unix machine. How? How do you bring platform with over a decade of
baggage to the modern era?

# Step 0 - a proper bus for the next generation of PCs

Before anything else down this list has any chance of succeeding, the PC 
had to reckon with its bus. The most common was the 16-bit ISA bus, cheap,
but woefully inadequate. IBM tried and failed with MCA (because they pissed
off the clone makers), the Gang of Nine tried and failed (EISA was still 
tied to the 8.33MHz ISA clock), and VESA tried and failed (VLB was 
tied to the 486's characteristics and nobody implemented bus mastering 
properly).

Enter the PCI bus. This is the true step up from the "simple" trick of
glorified extension cables between the CPU and expansion card. PCI offers
proper arbitration that made bus mastering real, first-class plug-and-play
(goodbye jumpers!), and most importantly, a host bridge that decoupled the
CPU FSB from the downstream devices. Without this decoupling, every bus
would have been as quirky and one-generational as VLB.

The final thing that cemented PCI as the bus that will carry the PC to
domination was openness. Intel created the PCI-SIG industry group and gave
it the spec as soon as the first revision was done, allowing for chipset
makers to pump out PCI motherboards for 486 and Pentium sockets as soon as
they were ready to. The openness and platform agnostic design also allowed
other platforms to adopt it. Notably, the PowerPC camp switched to PCI from
NuBus as well.

# Step 1 - IDE Bus Mastering

While a multitasking OS doesn't _require_ a DMA hard disk, it would sure be
nice if reading and saving files isn't 100%ing the CPU with `rep insw` and 
`rep outsw` calls. This is the premise of bus mastering - allowing the drive 
to read and write data from/to RAM while the CPU goes to do other things.

IDE, as originally implemented, is kinda dumb. It's an ISA subset extension 
cable: D0-D15 from ISA, R/W strobes, IRQ14, and reset. The old 8237 DMA chip
was also not suitable for bus mastering from a large hard drive, thanks to its
64KB limit.

Enter the PIIX - the PCI-ISA-IDE Xcelerator, a southbridge that implemented
two bus-master IDEs channels. It retained the I/O port path, but adds a PCI BAR 
that exposes the PIIX's new bus-mastering IDE mode. Legacy code still did the
strobe-and-rep dance, but competent OSes could flip some bits and hand hard drives
a memory window and let it do the rest.

Now your `:wq!` or `Ctrl+S` doesn't stop your modtracker, and starting a new
program didn't bog down your email client!

# Step 2 - The P6 and its consequences

Probably the most important thing in the evolution of PC sits right here with
the 686 architecture. If anything was the "most important" evolution that led
to the PC killing the Unix workstation, it was this one. So why the P6?

Research into CPUs in and around this era was very much focused on the idea of
RISC, or Reduced Instruction Set Computer. It would not be an exaggeration to
say that _all_ the Unix workstations in 1993 would be RISC machines, or at least
RISC-inspired. Part of the view from the ivory tower was that the PC, if it had
any ability to survive, had to do the same painful transition that all Unix
platforms had going from the Motorola 68000 to {SPARC, MIPS, PowerPC, PA-RISC}.

The P6 was the solution to that. 

For comparison, the P5 looked like this, and was a typical pipelined design
not too dissimilar from the "textbook MIPS pipeline." In fact if you are
familiar with that design, you should be able to identify which units 
correspond to their MIPS counterparts. The issue here is the U/V pipe in the
execution unit - ideally, you'd want to utilize both pipes here, but the 
P5 Pentium had arcane pairing rules for utilizing the V pipe that made pairing
(and thus, simultaneous execution of two instructions at once) not very
practical. 

![p5 block diagram](/img/p5.svg)

The P6 looked like this. Needless to say, a lot more complicated. There are
three things here that make the P6 a true leap from the P5 and put the x86
on equal footing as the most advanced of RISC machines.

- Decoder: the P6 decoded the x86 instructions into smaller micro-ops. This
turned the P6 into something a lot more RISC shaped. Intel bet (correctly)
that Moore's Law means the decode circuitry will shrink relative to the total
usable size, and basically destroyed the RISC argument right then and there.

- Reservation stations: Oh yeah, we're fully out-of-order on the P6. Goodbye
WAR and WAW hazards, and hello fearless 100%ing of the underlying execution
engine.

- Reorder buffer: With x86, instructions are supposed to be retired
in-order. The reorder buffer allows the CPU to lie about the underlying 
execution of instructions and essentially look like things are going in-order.

![p6 block diagram](/img/p6.svg)

The Pentium Pro, the first CPU that used this new P6 architecture, was
expensive and not exactly within-reach for most. But it was proof that a
powerful RISC-like CPU, combined with a competent OS, could upend the 
"natural order of things" while keeping backwards compatibility with existing
software. So where are these competent OSes?

# Step 3 - Moving away from DOS

While all this was happening, the evil overlords at Microsoft have been priming
developers of PC software with a shiny new API called Win32. It was the easiest
way of writing GUI apps and targeting a large market of Windows users. Wouldn't
it be nice if Win32 applications could run on a proper kernel?

Enter Dave Cutler's revenge - NT is essentially the "proper kernel" I was 
eluding to - Cutler came from the world of DEC VMS, where he experimented with
preemptive multitasking, paging and virtual memory, and an explicit 
kernel/userspace separation. By the time Windows NT 4.0 came out in 1996, there
was already a wealth of Win32 apps shipped for Windows 95 (and thus plug-and-play
on Windows NT 4.0), and a competent processor with the Pentium Pro. A rock-solid
platform for server and mission-critical workstation tasks like CAD and Win32
programming.

The sages of Unix, however, have their own platform, it's called Unix! So, a
Unix OS was needed to entice them over. A shrewd programmer in Finland had
been writing a kernel for the PC, with the 386 in mind. The sages of Unix did
have something the PC crowd could use, however - a sect of these sages had
source code for most of a Unix userland ready to go. The GNU userland was
already popular with many a Unix sage, so combining it with this newfangled
kernel provided a lawsuit-unencumbered Unix environment (Unix itself was
going through a rough lawsuit period between Novell and the UC regents).
The PC suddenly had an enticing platform for these sages - and it was
_cheap_. The economics of PC's enormous scale hit the sages like a disputation
on a church door.  

# Step 4 - Graphics

While P6, PCI, IDE Bus Mastering, and a choice of NT and Linux sufficiently
chipped away most of the Unix workstation's advantages, they still had their
golden child in SGI. These machines were slick, new-age devices with gorgeous
UIs, was where 3D research lived, and it even had cultural cachet ("It's a UNIX
system, I know this!" refered to an SGI machine). How to slay this beast?

The first step was the 3Dfx Voodoo. 3Dfx was founded by ex-SGI engineers who
wanted to build hardware-accelerated 3D cards not unlike the ones that were
in the SGI machines they helped develop. The 3DFx Voodoo was essentially, a
card that implemented the bare minimum of OpenGL (the API that SGI spun out
as an open standard) needed to allow for video games to run. It wasn't quite
enough for work stuff like CAD (which was the original goal for OpenGL) but
the sheer scale of Voodoo and Voodoo2 meant that PC suddenly had 3D investment
money in the form of Voodoo card sales and video games. Money that could rival
any amount of research-based funding, especially after the end of the Cold War.

The next step, IMO, is the Geforce4 Ti, at the tail end of our era of discussion
in 2003. Prior to this, cards like the Voodoos and RIVA TNT2 used a fixed pixel
pipe. The Voodoo even separated rasterization and texture mapping into two 
discrete chips. Going from the fixed model to a shader model was the first step
in transforming the GPU from mere raster acceleration to GPGPU like we have
with CUDA and Ray-Tracing now in 2026. The seeds of computing now was laid
right here at the grave of the Unix workstation. 

# Conclusion

So why did I write this? Well, I find the narrative fascinating, especially 
laid out like this, because there was never really any unified "let's kill the
Unix machine" call from the PC manufacturers (other than at Intel for a brief
period). It truly is beautiful. The other part of me thinks that us, the
consumers of computers, may have to take up the implements to kill God (or a
upperclass of sages) yet again, and I'm not sure if the PC is the platform
to do so in 2026. Thoughts?
