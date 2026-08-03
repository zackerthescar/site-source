+++
title = "Trusted Execution Day: speculations about a Future"
date = 2025-10-02

[taxonomies]
tags = [ "code", "programming", "speculative fiction", "security" ]
+++

# Preface

This scenario is inspired mainly by LaurieWired's 
[what if humans forgot how to make CPUs](https://www.youtube.com/watch?v=L2OJFqs8bUk),
the long-abandoned [Web Environment Integrity](https://en.wikipedia.org/wiki/Web_Environment_Integrity)
APIs, common discourses around internet privacy and encryption, 
interactions between free software and the worldwide patent system, as 
well as legal discourses on "code is speech" and the separation 
between source code and binary commonly accepted in most copyright
jurisdictions. 

I do not intend for this scenario to assert a political belief in any
sense (even if my biases will show), and I will insist that this
scenario is possible within any (reasonable) political system.

# UPDATE 01/19/2026

I did not expect "The War on Personal Compute" to take the direction
that it did. I also did not expect that many typos! I did not use
a spellchecker when I originally wrote the story and do not apologize
for it!

(For future reference, late 2025 saw the start of rising prices for
components like (D)RAM, NAND chips, and GPUs thanks to rampant speculation
and spending on future capacity by major corporations in the AI race.)

I think the part about the underground should guide us on how we navigate
the mess that is losing these battles on the "war on personal compute" as
it is. There's always a way out of these things. At least I am hopeful.

# The Story

- T-7 years (read: T minus 7 years): A stochastic attack on a major
economic jurisdiction occurs, and significant amount of lives are lost. 
In its wake, national and international criminal investigation agencies 
point to the use of vulnerabilities in legacy systems that interact
with consumer devices as "the culpurit" (whether this is a conspiracy to 
enact this exact future by said agencies, I cannot say). Interest groups 
representing the victims of the attack are formed, and they lobby legislative 
bodies around theworld to restrict use of custom, unsigned code (such as, the 
exploit chain used by the attackers to enact such a horrific loss of life).

- T-6 years: An industry effort by Big Tech to introduce a worldwide trusted
execution scheme is started. Google markets this as the biggest push towards
truly secure computing, Netflix touts even higher bitrates for future computers
with only trusted execution enabled, Amazon and Microsoft design a new 
generation of trusted-execution-only AWS and Azure offerings. The biggest 
paradigm shift in computing since the existence of computers starts now.

- T-3 years: Lobbying (and perhaps even outright corruption) and 
grassroots campaigns (as with the lobbying portion, whether this was astroturfed
is up to interpretation) gain traction worldwide. While laws are passed
mandating audits and pentesting of code used by the military as well as 
industrial systems, desire for even more restrictions on the ability to execute
code on consumer equipment grows. The Association for Computing Machinery, as
well as thousands of computer scientists petition the government against such
measures, but unfortunately, Big Tech companies as well as consumer device
manufacturers have testified that such a measure is possible and desired.

- T-3.5 years: The first trusted-exectuion-only consumer devices roll off the
line. ICAAN, in cooperation with the ITU (the telecommunications and technology 
wing of the United Nations), is entrusted with the first "universal private
keyring," without with executables cannot be run on trusted-execution-only
devices.

- T-3 years: Major non-profit Internet companies like the EFF and Wikimedia
Commons as well as figures like Tim Berners-Lee speak out against
government-regulated trusted execution schemes. However, public sentiment has
already swung in the other direction, turning opposition to trusted execution
schemes into a fringe opinion held mostly by academics, researchers, some 
developers, and "bums and criminals," according to Representitive Fillmore 
Blanket from Townsville, FL.

- T-2.7 years: A mass biohacking incident where many smart medical implants
suddenly short their batteries cause untold deaths. The root cause is traced
to shoddy Bluetooth handling code, but the incident prompts more public pressure
on legislators and tech companies alike to implement trusted execution.

- T-2 years: Very few Android apps even launch on rooted devices anymore. Every
streaming app, game, and widget now refuses to run on rooted devices. Android
app distributors implement automated code review for every submitted application
and advices that all apps refuse to run on rooted devices.

- T-1.5 years: The first patch that exposes a kernel API to ensure that
the kernel is compiled and signed by an approved compiler and issued by
a national cybercrime prevention agency is accepted in the Linux kernel tree, 
after much discussion on and off the LKML. The issue of "trusting a compiler"
is raised in the LKML, with much discourse around Thompson's "Reflections on
Trusting Trust", but the thread becomes one of the hottest on LKML, and the
patch is accepted regardless of the opposition.

- T-1.3 years: A coalition of e-waste management companies issue a joint 
statement regarding trusted execution, planned obsolesence, and the continuing
e-waste issue that will grow exponentially with the introduction of a trusted
execution requirement for consumer electronics. This joint statement is
generally not seen by the public (again, whether due to apathy or deliberate
concealment efforts by social media companies, is up to interpretation).

- T-1 year: Every major consumer desktop operating system now refuses to
run executables not signed by one of a few regional cybercrime 
prevention agencies. To ease concerns brought up by developers, these
operating systems include keys that allow locally compiled/interpreted
software to work on the device it was compiled on for one week. Most governments
now offer a "developer registry" allowing developers to acquire keys to sign
their code for limited personal use. Crucially, these signatures are traceable
back who whomever write such code, and there are strict limits on I/O. 
Developers must be part of trusted companies or institutions to legally bypass
such restrictions. 

- T-0.5 years: All major browsers will now check for valid signatures
on JS and WASM files before execution, and Web APIs that check the entire
OS and execution environment for integrity are ubiquitous. Generally speaking, 
a rift between the "signed Internet" and the "unsigned Internet" now exists, 
which divide users across racial, economic, and opinion lines. Resistance
against trusted executable verification on all devices is futile - even
mainstream Libertarians relent to the prevailing opinion that code generally
cannot be trusted. Academic computer science is now majorly transformed into
vocational traning for coding and working within the trusted execution paradigm.
Recursion is now generally considered a faux-pas even in the theoretical sense,
and professors dare not speak of `eval()` functions.

- T-Day: Legislation requiring all computers to execute only trusted executables
are in effect today in most major economies. Most people do not feel a 
difference - for some, they have (or are) already living this reality. For 
others, they have already migrated to devices that comply, as the rift
between the "trusted Internet" and the "untrusted Internet" is such that not
having a trusted device is considered crippling. Buybacks for devices that do 
not comply start now. e-Waste handlers must now turn over non-compliant devices.
While many comply, others start to hoard their non-compliant devices.

- T+1 year: A thriving black market for illegal computers emerge, dealing in a 
variety of computers from overclocked embedded devices ripped from old IoT 
devices, to vintage computers and "third shift" computers where the 
factory seemingly has left the internal key database in a writable state. 
"Hacker undergrounds" emerge  with special faraday-caged premises where members 
use their computers in a fashion now deemed to be illegal. The "untrusted 
Internet" becomes a refuge for marginalized groups, journalists, academics,
right-to-repair advocates, and hackers alike. Forks of many popular open source 
applications happen, with the "surface world" now being "open source, closed 
execution" and the "underground fork" with some really cool performance 
optimization patches.

- T+1.3 years: The United States FCC issues a bulletin of cities with pirate 
radio stations that are spreading FSK-encoded Git patches. There's a station 
in the Seward neighborhood of Minneapolis that intersperses hardcore DJ sets 
with performance and feature patches to the Ladybird browser, Linux, and various
video game emulators and recomps. Everyone suspects the Cyberia computer club of 
these  broadcasts, but the broadcasters have so far evaded capture. 

- T+2 years: Penalties for owning devices that execute untrusted code are in
effect in most major jurisdictions today. While these penalties are generally 
supposed to be egalitarian, enforcement across most jurisdiction happen along
class lines, with upper and upper-middle classes generally having little to no
penalty for not surrendering such devices, while working class people facing
significant fines and even imprisonment. To many hackers, journalists,
and creatives, however, the penalty is generally seen as "worth it." A couple
jurisdictions have a weird stance - Singapore now classifies such devices as a
"scheduled drug" (which imposes a mandatory death penalty), while Estonia,
Paraguay, and Mongolia, having much lower penalties, become a haven for hackers 
and the oppressed alike.

- T+2.5 years: The hacking group th34t4ct0r presents an exploit allowing the 
n'th gen AMD Ryzen CPUs to execute unsigned code at the annual DEF CON. Members 
of th34t4ct0r are arrested soon thereafter, and the talk is wiped from the 
trusted internet. Fortunately, copies of the talk exist on the "untrusted 
Internet." AMD immediately rescinds all n'th gen Ryzens, but the black 
market is much faster.

- T+3 years: A professor at Carnegie Mellon University is acquitted of
conspiracy to circumvent the Federal Code Verification Act. It's told that the
professor was teaching a computer science seminar on programming languages, and
disseminated a `eval()` function to students. The Supreme Court case "Bernstein 
v. Department of Justice" was used as part of a First Amendment defense. The
executive branch insists that Bernstein only applies to source code and not
binaries. This acquittal is still seen as a major landmark by some.

- T+4.5 years: A council consisting of China, Russia, South Africa,
Burkina Faso, and Qatar convene to set up an alternative code signature 
registry, growing weary of Western influence on the list of trusted applications
and service on the "trusted Internet."

- T+5 years: The "first rotation" occurs as the first "universal" private keys
are leaked to the public. As many devices now exist that only accept these 
compromised keys, significant e-waste generation occurs as devices in the past
7-8 years are increasingly rejected on the trusted Internet. Some now question
the trusted execution scheme as planned obsolescence, but majority opinion in
democratic societies still skew toward pro-trusted-execution-only computing.

- T+5.5 years: Afghanistan is the first nation to enforce it's own signing keys
rather than relying on the set of keys issued by Western companies for global 
use. The regime claims that this move incentivizes local programming jobs while 
restricting the spread of Western decadence. This move pushes many in the west,
particularly LGBT+ advocates and the left-of-center more generally toward ending 
this "expensive exercise in security theater," as said by Senator Finnegal 
Blakely of California.

- T+7 years: There is a growing "generational divide" between older programmers
and newer ones, with the newer ones generally working within the "trusted
internet", and increasingly disinterested in academic computer science. "Writing
a REPL" is generally considered to be a dark art, and computer engineers 
designing new processors generally don't think about the trusted execution 
portion in their designs. Most embedded software engineers go thru rigorous
training and are generally required to maintain the highest level of clearance
to keep their positions.

- T+8.5 years: As countries gradually choose sides between two fracturing sides
(the "Democratic" keystore vs the "Autocratic" keystore), the "trusted internet"
fractures as well due to services from one side not being able to verify the
trusted execution stack from another. Ironically, the "untrusted internet" is
now a more egalitarian and global space.

- T+9 years: Both keystores experience yet another rotation event. Lots more
e-waste is generated. 

- T+10 years: California is the first state in the United States to 
decriminalize possession of a device capable of unsigned code execution,
following the lead of the Netherlands and Denmark. Silicon Valley starts to
recover in tech job figures in over 10 years.

