import type { Lesson } from "../../types/lesson";

export const CHEM_PHYS_LESSONS: Lesson[] = [
  {
    id: "lesson-cp-motion",
    contentCategoryId: "cp-fc1-cc1",
    title: "Translational Motion, Forces, Work, Energy, and Equilibrium",
    body: `## Translational Motion and Kinematics

Kinematics describes motion without regard to its causes. Displacement (Δx), velocity (v), and acceleration (a) are vector quantities. The four kinematic equations for constant acceleration are: v = v₀ + at, Δx = v₀t + ½at², v² = v₀² + 2aΔx, and Δx = ½(v + v₀)t. Projectile motion follows a parabolic trajectory under constant gravitational acceleration (g = 9.8 m/s²), with independent horizontal (v_x constant) and vertical (v_y changing) components.

### Newton's Laws and Forces

Newton's three laws form the foundation of classical mechanics. The first law states an object at rest or in uniform motion remains so unless acted upon by a net external force. The second law gives F_net = ma. The third law states every action has an equal and opposite reaction. Common forces include gravity (F_g = mg), normal force, friction (f ≤ μN, with μ_k < μ_s), tension, and spring force (F_s = -kx).

### Work, Energy, and Power

Work is the transfer of energy: W = F·d·cosθ. Kinetic energy is KE = ½mv², and gravitational potential energy is PE = mgh. The work-energy theorem states W_net = ΔKE. Conservative forces (gravity, springs) have path-independent work and defined potential energies; nonconservative forces (friction) dissipate energy. Power is the rate of work: P = W/t = F·v.

### Equilibrium

An object is in translational equilibrium when ΣF = 0 (static or dynamic). For rotational equilibrium, Στ = 0. Torque is τ = r×F = rFsinθ. Center of mass moves as if all mass and external forces are concentrated there.

### Key Formulas

- v = v₀ + at ; Δx = v₀t + ½at² ; v² = v₀² + 2aΔx
- F_net = ma ; F_g = mg ; f_s ≤ μ_sN ; f_k = μ_kN ; F_s = -kx
- W = Fd cosθ ; KE = ½mv² ; PE = mgh ; PE_spring = ½kx²
- P = W/t = Fv ; τ = rF sinθ

### Common Tested Applications

MCAT questions often combine kinematics with force analysis: a box sliding down an inclined plane (resolve gravity into mg sinθ and mg cosθ, account for friction). Projectile problems require separating initial velocity into v₀cosθ and v₀sinθ. Conservation of energy problems simplify calculations: the speed of an object falling from height h is v = √(2gh) regardless of path. Work-energy theorem questions treat net work as change in kinetic energy.`,
    orderIndex: 0,
  },
  {
    id: "lesson-cp-gas-fluid",
    contentCategoryId: "cp-fc1-cc2",
    title: "Gas Phase and Fluid Dynamics",
    body: `## Gas Phase

Gases are described by the ideal gas law: PV = nRT, where R = 0.0821 L·atm/mol·K. Standard temperature and pressure (STP) is 0°C and 1 atm, at which one mole of ideal gas occupies 22.4 L. The kinetic molecular theory explains gas behavior: gas particles are in constant random motion, collisions are elastic, average KE is proportional to absolute temperature (KE_avg = (3/2)RT per mole), and particles have negligible volume and no intermolecular forces.

### Gas Laws

Boyle's law: P₁V₁ = P₂V₂ (constant n, T). Charles's law: V₁/T₁ = V₂/T₂ (constant n, P). Gay-Lussac's law: P₁/T₁ = P₂/T₂ (constant n, V). Avogadro's law: V₁/n₁ = V₂/n₂ (constant P, T). Dalton's law of partial pressures: P_total = ΣP_i, where P_i = X_iP_total (X_i = mole fraction). Graham's law of effusion: rate₁/rate₂ = √(M₂/M₁).

### Real Gases

Real gases deviate from ideality at high pressure and low temperature due to intermolecular forces and finite molecular volume. The van der Waals equation corrects for these: (P + a(n/V)²)(V - nb) = nRT. Parameter a accounts for attractive forces; b accounts for molecular volume.

### Fluid Dynamics

Fluids at rest follow Pascal's principle: pressure applied to an enclosed fluid is transmitted undiminished (hydraulic lifts: F₁/A₁ = F₂/A₂). Hydrostatic pressure: P = P₀ + ρgh. Buoyant force equals the weight of displaced fluid (Archimedes' principle: F_b = ρ_fluid V_displaced g).

### Fluid Flow

The continuity equation (A₁v₁ = A₂v₂) expresses conservation of mass for incompressible fluids. Bernoulli's equation (P + ½ρv² + ρgh = constant) expresses conservation of energy. Applications include wing lift (faster air above = lower pressure) and Venturi tubes. Viscosity introduces resistance; Poiseuille's law describes laminar flow through a tube: Q = (πr⁴ΔP)/(8ηL).

### Key Formulas

- PV = nRT ; P₁V₁/T₁ = P₂V₂/T₂
- P_total = ΣP_i ; rate₁/rate₂ = √(M₂/M₁)
- P = P₀ + ρgh ; F_b = ρ_fluid V_displaced g
- A₁v₁ = A₂v₂ ; P + ½ρv² + ρgh = constant
- Q = (πr⁴ΔP)/(8ηL)

### Common Tested Applications

MCAT physics questions pair Boyle's or Charles's law with respiratory physiology (inhalation decreases pressure, air flows in). Buoyancy problems test whether an object floats or sinks based on density comparison. Bernoulli's principle explains blood flow in stenotic vessels (narrowing increases velocity, decreases pressure). The continuity equation predicts velocity changes in vascular branching — total cross-sectional area increases in capillaries, slowing blood flow for exchange.`,
    orderIndex: 1,
  },
  {
    id: "lesson-cp-electrochemistry",
    contentCategoryId: "cp-fc1-cc3",
    title: "Electrochemistry and Electrical Circuits",
    body: `## Electrochemistry

Electrochemistry involves redox reactions where electrons are transferred. Oxidation is loss of electrons (oxidation number increases); reduction is gain of electrons (oxidation number decreases). Redox reactions can be split into half-reactions. The standard reduction potential (E°) measures tendency to gain electrons — more positive E° means stronger oxidizing agent.

### Galvanic (Voltaic) Cells

Galvanic cells convert chemical energy to electrical energy spontaneously (ΔG < 0, E°_cell > 0). The anode (oxidation) is negative; the cathode (reduction) is positive. Electrons flow from anode to cathode through an external circuit. A salt bridge maintains charge balance. Standard cell potential: E°_cell = E°_cathode - E°_anode.

### Electrolytic Cells

Electrolytic cells use electrical energy to drive nonspontaneous reactions (ΔG > 0, E°_cell < 0). Used in electroplating and electrolysis of water. Faraday's laws: the amount of substance produced is proportional to charge passed (Q = It, where 1 F = 96,485 C/mol e⁻).

### Nernst Equation

The Nernst equation relates cell potential to concentrations: E = E° - (RT/nF)lnQ. At 298 K, E = E° - (0.0592/n)logQ. When Q = K, E = 0 and the cell is at equilibrium.

### Electrical Circuits

Current (I = ΔQ/Δt) is the flow of charge. Ohm's law: V = IR. Resistance depends on material and geometry: R = ρL/A. Power dissipation: P = IV = I²R = V²/R.

### Circuit Analysis

Resistors in series: R_eq = R₁ + R₂ + ... (same current). Resistors in parallel: 1/R_eq = 1/R₁ + 1/R₂ + ... (same voltage). Kirchhoff's junction rule (ΣI_in = ΣI_out) and loop rule (ΣΔV = 0) solve complex circuits. Capacitors store charge: Q = CV. In series: 1/C_eq = Σ1/C_i. In parallel: C_eq = ΣC_i. Energy stored: U = ½CV².

### Key Formulas

- E°_cell = E°_cathode - E°_anode ; ΔG° = -nFE°_cell
- E = E° - (0.0592/n)logQ ; Q = It ; F = 96,485 C/mol
- V = IR ; P = IV = I²R = V²/R ; R = ρL/A
- Q = CV ; U = ½CV²

### Common Tested Applications

MCAT questions ask you to identify anode/cathode given reduction potentials and predict spontaneous direction. Nernst equation problems adjust cell potential for nonstandard conditions (e.g., concentration cells). Circuit questions often combine resistors in series and parallel — reduce stepwise. Capacitor questions pair Q = CV with dielectric insertion (C increases by factor κ, the dielectric constant).`,
    orderIndex: 2,
  },
  {
    id: "lesson-cp-atomic-bonding",
    contentCategoryId: "cp-fc1-cc4",
    title: "Atomic Structure and Chemical Bonding",
    body: `## Atomic Structure

Atoms consist of a nucleus (protons and neutrons) surrounded by electrons in orbitals. The Bohr model describes electrons in discrete energy levels; the quantum mechanical model uses orbitals described by four quantum numbers: n (principal, size/energy), l (azimuthal, shape: 0 = s, 1 = p, 2 = d, 3 = f), m_l (magnetic, orientation), and m_s (spin, ±½). The Aufbau principle, Pauli exclusion principle, and Hund's rule determine electron configurations.

### Periodic Trends

Atomic radius increases down a group and decreases across a period. Ionization energy (energy to remove an electron) decreases down a group and increases across a period. Electron affinity and electronegativity follow similar trends to ionization energy. Effective nuclear charge (Z_eff) increases across a period, pulling electrons closer.

### Chemical Bonding

Ionic bonds form between metals and nonmetals via electron transfer (NaCl). Covalent bonds form between nonmetals via electron sharing. Bond order (single, double, triple) correlates with bond length (decreases) and bond strength (increases). Electronegativity differences determine bond polarity: ΔEN > 1.7 is typically ionic, 0.4-1.7 is polar covalent, < 0.4 is nonpolar covalent.

### Molecular Geometry (VSEPR Theory)

VSEPR predicts molecular shape based on electron domains. Linear (2 domains, sp), trigonal planar (3, sp²), tetrahedral (4, sp³), trigonal bipyramidal (5, sp³d), octahedral (6, sp³d²). Lone pairs repel more strongly than bonding pairs, reducing bond angles (e.g., H₂O is bent ~104.5° rather than tetrahedral 109.5°).

### Hybridization and Molecular Orbitals

Atomic orbitals mix to form hybrid orbitals matching molecular geometry. sp³ (tetrahedral, 4 σ bonds), sp² (trigonal planar, 3 σ + 1 π), sp (linear, 2 σ + 2 π). Sigma bonds are end-on overlaps; pi bonds are side-on overlaps. Bonding molecular orbitals are lower energy (stabilizing); antibonding orbitals (*) are higher energy.

### Key Formulas

- Energy of a photon: E = hf = hc/λ (h = 6.626 × 10⁻³⁴ J·s)
- λ for electron transitions: 1/λ = R_H(1/n₁² - 1/n₂²)
- Electronegativity difference determines bond type

### Common Tested Applications

MCAT questions ask you to determine electron configuration (especially Cr and Cu exceptions), predict molecular shape and polarity, identify hybridization of atoms in organic molecules, and rank atoms by atomic radius or ionization energy. Bond polarity guides predictions about solubility and intermolecular forces.`,
    orderIndex: 3,
  },
  {
    id: "lesson-cp-reactions-stoichiometry",
    contentCategoryId: "cp-fc1-cc5",
    title: "Chemical Reactions and Stoichiometry",
    body: `## Chemical Equations and Balancing

Chemical equations represent reactions with reactants on the left and products on the right. Balancing ensures conservation of mass (same number of each atom on both sides). Coefficients represent mole ratios. The physical states are indicated: (s) solid, (l) liquid, (g) gas, (aq) aqueous.

### Reaction Types

**Synthesis**: A + B → AB. **Decomposition**: AB → A + B. **Single displacement**: A + BC → AC + B. **Double displacement**: AB + CD → AD + CB. **Combustion**: Hydrocarbon + O₂ → CO₂ + H₂O. **Redox**: Transfer of electrons between species. **Acid-base**: H⁺ transfer (proton donor + acceptor).

### Stoichiometry

Mole ratios from balanced equations allow conversion between amounts of reactants and products. The mole is 6.022 × 10²³ particles (Avogadro's number). Molar mass (g/mol) converts between mass and moles. Solution concentration: molarity (M = mol/L). Dilution: M₁V₁ = M₂V₂.

### Limiting Reactant and Percent Yield

The limiting reactant is completely consumed and determines the maximum amount of product. The theoretical yield is calculated from the limiting reactant. Actual yield is what is experimentally obtained. Percent yield = (actual/theoretical) × 100%. Excess reactant remains after the reaction.

### Empirical and Molecular Formulas

Empirical formula is the simplest whole-number ratio of atoms. Molecular formula is the actual number of atoms. Given percent composition, find moles of each element, divide by smallest to get ratios, then multiply to match molar mass.

### Oxidation Numbers

Oxidation numbers track electron distribution. Rules: elements in free state = 0, monatomic ions = charge, oxygen = -2 (except peroxides), hydrogen = +1 (except metal hydrides), sum = charge of species. Changes in oxidation numbers identify redox reactions.

### Key Formulas

- M = mol/L ; M₁V₁ = M₂V₂
- Percent yield = (actual/theoretical) × 100%
- mol = mass/molar mass = N/N_A
- Oxidation number rules for assigning oxidation states

### Common Tested Applications

MCAT questions require finding limiting reactant and calculating theoretical yield. Percent composition problems ask for empirical formula determination. Titration calculations use M₁V₁ = M₂V₂ (or M_a V_a = M_b V_b for acid-base). Redox identification involves tracking oxidation number changes. Dilution problems often appear in passage-based contexts involving solution preparation.`,
    orderIndex: 4,
  },
  {
    id: "lesson-cp-kinetics-equilibrium",
    contentCategoryId: "cp-fc1-cc6",
    title: "Chemical Kinetics and Equilibrium",
    body: `## Chemical Kinetics

Kinetics studies reaction rates. The rate of a reaction depends on reactant concentrations, temperature, and presence of catalysts. The rate law is: rate = k[A]^m[B]^n, where m and n are reaction orders determined experimentally (not from coefficients). Overall order = m + n + ...

### Reaction Orders

**Zero-order**: rate = k (constant, independent of concentration). Plot [A] vs t is linear. **First-order**: rate = k[A]. Plot ln[A] vs t is linear. Half-life t₁/₂ = 0.693/k (independent of [A]). **Second-order**: rate = k[A]². Plot 1/[A] vs t is linear. Half-life t₁/₂ = 1/(k[A]₀).

### Arrhenius Equation

Temperature dependence: k = Ae^(-Ea/RT). Taking ln: ln(k) = ln(A) - Ea/(RT). A plot of ln(k) vs 1/T gives slope = -Ea/R. Catalysts lower activation energy (Ea), increasing k without being consumed.

### Reaction Mechanisms

Elementary steps have molecularity: unimolecular (A → products), bimolecular (A + B → products), termolecular (rare). The rate-determining step is the slowest step. Intermediates appear in mechanism steps but not in the overall equation. The molecularity of the rate-determining step must match the experimental rate law.

### Chemical Equilibrium

At equilibrium, forward and reverse rates are equal. The equilibrium constant: K_eq = [products]^coefficients / [reactants]^coefficients. K >> 1 favors products; K << 1 favors reactants. K_p = K_c(RT)^Δn for gas-phase reactions.

### Le Châtelier's Principle

A system at equilibrium responds to stress by shifting to counteract the change. **Concentration**: Adding reactant shifts forward; adding product shifts reverse. **Temperature**: For exothermic (ΔH < 0), heat acts as a product — increasing T shifts reverse. **Pressure/Volume**: Increasing pressure (decreasing volume) shifts toward fewer gas moles. **Inert gas addition** at constant volume: no shift.

### Relationship Between K and ΔG

ΔG° = -RT ln(K). At equilibrium, ΔG = 0. If K > 1, ΔG° < 0 (spontaneous under standard conditions). If K < 1, ΔG° > 0.

### Key Formulas

- rate = k[A]^m[B]^n ; t₁/₂ (1st order) = 0.693/k
- ln(k) = ln(A) - Ea/(RT) ; ln[A] = -kt + ln[A]₀ (1st order)
- K_eq = [products]^coeff / [reactants]^coeff
- ΔG° = -RT ln(K) ; Q = same form as K at non-equilibrium conditions

### Common Tested Applications

MCAT kinetics questions provide concentration-time data to determine reaction order by analyzing which linear plot fits. Half-life problems are common for first-order reactions (radioactive decay, drug elimination). Le Châtelier questions ask the effect of changing conditions on equilibrium position. K vs Q comparisons determine direction of shift: if Q < K, forward; if Q > K, reverse.`,
    orderIndex: 5,
  },
  {
    id: "lesson-cp-acids-bases",
    contentCategoryId: "cp-fc1-cc7",
    title: "Acids and Bases",
    body: `## Acid-Base Theories

The Arrhenius definition: acids produce H⁺ in water; bases produce OH⁻. The Brønsted-Lowry definition: acids are proton (H⁺) donors; bases are proton acceptors. Every acid has a conjugate base (after losing H⁺); every base has a conjugate acid (after gaining H⁺). The Lewis definition: acids are electron-pair acceptors; bases are electron-pair donors.

### Strong vs Weak Acids and Bases

Strong acids (HCl, HBr, HI, HNO₃, H₂SO₄, HClO₄) and strong bases (NaOH, KOH, LiOH, Ba(OH)₂, Ca(OH)₂) dissociate completely. Weak acids and bases only partially dissociate, establishing equilibrium: HA ⇌ H⁺ + A⁻, with K_a = [H⁺][A⁻]/[HA]. The larger the K_a, the stronger the acid. pK_a = -log(K_a). For conjugate pairs: K_a × K_b = K_w = 1.0 × 10⁻¹⁴ at 25°C.

### pH and pOH

pH = -log[H⁺]; pOH = -log[OH⁻]; pH + pOH = 14 at 25°C. For strong acids: [H⁺] = initial concentration. For weak acids: use ICE table with K_a to find [H⁺]. The percent dissociation = ([H⁺]/[HA]₀) × 100%. As the acid is diluted, percent dissociation increases (Le Châtelier).

### Buffer Solutions

Buffers resist pH change, containing a weak acid and its conjugate base (or weak base and conjugate acid). The Henderson-Hasselbalch equation: pH = pK_a + log([A⁻]/[HA]). Optimal buffering occurs when pH ≈ pK_a ± 1, with maximum capacity when [A⁻] = [HA].

### Titrations

In acid-base titration, the equivalence point is where moles acid = moles base (n_a M_a V_a = n_b M_b V_b). The half-equivalence point has [HA] = [A⁻], so pH = pK_a. For strong acid-strong base, pH at equivalence = 7. For weak acid-strong base, pH > 7 (conjugate base hydrolyzes water). For strong acid-weak base, pH < 7. The endpoint is indicated by a color change in the indicator (pK_a of indicator ≈ pH at equivalence).

### Key Formulas

- pH = -log[H⁺] ; pOH = -log[OH⁻] ; pH + pOH = 14
- K_w = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ ; K_a × K_b = K_w
- pH = pK_a + log([A⁻]/[HA])
- n_a M_a V_a = n_b M_b V_b (at equivalence)

### Common Tested Applications

MCAT questions ask you to calculate pH of strong/weak acids using ICE tables, determine if a salt solution is acidic/basic/neutral based on hydrolysis of its ions, use the Henderson-Hasselbalch equation for buffer pH, identify the appropriate titration curve shape (strong-strong vs weak-strong), and choose the correct indicator. Polyprotic acid titrations have multiple equivalence points.`,
    orderIndex: 6,
  },
  {
    id: "lesson-cp-thermodynamics",
    contentCategoryId: "cp-fc1-cc8",
    title: "Thermodynamics and Thermochemistry",
    body: `## Thermodynamic Systems and State Functions

A system is the part of the universe under study. Open systems exchange matter and energy; closed systems exchange only energy; isolated systems exchange neither. State functions (P, V, T, U, H, S, G) depend only on current state, not the path taken. Path functions (W, q) depend on the process.

### First Law of Thermodynamics

Energy is conserved: ΔU = q + w. Internal energy (U) changes with heat (q) and work (w). For gases, w = -PΔV (pressure-volume work). Heat at constant volume: q_v = ΔU = nC_vΔT. Heat at constant pressure: q_p = ΔH = nC_pΔT. For an ideal gas: C_p - C_v = R.

### Enthalpy

Enthalpy (H = U + PV) is the heat content at constant pressure. ΔH_rxn = ΣH_products - ΣH_reactants. Standard enthalpy of formation (ΔH_f°) is the enthalpy change when one mole forms from elements in standard states. Hess's law: ΔH for a reaction is the sum of ΔH for individual steps. ΔH_rxn = ΣΔH_f°(products) - ΣΔH_f°(reactants).

### Calorimetry

q = mcΔT (m = mass, c = specific heat capacity). Bomb calorimetry (constant volume): q_v = C_calΔT = ΔU. Coffee-cup calorimetry (constant pressure): q_p = mcΔT = ΔH.

### Second Law and Entropy

The second law states ΔS_universe ≥ 0 for spontaneous processes. Entropy (S) is a measure of disorder. ΔS_rxn = ΣS°(products) - ΣS°(reactants). Entropy increases with temperature, volume, number of particles, and phase changes (s → l → g). Standard molar entropy (S°) = 0 for perfect crystals at 0 K (third law).

### Gibbs Free Energy

Gibbs free energy determines spontaneity at constant T and P: ΔG = ΔH - TΔS. ΔG < 0 (spontaneous, exergonic), ΔG > 0 (nonspontaneous, endergonic), ΔG = 0 (equilibrium). Standard state: ΔG° = ΔH° - TΔS°. ΔG° = -RT ln(K) = -nFE°. Temperature of spontaneity crossover: T = ΔH/ΔS.

### Key Formulas

- ΔU = q + w ; w = -PΔV ; H = U + PV
- q = mcΔT ; q = nCΔT
- ΔH_rxn = ΣΔH_f°(products) - ΣΔH_f°(reactants)
- ΔS_rxn = ΣS°(products) - ΣS°(reactants)
- ΔG = ΔH - TΔS ; ΔG° = -RT ln(K) = -nFE°

### Common Tested Applications

MCAT questions use Hess's law to find enthalpy changes for reactions with unavailable direct measurements. ΔG sign determination from ΔH and ΔS predicts spontaneity at various temperatures. Phase transition problems calculate heat required using q = mΔH_fus or q = mΔH_vap. Bond energy problems: ΔH = Σ(bonds broken) - Σ(bonds formed).`,
    orderIndex: 7,
  },
  {
    id: "lesson-cp-solutions",
    contentCategoryId: "cp-fc1-cc9",
    title: "Solutions and Solubility",
    body: `## Solution Formation and Concentration Units

Solutions are homogeneous mixtures of solute and solvent. Concentration units include molarity (M = mol/L), molality (m = mol/kg solvent), mole fraction (X = moles component/total moles), mass percent, and parts per million (ppm). Molality is temperature-independent because it uses mass rather than volume.

### Factors Affecting Solubility

**Like dissolves like**: Polar solvents dissolve polar solutes; nonpolar solvents dissolve nonpolar solutes. **Temperature**: Solubility of most solids increases with temperature; solubility of gases decreases with increasing temperature. **Pressure**: Henry's law states that gas solubility is proportional to partial pressure: C = k_H·P. **Intermolecular forces**: Hydrogen bonding, dipole-dipole, and ion-dipole interactions drive solvation.

### The Solution Process and Enthalpy

Dissolution involves three steps: (1) separating solute particles (endothermic, +ΔH), (2) separating solvent molecules (endothermic, +ΔH), (3) mixing solute and solvent (exothermic, -ΔH). ΔH_soln = ΔH₁ + ΔH₂ + ΔH₃. If ΔH_soln is large and positive, the substance is insoluble. Many dissolution processes are endothermic but driven by entropy increase.

### Colligative Properties

Colligative properties depend on the number of solute particles, not their identity. For nonelectrolytes, i = 1; for electrolytes, i ≈ number of ions produced (van't Hoff factor). Vapor pressure lowering (Raoult's law): P_soln = X_solvent·P°_solvent. Boiling point elevation: ΔT_b = i·K_b·m. Freezing point depression: ΔT_f = i·K_f·m. Osmotic pressure: π = i·MRT.

### Solubility Equilibria

For sparingly soluble salts: A_xB_y(s) ⇌ xA^y⁺ + yB^x⁻. The solubility product constant: K_sp = [A^y⁺]^x[B^x⁻]^y. Molar solubility (s) relates to K_sp. For AB: K_sp = s². For A₂B: K_sp = 4s³. The common ion effect reduces solubility of a salt when a common ion is already present.

### Key Formulas

- M = mol/L ; m = mol/kg ; X_A = n_A/n_total
- C = k_H·P (Henry's law)
- P_soln = X_solvent·P°_solvent ; ΔT_b = i·K_b·m ; ΔT_f = i·K_f·m ; π = i·MRT
- K_sp = [A^y⁺]^x[B^x⁻]^y

### Common Tested Applications

MCAT questions ask you to calculate osmotic pressure (important in kidney physiology and IV fluid design), determine boiling point elevation for electrolyte solutions (remembering the van't Hoff factor), compare solubility based on K_sp values, and use the common ion effect qualitatively. Raoult's law problems often appear with volatile solute/solvent mixtures.`,
    orderIndex: 8,
  },
  {
    id: "lesson-cp-separations-spectroscopy",
    contentCategoryId: "cp-fc1-cc10",
    title: "Separations and Spectroscopy",
    body: `## Chromatography

Chromatography separates mixture components based on differential partitioning between a stationary phase and a mobile phase. **Paper chromatography** uses paper (stationary) and solvent (mobile). **Thin-layer chromatography (TLC)** uses silica or alumina coated plates. The retention factor: R_f = distance traveled by compound / distance traveled by solvent front. **Column chromatography** separates larger quantities. **Gas chromatography (GC)** separates volatile compounds using a carrier gas and a heated column. **High-performance liquid chromatography (HPLC)** uses high-pressure liquid mobile phase.

### Separation Based on Polarity

Normal-phase chromatography uses polar stationary phase (silica) and nonpolar mobile phase — nonpolar compounds elute first. Reverse-phase chromatography uses nonpolar stationary phase (C18) and polar mobile phase — polar compounds elute first. In general, "like follows like" in normal phase: polar compounds stick to polar stationary phase and elute later.

### Electrophoresis

Electrophoresis separates charged molecules in an electric field. **SDS-PAGE** separates proteins by molecular weight (SDS denatures proteins and gives uniform negative charge). **Isoelectric focusing** separates by isoelectric point (pI). **Capillary electrophoresis** uses narrow capillaries for high-resolution separation.

### Distillation and Extraction

**Simple distillation** separates liquids with boiling point differences > 40°C. **Fractional distillation** uses a fractionating column for closer boiling points. **Extraction** separates compounds based on differential solubility between two immiscible solvents (typically aqueous and organic). Acid-base extraction exploits differences in acidity to separate organic compounds.

### UV-Vis Spectroscopy

UV-Vis spectroscopy measures absorption of ultraviolet and visible light (λ = 200-800 nm). The Beer-Lambert law: A = εbc (A = absorbance, ε = molar absorptivity, b = path length, c = concentration). Conjugated systems and aromatic rings absorb at longer wavelengths (lower energy). Absorbance is directly proportional to concentration.

### IR Spectroscopy

Infrared spectroscopy measures vibrational transitions. Functional groups have characteristic absorption frequencies: O-H (3200-3600 cm⁻¹, broad), N-H (3300-3500 cm⁻¹), C=O (1700-1750 cm⁻¹, strong), C-O (1000-1300 cm⁻¹), C≡N (2200-2260 cm⁻¹), C≡C (2100-2260 cm⁻¹). The fingerprint region (600-1400 cm⁻¹) is unique to each molecule.

### NMR Spectroscopy

Nuclear magnetic resonance (NMR) probes the magnetic environment of atomic nuclei (¹H and ¹³C). Chemical shift (δ, ppm) indicates electronic environment. Integration gives relative number of protons. Splitting patterns (n+1 rule) reveal neighboring protons: singlet (0 neighbors), doublet (1), triplet (2), quartet (3), multiplet (4+). Diastereotopic protons appear as distinct signals.

### Mass Spectrometry

Mass spectrometry measures mass-to-charge ratio (m/z) of ions. The molecular ion (M⁺) gives the molecular weight. Fragmentation patterns provide structural information. Base peak is the most abundant ion. Isotope peaks (M+1 from ¹³C, M+2 from ³⁷Cl/⁸¹Br) help identify elements.

### Key Formulas

- R_f = distance compound / distance solvent front
- A = εbc (Beer-Lambert law)
- Chemical shift referenced to TMS (0 ppm)

### Common Tested Applications

MCAT spectroscopy questions require matching IR spectra to functional groups present, identifying compounds from combined ¹H NMR (chemical shifts, integration, splitting) and molecular formula, and calculating concentration from UV-Vis absorbance using A = εbc. Chromatography questions ask which compound elutes first based on polarity and stationary/mobile phase choice.`,
    orderIndex: 9,
  },
  {
    id: "lesson-cp-organic-chemistry",
    contentCategoryId: "cp-fc1-cc11",
    title: "Hydrocarbons, Functional Groups, and Organic Reactions",
    body: `## Hydrocarbons

Alkanes have only C-C and C-H single bonds (sp³ hybridized). General formula: C_nH_2n+2. Nomenclature uses the -ane suffix. Alkanes undergo combustion and free radical halogenation (substitution). Alkenes contain C=C double bonds (sp², trigonal planar). Alkynes contain C≡C triple bonds (sp, linear). Geometric (cis/trans) isomerism occurs in alkenes when each double-bond carbon has two different substituents.

### Functional Groups

**Alcohols (R-OH)**: Polar, form hydrogen bonds, undergo oxidation to aldehydes/ketones/carboxylic acids. **Ethers (R-O-R')**: Relatively unreactive, good solvents. **Aldehydes (R-CHO)** and **Ketones (R-CO-R')**: Contain C=O (carbonyl); undergo nucleophilic addition. **Carboxylic acids (R-COOH)**: Acidic (pK_a ~ 5), undergo nucleophilic acyl substitution. **Esters (R-COOR')**: Formed from carboxylic acid + alcohol condensation. **Amides (R-CONR₂)**: Formed from carboxylic acid + amine; very stable. **Amines (R-NH₂, R₂NH, R₃N)**: Basic, nucleophilic. **Thiols (R-SH)**: Similar to alcohols but more nucleophilic; form disulfide bonds.

### Stereochemistry

Chiral carbons have four different substituents. Enantiomers are nonsuperimposable mirror images with identical physical properties (except optical rotation). Diastereomers are stereoisomers that are not mirror images with different physical properties. R/S notation assigns absolute configuration. Meso compounds have chiral centers but are achiral due to an internal plane of symmetry. Racemic mixtures contain equal amounts of both enantiomers.

### Substitution Reactions

**S_N1**: Unimolecular, two steps, carbocation intermediate, rate = k[RX], favors tertiary substrates, racemization at chiral centers, polar protic solvents. **S_N2**: Bimolecular, one step (concerted), rate = k[RX][Nu], favors primary substrates, inversion of configuration (Walden inversion), polar aprotic solvents, strong nucleophiles.

### Elimination Reactions

**E1**: Unimolecular, two steps, carbocation intermediate, rate = k[RX], favors tertiary substrates, yields more substituted alkene (Zaitsev product). **E2**: Bimolecular, one step (concerted), rate = k[RX][base], favors primary substrates, requires antiperiplanar arrangement, strong base required. Competition: strong base/nucleophile favors substitution; bulky base favors elimination.

### Addition Reactions to Alkenes

**Hydrogenation**: H₂ + metal catalyst (Pd/C, Pt) → alkane (syn addition). **Halogenation**: X₂ (Br₂, Cl₂) → vicinal dihalide (anti addition, forms halonium ion). **Hydrohalogenation**: HX → alkyl halide (Markovnikov: H adds to less substituted carbon). **Hydration**: H₂O + acid → alcohol (Markovnikov). **Oxymercuration**: Hg(OAc)₂/H₂O then NaBH₄ → alcohol (Markovnikov, no rearrangement). **Hydroboration**: BH₃ then H₂O₂/OH⁻ → alcohol (anti-Markovnikov, syn addition).

### Carbonyl Chemistry

Aldehydes are more reactive than ketones toward nucleophilic addition (less steric hindrance, more electrophilic carbonyl carbon). **Acetal formation**: Aldehyde/ketone + alcohol (2 eq) + acid → acetal. **Imine formation**: Aldehyde/ketone + primary amine → imine. **Enolate chemistry**: α-hydrogens are acidic; enolates act as nucleophiles in aldol condensation and alkylation.

### Aromatic Chemistry

Benzene (C₆H₆) is planar with 6 delocalized π electrons (Hückel's rule: 4n+2). Electrophilic aromatic substitution (EAS) includes nitration, halogenation, sulfonation, Friedel-Crafts alkylation, and Friedel-Crafts acylation. Activating groups (electron-donating: -OH, -NH₂, -OR, -alkyl) direct ortho/para. Deactivating groups (electron-withdrawing: -NO₂, -CN, -C=O, -COOH, -SO₃H) direct meta. Halogens are deactivating but ortho/para-directing.

### Key Formulas

- Degree of unsaturation = C - (H/2) + (N/2) + 1
- Markovnikov: H adds to the less substituted carbon of C=C
- Zaitsev rule: most substituted alkene is major product in elimination

### Common Tested Applications

MCAT organic chemistry questions ask you to predict major products of substitution vs elimination based on substrate, nucleophile/base, solvent, and temperature. Stereochemistry questions require identifying chiral centers, R/S configuration, and predicting whether a reaction inverts or racemizes. Spectroscopy identification problems combine IR, NMR, and molecular formula to deduce structure. Carbonyl reactivity trends explain why aldehydes are more reactive than ketones and esters.`,
    orderIndex: 10,
  },
];
