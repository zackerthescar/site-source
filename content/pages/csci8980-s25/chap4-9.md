+++
title = "PFPL Commentary, Chapters 4-6 and 9"
path = "csci8980-s25/chap4-6"

[taxonomies]
tags = [ "pfpl" ]
+++

# Part 2 - Statics and Dynamics, Introduction to Type Safety, System T

> Most programming lanugages exhibit a phase distinction between the static
> and dynamic phases of processing: the static phase consists of parsing
> and type checking to ensure the program is well-formed; the dynamic
> phase consists of execution of well-formed programs. A language is said to 
> be "safe" exactly when well-formed programs are well-behaved when executed

- PFPL, Chapter 4

Before we start, it might be prudent to define a language **E**. As we 
go along, we'll start showing that **E** is indeed type-safe.

$$
\text{Typ } \tau ::= \texttt{ num } | \texttt{ str } \\
\text{Exp } e :: = x | n | "s" | e_1 + e_2 | e_1 \times e_2 | e_1 \^\ e_2 | \text{len}(e)| \text{let}(e_1;x.e_2)
$$

and in AST form:

$$
\text{Typ } \tau ::= \texttt{ num } 
                    | \texttt{ str } \\
\text{Exp } e ::= x 
                | \texttt{num}[n] 
                | \texttt{str}[s] 
                | \texttt{plus}(e_1; e_2) 
                | \texttt{times}(e_1; e_2)
                | \texttt{cat}(e_1; e_2) 
                | \text{len}(e)
                | \text{let}(e_1;x.e_2)
$$

## Statics

Does the expression `plus(x; num[n])` make sense? Obviously, it depends
on if $x$ is of type `num`. The textbook then claims:

> This example is, in fact, illustrative of the general case, 
> in that the only information required about the context of an
> expression is the type of the variables within whose scope
> the expression lies. 

What I interpret from that statement is this: the only information
required from the binding tree, is that (in this expression's case)
the type of $x$ is indeed `num`, for this expression to be well-typed.
I'm not sure why the author decides on this verbiage, but sure.

We're then given the statics of the language **E**, which I won't 
replicate here - remember that this is commentary rather than a rewrite.

Lemma 4.2: Inversion for Typing

> Suppose that $\Gamma \vdash e : \tau$. If $e = \texttt{plus}(e_1;e_2)$,
> then $\tau = num$, $\Gamma \vdash e_1: \texttt{num}$, 
> $\Gamma \vdash e_1: \texttt{num}$, and similarly for other constructs
> of the language

How would we prove this?

(From lecture 02/05)

We first rewrite it as such

$$
\Gamma \vdash e: \tau 
\Rightarrow e \text{ is } \texttt{plus}(e_1;e_2) 
\Rightarrow \tau \text{ is } \texttt{num}, \Gamma \vdash e_1: \texttt{num}, 
\Gamma \vdash e:_2 \texttt{num}
$$

Here's an interesting question: what rule are used in the beginning
of the implication?

It's of form $\overline{\Gamma \vdash \texttt{plus}(e_1;e_2): \tau}$ for sure - we're using 4.1d: $\frac{\Gamma \vdash e_1: \texttt{num} \quad \Gamma \vdash e:_2 \texttt{num}}{\Gamma \vdash \texttt{plus}(e_1; e_2): \texttt{num}}$

So we look at the rule 4.1d, and we immediately see that $\Gamma \vdash \texttt{plus}(e_1; e_2): \texttt{num}$, so we have $\tau = \texttt{num}$ checked off.
Similarly, this rule gives us that by the inductive hypothesis, we have
$\Gamma \vdash e_{\{1,2\}}: \texttt{num}$, and hence the proof.

Yeah, it really is that simple. We perform case analysis on the *derivation*,
what rules can the expression take? 
- note: if we overload `+` for concatenation, this will fail.

Inversion is a good lemma to cite to tell you something about the
language without much justification other than the rules themselves.

# Dynamics

Where statics are concerned with the validity of expressions before they
are evaluated, dynamics are concerend with the validity of expressions
as they are evaluated - they describe how programs are executed. 

We say that a *transition system* is specified with 4 forms of judgement

1. $s \text{ state}$, that $s$ is a *state* of the transition system
2. $s \text{ final}$, that $s$ is a *final* state
    - This means there is no more step to take past this one
3. $s \text{ initial}$, that $s$ is an *initial* state
4. $s \rightarrow s'$, where $s$ and $s'$ are states, and that $s$
may "take a step" into $s'$
    - Obviously, $s \rightarrow s'$ can't occur when $s \text{ final}$.

There's a trivial proof on if $s \rightarrow s'$ and $s' \rightarrow s''$ then
$s \rightarrow^* s''$:

> We are to show that $s \rightarrow s' \Rightarrow s' \rightarrow s'' \Rightarrow s \rightarrow^* s''$.
> We have the rules $\overline{s \rightarrow s}$ and $\frac{s \rightarrow s' \quad s \rightarrow s''}{s \rightarrow^* s''}$.
> That is, to show that `P(s, s')` holds when $s \rightarrow^* s'$, we need
> to show that `P(s, s)` holds, and if $s \rightarrow s'$ and `P(s', s'')`
> then `P(s, s'')`. 
>
> We know that `P(s,s)` holds vacuously (i.e the property chain doesn't
> apply because the first statement is false).
>
> We have $s \rightarrow s'$ and $s' \rightarrow s''$. We are to show that
> the property `P(s', s'')` holds, and since it holds by assumption
> (our proof statement says $s' \rightarrow s''$, which implies 
> $s' \rightarrow^* s''$ inductively), then we have shown the implication
> chain, and therefore, our property, to be true.

The book then gives the structural dynamics of **E**, which I will not
reproduce here. It also goes on a big thing about *contextual* and 
*equational* dynamics, but we won't dive too deep into that right now.

# Type safety

This is the big part of PFPL! We want to show *type safety* to be true
of our language! But what is type safety?

In terms of our language **E** here, it means that expressions like
adding a string to a int, or concatenating two numbers, will never
be valid in **E**.

Type safety, in general, is the *coherence* between the statics and
dynamics - statics will predict that the value of an expression will
have a certain "form," and the dynamics will ensure that the expression
itself is well-defined. This will ensure that evaluating these expressions
will never cause an illegal instruction.

Type safety is given by two properties

1. Preservation: If $e: \tau$ and $e \rightarrow e'$ then $e': \tau$
2. Progress: If $e: \tau$, then either $e \text{ val}$ or there exists
$e'$ such that $e \rightarrow e'$

We also introduce the idea of a *canonical form* here. These are useful
for proving *progress*.

Canonical forms of **E**: If $e \text{ val}$ and $e: \tau$ then 

1. If $\tau = \text{num}$ then $e = \texttt{num}[n]$ for some number $n$
2. If $\tau = \text{str}$ then $e = \texttt{str}[s]$ for some string $s$

We prove this by induction on rules 4.1 and 5.3:

The property is $e \text{ val} \Rightarrow (\tau = \text{num} \Rightarrow e = 
\texttt{num}[n])$ or $e \text{ val} \Rightarrow (\tau = \text{str} \Rightarrow 
e = \texttt{str}[s])$

So firstly we have $e \text{ val}$, which means by the rules of 5.3,
only 5.3a and 5.3b have this property - all the others hold vacuously.

Then we have $\tau = \texttt{num}$, which a bunch of static rules in 4.1
apply to, but only 4.1b really apply here - since we need $e \text{ val}$
and rules 5.3 give that all these other rules are not $e \text{ val}$, 
only 4.1b apply here. Thus, if $e \text{ val}$ and $e: \tau$ and $\tau = \text{num}$
then $e = \texttt{num}[n]$ for some $n$, since 5.3b and 4.1b state so, and same
goes for the $\texttt{str}$ case. 

We won't go much more into this, because we can show concrete examples in the next part.

# System T

System T, so called for **T**otal Functions, or **T**ermination (not for Turing machine
as was suggested, because System T is incapable of infinite loops), provides a 
primitive recursion mechanism.

We define System T with the following grammar:

$$\text{Typ }\tau ::= \texttt{nat} | \tau_1 \rightarrow \tau_2$$
$$\text{Exp } e ::= x | z | s(e) | \text{rec } e\ \{z \hookrightarrow e_0 | s(x) \text{ with } y \hookrightarrow e_1 \} | \lambda(x: \tau)e | e_1(e_2)$$

and in AST form:

$$\text{Typ }\tau ::= \texttt{nat} | arr(\tau_1;\tau_2)$$
$$\text{Exp } e ::= x | z | s(e) | \text{rec}(e)\{e_0;x.y.e_1\} | \text{lam}\{\tau\}(x.e) | ap
(e_1;e_2)$$

The statics of **T** are as follows:

$$ \overline{\Gamma, x: \tau \vdash x: \tau} $$

$$ \overline{\Gamma \vdash z: \texttt{nat}} $$

$$ \frac{\Gamma \vdash e: \texttt{nat}}{\Gamma \vdash s(e): \texttt{nat}} $$

$$ \frac{\Gamma \vdash e: nat \quad \Gamma \vdash e_0: \tau \quad \Gamma, x: \texttt{nat},y:\tau \vdash e_1: \tau}{\Gamma \vdash \texttt{rec}\{e_0; x.y.e_1\}(e): \tau} $$

$$ \frac{\Gamma, x: \tau_1 \vdash e: \tau_2}{\Gamma \vdash \texttt{lam}\{\tau_1\}(x.e): \texttt{arr}(\tau_1;\tau_2)} $$

$$ \frac{\Gamma \vdash e_1: \texttt{arr}(\tau_2; \tau) \quad \Gamma \vdash e_2: \tau_2}{\Gamma \vdash \texttt{ap}(e_1; e_2) : \tau} $$

The dynamics of **T** are as follows:

$$ \overline{z \texttt{ val}} $$

$$ \frac{[e \texttt{ val}]}{s(e) \texttt{ val}} $$

$$ \overline{\texttt{lam}\{\tau\}(x.e) \texttt{ val}} $$


These three are known as the **closure** rules.


$$ [\frac{e \rightarrow e'}{s(e) \rightarrow s(e')}] $$

$$ \frac{e_1 \rightarrow e_1'}{\texttt{ap}(e_1;e_2) \rightarrow \texttt{ap}(e_1';e_2)} $$

$$ [\frac{e_1 \texttt{ val} \quad e_2 \rightarrow e_2'}{\texttt{ap}(e_1;e_2) \rightarrow \texttt{ap}(e_1;e_2')}] $$

$$ \frac{[e_2 \texttt{ val}]}{\texttt{ap}(\texttt{lam}\{\tau\}(x.e);e_2) \rightarrow [e_2/x]e} $$

$$ \frac{e \rightarrow e'}{\texttt{rec}\{e_0; x.y.e_1\}(e) \rightarrow \texttt{rec}\{e_0; x.y.e_1\}(e')} $$

$$ \overline{\texttt{rec}\{e_0; x.y.e_1\}(z): e_0} $$

$$ \frac{s(e) \texttt{ val}}{\texttt{rec}\{e_0; x.y.e_1\}(e) \rightarrow [e, \texttt{rec}\{e_0; x.y.e_1\}(e)/x,y]e_1} $$

These are known as the **transition** rules

Canonical forms: if $e: \tau$ and $e \text{ val}$
1. If $\tau = nat$ then either $e=z$ or $e = s(e')$ for some $e'$
    - $P(e)$: $e: \tau \land e \text{ val} \Rightarrow (\tau = \texttt{nat} \Rightarrow e = z \lor e = s(e')$ for some $e'$
        - The only expressions that satisfy $e: \tau$ and $e \text{ val}$
        are $z$, $s(e)$, $x$, and $\lambda(x: \tau)e$. Of these, only $z$ and $s(e)$
        are of $\tau = nat$, by the typing rules, thus the property holds.
        - For all other expressions, the property holds vacuously (since the proposition
        chain is false)
2. If $\tau = \tau_1 \rightarrow \tau_2$ then $e = \lambda(x:\tau_1)e_2$ for some $e_2$.
    - $P(e)$: $e: \tau \land e \text{ val} \Rightarrow (\tau = \texttt{arr}(\tau_1;\tau_2) \Rightarrow e = \lambda(x: \tau_1)e_2$ for some $e'$
        - The only expressions that satisfy $e: \tau$ and $e \text{ val}$
        are $z$, $s(e)$, $x$, and $\lambda(x: \tau)e$. Of these, only $\lambda(x: \tau)e$
        is of $\tau = \texttt{arr}(\tau_1;\tau_2)$ by the typing rules
        - For all other expression, the property holds vacuously (since the proposition
        chain is false)

And now for the hard part: proving type safety for System T

1. Preservation: If $e: \tau$ and $e \rightarrow e'$ then $e': \tau$
     - $P(e)$: $e: \tau \land e \rightarrow e' \Rightarrow e': \tau$
        - The expressions that satisfy $e: \tau \land e \rightarrow e'$ are:
            - $\texttt{ap}(e_1;e_2) \rightarrow \texttt{ap}(e_1';e_2)$
                - By the typing rule 9.1f, we have $\tau = \texttt{arr}(\tau_2;\tau)$,
                by inversion we have that $\tau_2$ exists such that $\Gamma \vdash e_1: \texttt
                {arr}(\tau_2; \tau)$ and $\Gamma \vdash e_2: \tau_2$. So long as the proposition
                holds, this holds.
            - $\texttt{ap}(\texttt{lam}\{\tau\}(x.e);e_2) \rightarrow [e_2/x]e$
                - Lemma 8.3 gives us that if $\Gamma, x: \tau \vdash e': \tau'$ and
                $e: \tau$ then $\Gamma \vdash [e/x]e': \tau'$. (TODO: Fix this mess)
            - $\texttt{rec}\{e_0; x.y.e_1\}(e) \rightarrow \texttt{rec}\{e_0; x.y.e_1\}(e')$
                - The typing rule gives us that $e: \texttt{nat}$, so down to the cases
                below
            - $\texttt{rec}\{e_0; x.y.e_1\}(z): e_0$
                - This one is simple. 9.1d gives us that both $e_0$ and the expression here itself is $\tau$, so it holds for this case.
            - $\texttt{rec}\{e_0; x.y.e_1\}(e) \rightarrow [e, \texttt{rec}\{e_0; x.y.e_1\}(e)/x,y]e_1$
                - (TODO: this one)

2. Progress: If $e: \tau$, then either $e \text{ val}$ or there exists
$e'$ such that $e \rightarrow e'$
    - $P(e)$: $e: \tau \Rightarrow (e \text{ val } \lor \exist e' \text{ such that } e \rightarrow e')$
        - Well, all expressions in **T** have some type, so
            - $x$: can be any of the below:
            - $z$: Zero, $\tau = nat$ by 9.1b, $z \text{ val}$ by 9.2a
            - $s(e)$: Inductive hypothesis $e \text{ nat}$, $s(e): \text{ nat}$ by 9.1b,
            $s(e) \text{ val }$ by 9.2b
            - $\texttt{rec}\{e_0; x.y.e_1\}(e)$: $e: nat$ by inversion for
            typing, if $e = z$ then
            9.3f $\texttt{rec}\{e_0; x.y.e_1\}(e) \rightarrow e_0$, if $e = s(e')$
            then 9.3g $\texttt{rec}\{e_0; x.y.e_1\}(e) \rightarrow [e, rec\{e_0;x.y.e_1\}(e)/x,y]e_1$
            - $\texttt{lam}\{\tau\}(x.e)$: $\tau = \texttt{arr}(\tau_1; \tau_2)$ by 9.1e with
            $\Gamma, x: \tau_1 \vdash e: \tau_2$, $\texttt{lam}\{\tau\}(x.e) \text{ val}$
            by 9.2c
            - $\texttt{ap}(e_1; e_2)$: 9.3d provides $\texttt{ap}(\texttt{lam}\{\tau\}(x.e);e_2) \rightarrow [e_2/x]e$

You don't *need* to be this in-depth when reasoning about just an aspect
of a language, but I feel that System T is a good jumping off point to see
what a "full" proof of type safety looks like - every expression in the
language is terminating. As we go into other languages in PFPL like System F
and PCF, this won't be the case and the overall proofs get gnarlier (but are
proofs, still).
