const fs = require("fs");
const path = require("path");
const PptxGenJS = require("pptxgenjs");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "deck");
const OUT_FILE = path.join(OUT_DIR, "should-you-trust-an-ai-mathematician-outline.pptx");

const COLORS = {
  bg: "FFFFFF",
  text: "111111",
  muted: "666666",
  line: "D9D9D9",
};

const FONT = "Arial";

const slides = [
  {
    title: "Should You Trust an AI Mathematician?",
    bullets: [
      "Name / affiliation / venue / date",
    ],
  },
  {
    title: "Capability and trust",
    bullets: [
      "Recent systems are much stronger at mathematics than they were even a year ago.",
      "Some now perform impressively on demanding benchmarks.",
      "Capability and trust are not the same question.",
    ],
  },
  {
    title: "Why ask this now?",
    bullets: [
      "Benchmark results in mathematics are improving quickly.",
      "Systems are also beginning to contribute, at least in limited ways, to research-level work.",
      "This is no longer a speculative question.",
      "Need concrete examples: one benchmark example and one research example.",
    ],
  },
  {
    title: "The question for working mathematicians",
    bullets: [
      "For a working mathematician, the issue is practical rather than philosophical.",
      "When I do not know the answer, can this help me without wasting time?",
      "Can it help without creating false confidence?",
    ],
  },
  {
    title: "How should we judge them?",
    bullets: [
      "Benchmarks tell us what these systems can sometimes do under controlled conditions.",
      "Our own experiments tell us how they behave in actual mathematical work.",
      "We need both kinds of evidence.",
    ],
  },
  {
    title: "What benchmarks tell us, and what they do not",
    bullets: [
      "They measure difficult problem-solving under fixed conditions.",
      "They do not tell us whether these systems can efficiently contribute to our understanding of mathematical problems.",
      "That is the question mathematicians actually care about.",
    ],
  },
  {
    title: "Two examples",
    bullets: [
      "Use this slide only to introduce the two benchmark examples if needed.",
      "Examples: First Proof and FrontierMath.",
      "If it feels redundant later, cut this slide.",
    ],
  },
  {
    title: "First Proof",
    bullets: [
      "First Proof evaluates olympiad-style proof generation.",
      "It is still an artificial setting, but it is at least recognizable mathematics.",
      "It asks for sustained reasoning, not just short-answer pattern matching.",
      "Figure: benchmark screenshot, table, or representative result.",
    ],
  },
  {
    title: "FrontierMath",
    bullets: [
      "FrontierMath was designed to probe much harder mathematics.",
      "Its harder tiers aim beyond standard benchmark questions.",
      "It is meant to resist shallow pattern matching.",
      "Figure: benchmark description or Tier 4-related material.",
    ],
  },
  {
    title: "What a score can hide",
    bullets: [
      "A headline score may combine strengths that no single model has.",
      "Best-on-each-problem aggregation is not the same as one dependable assistant.",
      "Diagram: different systems succeed on different problems.",
    ],
  },
  {
    title: "On pass@X",
    bullets: [
      "If one allows many tries, success rates can rise dramatically.",
      "Eventual success after repeated sampling is not the same thing as reliability on the first few serious attempts.",
      "Include the basic formula 1 - (1 - p)^X.",
      "Figure: repeated-sampling / verifier-loop material from arXiv:2407.21787.",
    ],
  },
  {
    title: "What seems to be improving",
    bullets: [
      "The systems do seem to be getting better.",
      "On hard mathematical benchmarks, the trend is plainly upward.",
      "That much is real, even if it does not settle the question of trust.",
      "Figure: FrontierMath Tier 4 leaderboard.",
    ],
  },
  {
    title: "Capability is not reliability",
    bullets: [
      "Recent work argues that accuracy and reliability should be separated.",
      "A system can solve many tasks on average and still be an unreliable tool in practice.",
      "For mathematics, we should ask not only how often a model succeeds, but how to benchmark reliability itself.",
      "Figure: reliability-versus-accuracy framing from arXiv:2602.16666v1.",
    ],
  },
  {
    title: "What would reliability mean in mathematics?",
    bullets: [
      "A reliable system would do more than occasionally produce correct answers.",
      "It would help us understand a problem efficiently.",
      "It would preserve definitions and assumptions.",
      "It would fail in ways that are easy to detect.",
    ],
  },
  {
    title: "How do these systems fail?",
    bullets: [
      "False intermediate claims.",
      "Invented references.",
      "Locally plausible steps that do not compose.",
      "Drift in definitions or assumptions.",
      "The problem is not only that they occur, but that they can be expensive to detect when one does not already know the answer.",
    ],
  },
  {
    title: "Verification changes the picture",
    bullets: [
      "The most impressive current systems do not ignore unreliability.",
      "They put generation inside a loop of testing, scoring, and selection.",
      "AlphaEvolve is a good example of this.",
      "Figure: AlphaEvolve setup.",
    ],
  },
  {
    title: "AlphaEvolve",
    bullets: [
      "This approach is strongest when progress can be automatically evaluated.",
      "Concrete example: 4x4 complex matrix multiplication in 48 scalar multiplications.",
      "It matched best known constructions on many problems and improved some of them.",
      "The larger lesson is that verification or testing can make these systems much more useful.",
      "Figure: one clean highlights figure.",
    ],
  },
  {
    title: "From testing to proof checking",
    bullets: [
      "For some problems, one can test candidate outputs.",
      "For mathematics, a deeper possibility is to check proofs themselves.",
      "That is where formalization enters the picture.",
      "Diagram: testing / scoring -> formal proof checking.",
    ],
  },
  {
    title: "Lean in one slide",
    bullets: [
      "Lean is a proof assistant in which definitions, statements, and proofs are formal objects.",
      "What ultimately matters is that a small trusted kernel checks the proof.",
      "This gives a much firmer notion of correctness than persuasive prose.",
      "Include one short, legible Lean example.",
    ],
  },
  {
    title: "What formalization gives you",
    bullets: [
      "Exact statements.",
      "Exact dependencies.",
      "Machine-checked proofs.",
      "Reproducibility.",
      "The burden shifts from judging prose to checking that the formal statement is the right one.",
    ],
  },
  {
    title: "What formalization does not give you",
    bullets: [
      "A verified proof is only as good as the statement that was formalized.",
      "One still has to check definitions, hypotheses, and the actual claim being proved.",
      "Formal syntax can obscure these things rather than clarify them.",
      "Example needed: a formal statement whose syntax hides the true claim.",
    ],
  },
  {
    title: "Autoformalization",
    bullets: [
      "Autoformalization tries to move from ordinary mathematical language to machine-checkable statements and proofs.",
      "It does not remove the need for human judgment.",
      "It changes where that judgment is applied.",
      "Diagram: informal mathematics -> generated formalization -> proof checking -> repair / revision.",
    ],
  },
  {
    title: "Urban and Megalodon",
    bullets: [
      "One of the clearest recent demonstrations of serious autoformalization.",
      "The workflow is no longer merely aspirational.",
      "Strong models can now support a substantial formalization loop.",
      "Figure: Urban / Megalodon workflow or result.",
    ],
  },
  {
    title: "Gauss and sphere packing",
    bullets: [
      "These examples are striking because they are mathematically recognizable.",
      "The outputs are not just prose but formal artifacts.",
      "They make the promise of autoformalization more concrete.",
      "Figure: Gauss / sphere-packing formalization material.",
    ],
  },
  {
    title: "Much more is happening",
    bullets: [
      "These are not isolated examples.",
      "Across several groups, the pace of progress this year has been unusually fast.",
      "Examples to mention briefly: M2F, Archon / First Proof, other recent autoformalization work.",
      "Small supporting panels or references if desired.",
    ],
  },
  {
    title: "The Claude Code moment",
    bullets: [
      "What changed this year is not only benchmark performance.",
      "Recent coding-oriented models made these workflows much more accessible in practice.",
      "One no longer needs a highly specialized system to begin trying serious experiments.",
      "Keep the tone understated: this is a threshold claim, not a hype slide.",
    ],
  },
  {
    title: "Serre duality: a personal experiment",
    bullets: [
      "Figure: screenshot from the Serre duality experiment.",
      "In my own experiment, this kind of workflow was strong enough to be genuinely useful.",
      "The point was not that the system could simply be trusted.",
      "The point was that it could help produce formal mathematics that could then be checked.",
      "Closing line: trust the verified workflow more than the generated prose.",
    ],
  },
];

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "OpenAI Codex";
pptx.title = "Should You Trust an AI Mathematician? Outline Deck";
pptx.subject = "Outline deck with slide-by-slide bullet blocking";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: FONT,
  bodyFontFace: FONT,
  lang: "en-US",
};

function addTitle(slide, title, slideNumber) {
  slide.background = { color: COLORS.bg };
  slide.addText(title, {
    x: 0.7,
    y: 0.45,
    w: 11.2,
    h: 0.45,
    fontFace: FONT,
    fontSize: 24,
    bold: true,
    color: COLORS.text,
    margin: 0,
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 0.7,
    y: 1.0,
    w: 11.6,
    h: 0,
    line: { color: COLORS.line, pt: 1 },
  });
  slide.addText(String(slideNumber), {
    x: 12.1,
    y: 6.9,
    w: 0.35,
    h: 0.18,
    fontFace: FONT,
    fontSize: 10,
    color: COLORS.muted,
    align: "right",
    margin: 0,
  });
}

function addBullets(slide, bullets) {
  const text = bullets.map((item) => `- ${item}`).join("\n");
  slide.addText(text, {
    x: 0.95,
    y: 1.35,
    w: 11.0,
    h: 5.35,
    fontFace: FONT,
    fontSize: 21,
    color: COLORS.text,
    valign: "top",
    margin: 0.02,
    breakLine: false,
    fit: "shrink",
  });
}

slides.forEach((slideSpec, index) => {
  const slide = pptx.addSlide();
  addTitle(slide, slideSpec.title, index + 1);
  addBullets(slide, slideSpec.bullets);
});

fs.mkdirSync(OUT_DIR, { recursive: true });

pptx.writeFile({ fileName: OUT_FILE }).then(() => {
  console.log(`Wrote ${OUT_FILE}`);
});
