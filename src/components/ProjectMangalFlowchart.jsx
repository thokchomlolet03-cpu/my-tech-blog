import React, { useState, useEffect } from 'react';

const STAGES = [
  {
    id: 'm1',
    hemisphere: 'mangal',
    num: 1,
    title: 'Combinatorial Tensor Matrix',
    subtitle: '10 Archetypes × 10 Elements × 10 Operations × 10 Scales = 10,000 Inquiries',
    desc: 'Bypasses human functional fixedness by projecting the target problem across a 4D orthogonal hyper-matrix (expandable to 100,000 vectors via 5D tensor).',
    input: 'Unstructured Problem Statement (e.g., "Arterial collagen crosslinking")',
    output: '10,000 High-Dimensional Diagnostic Coordinate Vectors',
    math: 'T = W ⊗ X ⊗ Y ⊗ Z (10 × 10 × 10 × 10 = 10,000 vectors)',
    color: '#a47bea',
    badge: '10,000 Vectors'
  },
  {
    id: 'm2',
    hemisphere: 'mangal',
    num: 2,
    title: '3-Gate Multi-Layer Sieve',
    subtitle: 'O(1) Heuristic Purge → Anomaly Scoring → Top-K Extraction',
    desc: 'Eliminates 30-40% of logically incompatible vectors in 0.002s with zero LLM API cost. Scores remaining vectors by cognitive divergence and first-principle leverage.',
    input: '10,000 Coordinate Vectors',
    output: 'Top-20 High-Leverage Strategic Inquiries',
    math: 'S = (0.55 × Anomaly) + (0.45 × Leverage)',
    color: '#c499ff',
    badge: 'O(1) Purge'
  },
  {
    id: 'm3',
    hemisphere: 'mangal',
    num: 3,
    title: 'Euclidean Vector Space Clusterer',
    subtitle: 'Deterministic TF-IDF & Cosine Similarity Paradigm Grouping',
    desc: 'Embeds generated micro-solutions into Euclidean vector space and clusters them mathematically, avoiding LLM context-window hallucination.',
    input: 'Evaluated Perspective Answers',
    output: '~50 Discrete Conceptual Paradigm Clusters',
    math: 'sim(u, v) = (u · v) / (||u||₂ · ||v||₂)',
    color: '#7e56c2',
    badge: 'TF-IDF Cosine'
  },
  {
    id: 'm4',
    hemisphere: 'mangal',
    num: 4,
    title: 'Root-Cause Axiom Distiller',
    subtitle: 'Invariant Analysis Across All Simulated Universes',
    desc: 'Identifies the structural invariant that remains true across all paradigm clusters, isolating the irreducible causal bottleneck.',
    input: '50 Clustered Solution Paradigms',
    output: 'Distilled Root-Cause Axiom (e.g., "Lack of catalytic cleavage for imidazole crosslink")',
    math: 'Axiom = ⋂(Paradigms) s.t. ∀C ∈ Clusters, Invariant(C) = True',
    color: '#9383e2',
    badge: 'Invariant Analysis'
  },
  {
    id: 'm5',
    hemisphere: 'mangal',
    num: 5,
    title: 'Axiomatic Challenge Protocol',
    subtitle: '4 Mutation Vectors: Invalidation | Expansion | Substitution | Symbiosis',
    desc: 'Systematically mutates the distilled Axiom to formulate radical de novo therapeutic hypotheses across 4 orthogonal dimensions.',
    input: 'Distilled Root-Cause Axiom',
    output: '4 Formal Causal Hypotheses (De novo hydrolase, dicarbonyl scavenger, PROTAC, ECM turnover)',
    math: 'H_target = { Inv(A), Exp(A, t), Sub(A, R), Sym(A, P) }',
    color: '#b388ff',
    badge: '4 Mutation Vectors'
  },
  {
    id: 'm6',
    hemisphere: 'mangal',
    num: 6,
    title: 'Autonomous Causal Chain Compiler',
    subtitle: 'Schema-Valid YAML Causal Dependency Tree Synthesis (chain_writer.py)',
    desc: 'Compiles the hypotheses into a schema-validated hierarchical YAML tree consumed directly by the physical lab without human intervention.',
    input: '4 Causal Hypotheses & Requirement Nodes',
    output: 'src/uid_engine/chains/{target}.yaml',
    math: 'Tree(Root) → [Nodes: req:selective_catalyst → req:catalytic_pocket → req:protein_scaffold]',
    color: '#d8b4fe',
    badge: 'YAML Compiler'
  },
  {
    id: 'u7',
    hemisphere: 'uid',
    num: 7,
    title: 'Epistemic Ingestion Vault',
    subtitle: '5-Source Open Biomedical Data Pipelines (PubMed, UniProt, KEGG, ChEMBL, AlphaFold)',
    desc: 'Continuous multi-source ingestion with rate-limited exponential backoff retry wrappers and structured entity graph extraction.',
    input: 'Public Biomedical Databases (500+ Abstracts, Sequences, Structures)',
    output: 'Typed Epistemic Knowledge Graph (GraphML)',
    math: 'G = (V, E) with V ∈ {PROTEIN, CHEMICAL, PATHWAY}, E ∈ {CATALYZES, DEGRADES}',
    color: '#38bdf8',
    badge: '5 Data Sources'
  },
  {
    id: 'u8',
    hemisphere: 'uid',
    num: 8,
    title: 'Negative Space Topological Detector',
    subtitle: 'O(1) Edge-Indexed Traversal Mapping Epistemic Voids',
    desc: 'Traverses the compiled YAML causal tree against the knowledge graph using O(1) edge indices, flagging missing enzymes and uncharacterized structures.',
    input: 'Causal Chain YAML + Epistemic Graph',
    output: 'Ranked Epistemic Gaps (CRITICAL, HIGH, MEDIUM)',
    math: 'Gap(r) = True ⟺ ¬∃ v ∈ V, e ∈ E : Satisfies(v, e, r)',
    color: '#0ea5e9',
    badge: 'O(1) Gap Traversal'
  },
  {
    id: 'u9',
    hemisphere: 'uid',
    num: 9,
    title: '3D De Novo Spec Compiler',
    subtitle: 'RDKit ETKDGv3 Conformer Generation + MMFF94 Energy Minimization',
    desc: 'Bridges 1D SMILES strings to 3D Cartesian coordinates (x,y,z) required as active-site constraints by generative structural diffusion models.',
    input: 'Target Molecule SMILES (e.g. Glucosepane / Lipofuscin)',
    output: 'Energy-Minimized 3D Cartesian Coordinate Spec (.sdf + JSON)',
    math: 'E_MMFF94(R) → min, ∇E = 0 with explicit Hydrogens',
    color: '#06b6d4',
    badge: 'RDKit 3D Conformer'
  },
  {
    id: 'u10',
    hemisphere: 'uid',
    num: 10,
    title: 'Generative Inference Orchestrator',
    subtitle: 'ProteinMPNN (Catalytic Triad Masking) + ESM-3 Adapter',
    desc: 'Generates de novo candidate amino acid sequences while locking reactive catalytic triad residues (Ser-His-Asp) in 3D Euclidean space.',
    input: '3D Active-Site Spec & Structural Scaffolds',
    output: '24 De Novo Candidate Protein Sequences (.fasta)',
    math: 'P(Sequence | Structure, Mask(Triad)) via Autoregressive Transformer',
    color: '#10b981',
    badge: 'Masked Inverse Folding'
  },
  {
    id: 'u11',
    hemisphere: 'uid',
    num: 11,
    title: '4-Gate In Silico Biophysical QC',
    subtitle: 'pLDDT ≥ 80 | scRMSD ≤ 2.0 Å | Triad Exact Match | Kyte-Doolittle GRAVY ≤ 0.2',
    desc: 'Multi-barrier biophysical filter eliminating insoluble candidates and ensuring structural foldability without amyloid aggregation traps.',
    input: '24 Raw Generated Candidates',
    output: 'High-Confidence Validated Hits Ready for Synthesis',
    math: 'Pass ⟺ pLDDT ≥ 80 ∧ scRMSD ≤ 2.0Å ∧ Triad=Match ∧ GRAVY ≤ 0.2 ∧ Instability ≤ 50',
    color: '#059669',
    badge: '4-Gate QC Screen'
  },
  {
    id: 'u12',
    hemisphere: 'uid',
    num: 12,
    title: 'Epistemic Loop Closure',
    subtitle: 'Knowledge Graph Hypothesis Injection & State Transition',
    desc: 'Injects verified candidates into the knowledge graph and downgrades the CRITICAL epistemic gap to CANDIDATE_PENDING_SYNTHESIS.',
    input: 'Validated De Novo Protein Hit',
    output: 'Updated GraphML + Interactive Cytoscape.js Dark-Mode Visualizer',
    math: 'V ← V ∪ {Candidate}, E ← E ∪ {(Candidate, DEGRADES, Target)}, Gap.Priority ← LOW',
    color: '#34d399',
    badge: 'Closed-Loop Discovery'
  }
];

export default function ProjectMangalFlowchart() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedStage, setSelectedStage] = useState(STAGES[0]);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-play pulse simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STAGES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentStage = STAGES[activeStep];

  return (
    <div className="w-full my-8 p-4 sm:p-6 rounded-xl bg-[#1c1f26] border border-[rgba(230,235,245,0.12)] shadow-2xl font-sans text-[#dce0e8]">
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[rgba(230,235,245,0.10)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a47bea] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#a47bea]"></span>
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#a47bea] font-semibold">
              Live Autonomous Pipeline Visualizer
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
            Two-Hemisphere Cybernetic Architecture
          </h3>
        </div>

        {/* Simulation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3 py-1.5 rounded bg-[#282c35] hover:bg-[#343a46] border border-[rgba(230,235,245,0.12)] text-xs font-mono text-white transition-all flex items-center gap-1.5"
            title={isPlaying ? "Pause Simulation" : "Resume Simulation"}
          >
            <span>{isPlaying ? '⏸ Pause' : '▶ Play'}</span>
          </button>
          <button
            onClick={() => {
              const next = (activeStep + 1) % STAGES.length;
              setActiveStep(next);
              setSelectedStage(STAGES[next]);
            }}
            className="px-3 py-1.5 rounded bg-[#7e56c2]/20 hover:bg-[#7e56c2]/30 border border-[#7e56c2]/40 text-xs font-mono text-[#c499ff] transition-all"
          >
            Step ⏭
          </button>
        </div>
      </div>

      {/* Interactive Architecture Flow Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        {/* Left Hemisphere: Project Mangal (Cognitive Prefrontal Cortex) */}
        <div className="rounded-lg p-4 bg-[#242831]/70 border border-[#7e56c2]/30 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#7e56c2]/20">
            <div className="flex items-center gap-2">
              <span className="text-lg">🧠</span>
              <span className="font-bold text-sm text-white tracking-wide">
                PROJECT MANGAL (LIGHT)
              </span>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#7e56c2]/20 text-[#c499ff] border border-[#7e56c2]/30">
              Cognitive Cortex
            </span>
          </div>

          <div className="space-y-2.5">
            {STAGES.slice(0, 6).map((stage, idx) => {
              const isCurrent = activeStep === idx;
              const isSelected = selectedStage.id === stage.id;
              return (
                <div
                  key={stage.id}
                  onClick={() => {
                    setActiveStep(idx);
                    setSelectedStage(stage);
                    setIsPlaying(false);
                  }}
                  className={`p-3 rounded-lg border transition-all cursor-pointer relative ${
                    isCurrent
                      ? 'bg-[#7e56c2]/25 border-[#a47bea] shadow-[0_0_15px_rgba(164,123,234,0.3)] translate-x-1'
                      : isSelected
                      ? 'bg-[#282c35] border-[#7e56c2]/60'
                      : 'bg-[#1e2129]/80 border-[rgba(230,235,245,0.08)] hover:border-[#7e56c2]/40 hover:bg-[#282c35]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`size-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                          isCurrent ? 'bg-[#a47bea] text-[#1e2129]' : 'bg-[#282c35] text-[#9ba0ad]'
                        }`}
                      >
                        {stage.num}
                      </span>
                      <span className="font-semibold text-xs text-white">{stage.title}</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#c499ff]">{stage.badge}</span>
                  </div>
                  <p className="text-[11px] text-[#9ba0ad] mt-1 line-clamp-1">{stage.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Hemisphere: UID Engine (Physical & Generative Laboratory) */}
        <div className="rounded-lg p-4 bg-[#242831]/70 border border-[#0ea5e9]/30 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#0ea5e9]/20">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔬</span>
              <span className="font-bold text-sm text-white tracking-wide">
                UNIVERSAL INVERSE DESIGN (UID)
              </span>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#0ea5e9]/20 text-[#38bdf8] border border-[#0ea5e9]/30">
              Physical Laboratory
            </span>
          </div>

          <div className="space-y-2.5">
            {STAGES.slice(6, 12).map((stage, idx) => {
              const actualIdx = idx + 6;
              const isCurrent = activeStep === actualIdx;
              const isSelected = selectedStage.id === stage.id;
              return (
                <div
                  key={stage.id}
                  onClick={() => {
                    setActiveStep(actualIdx);
                    setSelectedStage(stage);
                    setIsPlaying(false);
                  }}
                  className={`p-3 rounded-lg border transition-all cursor-pointer relative ${
                    isCurrent
                      ? 'bg-[#0ea5e9]/20 border-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.3)] translate-x-1'
                      : isSelected
                      ? 'bg-[#282c35] border-[#0ea5e9]/60'
                      : 'bg-[#1e2129]/80 border-[rgba(230,235,245,0.08)] hover:border-[#0ea5e9]/40 hover:bg-[#282c35]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`size-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                          isCurrent ? 'bg-[#38bdf8] text-[#1e2129]' : 'bg-[#282c35] text-[#9ba0ad]'
                        }`}
                      >
                        {stage.num}
                      </span>
                      <span className="font-semibold text-xs text-white">{stage.title}</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#38bdf8]">{stage.badge}</span>
                  </div>
                  <p className="text-[11px] text-[#9ba0ad] mt-1 line-clamp-1">{stage.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cybernetic Synapse Transition Banner */}
      <div className="my-4 p-3 rounded-lg bg-gradient-to-r from-[#7e56c2]/20 via-[#3b82f6]/20 to-[#10b981]/20 border border-[rgba(230,235,245,0.12)] flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[#a47bea] font-bold">MANGAL (Brain)</span>
          <span className="text-white animate-pulse">══════[ YAML Schema Handoff ]══════►</span>
          <span className="font-mono text-[#38bdf8] font-bold">UID ENGINE (Hands)</span>
        </div>
        <span className="font-mono text-[11px] text-emerald-400 font-semibold hidden sm:inline">
          ZERO HUMAN BOTTLENECK
        </span>
      </div>

      {/* Stage Detail Inspector Card */}
      <div className="mt-6 p-4 sm:p-5 rounded-lg bg-[#242831] border border-[rgba(230,235,245,0.15)] shadow-inner">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-3 border-b border-[rgba(230,235,245,0.10)]">
          <div className="flex items-center gap-2">
            <span className="size-6 rounded-full bg-[#a47bea] text-[#1e2129] flex items-center justify-center font-mono text-xs font-bold">
              {currentStage.num}
            </span>
            <h4 className="font-bold text-white text-sm sm:text-base">
              {currentStage.title}
            </h4>
          </div>
          <span className="font-mono text-xs text-[#a47bea] bg-[#7e56c2]/15 px-2.5 py-0.5 rounded border border-[#7e56c2]/30">
            {currentStage.hemisphere === 'mangal' ? '🧠 Mangal Cognitive Step' : '🔬 UID Physical Step'}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#dce0e8] leading-relaxed mb-4">
          {currentStage.desc}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-2.5 rounded bg-[#1e2129] border border-[rgba(230,235,245,0.08)]">
            <span className="text-[10px] uppercase text-[#9ba0ad] block mb-1">📥 Input:</span>
            <span className="text-sky-300 text-[11px]">{currentStage.input}</span>
          </div>

          <div className="p-2.5 rounded bg-[#1e2129] border border-[rgba(230,235,245,0.08)]">
            <span className="text-[10px] uppercase text-[#9ba0ad] block mb-1">📤 Output:</span>
            <span className="text-emerald-300 text-[11px]">{currentStage.output}</span>
          </div>

          <div className="p-2.5 rounded bg-[#1e2129] border border-[rgba(230,235,245,0.08)]">
            <span className="text-[10px] uppercase text-[#9ba0ad] block mb-1">📐 Mathematical Rule:</span>
            <span className="text-purple-300 text-[11px]">{currentStage.math}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
