+++
title = "PFPL Commentary, Chapters 1-3"
path = "csci8980-s25/chap1-3"
template = "index-latex.html"

[taxonomies]
tags = [ "pfpl" ]
+++


# Part 1 - Prerequisite knowledge

In this part PFPL attempts to lay out the knowledge needed to get
"up-and-running" with the rest of the book. It's honestly almost too
dense, but make sure you actually get this part down right - lose
sight here and you'll be in a world of pain.

## ASTs, and a primer to structural induction

It's here that we find out first language in PFPL

$$
\text{Typ } \tau ::= \texttt{nat} \\
\text{Exp } e ::= x | n | e + e | e \times e 
$$

In AST-mode, we'll have

$$
\text{Exp } e ::= \texttt{var}[x] | \texttt{num}[n] | plus(e_1, e_2) | times(e_1, e_2)
$$

We introduce this language as a means to an end: _structural induction_.

From the book:

> Suppose that we wish to prove that some property P(a) holds of all ASTs
> 'a' of a given sort. To show that this is enough to consider all the way
> 'a' is generated, and show that the property holds in each case under the
> assumption that it holds for it's constituent ASTs (if any).

For this language above, this boils down to
1. The property holds for any variable $x$ of sort $\text{Exp}$
    - prove that $P(x)$
2. The property holds for any number, $\texttt{num}[n]$:
    - prove that $P(\texttt{num}[n])$
3. Show that so long as (i.e assume) the property holds for
$a_1$ and $a_2$ (the ASTs for $e_1$ and $e_2$), show that the
property holds for $\texttt{plus}(a_1;a_2)$ and $\texttt{times}(a_1;a_2)$

I cannot stress this part enough - this is the key to understanding
this textbook. It's not the static or dynamic rules. If you don't know
where to start, start with this.

TODO: Get some of the proofs from paper to this.

## An aside: Substitution

This book typesets substitution in a bit of an obtuse way, and god
help you if you end up needing to google this, because other books
have their own way of typesetting substitution. We'll use this book's
notation just to make it easier. Don't be afraid to come back to this!

- An idea of substitutions
    - $[e/x]e'$   
        - "$e$ replaces $x$ in $e'$"
        - $[e/x]e = e$
        - $[e/x]i = i$
            - If there's nothing to substitute
        - $[e/x]y' = y, y \neq x$
        - $[e/x]e_1 + e_2 = [e/x]e_1 + [e/x]e_2$

## ABTs

You can think of ABTs as the "memory" or "glue" or "context" of an 
AST: this is the bit that resolves variables to values in a context
(and thus allowing some expression to be evaluated). 

For example, "let x be 7 in x + x" would thus be evaluated to $7 + 7$
and then $14$. ABTs also let us have "differing scope" - consider
"let x be (x * x) in (x + x)". Had we had global scoping this would
be impossible, but since the Let binding is only bound to the 
second AST (the x + x bit), it'll just be (x * x) + (x * x).

## Inductive definitions and derivations

We've all seen how the naturals are defined

$$
e ::= 0 | s(e)
$$

So let's do something a little cooler - we introduce 
what's called a "inference rule," which has a structure such that
a judgement is at the bottom, and _prerequisite_ judgements
on top of them. 

$$
\frac{}{\texttt{zero} \text{ nat}}
$$

$$
\frac{e \text{ nat}}{s(e) \text{ nat}}
$$

would thus be the _inference rules_ for a language that
contains _just_ the natural numbers. Notice the zero-rule
does not have a _prerequisite_ judgement - we hold this to be
an axiom.

This is the derivation of $\texttt{succ(succ(zero))} \text{ nat}$:

$$
\frac{\frac{\frac{}{\texttt{zero} \text{ nat}}}{\texttt{succ(zero)} \text{ nat}}}{\texttt{succ(succ(zero))} \text{ nat}}
$$

It's important to note right here: _expressions_ have derivations, not
propositions/properties! (This was the part that got you _bad_ in your
confused first attempt!)

## Rule induction

Rule induction is merely an instantiation of structural induction - 
In percise terms, the property P respects the rule

$$
\frac{a_1 \text{ J} ... a_k \text{ J}}{a \text{ J}}
$$

if $P(a)$ holds whenever $P(a_1),...,P(a_k)$ do.

It's important to note that $P(a_1),...,P(a_k)$ doesn't automatically
grant you $P(a)$ holding - $P(a_1),...,P(a_k)$ is merely the _inductive
hypothesis_ - the fun part is getting that proof!

### An example

What fun is a document like this without examples?

Suppose, on the natural numbers, we want to show the property
that $S(e) \text{ nat} \Rightarrow e \text{ nat}$ 
(successor of E being a natural means, E is a natural)

We have the two rules for naturals

$$
\frac{}{\texttt{zero} \text{ nat}}
$$

$$
\frac{e \text{ nat}}{s(e) \text{ nat}}
$$

We start with the first "form" of natural number, which is
$\texttt{zero}$. Since $\texttt{zero}$ isn't a $S(e)$... 
¯\\\_(ツ)\_/¯ 
- We shrug this off because we don't need the property to be true in this case,
recall the implication truth table, if the LHS of an implication is false, then
the right hand side is not of our concern
    - We call this "holding vacuously"
    - I will continue to ¯\\\_(ツ)\_/¯  when refering to holding vacuously, it's fun.

We then move on to the next "form" of natural number, which
is $S(e)$. Well,
- We know that by the second rule, we have an inductive hypothesis that
$\texttt{e} \text{ nat}$.
    - If $e$ is $\texttt{zero}$ then the property holds obviously!
    - If $e = S(b)$, then we know $b$ nat. We show that $e = S(a)$ nat,
    and since $S(a)$ is of form $S(b)$ and $b$ nat, we have $S(b)$ nat
    by the inductive hypothesis.
        - This case doesn't actually need the inductive hypothesis, can you
        see how?


