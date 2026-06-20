import type { Lesson } from "../../types/lesson";

export const BIO_BIOCHEM_LESSONS: Lesson[] = [
  {
    id: "lesson-aa-structure",
    contentCategoryId: "bb-fc1-cc1",
    title: "Amino Acid Structure and Properties",
    body: `## Amino Acid Structure

All 20 standard amino acids share a common structure: a central α-carbon bonded to an amino group (-NH₂), a carboxyl group (-COOH), a hydrogen atom, and a variable R-group (side chain).

### Key Classifications

- **Nonpolar, aliphatic** (Gly, Ala, Val, Leu, Ile, Met, Pro) — hydrophobic, buried in protein interiors
- **Aromatic** (Phe, Tyr, Trp) — contain ring structures; Tyr and Trp absorb UV at 280nm
- **Polar, uncharged** (Ser, Thr, Cys, Asn, Gln) — hydrophilic, form hydrogen bonds
- **Positively charged (basic)** (Lys, Arg, His) — protonated at physiological pH
- **Negatively charged (acidic)** (Asp, Glu) — deprotonated at physiological pH

### Ionization and pKa

Amino acids are amphoteric. At low pH, both groups are protonated (cation). At high pH, both are deprotonated (anion). The **isoelectric point (pI)** is the pH where the molecule carries no net charge.

- For amino acids with non-ionizable R-groups: pI = (pKa₁ + pKa₂) / 2
- For acidic amino acids: pI = (pKa₁ + pKa₃) / 2
- For basic amino acids: pI = (pKa₂ + pKa₃) / 2

### Peptide Bonds

Amino acids join via condensation reactions between the α-carboxyl of one amino acid and the α-amino of another, forming a **peptide bond** (amide bond). This bond has partial double-bond character, making it rigid and planar.`,
    orderIndex: 0,
  },
  {
    id: "lesson-protein-structure",
    contentCategoryId: "bb-fc1-cc1",
    title: "Protein Structure: Primary Through Quaternary",
    body: `## Levels of Protein Structure

### Primary Structure
The linear sequence of amino acids, determined by the genetic code. Even a single amino acid substitution can cause disease (e.g., sickle cell anemia: Glu → Val at position 6 of β-globin).

### Secondary Structure
Local folding patterns stabilized by hydrogen bonds between backbone amide and carbonyl groups:

- **α-helix**: Right-handed coil, 3.6 residues per turn. Hydrogen bonds between residue n and n+4.
- **β-sheet**: Extended strands connected by hydrogen bonds. Can be parallel or antiparallel.
- **β-turn**: 180° turn involving 4 residues, often with Pro or Gly.

### Tertiary Structure
Global three-dimensional folding stabilized by:
- **Hydrophobic interactions** (major driving force)
- **Hydrogen bonds** between side chains
- **Ionic interactions** (salt bridges)
- **Disulfide bonds** (covalent, between Cys residues)
- **Van der Waals forces**

### Quaternary Structure
Arrangement of multiple polypeptide subunits (e.g., hemoglobin: α₂β₂ tetramer). Subunit cooperativity is critical for function.`,
    orderIndex: 1,
  },
  {
    id: "lesson-enzyme-kinetics",
    contentCategoryId: "bb-fc2-cc1",
    title: "Enzyme Kinetics and Inhibition",
    body: `## Enzyme Kinetics

Enzymes are biological catalysts that lower activation energy without being consumed.

### Michaelis-Menten Model

The rate of an enzyme-catalyzed reaction:

v₀ = (Vmax × [S]) / (Km + [S])

- **Vmax**: Maximum velocity when enzyme is fully saturated
- **Km**: Michaelis constant = [S] at half Vmax. Inverse measure of affinity (lower Km = higher affinity)
- **kcat**: Turnover number, the maximum number of substrate molecules converted per enzyme per second
- **Catalytic efficiency**: kcat / Km

### Lineweaver-Burk Plot

Double-reciprocal plot: 1/v₀ vs 1/[S]
- y-intercept = 1/Vmax
- x-intercept = -1/Km
- Slope = Km/Vmax

### Enzyme Inhibition

| Type | Effect on Vmax | Effect on Km | Lineweaver-Burk |
|------|---------------|--------------|-----------------|
| **Competitive** | Unchanged | Increased | Lines meet on y-axis |
| **Noncompetitive** | Decreased | Unchanged | Lines meet on x-axis |
| **Mixed** | Decreased | Can increase or decrease | Lines meet off both axes |
| **Uncompetitive** | Decreased | Decreased | Parallel lines |

### Regulation Mechanisms

- **Allosteric regulation**: Effector binding at a site distinct from the active site
- **Covalent modification**: Phosphorylation, glycosylation, etc.
- **Feedback inhibition**: End product inhibits an early enzyme in a pathway
- **Proteolytic activation**: Zymogen → active enzyme (e.g., trypsinogen → trypsin)`,
    orderIndex: 2,
  },
  {
    id: "lesson-metabolism",
    contentCategoryId: "bb-fc2-cc2",
    title: "Metabolic Pathways: Glycolysis and the TCA Cycle",
    body: `## Central Metabolism

### Glycolysis
Occurs in the cytoplasm. Glucose → 2 Pyruvate.

**Net yield per glucose**: 2 ATP, 2 NADH

**Key steps**:
1. **Hexokinase/Glucokinase**: Glucose → Glucose-6-phosphate (first committed step, uses ATP)
2. **PFK-1**: Fructose-6-phosphate → Fructose-1,6-bisphosphate (rate-limiting, allosterically regulated)
3. **Pyruvate kinase**: PEP → Pyruvate (substrate-level phosphorylation)

**Regulation**: PFK-1 activated by AMP and fructose-2,6-bisphosphate; inhibited by ATP and citrate.

### Pyruvate Dehydrogenase Complex
Pyruvate → Acetyl-CoA (irreversible, links glycolysis to TCA cycle). Produces 1 NADH per pyruvate.

### TCA Cycle (Krebs Cycle)
Occurs in the mitochondrial matrix.

**Per turn of the cycle (per acetyl-CoA)**:
- 3 NADH
- 1 FADH₂
- 1 GTP (≈ 1 ATP)
- 2 CO₂

**Key regulatory enzymes**:
- Citrate synthase (inhibited by ATP, NADH, citrate)
- Isocitrate dehydrogenase (activated by ADP, inhibited by ATP and NADH)
- α-ketoglutarate dehydrogenase (inhibited by ATP, NADH, succinyl-CoA)

### Total ATP Yield per Glucose
Glycolysis: 2 ATP + 2 NADH (~5 ATP)
Pyruvate → Acetyl-CoA: 2 NADH (~5 ATP)
TCA cycle: 6 NADH + 2 FADH₂ + 2 GTP (~20 ATP)

**Total: ~30-32 ATP per glucose**`,
    orderIndex: 3,
  },
  {
    id: "lesson-oxidative-phosphorylation",
    contentCategoryId: "bb-fc2-cc2",
    title: "Oxidative Phosphorylation and Electron Transport Chain",
    body: `## Electron Transport Chain

Located in the inner mitochondrial membrane. Electrons from NADH and FADH₂ flow through protein complexes to O₂ (the final electron acceptor).

### Complexes

- **Complex I (NADH dehydrogenase)**: Accepts electrons from NADH → Coenzyme Q (ubiquinone). Pumps 4 H⁺.
- **Complex II (Succinate dehydrogenase)**: Accepts electrons from FADH₂ (succinate → fumarate) → CoQ. Does NOT pump H⁺.
- **Complex III (Cytochrome bc1)**: CoQH₂ → cytochrome c. Pumps 4 H⁺.
- **Complex IV (Cytochrome c oxidase)**: Cytochrome c → O₂ (reduces O₂ to H₂O). Pumps 2 H⁺.

### Chemiosmotic Theory (Peter Mitchell)

Electron transport creates a proton gradient (proton-motive force) across the inner membrane. This gradient powers **ATP synthase** (Complex V), which uses the flow of H⁺ back into the matrix to drive ATP synthesis.

### ATP Yield
- Each NADH yields ~2.5 ATP
- Each FADH₂ yields ~1.5 ATP (enters at Complex II, bypassing Complex I)

### Inhibitors
- **Rotenone**: Blocks Complex I
- **Antimycin A**: Blocks Complex III
- **Cyanide (CN⁻)**: Blocks Complex IV
- **Oligomycin**: Blocks ATP synthase
- **DNP (2,4-dinitrophenol)**: Uncoupler — dissipates proton gradient; electron transport continues but no ATP is made (energy released as heat)`,
    orderIndex: 4,
  },
  {
    id: "lesson-dna-replication",
    contentCategoryId: "bb-fc1-cc2",
    title: "DNA Replication and Repair",
    body: `## DNA Replication

Semi-conservative: each daughter molecule has one parental strand and one newly synthesized strand.

### Key Enzymes

- **DNA helicase**: Unwinds the double helix at the replication fork
- **Single-strand binding proteins (SSBs)**: Stabilize single-stranded DNA
- **Topoisomerase**: Relieves supercoiling ahead of the replication fork
- **Primase**: Synthesizes RNA primers (short ~10 nt)
- **DNA polymerase III** (prokaryotes) / **DNA polymerase δ/ε** (eukaryotes): Elongates the new strand in the 5' → 3' direction
- **DNA polymerase I** (prokaryotes): Removes RNA primers and fills gaps
- **DNA ligase**: Seals nicks between Okazaki fragments

### Leading and Lagging Strands

- **Leading strand**: Synthesized continuously in the direction of fork movement
- **Lagging strand**: Synthesized discontinuously as Okazaki fragments (each ~100-200 nt in eukaryotes)

### Eukaryotic vs Prokaryotic Replication

| Feature | Prokaryotes | Eukaryotes |
|---------|------------|------------|
| Origin of replication | Single (oriC) | Multiple |
| Replication rate | ~1000 nt/s | ~50 nt/s |
| DNA polymerase types | I, II, III | α, β, γ, δ, ε |
| Telomeres | None (circular) | Present (linear chromosomes) |

### DNA Repair Mechanisms

- **Mismatch repair**: Corrects errors missed by proofreading
- **Base excision repair (BER)**: Repairs single-base damage
- **Nucleotide excision repair (NER)**: Repairs bulky lesions (e.g., thymine dimers)
- **Double-strand break repair**: Homologous recombination (error-free) or non-homologous end joining (error-prone)`,
    orderIndex: 5,
  },
  {
    id: "lesson-transcription-translation",
    contentCategoryId: "bb-fc1-cc2",
    title: "Transcription and Translation",
    body: `## Central Dogma: DNA → RNA → Protein

### Transcription
DNA-dependent RNA synthesis in the nucleus (eukaryotes).

**RNA polymerase**:
- **RNA Pol I**: rRNA
- **RNA Pol II**: mRNA, snRNA (most regulated)
- **RNA Pol III**: tRNA, 5S rRNA

**Steps**:
1. **Initiation**: Transcription factors bind the promoter; RNA Pol II binds at the TATA box
2. **Elongation**: RNA synthesized 5' → 3', complementary to the template strand
3. **Termination**: Polyadenylation signal (AAUAAA) triggers cleavage

**Post-transcriptional modification**:
- 5' cap (7-methylguanosine)
- 3' poly-A tail
- Splicing (removal of introns; alternative splicing generates protein diversity)

### Translation
mRNA → protein, occurs on ribosomes in the cytoplasm.

**tRNA**: Carries amino acids; has anticodon that pairs with mRNA codon. Charged by aminoacyl-tRNA synthetases (one per amino acid, uses ATP).

**Ribosome structure**: Large subunit (60S) + Small subunit (40S) = 80S in eukaryotes.

**Steps**:
1. **Initiation**: Small subunit binds mRNA near the 5' cap; scanning finds the start codon (AUG)
2. **Elongation**: tRNAs enter the A site, peptide bond forms, ribosome translocates
3. **Termination**: Stop codon (UAA, UAG, UGA) binds release factor; polypeptide released

### Genetic Code
- Triplet codons, degenerate (multiple codons per amino acid)
- Start codon: AUG (Methionine)
- Reading frame determined by the start codon

### Regulation of Gene Expression
- **Transcriptional**: Promoters, enhancers, silencers, transcription factors, chromatin remodeling
- **Post-transcriptional**: miRNA, siRNA, alternative splicing, mRNA stability
- **Translational**: Initiation factors, phosphorylation of eIF2`,
    orderIndex: 6,
  },
  {
    id: "lesson-membranes",
    contentCategoryId: "bb-fc1-cc5",
    title: "Biological Membranes and Transport",
    body: `## Membrane Structure

### Fluid Mosaic Model (Singer-Nicolson)
Membranes are dynamic structures with phospholipids and proteins that move laterally.

### Membrane Components
- **Phospholipids**: Amphipathic — hydrophilic heads (phosphate group) + hydrophobic tails (fatty acid chains)
- **Cholesterol**: Modulates fluidity — at high temperatures reduces movement, at low temperatures prevents packing
- **Proteins**: Integral (transmembrane) or peripheral (surface-associated)
- **Carbohydrates**: On extracellular surface (glycoproteins, glycolipids)

### Membrane Fluidity
Influenced by:
- **Fatty acid saturation**: Unsaturated = more fluid (kinks in tails prevent packing)
- **Chain length**: Shorter = more fluid
- **Temperature**: Higher = more fluid
- **Cholesterol**: Buffers fluidity changes

### Transport Across Membranes

**Passive transport** (no energy required):
- **Simple diffusion**: Small, nonpolar molecules (O₂, CO₂)
- **Facilitated diffusion**: Channel proteins (ion channels, aquaporins) or carrier proteins (GLUT transporters)
- **Osmosis**: Water diffusion across a semipermeable membrane

**Active transport** (requires ATP):
- **Primary active transport**: ATP-driven pumps (Na⁺/K⁺ ATPase: 3 Na⁺ out, 2 K⁺ in)
- **Secondary active transport**: Uses the electrochemical gradient established by primary transport
  - Symport (co-transport): Both move same direction
  - Antiport (counter-transport): Move opposite directions

### Membrane Potential
The inside of cells is negative relative to the outside (-70 mV in neurons). Maintained by the Na⁺/K⁺ pump and selective permeability.`,
    orderIndex: 7,
  },
  {
    id: "lesson-cell-signaling",
    contentCategoryId: "bb-fc2-cc3",
    title: "Cell Signaling and Communication",
    body: `## Cell Signaling

### Types of Signaling
- **Autocrine**: Cell signals itself
- **Paracrine**: Signals nearby cells
- **Endocrine**: Signals via bloodstream (hormones)
- **Juxtacrine**: Direct cell-cell contact

### Signal Transduction Pathways

**Receptors**:
1. **G protein-coupled receptors (GPCRs)**: 7-transmembrane domain; activate G proteins (α, β, γ subunits) → second messengers
2. **Receptor tyrosine kinases (RTKs)**: Ligand binding causes dimerization and autophosphorylation → activates Ras-MAPK pathway
3. **Ion channel receptors**: Ligand-gated ion channels (e.g., nicotinic acetylcholine receptor)
4. **Intracellular receptors**: Steroid hormone receptors; hormone crosses membrane, binds receptor in cytoplasm/nucleus, acts as transcription factor

**Second Messengers**:
- **cAMP**: Produced by adenylyl cyclase; activates PKA
- **IP₃**: Releases Ca²⁺ from ER
- **DAG**: Activates PKC
- **Ca²⁺**: Binds calmodulin, activates various targets

### Important Signaling Pathways
- **Ras-MAPK**: Growth factor signaling; Ras is a small G protein; mutations in Ras are common in cancer
- **JAK-STAT**: Cytokine signaling
- **Wnt**: Development and stem cell maintenance
- **Notch**: Cell fate determination (direct cell-cell contact)

### Signal Amplification
A single ligand-receptor interaction can activate multiple G proteins, each activating multiple adenylyl cyclase molecules, each producing many cAMP molecules. This cascade amplifies the signal enormously.`,
    orderIndex: 8,
  },
  {
    id: "lesson-immune-system",
    contentCategoryId: "bb-fc2-cc7",
    title: "Immune System Overview",
    body: `## Immune System

### Innate Immunity (Non-specific)
First line of defense, rapid response, no memory.

- **Physical barriers**: Skin, mucous membranes
- **Chemical defenses**: Lysozyme, gastric acid, antimicrobial peptides
- **Cellular components**:
  - **Neutrophils**: Most abundant; phagocytosis
  - **Macrophages**: Phagocytosis, antigen presentation
  - **Dendritic cells**: Professional antigen-presenting cells
  - **Natural killer (NK) cells**: Kill virus-infected and tumor cells
  - **Mast cells**: Release histamine in allergic responses
- **Complement system**: Cascade of proteins that opsonize and lyse pathogens

### Adaptive Immunity (Specific)
Slower initial response, but highly specific with immunological memory.

**Humoral immunity** (B cells):
- B cells mature in bone marrow
- Each B cell has a unique B-cell receptor (antibody)
- Activation: Antigen binding + T-helper cell help
- Differentiate into plasma cells (secrete antibodies) and memory B cells
- Antibody classes: IgG (most abundant, crosses placenta), IgM (first response), IgA (mucosal), IgE (allergy), IgD (B-cell receptor)

**Cell-mediated immunity** (T cells):
- T cells mature in thymus
- **T-helper cells (CD4⁺)**: Activate B cells and macrophages; recognized by HIV
- **Cytotoxic T cells (CD8⁺)**: Kill infected cells
- **Regulatory T cells (Treg)**: Suppress immune responses

### Key Concepts
- **Major Histocompatibility Complex (MHC)**: Class I (all nucleated cells) present endogenous antigens; Class II (APCs) present exogenous antigens
- **Clonal selection**: Antigen activates specific lymphocyte clone → proliferation
- **Immunological memory**: Memory B and T cells enable faster secondary response`,
    orderIndex: 9,
  },
  {
    id: "lesson-endocrine",
    contentCategoryId: "bb-fc2-cc5",
    title: "Endocrine System: Hormones and Regulation",
    body: `## Endocrine System

Hormones are chemical messengers secreted into the blood by endocrine glands.

### Hormone Classification

**Peptide hormones**: Water-soluble, cannot cross membrane, bind surface receptors (GPCRs or RTKs). Examples: insulin, glucagon, ACTH, growth hormone.

**Steroid hormones**: Lipid-soluble, derived from cholesterol, cross membrane, bind intracellular receptors. Examples: cortisol, aldosterone, estrogen, testosterone, thyroid hormones (T₃, T₄ — amine-derived but act like steroids).

### Major Endocrine Glands

**Hypothalamus-Pituitary Axis**:
- Hypothalamus releases releasing/inhibiting hormones into the hypothalamic-hypophyseal portal system
- **Anterior pituitary** (adenohypophysis): Produces GH, TSH, ACTH, FSH, LH, prolactin, MSH
- **Posterior pituitary** (neurohypophysis): Stores and releases oxytocin and ADH (produced in hypothalamus)

**Thyroid**: T₃/T₄ (metabolism), calcitonin (lowers blood Ca²⁺)
**Parathyroid**: PTH (raises blood Ca²⁺)
**Adrenal medulla**: Epinephrine, norepinephrine (fight or flight)
**Adrenal cortex**: Cortisol (stress, metabolism), aldosterone (Na⁺/K⁺ balance), androgens
**Pancreas**: Insulin (lowers blood glucose), glucagon (raises blood glucose)
**Gonads**: Testosterone, estrogen, progesterone

### Feedback Regulation

- **Negative feedback**: Most common. Output inhibits further release (e.g., T₃/T₄ inhibit TRH and TSH)
- **Positive feedback**: Output amplifies the signal (e.g., oxytocin during childbirth, LH surge before ovulation)

### Diabetes Mellitus
- **Type 1**: Autoimmune destruction of pancreatic β-cells; no insulin; treated with insulin
- **Type 2**: Insulin resistance; relative insulin deficiency; treated with lifestyle, oral medications, sometimes insulin`,
    orderIndex: 10,
  },
];
