import React, { useState, useEffect } from 'react';

const STAGES = [
  {
    id: 'm1',
    hemisphere: 'mangal',
    num: 1,
    code: '01',
    title: 'Combinatorial Tensor Matrix',
    subtitle: '10 Archetypes × 10 Elements × 10 Operations × 10 Scales = 10,000 Inquiries',
    desc: 'Bypasses human functional fixedness by projecting the target macroscopic problem across a 4D orthogonal hyper-matrix (expandable to 100,000 vectors via 5D tensor).',
    input: 'Unstructured Problem Statement (e.g., "Arterial collagen crosslinking")',
    output: '10,000 High-Dimensional Diagnostic Coordinate Vectors',
    math: 'T = W ⊗ X ⊗ Y ⊗ Z (10 × 10 × 10 × 10 = 10,000 vectors)',
    cost: 'Cost: $0.00 (Local Python Vector Tensor)',
    color: '#a47bea',
    badge: '10k Vectors (W×X×Y×Z)'
  },
  {
    id: 'm2',
    hemisphere: 'mangal',
    num: 2,
    code: '02',
    title: '3-Gate Multi-Layer Sieve',
    subtitle: 'O(1) Heuristic Purge → Anomaly Scoring → Top-K Extraction',
    desc: 'Gate 1 pure-Python O(1) heuristic compatibility check prunes ~35% degenerate queries in 0.002s before Anomaly and Leverage scoring extract high-impact items.',
    input: '10,000 Raw Tensor Vectors',
    output: 'Top 20 High-Leverage Diagnostic Inquiries',
    math: 'Score = (0.55 × Anomaly) + (0.45 × Leverage)',
    cost: 'Latency: 0.002s ($0.00)',
    color: '#c499ff',
    badge: 'O(1) Purge → Anomaly'
  },
  {
    id: 'm3',
    hemisphere: 'mangal',
    num: 3,
    code: '03',
    title: 'Euclidean Vector Space Clusterer',
    subtitle: 'Deterministic TF-IDF & Cosine Similarity Paradigm Grouping',
    desc: 'Transforms micro-solutions into normalized TF-IDF term vectors and deterministically groups them into ~50 conceptual solution paradigms, eliminating LLM context-window hallucination.',
    input: 'Evaluated Micro-Solutions',
    output: '~50 Discrete Solution Paradigm Clusters',
    math: 'sim(u, v) = (u · v) / (||u||₂ · ||v||₂)',
    cost: 'Algorithm: TF-IDF Cosine ($0.00)',
    color: '#7e56c2',
    badge: 'TF-IDF Cosine Grouping'
  },
  {
    id: 'm4',
    hemisphere: 'mangal',
    num: 4,
    code: '04',
    title: 'Root-Cause Axiom Distiller',
    subtitle: 'Invariant Analysis Across All Simulated Universes',
    desc: 'Evaluates mathematical invariants across all ~50 simulated paradigm clusters to isolate the irreducible biological bottleneck that cannot be mutated.',
    input: '50 Clustered Solution Paradigms',
    output: 'Distilled Root-Cause Axiom Statement',
    math: 'Axiom = ⋂(Clusters) where Invariant(C) == True',
    cost: 'Type: Invariant Analysis ($0.00)',
    color: '#9383e2',
    badge: 'Invariant Distillation'
  },
  {
    id: 'm5',
    hemisphere: 'mangal',
    num: 5,
    code: '05',
    title: 'Axiomatic Challenge Protocol',
    subtitle: '4 Mutation Vectors: Invalidation | Expansion | Substitution | Symbiosis',
    desc: 'Attacks the distilled axiom via 4 orthogonal directions: Axiom Invalidation (de novo pocket), Dimensional Expansion (precursor), Constraint Substitution (PROTAC), and Symbiotic Synthesis (ECM turnover).',
    input: 'Distilled Root-Cause Axiom',
    output: '4 Formal Causal Hypotheses',
    math: 'H_target = { Invalidate(A), Expand(A, t), Substitute(A, R), Synthesize(A, P) }',
    cost: 'Mutation Vectors: 4 Dimensions',
    color: '#b388ff',
    badge: '4 Mutation Vectors'
  },
  {
    id: 'm6',
    hemisphere: 'mangal',
    num: 6,
    code: '06',
    title: 'Autonomous Causal Compiler',
    subtitle: 'Schema-Valid YAML Causal Dependency Tree Generation (chain_writer.py)',
    desc: 'Synthesizes the hypothesis tree into a 100% schema-validated hierarchical YAML tree consumed directly by the physical lab without human bottleneck.',
    input: 'Distilled Axiom + 4 Challenge Vectors',
    output: 'src/uid_engine/chains/{target}.yaml',
    math: 'chain_writer.py -> schema.validate(target.yaml)',
    cost: 'Handoff Latency: 0.002s (Zero Human)',
    color: '#d8b4fe',
    badge: 'Zero-Human YAML Schema'
  },
  {
    id: 'u7',
    hemisphere: 'uid',
    num: 7,
    code: '07',
    title: 'Epistemic Ingestion Vault',
    subtitle: '5-Source Biomedical Data Pipelines (PubMed, UniProt, KEGG, ChEMBL, AlphaFold)',
    desc: 'Ingests structured biological data with exponential backoff retry wrappers (entrez_retry.py) and typed graph extraction (GraphML).',
    input: 'Public Biomedical Databases (500+ Abstracts, Sequences, Structures)',
    output: 'Hydrated Epistemic Knowledge Graph (.graphml)',
    math: 'G = (V, E) with V ∈ {PROTEIN, CHEMICAL, PATHWAY}, E ∈ {CATALYZES, DEGRADES}',
    cost: 'Cost: ~$0.10 / target (Free APIs)',
    color: '#38bdf8',
    badge: '5 Data Sources'
  },
  {
    id: 'u8',
    hemisphere: 'uid',
    num: 8,
    code: '08',
    title: 'Negative Space Topological Detector',
    subtitle: 'O(1) Edge-Indexed Traversal Mapping Epistemic Voids',
    desc: 'Traverses compiled YAML requirements against graph edges in O(1) time, mapping missing biological enzymes and structural tools as CRITICAL voids.',
    input: 'Compiled YAML Chain + Knowledge Graph',
    output: 'Ranked Epistemic Gaps (Negative Space Set)',
    math: 'Gap(r) = True ⟺ ¬∃ v ∈ V, e ∈ E : Satisfies(v, e, r)',
    cost: 'Complexity: O(1) Edge-Indexed',
    color: '#0ea5e9',
    badge: 'O(1) Gap Traversal'
  },
  {
    id: 'u9',
    hemisphere: 'uid',
    num: 9,
    code: '09',
    title: '3D De Novo Spec Compiler',
    subtitle: 'RDKit ETKDGv3 ML + MMFF94 Energy Minimization',
    desc: 'Translates 1D topological SMILES strings into energy-minimized 3D Cartesian coordinates (.sdf) with explicit hydrogens for active-site pocket scaffolding.',
    input: 'Target Molecule SMILES (e.g. Glucosepane / Lipofuscin)',
    output: '3D Cartesian Pocket Coordinates (.sdf + JSON spec)',
    math: 'E_MMFF94(R) → min, ∇E = 0 with explicit Hydrogens',
    cost: 'Engine: RDKit ETKDGv3 (Local CPU)',
    color: '#06b6d4',
    badge: 'RDKit 3D Conformer'
  },
  {
    id: 'u10',
    hemisphere: 'uid',
    num: 10,
    code: '10',
    title: 'Generative Inference Orchestrator',
    subtitle: 'ProteinMPNN (Catalytic Triad Masking) + ESM-3 Adapter',
    desc: 'Generates de novo candidate amino acid sequences while locking reactive catalytic triad residues (Ser-His-Asp) in 3D Euclidean space to avoid non-functional hydrophobic mutations.',
    input: '3D Active-Site Coordinate Specs & Scaffolds',
    output: '24 De Novo Candidate Protein Sequences (.fasta)',
    math: 'P(Sequence | Structure, Mask(Triad)) via Autoregressive Transformer',
    cost: 'Framework: ESM-3 & ProteinMPNN',
    color: '#10b981',
    badge: 'Masked Inverse Folding'
  },
  {
    id: 'u11',
    hemisphere: 'uid',
    num: 11,
    code: '11',
    title: '4-Gate In Silico Biophysical QC',
    subtitle: 'pLDDT ≥ 80 | scRMSD ≤ 2.0 Å | Triad Exact Match | Kyte-Doolittle GRAVY ≤ 0.2',
    desc: 'Sequential biophysical quality screen eliminating insoluble candidates and ensuring structural foldability without amyloid aggregation traps.',
    input: '24 Raw De Novo Sequences',
    output: 'High-Confidence Validated Hits Ready for Wet-Lab Synthesis',
    math: 'Pass ⟺ pLDDT ≥ 80 ∧ scRMSD ≤ 2.0Å ∧ Triad=Match ∧ GRAVY ≤ 0.2',
    cost: 'Filters: 4 Sequential Gates',
    color: '#059669',
    badge: '4-Gate Biophysical QC'
  },
  {
    id: 'u12',
    hemisphere: 'uid',
    num: 12,
    code: '12',
    title: 'Epistemic Loop Closure',
    subtitle: 'Knowledge Graph Hypothesis Injection & State Transition',
    desc: 'Injects verified candidates into the knowledge graph (NodeType.PROTEIN, EvidenceStatus.HYPOTHESIZED) and downgrades the CRITICAL gap to CANDIDATE_PENDING_SYNTHESIS.',
    input: 'QC-Passed Validated Hit',
    output: 'Updated GraphML + Interactive Cytoscape.js Dark-Mode Visualizer',
    math: 'V ← V ∪ {Candidate}, E ← E ∪ {(Candidate, DEGRADES, Target)}, Gap.Priority ← LOW',
    cost: 'Status: Closed-Loop Discovery',
    color: '#34d399',
    badge: 'Closed-Loop Discovery'
  }
];

export default function ProjectMangalFlowchart() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-play pulse simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STAGES.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentStage = STAGES[activeStep];

  return (
    <div className="w-full my-8 p-4 sm:p-6 rounded-2xl bg-[#1c1f26] border border-[rgba(230,235,245,0.12)] shadow-2xl font-sans text-[#dce0e8]">
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[rgba(230,235,245,0.10)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a47bea] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#a47bea]"></span>
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#a47bea] font-semibold">
              Autonomous Discovery Compiler
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
            ⚡ Interactive Two-Hemisphere Cybernetic Pipeline
          </h3>
          <p className="text-xs text-[#9ba0ad] mt-0.5">
            Continuous Live Dataflow Simulation from Cognitive Interrogation to Generative Synthesis
          </p>
        </div>

        {/* Simulation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1.5 rounded-lg bg-[#282c35] hover:bg-[#343a46] border border-[rgba(230,235,245,0.12)] text-xs font-mono text-[#38bdf8] transition-all flex items-center gap-1.5 shadow-sm"
            title={isPlaying ? "Pause Pulse" : "Resume Pulse"}
          >
            <span>{isPlaying ? '⏸ Pause Pulse' : '▶ Resume Pulse'}</span>
          </button>
          <button
            onClick={() => {
              setActiveStep((prev) => (prev + 1) % STAGES.length);
              setIsPlaying(false);
            }}
            className="px-3 py-1.5 rounded-lg bg-[#7e56c2]/20 hover:bg-[#7e56c2]/30 border border-[#7e56c2]/40 text-xs font-mono text-[#c499ff] transition-all shadow-sm"
          >
            Step ⏭
          </button>
        </div>
      </div>

      {/* Main Two-Hemisphere Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 relative">
        {/* Hemisphere 1: Project Mangal (Cognitive Cortex) */}
        <div className="rounded-xl p-4 bg-[#242831]/80 border border-[#7e56c2]/40 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#7e56c2]/20">
            <div className="flex items-center gap-2">
              <span className="text-lg">🧠</span>
              <span className="font-bold text-sm text-white tracking-wide">
                PROJECT MANGAL (Cognitive Cortex)
              </span>
            </div>
            <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-[#7e56c2]/25 text-[#c499ff] border border-[#7e56c2]/40 font-semibold">
              Hypothesis Formulation
            </span>
          </div>

          <div className="space-y-2">
            {STAGES.slice(0, 6).map((stage, idx) => {
              const isCurrent = activeStep === idx;
              return (
                <div
                  key={stage.id}
                  onClick={() => {
                    setActiveStep(idx);
                    setIsPlaying(false);
                  }}
                  className={`p-3 rounded-lg border transition-all cursor-pointer relative ${
                    isCurrent
                      ? 'bg-[#7e56c2]/30 border-[#a47bea] shadow-[0_0_18px_rgba(164,123,234,0.45)] translate-x-1'
                      : 'bg-[#1e2129]/85 border-[rgba(230,235,245,0.08)] hover:border-[#7e56c2]/50 hover:bg-[#282c35]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`size-6 rounded-md flex items-center justify-center font-mono text-[11px] font-bold ${
                          isCurrent ? 'bg-[#a47bea] text-[#1e2129]' : 'bg-[#282c35] text-[#c499ff]'
                        }`}
                      >
                        {stage.code}
                      </span>
                      <span className="font-semibold text-xs sm:text-sm text-white">{stage.title}</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#c499ff] hidden sm:inline">{stage.badge}</span>
                  </div>
                  <p className="text-[11px] text-[#9ba0ad] mt-1 line-clamp-1">{stage.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hemisphere 2: UID Engine (Physical Laboratory) */}
        <div className="rounded-xl p-4 bg-[#242831]/80 border border-[#059669]/40 relative overflow-hidden shadow-lg">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#059669]/20">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔬</span>
              <span className="font-bold text-sm text-white tracking-wide">
                UID ENGINE (Physical Laboratory)
              </span>
            </div>
            <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-[#059669]/25 text-[#6ee7b7] border border-[#059669]/40 font-semibold">
              Generative In Silico Synthesis
            </span>
          </div>

          <div className="space-y-2">
            {STAGES.slice(6, 12).map((stage, idx) => {
              const actualIdx = idx + 6;
              const isCurrent = activeStep === actualIdx;
              return (
                <div
                  key={stage.id}
                  onClick={() => {
                    setActiveStep(actualIdx);
                    setIsPlaying(false);
                  }}
                  className={`p-3 rounded-lg border transition-all cursor-pointer relative ${
                    isCurrent
                      ? 'bg-[#059669]/25 border-[#34d399] shadow-[0_0_18px_rgba(52,211,153,0.45)] translate-x-1'
                      : 'bg-[#1e2129]/85 border-[rgba(230,235,245,0.08)] hover:border-[#059669]/50 hover:bg-[#282c35]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`size-6 rounded-md flex items-center justify-center font-mono text-[11px] font-bold ${
                          isCurrent ? 'bg-[#34d399] text-[#1e2129]' : 'bg-[#282c35] text-[#6ee7b7]'
                        }`}
                      >
                        {stage.code}
                      </span>
                      <span className="font-semibold text-xs sm:text-sm text-white">{stage.title}</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#34d399] hidden sm:inline">{stage.badge}</span>
                  </div>
                  <p className="text-[11px] text-[#9ba0ad] mt-1 line-clamp-1">{stage.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Zero-Human-Touch Cybernetic Handoff Banner */}
      <div className="my-4 p-3.5 rounded-xl bg-[#1e1b4b]/80 border border-dashed border-[#818cf8]/50 flex flex-wrap items-center justify-between gap-3 text-xs shadow-inner">
        <div className="flex items-center gap-2 text-[#c7d2fe]">
          <span className="font-bold">⚡ Zero-Human-Touch Handoff:</span>
          <span>Project Mangal autonomously serializes YAML causal chains to <code className="px-1.5 py-0.5 rounded bg-[#312e81] text-[#a5b4fc] font-mono text-[11px]">src/uid_engine/chains/</code></span>
        </div>
        <span className="font-mono text-[11px] bg-[#4338ca] text-white px-2.5 py-1 rounded-md font-semibold">
          Handoff Latency: 0.002s
        </span>
      </div>

      {/* Real-Time Module Inspector Card */}
      <div className="mt-4 p-4 sm:p-5 rounded-xl bg-[#242831] border border-[rgba(230,235,245,0.15)] shadow-inner">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[rgba(230,235,245,0.10)]">
          <div className="flex items-center gap-2.5">
            <span className="size-6 rounded-md bg-[#a47bea] text-[#1e2129] flex items-center justify-center font-mono text-xs font-bold">
              {currentStage.code}
            </span>
            <h4 className="font-bold text-white text-base sm:text-lg">
              {currentStage.title}
            </h4>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-emerald-400 font-semibold">{currentStage.cost}</span>
            <span className="text-[#a47bea] bg-[#7e56c2]/20 px-2.5 py-0.5 rounded border border-[#7e56c2]/30">
              {currentStage.hemisphere === 'mangal' ? '🧠 Mangal Cognitive Step' : '🔬 UID Physical Step'}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#dce0e8] leading-relaxed mb-4">
          {currentStage.desc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3 rounded-lg bg-[#1e2129] border border-[rgba(230,235,245,0.08)]">
            <span className="text-[10px] uppercase text-[#9ba0ad] block mb-1">📥 Input:</span>
            <span className="text-sky-300 text-[11px] leading-snug">{currentStage.input}</span>
          </div>

          <div className="p-3 rounded-lg bg-[#1e2129] border border-[rgba(230,235,245,0.08)]">
            <span className="text-[10px] uppercase text-[#9ba0ad] block mb-1">📤 Output:</span>
            <span className="text-emerald-300 text-[11px] leading-snug">{currentStage.output}</span>
          </div>

          <div className="p-3 rounded-lg bg-[#1e2129] border border-[rgba(230,235,245,0.08)]">
            <span className="text-[10px] uppercase text-[#9ba0ad] block mb-1">📐 Mathematical Rule:</span>
            <span className="text-purple-300 text-[11px] leading-snug break-words">{currentStage.math}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
