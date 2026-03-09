# Should You Trust an AI Mathematician?

## Working deck notes

- Slide 1:
  - Title only: `Should You Trust an AI Mathematician?`
  - Footer: name, affiliation, venue, date
  - No subtitle
  - No image

- Slide 2:
  - Title: `Capability and trust`
  - Body:
    - `Recent systems are much stronger at mathematics than they were even a year ago.`
    - `Some now perform impressively on demanding benchmarks.`
    - `But capability and trust are not the same question.`

- Slide 3:
  - Title: `Why ask this now?`
  - Body:
    - `Benchmark results in mathematics are improving quickly.`
    - `Systems are also beginning to contribute, at least in limited ways, to research-level work.`
    - `So the question is no longer speculative.`
  - Note: collect concrete examples for both claims

- Slide 4:
  - Title: `The question for working mathematicians`
  - Body:
    - `For a working mathematician, the issue is practical rather than philosophical:`
    - `when I do not know the answer, can this help me without wasting time`
    - `or creating false confidence?`

- Slide 5:
  - Title: `How should we judge them?`
  - Visual:
    - two-column comparison: `Benchmarks` / `Our own experiments`
  - Body:
    - `Benchmarks tell us what these systems can sometimes do under controlled conditions.`
    - `Our own experiments tell us how they behave in actual mathematical work.`
    - `We need both kinds of evidence.`

- Slide 6:
  - Title: `What benchmarks tell us, and what they do not`
  - Visual:
    - two-column comparison: `They do tell us` / `They do not tell us`
  - Body:
    - `They measure difficult problem-solving under fixed conditions.`
    - `They do not tell us whether these systems can efficiently contribute`
    - `to our understanding of mathematical problems.`
    - `That is the question mathematicians actually care about.`

- Slide 7:
  - Title: `Two examples`
  - Visual:
    - simple transition slide with two large labeled panels or logos/images for `First Proof` and `FrontierMath`
  - Body:
    - `To make this concrete, let me look at two recent examples.`

- Slide 8:
  - Title: `First Proof`
  - Visual:
    - representative image, table, or cropped screenshot from the benchmark or source
  - Body:
    - `First Proof asks systems to produce olympiad-style proofs.`
    - `It is still a benchmark, but it is much closer to recognizable mathematics`
    - `than routine exercise benchmarks.`

- Slide 9:
  - Title: `FrontierMath`
  - Visual:
    - representative figure or table from the benchmark materials
  - Body:
    - `FrontierMath was designed to be hard in a way that matters mathematically.`
    - `Its harder tiers aim beyond standard benchmark questions`
    - `and are meant to resist shallow pattern matching.`

- Slide 10:
  - Title: `What a score can hide`
  - Visual:
    - custom schematic showing different systems succeeding on different problems, with best-on-each-problem aggregation
  - Body:
    - `A headline score may combine strengths that no single model has.`
    - `That matters if the question is not what can happen,`
    - `but what one mathematician can rely on in practice.`

- Slide 11:
  - Title: `On pass@X`
  - Visual:
    - figure or adapted schematic drawn from `https://arxiv.org/pdf/2407.21787`
    - emphasize repeated sampling / coverage improving with the number of attempts
  - Body:
    - `If one allows many tries, success rates can rise dramatically.`
    - `But eventual success after repeated sampling is not the same thing`
    - `as a system that is reliable on the first few serious attempts.`
  - Note:
    - include a small formula such as `1 - (1-p)^X`
    - the point is not technical subtlety but to make precise why pass@X can look much better than single-shot performance

- Slide 12:
  - Title: `What seems to be improving`
  - Visual:
    - FrontierMath Tier 4 leaderboard
    - use an official or benchmark-source snapshot when building the deck
  - Body:
    - `The systems do seem to be getting better.`
    - `On hard mathematical benchmarks, the trend is plainly upward.`
    - `That much is real, even if it does not settle the question of trust.`

- Slide 13:
  - Title: `Capability is not reliability`
  - Visual:
    - figure from `https://arxiv.org/html/2602.16666v1`, ideally the comparison between accuracy and reliability
  - Body:
    - `Recent work argues that accuracy and reliability should be separated.`
    - `A system can solve many tasks on average and still be an unreliable tool in practice.`
    - `So for mathematics, we should ask not only how often a model succeeds,`
    - `but how to benchmark reliability itself.`

- Slide 14:
  - Title: `What would reliability mean in mathematics?`
  - Visual:
    - simple three-part diagram: `suggests useful directions` / `preserves definitions and assumptions` / `fails in ways that are easy to detect`
  - Body:
    - `A reliable system would do more than occasionally produce correct answers.`
    - `It would help us understand a problem efficiently,`
    - `and it would fail in ways that do not quietly waste our time.`

- Slide 15:
  - Title: `How do these systems fail?`
  - Visual:
    - four compact labeled panels: `False intermediate claims` / `Invented references` / `Locally plausible steps` / `Drift in definitions or assumptions`
  - Body:
    - `These failures are familiar by now.`
    - `The problem is not only that they occur,`
    - `but that they can be expensive to detect when one does not already know the answer.`

- Slide 16:
  - Title: `Verification changes the picture`
  - Visual:
    - Figure 1 or Figure 2 from AlphaEvolve (`https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/AlphaEvolve.pdf`)
  - Body:
    - `The most impressive current systems do not ignore unreliability.`
    - `They put generation inside a loop of testing, scoring, and selection.`
    - `AlphaEvolve is a good example of this.`
  - Note:
    - likely use Figure 1 for simplicity; Figure 2 if we want a more explicit controller-loop diagram

- Slide 17:
  - Title: `AlphaEvolve`
  - Visual:
    - small highlights panel rather than a dense table
  - Body:
    - `This approach is strongest when progress can be automatically evaluated.`
    - `In the AlphaEvolve paper, it improved matrix multiplication algorithms`
    - `and made progress on several constructive mathematical problems.`
    - `The larger lesson is that verification or testing can make these systems much more useful.`
  - Notes:
    - possible concrete highlights from the paper:
      - 4x4 complex matrix multiplication in 48 scalar multiplications
      - matched best known constructions on about 75% of over 50 mathematical problems
      - surpassed prior state of the art on about 20%
      - examples: Minimum Overlap Problem, kissing number in dimension 11

- Global note:
  - Early framing slides can remain somewhat general
  - Once benchmarks and evidence appear, prefer concrete examples, named systems, named evaluations, and specific failure modes
  - Target tone: straightforward colloquium style, not promotional
  - Avoid sequences of transition slides with only text
  - When a named benchmark or paper appears, prefer a representative figure, table, or cropped screenshot from the source
  - If a slide is only a transition, merge it into a neighboring slide or add a concrete visual argument

- Slide 21:
  - Main point: formal verification still leaves the human burden of checking that definitions and theorem statements really express what one intends
  - Note: later add a compelling example where syntax obscures the true statement being proved

- Slide 18:
  - Title: `From testing to proof checking`
  - Visual:
    - simple left-right diagram: `testing / scoring` -> `formal proof checking`
  - Body:
    - `For some problems, one can test candidate outputs.`
    - `For mathematics, a deeper possibility is to check proofs themselves.`
    - `That is where formalization enters the picture.`

- Slide 19:
  - Title: `Lean in one slide`
  - Visual:
    - short legible Lean snippet with a label such as `statement + proof + kernel check`
  - Body:
    - `Lean is a proof assistant in which definitions, statements, and proofs are formal objects.`
    - `What ultimately matters is that a small trusted kernel checks the proof.`
    - `This gives a much firmer notion of correctness than persuasive prose.`

- Slide 20:
  - Title: `What formalization gives you`
  - Visual:
    - four-part diagram: `Exact statements` / `Exact dependencies` / `Machine-checked proofs` / `Reproducibility`
  - Body:
    - `Formalization makes mathematical claims precise enough to be checked exactly.`
    - `That changes the trust question.`
    - `The burden shifts from judging prose to checking that the formal statement is the right one.`

- Slide 21:
  - Title: `What formalization does not give you`
  - Visual:
    - one formal theorem statement or definition with later callouts
  - Body:
    - `A verified proof is only as good as the statement that was formalized.`
    - `One still has to check definitions, hypotheses, and the actual claim being proved.`
    - `Formal syntax can obscure these things rather than clarify them.`
  - Note:
    - later add a compelling example where syntax obscures the true statement being proved

- Slide 22:
  - Title: `Autoformalization`
  - Visual:
    - pipeline diagram: `informal mathematics` -> `generated formalization` -> `proof checking` -> `repair / revision`
  - Body:
    - `Autoformalization tries to move from ordinary mathematical language`
    - `to machine-checkable statements and proofs.`
    - `It does not remove the need for human judgment,`
    - `but it changes where that judgment is applied.`

- Slide 23:
  - Title: `Urban and Megalodon`
  - Visual:
    - figure or workflow image from the Urban/Megalodon work
  - Body:
    - `This is one of the clearest recent demonstrations of serious autoformalization.`
    - `The workflow is no longer purely aspirational.`
    - `Strong models can now support a substantial formalization loop.`

- Slide 24:
  - Title: `Gauss and sphere packing`
  - Visual:
    - figure or screenshot tied to the Gauss / sphere-packing example
  - Body:
    - `These examples are striking because they are mathematically recognizable`
    - `and because the outputs are not just prose but formal artifacts.`
    - `They make the promise of autoformalization more concrete.`

- Slide 25:
  - Title: `Much more is happening`
  - Visual:
    - two or more small panels for the recent autoformalization paper and Archon / First Proof
  - Body:
    - `These are not isolated examples.`
    - `Across several groups, the pace of progress this year has been unusually fast.`

- Slide 26:
  - Title: `The Claude Code moment`
  - Visual:
    - likely a small collage of screenshots or a representative image connected with the recent Claude Code wave
    - alternatively a simple custom diagram showing `off-the-shelf model + coding loop + Lean feedback`
  - Body:
    - `What changed this year is not only benchmark performance.`
    - `Recent coding-oriented models made these workflows much more accessible in practice.`
    - `One no longer needs a highly specialized system to begin trying serious experiments.`
  - Notes:
    - keep the tone understated; this is a threshold claim, not a hype slide
    - later decide whether to name specific model versions on the slide or only in the talk
    - collect one or two concrete supporting screenshots if we want the `frenzy` aspect to register visually

- Slide 27:
  - Title: `Serre duality: a personal experiment`
  - Visual:
    - picture or screenshot from the Serre duality autoformalization experiment
    - ideally something visually legible: statement, Lean fragment, workflow trace, or repository snapshot
  - Body:
    - `In my own experiment, this kind of workflow was strong enough to be genuinely useful.`
    - `The point was not that the system could simply be trusted.`
    - `The point was that it could help produce formal mathematics that could then be checked.`
  - Notes:
    - end the talk here, with a brief explanation of what the system did well, where it needed guidance, and why the formal artifact matters more than the prose

## Closing line

- Suggested ending:
  - `If you ask whether one should trust an AI mathematician, my answer is no, not in the ordinary sense.`
  - `But one can increasingly trust a workflow in which generation is coupled to real verification.`

## Build checklist

- Determine deck format and visual system
  - File format decision:
    - source of truth: JavaScript slide script using the artifacts tool
    - presentation output: `.pptx`
    - review output: exported `.png` previews, one per slide
    - optional sharing/export format later: `.pdf`
  - Visual system:
    - aspect ratio: `16:9`
    - background: light
    - text: dark
    - accent color: restrained / muted
  - iPad editing constraint:
    - prefer PowerPoint-friendly layouts with ordinary text boxes and images
    - avoid fragile overlays, dense grouped objects, or effects that are awkward to edit on iPad
    - prefer broadly available fonts or embed-friendly choices that degrade gracefully
  - title and body typography:
    - titles: `Georgia`
    - body: `Arial`
    - emphasis: use weight and size changes rather than exotic font variation
  - recurring layout patterns

- Collect source material for image-based slides
  - primary responsibility: assistant collects public-source figures/screenshots during deck build
  - user-provided material needed:
    - Serre duality experiment screenshot or image, unless already available locally later
  - First Proof figure or screenshot
  - FrontierMath figure and Tier 4 leaderboard
  - Alethea / pass@X figure from `2407.21787`
  - reliability figure from `2602.16666v1`
  - AlphaEvolve setup figure and highlights
  - Urban / Megalodon figure
  - Gauss / sphere-packing figure
  - small-panel sources for the broader survey slide
  - Claude Code moment screenshots or substitute custom diagram
  - Serre duality experiment image or screenshot

- Resolve content decisions that remain open
  - whether to keep slide 7 (`Two examples`) or drop it
  - concrete theorem/definition example for slide 21
  - exact claims and supporting details for Urban / Megalodon
  - exact claims and supporting details for Gauss / sphere-packing
  - exact model/version wording for the Claude Code slide

- Build the deck
  - create slide master / reusable components
  - draft slides with placeholder images where needed
  - replace placeholders with final sourced images

- Review and tighten
  - trim any repetitive transitions
  - check that each image slide has a single clear point
  - verify readability of formulas, tables, and code
  - ensure the ending lands on the Serre duality example and closing line
