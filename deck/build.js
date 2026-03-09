const fs = require("fs");
const path = require("path");
const PptxGenJS = require("pptxgenjs");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "deck");
const OUT_FILE = path.join(OUT_DIR, "should-you-trust-an-ai-mathematician.pptx");

const COLORS = {
  bg: "F7F4ED",
  text: "1D232B",
  accent: "3F5C6E",
  accentSoft: "DCE7ED",
  muted: "6B7280",
  panel: "ECE7DC",
  panelAlt: "E7EEF2",
  border: "C8C4B7",
  warning: "8A5643",
  white: "FFFFFF",
};

const FONTS = {
  title: "Georgia",
  body: "Arial",
};

const ASSETS = {
  archon: path.join(ROOT, "assets/raw-images/archon-firstproof-og.jpg"),
  repeatedSampling: path.join(ROOT, "assets/raw-images/2407-fig7-10.png"),
  reliability: path.join(ROOT, "assets/raw-images/2602-fig1-01.png"),
  alphaSetup: path.join(ROOT, "assets/raw-images/alphaevolve-fig1-03.png"),
  alphaHighlights: path.join(ROOT, "assets/raw-images/alphaevolve-fig5-12.png"),
};

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "OpenAI Codex";
pptx.company = "OpenAI";
pptx.subject = "Math department colloquium deck skeleton";
pptx.title = "Should You Trust an AI Mathematician?";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: FONTS.title,
  bodyFontFace: FONTS.body,
  lang: "en-US",
};

function setBackground(slide) {
  slide.background = { color: COLORS.bg };
}

function addSlideNumber(slide, n) {
  slide.addText(String(n), {
    x: 12.55,
    y: 7.02,
    w: 0.4,
    h: 0.18,
    fontFace: FONTS.body,
    fontSize: 10,
    color: COLORS.muted,
    align: "right",
    margin: 0,
  });
}

function addTitle(slide, title, n) {
  setBackground(slide);
  slide.addText(title, {
    x: 0.75,
    y: 0.45,
    w: 9.8,
    h: 0.42,
    fontFace: FONTS.title,
    fontSize: 22,
    bold: false,
    color: COLORS.text,
    margin: 0,
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 0.75,
    y: 0.98,
    w: 11.85,
    h: 0,
    line: { color: COLORS.border, pt: 1.25 },
  });
  addSlideNumber(slide, n);
}

function addBodyText(slide, lines, opts = {}) {
  slide.addText(lines.join("\n"), {
    x: opts.x ?? 0.95,
    y: opts.y ?? 1.3,
    w: opts.w ?? 5.6,
    h: opts.h ?? 4.6,
    fontFace: FONTS.body,
    fontSize: opts.fontSize ?? 20,
    color: COLORS.text,
    valign: "top",
    margin: opts.margin ?? 0.03,
    breakLine: false,
    fit: "shrink",
    bold: opts.bold ?? false,
    italic: opts.italic ?? false,
  });
}

function addPanel(slide, title, lines, box, fillColor = COLORS.panel) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x: box.x,
    y: box.y,
    w: box.w,
    h: box.h,
    rectRadius: 0.08,
    fill: { color: fillColor },
    line: { color: COLORS.border, pt: 1 },
  });
  slide.addText(title, {
    x: box.x + 0.18,
    y: box.y + 0.14,
    w: box.w - 0.36,
    h: 0.26,
    fontFace: FONTS.title,
    fontSize: 16,
    bold: false,
    color: COLORS.accent,
    margin: 0,
  });
  addBodyText(slide, lines, {
    x: box.x + 0.18,
    y: box.y + 0.48,
    w: box.w - 0.36,
    h: box.h - 0.58,
    fontSize: 17,
  });
}

function imageExists(p) {
  return Boolean(p) && fs.existsSync(p);
}

function addImageOrPlaceholder(slide, assetPath, box, label) {
  if (imageExists(assetPath)) {
    slide.addImage({
      path: assetPath,
      x: box.x,
      y: box.y,
      w: box.w,
      h: box.h,
      sizing: { type: "contain", x: box.x, y: box.y, w: box.w, h: box.h },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: box.x,
      y: box.y,
      w: box.w,
      h: box.h,
      fill: { color: "FFFFFF", transparency: 100 },
      line: { color: COLORS.border, pt: 0.75 },
    });
    return;
  }

  slide.addShape(pptx.ShapeType.roundRect, {
    x: box.x,
    y: box.y,
    w: box.w,
    h: box.h,
    fill: { color: COLORS.panelAlt },
    line: { color: COLORS.border, pt: 1 },
  });
  slide.addText(label, {
    x: box.x + 0.18,
    y: box.y + 0.22,
    w: box.w - 0.36,
    h: box.h - 0.44,
    fontFace: FONTS.body,
    fontSize: 16,
    color: COLORS.muted,
    align: "center",
    valign: "mid",
    italic: true,
    margin: 0.05,
    fit: "shrink",
  });
}

function addQuoteBox(slide, text, box) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x: box.x,
    y: box.y,
    w: box.w,
    h: box.h,
    rectRadius: 0.08,
    fill: { color: COLORS.accentSoft },
    line: { color: COLORS.accent, pt: 1 },
  });
  slide.addText(text, {
    x: box.x + 0.18,
    y: box.y + 0.18,
    w: box.w - 0.36,
    h: box.h - 0.36,
    fontFace: FONTS.body,
    fontSize: 18,
    italic: true,
    color: COLORS.text,
    margin: 0.02,
    fit: "shrink",
  });
}

function addPipeline(slide, labels, y) {
  const startX = 0.95;
  const boxW = 2.15;
  const gap = 0.45;

  labels.forEach((label, i) => {
    const x = startX + i * (boxW + gap);
    slide.addShape(pptx.ShapeType.roundRect, {
      x,
      y,
      w: boxW,
      h: 0.88,
      rectRadius: 0.08,
      fill: { color: i % 2 === 0 ? COLORS.panel : COLORS.panelAlt },
      line: { color: COLORS.border, pt: 1 },
    });
    slide.addText(label, {
      x: x + 0.12,
      y: y + 0.18,
      w: boxW - 0.24,
      h: 0.45,
      fontFace: FONTS.body,
      fontSize: 16,
      color: COLORS.text,
      align: "center",
      valign: "mid",
      margin: 0,
      fit: "shrink",
    });
    if (i < labels.length - 1) {
      slide.addText("→", {
        x: x + boxW + 0.08,
        y: y + 0.23,
        w: 0.28,
        h: 0.22,
        fontFace: FONTS.body,
        fontSize: 22,
        color: COLORS.accent,
        align: "center",
        margin: 0,
      });
    }
  });
}

function addFourUp(slide, items, topY) {
  const boxes = [
    { x: 0.95, y: topY, w: 2.72, h: 1.5 },
    { x: 3.88, y: topY, w: 2.72, h: 1.5 },
    { x: 6.81, y: topY, w: 2.72, h: 1.5 },
    { x: 9.74, y: topY, w: 2.72, h: 1.5 },
  ];
  items.forEach((item, i) => {
    addPanel(slide, item.title, [item.body], boxes[i], i % 2 === 0 ? COLORS.panel : COLORS.panelAlt);
  });
}

function slide1() {
  const slide = pptx.addSlide();
  setBackground(slide);
  slide.addText("Should You Trust an AI Mathematician?", {
    x: 0.95,
    y: 2.1,
    w: 11.2,
    h: 0.82,
    fontFace: FONTS.title,
    fontSize: 28,
    color: COLORS.text,
    align: "center",
    margin: 0,
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 3.15,
    y: 3.04,
    w: 7.0,
    h: 0,
    line: { color: COLORS.border, pt: 1.2 },
  });
  slide.addText("Name / affiliation / venue / date", {
    x: 3.0,
    y: 3.24,
    w: 7.3,
    h: 0.24,
    fontFace: FONTS.body,
    fontSize: 14,
    color: COLORS.muted,
    align: "center",
    margin: 0,
  });
  addSlideNumber(slide, 1);
}

function slide2() {
  const slide = pptx.addSlide();
  addTitle(slide, "Capability and trust", 2);
  addBodyText(slide, [
    "Recent systems are much stronger at mathematics than they were even a year ago.",
    "Some now perform impressively on demanding benchmarks.",
    "But capability and trust are not the same question.",
  ], { y: 1.5, w: 8.1, h: 2.8, fontSize: 21 });
}

function slide3() {
  const slide = pptx.addSlide();
  addTitle(slide, "Why ask this now?", 3);
  addBodyText(slide, [
    "Benchmark results in mathematics are improving quickly.",
    "Systems are also beginning to contribute, at least in limited ways, to research-level work.",
    "So the question is no longer speculative.",
  ], { y: 1.5, w: 8.8, h: 3.0, fontSize: 20 });
  addQuoteBox(slide, "Need concrete examples here: one benchmark example and one research-adjacent example.", {
    x: 0.95,
    y: 5.55,
    w: 6.6,
    h: 0.9,
  });
}

function slide4() {
  const slide = pptx.addSlide();
  addTitle(slide, "The question for working mathematicians", 4);
  addBodyText(slide, [
    "For a working mathematician, the issue is practical rather than philosophical:",
    "when I do not know the answer, can this help me without wasting time",
    "or creating false confidence?",
  ], { y: 1.55, w: 8.9, h: 3.0, fontSize: 20 });
}

function slide5() {
  const slide = pptx.addSlide();
  addTitle(slide, "How should we judge them?", 5);
  addPanel(slide, "Benchmarks", [
    "Tell us what these systems can sometimes do under controlled conditions.",
  ], { x: 0.95, y: 1.55, w: 5.2, h: 3.0 }, COLORS.panel);
  addPanel(slide, "Our own experiments", [
    "Tell us how they behave in actual mathematical work.",
  ], { x: 6.35, y: 1.55, w: 5.2, h: 3.0 }, COLORS.panelAlt);
  addBodyText(slide, [
    "We need both kinds of evidence.",
  ], { x: 0.95, y: 5.15, w: 4.4, h: 0.45, fontSize: 18, italic: true });
}

function slide6() {
  const slide = pptx.addSlide();
  addTitle(slide, "What benchmarks tell us, and what they do not", 6);
  addPanel(slide, "They do tell us", [
    "They measure difficult problem-solving under fixed conditions.",
  ], { x: 0.95, y: 1.55, w: 5.15, h: 3.25 }, COLORS.panel);
  addPanel(slide, "They do not tell us", [
    "Whether these systems can efficiently contribute to our understanding of mathematical problems.",
  ], { x: 6.3, y: 1.55, w: 5.25, h: 3.25 }, COLORS.panelAlt);
  addBodyText(slide, [
    "That is the question mathematicians actually care about.",
  ], { x: 0.95, y: 5.22, w: 6.5, h: 0.48, fontSize: 18, italic: true });
}

function slide7() {
  const slide = pptx.addSlide();
  addTitle(slide, "Two recent tests", 7);
  addImageOrPlaceholder(slide, ASSETS.archon, { x: 0.95, y: 1.55, w: 5.15, h: 3.45 }, "First Proof image");
  addImageOrPlaceholder(slide, null, { x: 6.3, y: 1.55, w: 5.25, h: 3.45 }, "FrontierMath image or leaderboard");
  addBodyText(slide, [
    "These two examples ask rather different questions.",
    "Together they give a useful picture of recent progress.",
  ], { x: 0.95, y: 5.3, w: 8.5, h: 0.8, fontSize: 18 });
}

function slide8() {
  const slide = pptx.addSlide();
  addTitle(slide, "First Proof", 8);
  addImageOrPlaceholder(slide, ASSETS.archon, { x: 0.95, y: 1.45, w: 6.0, h: 4.2 }, "First Proof / Archon figure");
  addBodyText(slide, [
    "First Proof evaluates olympiad-style proof generation.",
    "This is still an artificial setting, but it is at least recognizable mathematics.",
    "It asks for sustained reasoning, not just short-answer pattern matching.",
  ], { x: 7.3, y: 1.55, w: 5.0, h: 3.6, fontSize: 18 });
}

function slide9() {
  const slide = pptx.addSlide();
  addTitle(slide, "FrontierMath", 9);
  addImageOrPlaceholder(slide, null, { x: 0.95, y: 1.45, w: 6.0, h: 4.2 }, "Insert FrontierMath figure or Tier 4 leaderboard");
  addBodyText(slide, [
    "FrontierMath was designed to probe much harder mathematics.",
    "Its harder tiers aim beyond standard benchmark questions",
    "and are meant to resist superficial pattern matching.",
  ], { x: 7.3, y: 1.55, w: 5.0, h: 3.6, fontSize: 18 });
}

function slide10() {
  const slide = pptx.addSlide();
  addTitle(slide, "What a score can hide", 10);
  const left = 1.1;
  const top = 1.8;
  const colW = 1.45;
  const rowH = 0.58;
  ["P1", "P2", "P3", "P4"].forEach((problem, idx) => {
    slide.addText(problem, {
      x: left + 1.45 + idx * colW,
      y: top - 0.35,
      w: 0.8,
      h: 0.18,
      fontFace: FONTS.body,
      fontSize: 12,
      color: COLORS.muted,
      align: "center",
      margin: 0,
    });
  });
  ["System A", "System B", "System C"].forEach((system, idx) => {
    slide.addText(system, {
      x: left,
      y: top + idx * rowH + 0.18,
      w: 1.1,
      h: 0.18,
      fontFace: FONTS.body,
      fontSize: 13,
      color: COLORS.text,
      margin: 0,
    });
  });
  const checks = [
    [1, 0, 0, 1],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
  ];
  checks.forEach((row, r) => {
    row.forEach((val, c) => {
      slide.addShape(pptx.ShapeType.roundRect, {
        x: left + 1.45 + c * colW,
        y: top + r * rowH,
        w: 1.0,
        h: 0.42,
        fill: { color: val ? COLORS.accentSoft : COLORS.panel },
        line: { color: COLORS.border, pt: 0.75 },
      });
      slide.addText(val ? "✓" : "", {
        x: left + 1.45 + c * colW,
        y: top + r * rowH + 0.05,
        w: 1.0,
        h: 0.2,
        fontFace: FONTS.body,
        fontSize: 20,
        color: COLORS.accent,
        align: "center",
        margin: 0,
      });
    });
  });
  addQuoteBox(slide, "Headline performance can come from best-on-each-problem aggregation rather than one dependable assistant.", {
    x: 0.95,
    y: 4.35,
    w: 5.9,
    h: 1.0,
  });
  addBodyText(slide, [
    "A strong aggregate score may come from different systems succeeding on different problems.",
    "That is not the same thing as having one system you can reliably work with.",
  ], { x: 7.2, y: 1.75, w: 5.0, h: 3.1, fontSize: 18 });
}

function slide11() {
  const slide = pptx.addSlide();
  addTitle(slide, "On pass@X", 11);
  addImageOrPlaceholder(slide, ASSETS.repeatedSampling, { x: 0.95, y: 1.45, w: 6.4, h: 4.2 }, "Repeated sampling paper figure");
  addBodyText(slide, [
    "If one allows many tries, success rates can rise dramatically.",
    "But eventual success after repeated sampling is not the same thing",
    "as a system that is reliable on the first few serious attempts.",
  ], { x: 7.55, y: 1.55, w: 4.85, h: 2.7, fontSize: 18 });
  slide.addText("1 - (1 - p)^X", {
    x: 8.2,
    y: 4.55,
    w: 2.6,
    h: 0.35,
    fontFace: FONTS.body,
    fontSize: 20,
    italic: true,
    color: COLORS.accent,
    align: "center",
    margin: 0,
  });
}

function slide12() {
  const slide = pptx.addSlide();
  addTitle(slide, "What seems to be improving", 12);
  addImageOrPlaceholder(slide, null, { x: 0.95, y: 1.45, w: 7.0, h: 4.5 }, "Insert FrontierMath Tier 4 leaderboard");
  addBodyText(slide, [
    "The systems do seem to be getting better.",
    "On hard mathematical benchmarks, the trend is plainly upward.",
    "That much is real, even if it does not settle the question of trust.",
  ], { x: 8.2, y: 1.65, w: 4.1, h: 2.8, fontSize: 18 });
}

function slide13() {
  const slide = pptx.addSlide();
  addTitle(slide, "Capability is not reliability", 13);
  addBodyText(slide, [
    "Recent work argues that accuracy and reliability should be separated.",
    "A system can solve many tasks on average and still be an unreliable tool in practice.",
    "So for mathematics, we should ask not only how often a model succeeds,",
    "but how to benchmark reliability itself.",
  ], { x: 0.95, y: 1.55, w: 5.35, h: 3.8, fontSize: 18 });
  addImageOrPlaceholder(slide, ASSETS.reliability, { x: 6.55, y: 1.45, w: 5.9, h: 4.25 }, "Reliability figure");
}

function slide14() {
  const slide = pptx.addSlide();
  addTitle(slide, "What would reliability mean in mathematics?", 14);
  addPipeline(slide, [
    "suggests useful directions",
    "preserves definitions and assumptions",
    "fails in ways that are easy to detect",
  ], 2.25);
  addBodyText(slide, [
    "A reliable system would do more than occasionally produce correct answers.",
    "It would help us understand a problem efficiently,",
    "and it would fail in ways that do not quietly waste our time.",
  ], { x: 0.95, y: 4.6, w: 9.0, h: 1.4, fontSize: 19 });
}

function slide15() {
  const slide = pptx.addSlide();
  addTitle(slide, "How do these systems fail?", 15);
  addFourUp(slide, [
    { title: "False intermediate claims", body: "A proof sketch can look coherent while relying on a false lemma." },
    { title: "Invented references", body: "Citations and attributions are easy to fabricate and costly to verify." },
    { title: "Locally plausible steps", body: "Each step may look reasonable even when the full argument breaks." },
    { title: "Drift in assumptions", body: "Definitions and hypotheses can shift subtly as the solution unfolds." },
  ], 1.7);
  addBodyText(slide, [
    "These failures are familiar by now.",
    "The problem is not only that they occur,",
    "but that they can be expensive to detect when one does not already know the answer.",
  ], { x: 1.05, y: 4.9, w: 9.8, h: 1.1, fontSize: 18 });
}

function slide16() {
  const slide = pptx.addSlide();
  addTitle(slide, "Verification changes the picture", 16);
  addImageOrPlaceholder(slide, ASSETS.alphaSetup, { x: 0.95, y: 1.45, w: 6.1, h: 4.2 }, "AlphaEvolve setup figure");
  addBodyText(slide, [
    "The most impressive current systems do not ignore unreliability.",
    "They put generation inside a loop of testing, scoring, and selection.",
    "AlphaEvolve is a good example of this.",
  ], { x: 7.25, y: 1.6, w: 5.0, h: 3.1, fontSize: 18 });
}

function slide17() {
  const slide = pptx.addSlide();
  addTitle(slide, "AlphaEvolve", 17);
  addImageOrPlaceholder(slide, ASSETS.alphaHighlights, { x: 0.95, y: 1.45, w: 5.85, h: 4.2 }, "AlphaEvolve highlights figure");
  addPanel(slide, "Highlights", [
    "4 x 4 complex matrix multiplication in 48 scalar multiplications.",
    "Matched best known constructions on many mathematical problems.",
    "Improved prior state of the art on a meaningful subset.",
  ], { x: 7.05, y: 1.6, w: 5.25, h: 2.7 }, COLORS.panelAlt);
  addBodyText(slide, [
    "The larger lesson is that verification or testing can make these systems much more useful.",
  ], { x: 7.15, y: 4.65, w: 4.9, h: 0.9, fontSize: 17, italic: true });
}

function slide18() {
  const slide = pptx.addSlide();
  addTitle(slide, "From testing to proof checking", 18);
  addPipeline(slide, ["testing / scoring", "formal proof checking"], 2.25);
  addBodyText(slide, [
    "For some problems, one can test candidate outputs.",
    "For mathematics, a deeper possibility is to check proofs themselves.",
    "That is where formalization enters the picture.",
  ], { x: 0.95, y: 4.4, w: 8.8, h: 1.3, fontSize: 19 });
}

function slide19() {
  const slide = pptx.addSlide();
  addTitle(slide, "Lean in one slide", 19);
  addBodyText(slide, [
    "Lean is a proof assistant in which definitions, statements, and proofs are formal objects.",
    "What ultimately matters is that a small trusted kernel checks the proof.",
    "This gives a much firmer notion of correctness than persuasive prose.",
  ], { x: 0.95, y: 1.6, w: 5.55, h: 3.4, fontSize: 18 });
  addImageOrPlaceholder(slide, null, { x: 6.75, y: 1.45, w: 5.55, h: 4.15 }, "Insert a short, legible Lean snippet");
}

function slide20() {
  const slide = pptx.addSlide();
  addTitle(slide, "What formalization gives you", 20);
  addFourUp(slide, [
    { title: "Exact statements", body: "The claim being checked must be written precisely enough for a machine." },
    { title: "Exact dependencies", body: "The objects, assumptions, and lemmas become explicit." },
    { title: "Machine-checked proofs", body: "Correctness no longer depends on rhetoric or reader confidence." },
    { title: "Reproducibility", body: "The proof can be replayed and inspected later in the same environment." },
  ], 1.7);
  addBodyText(slide, [
    "The burden shifts from judging prose to checking that the formal statement is the right one.",
  ], { x: 1.05, y: 4.95, w: 9.8, h: 0.8, fontSize: 18, italic: true });
}

function slide21() {
  const slide = pptx.addSlide();
  addTitle(slide, "What formalization does not give you", 21);
  addImageOrPlaceholder(slide, null, { x: 0.95, y: 1.45, w: 5.85, h: 4.25 }, "Insert formal statement / definition example whose syntax obscures its meaning");
  addBodyText(slide, [
    "A verified proof is only as good as the statement that was formalized.",
    "One still has to check definitions, hypotheses, and the actual claim being proved.",
    "Formal syntax can obscure these things rather than clarify them.",
  ], { x: 7.05, y: 1.6, w: 5.2, h: 3.0, fontSize: 18 });
}

function slide22() {
  const slide = pptx.addSlide();
  addTitle(slide, "Autoformalization", 22);
  addPipeline(slide, [
    "informal mathematics",
    "generated formalization",
    "proof checking",
    "repair / revision",
  ], 2.0);
  addBodyText(slide, [
    "Autoformalization tries to move from ordinary mathematical language",
    "to machine-checkable statements and proofs.",
    "It does not remove the need for human judgment,",
    "but it changes where that judgment is applied.",
  ], { x: 0.95, y: 4.35, w: 9.2, h: 1.6, fontSize: 18 });
}

function slide23() {
  const slide = pptx.addSlide();
  addTitle(slide, "Urban and Megalodon", 23);
  addImageOrPlaceholder(slide, null, { x: 0.95, y: 1.45, w: 6.0, h: 4.2 }, "Insert Urban / Megalodon figure or workflow image");
  addBodyText(slide, [
    "This is one of the clearest recent demonstrations of serious autoformalization.",
    "The workflow is no longer merely aspirational.",
    "Strong models can now support a substantial formalization loop.",
  ], { x: 7.2, y: 1.6, w: 5.05, h: 3.0, fontSize: 18 });
}

function slide24() {
  const slide = pptx.addSlide();
  addTitle(slide, "Gauss and sphere packing", 24);
  addImageOrPlaceholder(slide, null, { x: 0.95, y: 1.45, w: 6.0, h: 4.2 }, "Insert Gauss / sphere-packing formalization image");
  addBodyText(slide, [
    "These examples are striking because they are mathematically recognizable",
    "and because the outputs are not just prose but formal artifacts.",
    "They make the promise of autoformalization more concrete.",
  ], { x: 7.2, y: 1.6, w: 5.05, h: 3.0, fontSize: 18 });
}

function slide25() {
  const slide = pptx.addSlide();
  addTitle(slide, "Much more is happening", 25);
  addPanel(slide, "Recent autoformalization paper", [
    "Insert small figure or screenshot and one short caption.",
  ], { x: 0.95, y: 1.75, w: 3.65, h: 2.2 }, COLORS.panel);
  addPanel(slide, "Archon / First Proof", [
    "Insert small figure or screenshot and one short caption.",
  ], { x: 4.84, y: 1.75, w: 3.65, h: 2.2 }, COLORS.panelAlt);
  addPanel(slide, "Another 2026 example", [
    "Reserve space if a third small panel is useful.",
  ], { x: 8.73, y: 1.75, w: 3.0, h: 2.2 }, COLORS.panel);
  addBodyText(slide, [
    "These are not isolated examples.",
    "Across several groups, the pace of progress this year has been unusually fast.",
  ], { x: 1.05, y: 4.75, w: 8.8, h: 0.95, fontSize: 18 });
}

function slide26() {
  const slide = pptx.addSlide();
  addTitle(slide, "The Claude Code moment", 26);
  addImageOrPlaceholder(slide, null, { x: 0.95, y: 1.45, w: 5.7, h: 4.15 }, "Insert representative Claude Code screenshots or a simpler custom diagram");
  addPanel(slide, "Threshold claim", [
    "Recent coding-oriented models made these workflows much more accessible in practice.",
    "One no longer needs a highly specialized system to begin trying serious experiments.",
  ], { x: 7.0, y: 1.55, w: 5.3, h: 2.65 }, COLORS.panelAlt);
  addPipeline(slide, ["off-the-shelf model", "coding loop", "Lean feedback"], 4.65);
}

function slide27() {
  const slide = pptx.addSlide();
  addTitle(slide, "Serre duality: a personal experiment", 27);
  addImageOrPlaceholder(slide, null, { x: 0.95, y: 1.45, w: 6.35, h: 4.05 }, "Insert screenshot from the Serre duality experiment");
  addBodyText(slide, [
    "In my own experiment, this kind of workflow was strong enough to be genuinely useful.",
    "The point was not that the system could simply be trusted.",
    "The point was that it could help produce formal mathematics that could then be checked.",
  ], { x: 7.55, y: 1.6, w: 4.7, h: 3.0, fontSize: 18 });
  addQuoteBox(slide, "If you ask whether one should trust an AI mathematician, my answer is no, not in the ordinary sense. But one can increasingly trust a workflow in which generation is coupled to real verification.", {
    x: 0.95,
    y: 5.85,
    w: 11.35,
    h: 0.9,
  });
}

[
  slide1,
  slide2,
  slide3,
  slide4,
  slide5,
  slide6,
  slide7,
  slide8,
  slide9,
  slide10,
  slide11,
  slide12,
  slide13,
  slide14,
  slide15,
  slide16,
  slide17,
  slide18,
  slide19,
  slide20,
  slide21,
  slide22,
  slide23,
  slide24,
  slide25,
  slide26,
  slide27,
].forEach((buildSlide) => buildSlide());

fs.mkdirSync(OUT_DIR, { recursive: true });

pptx.writeFile({ fileName: OUT_FILE }).then(() => {
  console.log(`Wrote ${OUT_FILE}`);
});
