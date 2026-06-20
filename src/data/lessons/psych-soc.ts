import type { Lesson } from "../../types/lesson";

export const PSYCH_SOC_LESSONS: Lesson[] = [
  {
    id: "lesson-ps-sensation",
    contentCategoryId: "ps-fc1-cc1",
    title: "Sensation, Perception, and Cognition",
    body: `## Sensation and Perception

Sensation is the process by which sensory receptors detect physical energy from the environment and convert it into neural signals (transduction). Perception is the active organization and interpretation of those signals by the brain. The distinction between bottom-up processing (building up from raw sensory data) and top-down processing (using prior knowledge and expectations) is fundamental.

### Key Concepts

- **Absolute threshold**: Minimum stimulus intensity detected 50% of the time
- **Difference threshold (just noticeable difference, JND)**: Weber's law — the change needed is proportional to the original stimulus
- **Signal detection theory**: Distinguishes sensitivity from response bias (hits, misses, false alarms, correct rejections)
- **Sensory adaptation**: Diminished sensitivity with constant stimulation
- **Perceptual constancies**: Size, shape, color constancy despite changing sensory input
- **Gestalt principles**: Proximity, similarity, closure, continuity, figure-ground

### High-Yield Terms

- **Transduction**: Conversion of physical energy to neural impulses
- **Bottom-up processing**: Data-driven, from parts to whole
- **Top-down processing**: Conceptually driven, from whole to parts
- **Selective attention**: Focusing on one stimulus while ignoring others (cocktail party effect)
- **Inattentional blindness**: Failure to notice unexpected stimuli when attention is elsewhere`,
    orderIndex: 0,
  },
  {
    id: "lesson-ps-learning",
    contentCategoryId: "ps-fc1-cc2",
    title: "Learning and Behavior",
    body: `## Learning Theories

Learning is a relatively permanent change in behavior or knowledge due to experience. Three major paradigms explain how learning occurs: classical conditioning, operant conditioning, and observational learning.

### Classical Conditioning (Pavlov)

A neutral stimulus (conditioned stimulus, CS) is paired with an unconditioned stimulus (US) that naturally elicits an unconditioned response (UR). After pairing, the CS alone elicits a conditioned response (CR).

- **Acquisition**: Initial learning of the CS-US association
- **Extinction**: CR diminishes when CS is presented without US
- **Spontaneous recovery**: Reappearance of the CR after a rest period
- **Generalization**: CR occurs to stimuli similar to the CS
- **Discrimination**: CR does not occur to dissimilar stimuli

### Operant Conditioning (Skinner)

Behavior is shaped by consequences. Reinforcement increases behavior; punishment decreases it.

- **Positive reinforcement**: Add a rewarding stimulus (e.g., praise)
- **Negative reinforcement**: Remove an aversive stimulus (e.g., stop alarm by buckling seatbelt)
- **Positive punishment**: Add an aversive stimulus (e.g., scolding)
- **Negative punishment (omission training)**: Remove a rewarding stimulus (e.g., take away phone)
- **Schedules of reinforcement**: Fixed ratio, variable ratio, fixed interval, variable interval
- **Shaping**: Reinforcing successive approximations to the target behavior

### Observational Learning (Bandura)

Learning by watching others (models). The Bobo doll experiment demonstrated that children imitate aggressive behavior. Requires attention, retention, reproduction, and motivation.

### High-Yield Terms

- **Conditioned stimulus (CS)**: Previously neutral stimulus that triggers a CR
- **Unconditioned stimulus (US)**: Naturally triggers a UR without training
- **Primary reinforcer**: Biologically valuable (food, water)
- **Secondary reinforcer**: Learned value (money, grades)
- **Latent learning**: Learning that occurs without reinforcement and is not demonstrated until later (Tolman's maze)
- **Learned helplessness**: Passive behavior after repeated aversive uncontrollable events (Seligman)`,
    orderIndex: 1,
  },
  {
    id: "lesson-ps-emotion",
    contentCategoryId: "ps-fc1-cc3",
    title: "Emotion, Stress, and Motivation",
    body: `## Emotion and Motivation

Emotions involve three components: physiological arousal, cognitive appraisal, and behavioral expression. Major theories of emotion differ on the sequence and necessity of these components.

### Theories of Emotion

- **James-Lange theory**: Physiological arousal precedes and causes the emotional experience ("we feel sorry because we cry")
- **Cannon-Bard theory**: Physiological arousal and emotional experience occur simultaneously and independently
- **Schachter-Singer two-factor theory**: Emotion results from physiological arousal plus cognitive interpretation of that arousal
- **Lazarus's cognitive appraisal theory**: Cognitive appraisal must occur before emotion

### Stress and Coping

Stress is the response to demands (stressors) that exceed one's coping ability.

- **General adaptation syndrome (Selye)**: Alarm → Resistance → Exhaustion
- **Primary appraisal**: Is this a threat or challenge?
- **Secondary appraisal**: Can I cope with it?
- **Problem-focused coping**: Addressing the stressor directly
- **Emotion-focused coping**: Managing emotional distress
- **Chronic stress**: Linked to cardiovascular disease, immunosuppression, hippocampal atrophy

### Motivation Theories

- **Drive reduction theory (Hull)**: Biological needs create drives; behavior aims to reduce drives (homeostasis)
- **Incentive theory**: External rewards motivate behavior
- **Maslow's hierarchy of needs**: Physiological → Safety → Love/Belonging → Esteem → Self-actualization
- **Self-determination theory**: Intrinsic motivation requires autonomy, competence, and relatedness
- **Yerkes-Dodson law**: Moderate arousal leads to optimal performance

### High-Yield Terms

- **Type A personality**: Competitive, time-urgent, hostile — higher coronary risk
- **Type B personality**: Relaxed, easygoing
- **Catharsis**: Emotional release through expression
- **Homeostasis**: Tendency to maintain a stable internal state`,
    orderIndex: 2,
  },
  {
    id: "lesson-ps-development",
    contentCategoryId: "ps-fc1-cc4",
    title: "Lifespan Development and Personality",
    body: `## Lifespan Development

Development is the pattern of growth and change across the lifespan, encompassing physical, cognitive, and social domains.

### Cognitive Development (Piaget)

Four stages of cognitive development:

- **Sensorimotor (0-2 years)**: Knowledge through senses and actions; object permanence
- **Preoperational (2-7 years)**: Symbolic thinking, egocentrism, lack of conservation
- **Concrete operational (7-11 years)**: Logical reasoning about concrete events; conservation achieved
- **Formal operational (12+ years)**: Abstract and hypothetical reasoning

### Moral Development (Kohlberg)

Three levels with two stages each:

- **Preconventional**: Obedience to avoid punishment; self-interest
- **Conventional**: Interpersonal norms; law and order
- **Postconventional**: Social contract; universal ethical principles

### Psychosocial Development (Erikson)

Eight stages across the lifespan, each with a crisis to resolve: trust vs mistrust (infancy), autonomy vs shame (toddler), initiative vs guilt (preschool), industry vs inferiority (elementary), identity vs role confusion (adolescence), intimacy vs isolation (young adult), generativity vs stagnation (middle adult), integrity vs despair (late adult).

### Personality Theories

- **Psychoanalytic (Freud)**: Id (pleasure principle), ego (reality principle), superego (morality); psychosexual stages
- **Humanistic (Maslow, Rogers)**: Self-actualization, unconditional positive regard, self-concept
- **Trait theory (Allport, Eysenck, Big Five)**: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism (OCEAN)
- **Social-cognitive (Bandura)**: Reciprocal determinism — behavior, environment, and cognition interact

### High-Yield Terms

- **Temperament**: Biologically based behavioral style, evident early in life
- **Attachment**: Strong emotional bond — secure, insecure-avoidant, insecure-anxious, disorganized (Ainsworth strange situation)
- **Zone of proximal development (Vygotsky)**: Skills just beyond reach that can be learned with guidance`,
    orderIndex: 3,
  },
  {
    id: "lesson-ps-biological-bases",
    contentCategoryId: "ps-fc1-cc5",
    title: "Biological Bases of Behavior",
    body: `## Biological Bases of Behavior

Behavior and mental processes arise from the activity of the nervous and endocrine systems. Understanding brain structures, neurotransmitter systems, and genetic influences is essential for the MCAT.

### Nervous System Organization

- **Central nervous system (CNS)**: Brain and spinal cord
- **Peripheral nervous system (PNS)**: Somatic (voluntary movement) and autonomic (involuntary)
- **Autonomic nervous system**: Sympathetic (fight-or-flight) and parasympathetic (rest-and-digest)

### Major Brain Structures

- **Medulla oblongata**: Breathing, heart rate, blood pressure
- **Pons**: Sleep, arousal, coordination of movement
- **Cerebellum**: Fine motor coordination, balance, procedural memory
- **Hypothalamus**: Homeostasis, hunger, thirst, temperature, drives, links to endocrine system
- **Thalamus**: Sensory relay station (except olfaction)
- **Amygdala**: Fear, aggression, emotional memory
- **Hippocampus**: Consolidation of long-term declarative memories
- **Basal ganglia**: Voluntary movement, habit learning (Parkinson disease involves substantia nigra degeneration)
- **Cerebral cortex**: Higher cognition — frontal (executive function), parietal (somatosensory), temporal (auditory, language), occipital (vision)

### Neurotransmitters

- **Acetylcholine**: Muscle contraction, memory (Alzheimer disease involves ACh depletion)
- **Dopamine**: Reward, movement, motivation (excess → schizophrenia; deficit → Parkinson disease)
- **Serotonin**: Mood, sleep, appetite (low → depression; SSRIs block reuptake)
- **Norepinephrine**: Arousal, alertness, fight-or-flight
- **GABA**: Main inhibitory transmitter (anxiety medications potentiate GABA)
- **Glutamate**: Main excitatory transmitter (excess → excitotoxicity)

### High-Yield Terms

- **Action potential**: All-or-none depolarization; Na⁺ in, K⁺ out
- **Synaptic transmission**: Vesicle release of neurotransmitter across the synaptic cleft
- **Reuptake**: Reabsorption of neurotransmitter by presynaptic neuron
- **Agonist vs antagonist**: Agonist enhances, antagonist blocks neurotransmitter effects
- **Neuroplasticity**: Brain's ability to reorganize throughout life`,
    orderIndex: 4,
  },
  {
    id: "lesson-ps-social-structure",
    contentCategoryId: "ps-fc2-cc1",
    title: "Social Structure, Institutions, and Stratification",
    body: `## Social Structure and Stratification

Social structure refers to the organized pattern of relationships and institutions that together compose society. Social stratification is the hierarchical arrangement of individuals based on wealth, power, and prestige.

### Key Sociological Concepts

- **Social institutions**: Family, education, religion, government, economy, healthcare — each fulfills essential societal functions
- **Bureaucracy (Weber)**: Hierarchical organization with clear rules, specialization, and impersonality; can lead to "iron cage" of rationality
- **Division of labor (Durkheim)**: Mechanistic solidarity (traditional, homogeneous) vs organic solidarity (modern, interdependent)

### Social Stratification Theories

- **Davis-Moore thesis**: Stratification is functional — some roles are more important and require greater rewards
- **Conflict theory (Marx)**: Stratification results from class conflict between the bourgeoisie (owners) and proletariat (workers); false consciousness vs class consciousness
- **Socioeconomic status (SES)**: Composite measure of income, education, and occupation
- **Social mobility**: Vertical (up/down), horizontal (same level), intergenerational, intragenerational
- **Intersectionality (Crenshaw)**: Overlapping systems of advantage and disadvantage based on race, class, gender, etc.

### Demographics and Population

- **Demographic transition model**: Stages from high birth/death rates to low birth/death rates with industrialization
- **Fertility measures**: Total fertility rate (TFR), replacement level (~2.1)
- **Migration**: Push factors (wars, famine) and pull factors (jobs, freedom)
- **Urbanization**: Shift from rural to urban areas; associated with both opportunity and social problems

### High-Yield Terms

- **Meritocracy**: System where advancement is based on ability and achievement
- **Caste system**: Ascribed, rigid social stratification (birth determines status)
- **Class system**: Achieved, more fluid stratification
- **Social reproduction**: Transmission of social inequality across generations
- **Poverty line**: Minimum income needed for basic necessities
- **Relative poverty**: Inability to meet average standard of living in a society`,
    orderIndex: 5,
  },
  {
    id: "lesson-ps-socialization",
    contentCategoryId: "ps-fc2-cc2",
    title: "Socialization, Groups, and Identity",
    body: `## Socialization and Groups

Socialization is the lifelong process through which individuals learn the norms, values, and behaviors appropriate to their society. Reference groups, social networks, and group dynamics shape identity and behavior.

### Socialization

- **Agents of socialization**: Family (primary agent), schools, peers, media, religion
- **Primary socialization**: Occurs in childhood; language, basic norms
- **Secondary socialization**: Later in life; learning new roles
- **Anticipatory socialization**: Adopting norms of a group one wants to join
- **Resocialization**: Discarding old norms and learning new ones (e.g., military boot camp, prison)
- **Total institution (Goffman)**: Sealed environment where residents are resocialized (prisons, mental hospitals)

### Groups and Group Processes

- **Primary groups**: Small, intimate, long-term (family, close friends)
- **Secondary groups**: Larger, task-focused, impersonal (coworkers, classmates)
- **Reference groups**: Groups used as standards for self-evaluation
- **In-group vs out-group**: "Us" vs "them"; in-group bias and out-group homogeneity
- **Group conformity (Asch)**: Individuals conform to group opinion even when clearly wrong
- **Groupthink**: Desire for consensus overrides critical reasoning (Janis)
- **Bystander effect**: Diffusion of responsibility reduces helping behavior

### Identity Formation

- **Looking-glass self (Cooley)**: Self-concept emerges from how we believe others perceive us
- **Role taking (Mead)**: I (self as subject) and Me (self as object); stages of self-development
- **Social identity theory**: Part of self-concept derives from group membership; we categorize, identify, and compare
- **Self-serving bias**: Attribute successes to self, failures to external factors

### High-Yield Terms

- **Role**: Expected behavior of a person in a given position
- **Role strain**: Difficulty meeting expectations of a single role
- **Role conflict**: Tension between expectations of multiple roles
- **Social facilitation**: Better performance on simple tasks with an audience
- **Social loafing**: Reduced effort when working in a group`,
    orderIndex: 6,
  },
  {
    id: "lesson-ps-culture",
    contentCategoryId: "ps-fc2-cc3",
    title: "Culture and Social Interaction",
    body: `## Culture and Social Interaction

Culture encompasses the shared beliefs, values, norms, practices, material objects, and symbols that define a group of people. Symbolic interactionism examines how meaning emerges through everyday social interactions.

### Elements of Culture

- **Values**: Abstract ideals about what is good (e.g., freedom, equality)
- **Norms**: Specific rules for behavior — folkways (informal, minor), mores (moral significance), laws (codified norms)
- **Sanctions**: Rewards (positive) or punishments (negative) for conforming or violating norms
- **Symbols**: Things that stand for something else (language, gestures, flags)
- **Language**: The Sapir-Whorf hypothesis — language shapes thought and perception
- **Cultural transmission**: Passing culture from one generation to the next

### Cultural Variation

- **Material culture**: Physical objects (tools, art, architecture, technology)
- **Nonmaterial culture**: Ideas, beliefs, values
- **Ethnocentrism**: Judging other cultures by one's own standards
- **Cultural relativism**: Understanding a culture on its own terms
- **Subculture**: Group with distinct norms within a larger culture
- **Counterculture**: Group that rejects dominant cultural values
- **Cultural assimilation**: Minority adopts dominant culture's patterns
- **Multiculturalism**: Coexistence of diverse cultures
- **Cultural diffusion**: Spread of cultural elements across societies

### Social Interaction

- **Dramaturgical approach (Goffman)**: Social interaction as theatrical performance — front stage vs back stage
- **Impression management**: Presenting oneself favorably to others
- **Ethnomethodology (Garfinkel)**: Study of the rules and assumptions underlying everyday interaction
- **Social construction of reality**: Shared meanings are created and maintained through social interaction (Thomas theorem: "If men define situations as real, they are real in their consequences")

### High-Yield Terms

- **Cultural universal**: Trait found in every culture (e.g., family, rituals)
- **Cultural hegemony (Gramsci)**: Dominant culture is imposed as the norm
- **Social exchange theory**: Interaction is based on cost-benefit analysis
- **Reciprocity norm**: Expectation to return favors`,
    orderIndex: 7,
  },
  {
    id: "lesson-ps-health-disparities",
    contentCategoryId: "ps-fc2-cc4",
    title: "Health Disparities and Health Care Systems",
    body: `## Health Disparities and Health Care

Health disparities are preventable differences in health outcomes across populations. The MCAT examines how social factors — race, ethnicity, SES, gender, geography — produce systematic differences in morbidity, mortality, and access to care.

### Social Determinants of Health

- **Socioeconomic status (SES)**: Strongest and most consistent predictor of health outcomes; lower SES linked to higher rates of chronic disease, infant mortality, and shorter life expectancy
- **Race and ethnicity**: Systemic racism and discrimination contribute to disparities (e.g., Black maternal mortality in the US)
- **Education**: Higher education levels associated with better health literacy and outcomes
- **Neighborhood and built environment**: Access to healthy food, parks, clean air varies by neighborhood
- **Health insurance and access**: Uninsured individuals delay care and have worse outcomes

### Health Care Systems

- **Biomedical model**: Focuses on biological causes of disease (reductionist)
- **Biopsychosocial model**: Integrates biological, psychological, and social factors (holistic)
- **Patient-centered care**: Treatment that respects patient preferences, needs, and values
- **Cultural competence**: Health care providers' ability to work effectively across cultures

### Health Belief Model

Individuals are more likely to take health action if they:
- Perceive they are susceptible to a condition
- Believe the condition has serious consequences
- Believe the action will reduce the threat
- Perceive few barriers to taking action

### High-Yield Terms

- **Epidemiology**: Study of disease distribution in populations
- **Incidence vs prevalence**: New cases vs total existing cases
- **Morbidity vs mortality**: Illness vs death
- **Social gradient in health**: Stepwise relationship between SES and health
- **Fundamental cause theory (Link and Phelan)**: SES is a fundamental cause of disease because it provides access to flexible resources
- **Stigma**: Negative label that affects health-seeking behavior and quality of care`,
    orderIndex: 8,
  },
  {
    id: "lesson-ps-disorders",
    contentCategoryId: "ps-fc3-cc1",
    title: "Psychological Disorders and Treatment",
    body: `## Psychological Disorders

A psychological disorder is a syndrome marked by clinically significant disturbance in cognition, emotion regulation, or behavior that reflects dysfunction in psychological processes. The DSM-5-TR provides diagnostic criteria.

### Major Disorder Categories

- **Anxiety disorders**: Generalized anxiety disorder, panic disorder, specific phobias, social anxiety disorder, agoraphobia. Key feature: excessive fear or anxiety. Treatment: CBT, SSRIs, benzodiazepines.
- **Obsessive-compulsive and related disorders**: OCD (obsessions and compulsions), body dysmorphic disorder, hoarding disorder.
- **Trauma and stressor-related disorders**: PTSD (re-experiencing, avoidance, negative cognitions, hyperarousal), acute stress disorder.
- **Depressive disorders**: Major depressive disorder (MDD) — at least 2 weeks of depressed mood or anhedonia plus four other symptoms. Persistent depressive disorder (dysthymia) — chronic, milder depression for at least 2 years.
- **Bipolar disorders**: Bipolar I (mania episodes), Bipolar II (hypomania and major depression). Mania: elevated mood, grandiosity, decreased need for sleep, pressured speech, risky behavior.
- **Schizophrenia spectrum**: Psychosis — delusions (fixed false beliefs), hallucinations (false perceptions, often auditory), disorganized speech, negative symptoms (flat affect, avolition, alogia, anhedonia, asociality). Dopamine hypothesis: excess dopamine in mesolimbic pathway.
- **Somatic symptom disorders**: Physical symptoms with no medical cause (conversion disorder, illness anxiety disorder, factitious disorder).
- **Personality disorders**: Enduring maladaptive patterns. Cluster A (odd/eccentric — paranoid, schizoid, schizotypal), Cluster B (dramatic/erratic — antisocial, borderline, histrionic, narcissistic), Cluster C (anxious/fearful — avoidant, dependent, obsessive-compulsive).

### Treatment Approaches

- **Psychodynamic therapy (Freud)**: Unconscious conflicts, defense mechanisms, free association, interpretation
- **Humanistic therapy (Rogers)**: Client-centered; unconditional positive regard, empathy, genuineness
- **Cognitive-behavioral therapy (CBT)**: Addresses maladaptive thoughts and behaviors; highly evidence-based
- **Biomedical therapies**: Medications (antidepressants, antipsychotics, mood stabilizers, anxiolytics), ECT (for severe depression), TMS
- **Electroconvulsive therapy (ECT)**: Most effective for severe, treatment-resistant depression

### High-Yield Terms

- **Diathesis-stress model**: Disorders arise from genetic vulnerability plus environmental stress
- **Defense mechanisms**: Repression, denial, projection, displacement, rationalization, reaction formation, regression, sublimation
- **Delusion vs hallucination**: False belief vs false sensory perception
- **Positive vs negative symptoms (schizophrenia)**: Positive = added (hallucinations, delusions); negative = absent (flat affect, avolition)`,
    orderIndex: 9,
  },
  {
    id: "lesson-ps-deviance",
    contentCategoryId: "ps-fc3-cc2",
    title: "Social Responses to Deviance and Health",
    body: `## Deviance and Social Control

Deviance is any behavior that violates social norms. Sociological theories examine how societies define, label, and respond to deviant behavior, including mental illness, substance use, and criminal behavior.

### Theories of Deviance

- **Strain theory (Merton)**: Deviance results from a gap between culturally valued goals (wealth, success) and institutionalized means to achieve them. Five adaptations: conformity, innovation, ritualism, retreatism, rebellion.
- **Labeling theory (Becker)**: Deviance is not intrinsic to an act but is a label applied by those in power; primary deviance (initial norm violation) → secondary deviance (acceptance of deviant label)
- **Social control theory (Hirschi)**: Strong social bonds (attachment, commitment, involvement, belief) prevent deviance
- **Differential association theory (Sutherland)**: Deviance is learned through interaction with others who engage in deviant behavior

### Medicalization of Deviance

The process by which nonmedical problems become defined and treated as medical conditions. Examples: alcoholism, substance use disorder, ADHD, obesity. Medicalization shifts responsibility from moral failing to disease, but can lead to overdiagnosis and overreliance on pharmaceutical treatment.

### Mental Illness and Stigma

- **Public stigma**: Negative attitudes held by the general public
- **Self-stigma**: Internalization of public stigma by affected individuals
- **Structural stigma**: Policies that disadvantage affected groups
- **Labeling and mental health**: Diagnostic labels can provide access to treatment but can also lead to self-fulfilling prophecies and discrimination

### High-Yield Terms

- **Stigma (Goffman)**: Deeply discrediting attribute that reduces a person from whole to tainted
- **Sick role (Parsons)**: Temporary exemption from normal roles; obligation to seek help
- **Iatrogenic illness**: Caused by medical treatment itself
- **Moral treatment**: 19th-century movement for humane treatment of mental illness (Pinel, Dix)
- **Deinstitutionalization**: Shift from long-term hospitalization to community-based care`,
    orderIndex: 10,
  },
  {
    id: "lesson-ps-research-design",
    contentCategoryId: "ps-fc4-cc1",
    title: "Research Design and Data Interpretation",
    body: `## Research Methods in Psychology and Sociology

The MCAT requires understanding how empirical research is designed, conducted, and interpreted. Different research designs answer different types of questions.

### Research Design Types

**Experimental designs**: Manipulate an independent variable (IV) to measure its effect on a dependent variable (DV). Random assignment establishes causality.

- **True experiment**: Random assignment, experimental and control groups, manipulation of IV
- **Quasi-experiment**: No random assignment; uses preexisting groups
- **Within-subjects design**: Same participants experience all conditions
- **Between-subjects design**: Different participants in each condition

**Non-experimental designs**:

- **Correlational study**: Measures relationship between variables; does not establish causation (directionality problem, third variable problem)
- **Case study**: In-depth analysis of a single individual or group
- **Naturalistic observation**: Observing behavior in natural settings without intervention
- **Survey**: Self-report data from a sample; susceptible to social desirability bias
- **Longitudinal study**: Same participants followed over time (controls cohort effects)
- **Cross-sectional study**: Different age groups compared at one point in time

### Validity and Reliability

- **Internal validity**: Confidence that the IV caused changes in the DV
- **External validity**: Generalizability to other settings, populations, times
- **Construct validity**: Whether the measure actually measures the intended concept
- **Reliability**: Consistency of measurement — test-retest, inter-rater, split-half

### Bias and Confounds

- **Confounding variable**: Extraneous variable that varies systematically with the IV
- **Demand characteristics**: Participants infer the hypothesis and change behavior
- **Experimenter bias**: Researcher expectations influence results (use double-blind procedures)
- **Hawthorne effect**: Behavior changes because participants know they are being observed
- **Selection bias**: Groups differ before the IV is introduced
- **Placebo effect**: Improvement due to expectation, not treatment

### Sampling

- **Random sample**: Every member of the population has equal chance of selection
- **Convenience sample**: Easily accessible participants (high bias)
- **Stratified sample**: Population divided into subgroups, then randomly sampled within each
- **Convenience vs snowball sampling**: Common in hard-to-reach populations

### High-Yield Terms

- **Operational definition**: Defining a variable in terms of how it is measured
- **Correlation coefficient (r)**: Ranges from -1 to +1; direction and strength
- **Confound**: Alternative explanation for results
- **Statistical significance (p < 0.05)**: Less than 5% probability that results are due to chance`,
    orderIndex: 11,
  },
  {
    id: "lesson-ps-statistics",
    contentCategoryId: "ps-fc4-cc2",
    title: "Statistical Reasoning and Data Analysis",
    body: `## Statistical Reasoning

Statistics are essential for interpreting research findings. Descriptive statistics summarize data; inferential statistics determine whether results are generalizable.

### Descriptive Statistics

**Central tendency**:
- **Mean**: Sum of values divided by N; sensitive to outliers
- **Median**: Middle value; robust to outliers
- **Mode**: Most frequent value

**Variability**:
- **Range**: Maximum minus minimum
- **Interquartile range (IQR)**: Q3 − Q1; robust to outliers
- **Variance**: Average of squared deviations from the mean
- **Standard deviation (SD)**: Square root of variance; in same units as original data

**Distributions**:
- **Normal distribution**: Bell-shaped; 68% within ±1 SD, 95% within ±2 SD, 99.7% within ±3 SD
- **Skew**: Positive (right) skew — tail to the right, mean > median; Negative (left) skew — tail to the left, mean < median
- **Kurtosis**: Tailedness of distribution

### Inferential Statistics

- **Null hypothesis (H₀)**: No effect or difference; the assumption to be tested
- **Alternative hypothesis (H₁)**: There is an effect or difference
- **p-value**: Probability of obtaining the observed result (or more extreme) if H₀ is true
- **Type I error (α)**: Rejecting a true null hypothesis (false positive)
- **Type II error (β)**: Failing to reject a false null hypothesis (false negative)
- **Statistical power**: 1 − β; probability of detecting a true effect (increases with sample size and effect size)

### Choosing a Statistical Test

- **t-test**: Compare means of two groups
- **ANOVA**: Compare means of three or more groups
- **Chi-square test**: Association between categorical variables
- **Pearson correlation (r)**: Linear relationship between two continuous variables
- **Regression**: Predicts a DV from one or more IVs

### Effect Size and Confidence Intervals

- **Cohen's d**: Standardized measure of effect size (0.2 = small, 0.5 = medium, 0.8 = large)
- **Confidence interval (CI)**: Range that likely contains the true population parameter (95% CI is most common)
- **Meta-analysis**: Statistical combination of results from multiple studies

### High-Yield Terms

- **Correlation vs causation**: Correlation does not imply causation
- **Regression to the mean**: Extreme values tend to be followed by values closer to the mean
- **Outlier**: Extreme value that can distort statistical results
- **Degrees of freedom**: Number of independent values in a statistical calculation
- **Standard error**: Standard deviation of the sampling distribution (SD / √n)`,
    orderIndex: 12,
  },
];
