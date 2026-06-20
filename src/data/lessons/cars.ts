import type { Lesson } from "../../types/lesson";

export const CARS_LESSONS: Lesson[] = [
  {
    id: "lesson-cars-main-idea",
    contentCategoryId: "cars-fc1-cc1",
    title: "Main Idea and Primary Purpose",
    body: `## Main Idea and Primary Purpose

Every CARS passage has one central thesis — the single claim the author is defending. The **main idea** is the overarching argument that ties together the entire passage. The **primary purpose** is what the author intends to accomplish: to argue, to critique, to explain, to challenge, or to reconcile. Identify the main idea by asking: "If I had to summarize this passage in one sentence, what would it be?" Distill it from the author's claims, not from examples or supporting details.

### Key Skills

- **Read the first and last paragraphs carefully** — the main idea is often introduced in the opening and reinforced or refined in the conclusion
- **Distinguish topic from thesis**: the topic is the subject (e.g., Baroque opera), while the thesis is the author's specific claim about that topic (e.g., Baroque opera declined because of its rigid conventions)
- **Ask "why did the author write this?"** — if the answer is "to show flaws in a theory," the primary purpose is critical; if "to propose an alternative," it is constructive
- **Re-state the main idea in your own words** after reading — if you cannot, re-skim the topic sentences

### Common Traps

- Choosing an answer that describes a **supporting detail** rather than the global argument
- Selecting a statement that is **true of the passage** but is too narrow — it only covers one paragraph
- Picking a purpose that is too broad ("to discuss art") when the passage has a more specific aim
- Mistaking the **author's tone** (skeptical, supportive) for the main idea itself`,
    orderIndex: 0,
  },
  {
    id: "lesson-cars-detail",
    contentCategoryId: "cars-fc1-cc2",
    title: "Detail and Supporting Evidence",
    body: `## Detail and Supporting Evidence

Detail questions ask you to locate and understand specific claims, facts, examples, or pieces of evidence the author uses to support the argument. These are often the most straightforward CARS questions — the answer is explicitly stated in the passage. The challenge is that the test writers paraphrase the detail, so you must recognize the same idea expressed in different words.

### Key Skills

- **Use line references as a starting point**, not a destination — read a few sentences before and after to capture full context
- **Map evidence to claims** as you read: ask "is this an example, a statistic, an anecdote, or a logical premise?"
- **Paraphrase the detail before looking at answer choices** — this prevents the distractors from contaminating your understanding
- **Scan for structural keywords** that flag evidence: "for example," "because," "in particular," "studies show," "illustrated by"

### Common Traps

- Choosing an answer that is **true in the abstract** but not supported by the passage text
- Selecting a **direct quote from the wrong section** — the detail exists in the passage but does not answer the question
- Falling for answer choices that **misstate the scope** (e.g., "most scientists agree" when the passage says "some scientists agree")
- Overlooking **negatives and qualifiers** — words like "rarely," "seldom," "not all," and "except" completely change the meaning`,
    orderIndex: 1,
  },
  {
    id: "lesson-cars-words-context",
    contentCategoryId: "cars-fc1-cc3",
    title: "Meaning of Words and Phrases in Context",
    body: `## Meaning of Words and Phrases in Context

These questions test your ability to determine what a word, phrase, or figurative expression means as it is used in the passage. The tested word may be unfamiliar, or it may be a common word used in an unusual way. The correct answer depends entirely on the surrounding context — the passage itself contains all the information you need.

### Key Skills

- **Cover the answer choices and predict a meaning first** based on how the word functions in the sentence and surrounding sentences
- **Identify the grammatical role** of the word — is it a noun, verb, adjective? Does it describe a process, an attitude, or a relation?
- **Look for context clues** nearby: definitions set off by commas or dashes, restatements, contrasts ("but," "however," "yet"), or examples introduced by "such as"
- **Substitute each answer choice** into the original sentence and check whether it preserves the meaning and fits the author's tone

### Common Traps

- Choosing the **most common dictionary definition** instead of the passage-specific meaning
- Picking an answer that **sounds plausible in isolation** but does not fit the surrounding sentences
- Ignoring the **author's tone** — a word like "remarkable" could be positive or ironic depending on context
- Rushing past **punctuation cues** — colons, dashes, and parentheses often signal a definition or restatement`,
    orderIndex: 2,
  },
  {
    id: "lesson-cars-inference",
    contentCategoryId: "cars-fc2-cc1",
    title: "Inference and Implication",
    body: `## Inference and Implication

Inference questions ask you to identify what the author suggests, implies, or logically must believe based on the text — even though it is never stated outright. The key constraint is that the inference must be **strongly supported** by the passage. If the answer requires multiple speculative leaps, it is wrong. Think of inference as filling in a missing piece of a logical puzzle where the passage gives you all the surrounding pieces.

### Key Skills

- **Distinguish what must be true from what could be true** — the correct answer is logically necessary given the passage, not merely possible
- **Use the "negation test"**: if the opposite of the answer choice would contradict the passage, then the answer is likely correct
- **Identify implicit assumptions** — what unstated belief does the author rely on for the argument to hold together?
- **Connect claims across paragraphs** — inferences often require combining information from different parts of the passage

### Common Traps

- Choosing an answer that **goes beyond what the passage supports** — the most common error is inferring too much
- Selecting an answer that is **directly stated** in the passage (that is a detail question, not an inference)
- Picking an answer that **contradicts** the author's stated position
- Falling for **extreme language** — words like "always," "never," "all," or "none" are rarely justified by the passage`,
    orderIndex: 3,
  },
  {
    id: "lesson-cars-argument-structure",
    contentCategoryId: "cars-fc2-cc2",
    title: "Argument Structure and Reasoning",
    body: `## Argument Structure and Reasoning

These questions ask you to identify how the author builds the argument: what the premises are, what conclusion they support, and what logical or rhetorical strategies are used. You must recognize structural elements such as analogies, counterarguments, concessions, hypotheticals, and rhetorical questions. Understanding structure is the foundation for answering every other CARS question type.

### Key Skills

- **Map the argument as you read**: label the conclusion (what the author is trying to prove), the premises (reasons given), and any counterarguments that are raised and addressed
- **Look for structural signposts**: "however" (contrast), "therefore" (conclusion), "admittedly" (concession), "but some object that" (counterargument)
- **Distinguish the author's view from views the author presents only to rebut** — a common structure is "some believe X; however, the evidence shows Y"
- **Identify the type of reasoning**: cause-and-effect, analogy, generalization from examples, appeal to authority, or argument by elimination

### Common Traps

- Confusing a **premise for the conclusion** — the conclusion is the ultimate claim, not a stepping stone
- Mistaking a **counterargument** for the author's own position
- Missing the **logical gap** between evidence and conclusion — the MCAT tests whether you notice missing assumptions
- Focusing on **content** instead of **form** — the question is about how the argument works, not what it argues`,
    orderIndex: 4,
  },
  {
    id: "lesson-cars-function",
    contentCategoryId: "cars-fc2-cc3",
    title: "Function of Statements and Ideas",
    body: `## Function of Statements and Ideas

Function questions ask you to explain why a specific sentence, paragraph, or example is included — what role it plays in the larger argument. The function is always relational: it describes how a piece of the passage connects to the author's overall purpose. A single sentence might introduce a problem, provide evidence, anticipate an objection, qualify a claim, or transition to a new point.

### Key Skills

- **Always read above and below the cited portion** — function is determined by context, not by the sentence in isolation
- **Ask "what would be lost if this sentence were removed?"** — if the logical chain breaks, its function is structural; if an example disappears, its function is illustrative
- **Categorize the function**: does it support (evidence, example, premise), challenge (counterargument, qualification), or reframe (transition, concession, conclusion)?
- **Match the function to the author's overall purpose** — a paragraph that describes a failed theory likely functions to motivate the author's alternative proposal

### Common Traps

- Describing **what the sentence says** instead of **what it does** — the question asks for function, not content
- Choosing a function that is **true of the passage generally** but not specific to the cited element
- Picking an answer that **reverses the relationship** (e.g., saying the author concedes a point when the author is actually refuting it)
- Ignoring **structural words** that signal function: "for instance" (example), "but" (contrast), "thus" (conclusion)`,
    orderIndex: 5,
  },
  {
    id: "lesson-cars-application",
    contentCategoryId: "cars-fc3-cc1",
    title: "Application of Ideas to New Contexts",
    body: `## Application of Ideas to New Contexts

Application questions ask you to take a principle, argument, or reasoning pattern from the passage and determine how it would apply to a new, hypothetical scenario. These questions test whether you truly understand the underlying logic — not just what the author said, but how that idea works in different circumstances. The new scenario is often drawn from a different domain entirely.

### Key Skills

- **Abstract the core principle**: strip away the passage-specific details and identify the general rule, causal relationship, or logical structure at work
- **Test the principle against the new scenario** step by step — does the same cause produce the same effect? Does the same reasoning lead to a parallel conclusion?
- **Use the passage as a constraint** — the correct answer must be consistent with everything the author claims, even if the author never discussed the new scenario
- **Ask "what would the author think?"** — the correct answer extends the author's perspective beyond the passage boundaries

### Common Traps

- Choosing an answer that is **plausible in the real world** but inconsistent with the passage's claims
- Applying the **wrong level of abstraction** — being too specific misses the general principle; being too general loses the argument's force
- Selecting an answer that **reverses a causal relationship** described in the passage
- Ignoring **caveats and qualifications** the author placed on the original argument — those same limits apply in the new context`,
    orderIndex: 6,
  },
  {
    id: "lesson-cars-evaluation",
    contentCategoryId: "cars-fc3-cc2",
    title: "Evaluation of Arguments and Evidence",
    body: `## Evaluation of Arguments and Evidence

Evaluation questions ask you to assess the strength, relevance, and validity of the author's argument or the evidence used to support it. You may need to identify assumptions, pinpoint weaknesses, recognize what additional information would strengthen or weaken the argument, or judge whether the evidence actually supports the conclusion. These questions require critical distance — you must analyze the argument rather than simply follow it.

### Key Skills

- **Identify unstated assumptions** — these are the logical bridges the argument depends on; if the assumption is flawed, the argument is weakened
- **Apply the "weaken / strengthen" framework**: what piece of evidence would make the conclusion less likely (weaken) or more likely (strengthen)?
- **Distinguish between types of evidence**: anecdotal evidence is weaker than systematic data; correlation does not imply causation; analogies are suggestive but not proof
- **Evaluate the relevance** of each piece of evidence — does it actually bear on the conclusion, or is it tangential?

### Common Traps

- Confusing **attacking the argument** with **attacking the author** — ad hominem is not valid criticism, and the MCAT will not reward it
- Picking an answer that **identifies a genuine weakness** that is present in nearly any argument (e.g., "more research is needed") rather than a specific vulnerability
- Falling for the **"correlation equals causation"** fallacy in answer choices — the MCAT tests whether you catch it
- Choosing a criticism that the **author has already addressed** in the passage — a concession or rebuttal neutralizes that objection`,
    orderIndex: 7,
  },
];
