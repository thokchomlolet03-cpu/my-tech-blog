import React, { useState, useEffect } from "react";

const STAGES = [
  {
    id: "m1",
    hemisphere: "mangal",
    num: 1,
    code: "01",
    title: "Combinatorial Tensor Matrix",
    subtitle:
      "10 Archetypes × 10 Elements × 10 Operations × 10 Scales = 10,000 Inquiries",
    desc: "Bypasses human functional fixedness by projecting the target macroscopic problem across a 4D orthogonal hyper-matrix (expandable to 100,000 vectors via 5D tensor).",
    input:
      'Unstructured Problem Statement (e.g., "Arterial collagen crosslinking")',
    output: "10,000 High-Dimensional Diagnostic Coordinate Vectors",
    math: "T = W ⊗ X ⊗ Y ⊗ Z (10 × 10 × 10 × 10 = 10,000 vectors)",
    cost: "Cost: $0.00 (Local Python Vector Tensor)",
    color: "#a47bea",
    badge: "10k Vectors (W×X×Y×Z)",
  },
  {
    id: "m2",
    hemisphere: "mangal",
    num: 2,
    code: "02",
    title: "3-Gate Multi-Layer Sieve",
    subtitle: "O(1) Heuristic Purge → Anomaly Scoring → Top-K Extraction",
    desc: "Gate 1 pure-Python O(1) heuristic compatibility check prunes ~35% degenerate queries in 0.002s before Anomaly and Leverage scoring extract high-impact items.",
    input: "10,000 Raw Tensor Vectors",
    output: "Top 20 High-Leverage Diagnostic Inquiries",
    math: "Score = (0.55 × Anomaly) + (0.45 × Leverage)",
    cost: "Latency: 0.002s ($0.00)",
    color: "#c499ff",
    badge: "O(1) Purge → Anomaly",
  },
  {
    id: "m3",
    hemisphere: "mangal",
    num: 3,
    code: "03",
    title: "Euclidean Vector Space Clusterer",
    subtitle: "Deterministic TF-IDF & Cosine Similarity Paradigm Grouping",
    desc: "Transforms micro-solutions into normalized TF-IDF term vectors and deterministically groups them into ~50 conceptual solution paradigms, eliminating LLM context-window hallucination.",
    input: "Evaluated Micro-Solutions",
    output: "~50 Discrete Solution Paradigm Clusters",
    math: "sim(u, v) = (u · v) / (||u||₂ · ||v||₂)",
    cost: "Algorithm: TF-IDF Cosine ($0.00)",
    color: "#7e56c2",
    badge: "TF-IDF Cosine Grouping",
  },
  {
    id: "m4",
    hemisphere: "mangal",
    num: 4,
    code: "04",
    title: "Root-Cause Axiom Distiller",
    subtitle: "Invariant Analysis Across All Simulated Universes",
    desc: "Evaluates mathematical invariants across all ~50 simulated paradigm clusters to isolate the irreducible biological bottleneck that cannot be mutated.",
    input: "50 Clustered Solution Paradigms",
    output: "Distilled Root-Cause Axiom Statement",
    math: "Axiom = ⋂(Clusters) where Invariant(C) == True",
    cost: "Type: Invariant Analysis ($0.00)",
    color: "#9383e2",
    badge: "Invariant Distillation",
  },
  {
    id: "m5",
    hemisphere: "mangal",
    num: 5,
    code: "05",
    title: "Axiomatic Challenge Protocol",
    subtitle:
      "4 Mutation Vectors: Invalidation | Expansion | Substitution | Symbiosis",
    desc: "Attacks the distilled axiom via 4 orthogonal directions: Axiom Invalidation (de novo pocket), Dimensional Expansion (precursor), Constraint Substitution (PROTAC), and Symbiotic Synthesis (ECM turnover).",
    input: "Distilled Root-Cause Axiom",
    output: "4 Formal Causal Hypotheses",
    math: "H_target = { Invalidate(A), Expand(A, t), Substitute(A, R), Synthesize(A, P) }",
    cost: "Mutation Vectors: 4 Dimensions",
    color: "#b388ff",
    badge: "4 Mutation Vectors",
  },
  {
    id: "m6",
    hemisphere: "mangal",
    num: 6,
    code: "06",
    title: "Autonomous Causal Compiler",
    subtitle:
      "Schema-Valid YAML Causal Dependency Tree Generation (chain_writer.py)",
    desc: "Synthesizes the hypothesis tree into a 100% schema-validated hierarchical YAML tree consumed directly by the physical lab without human bottleneck.",
    input: "Distilled Axiom + 4 Challenge Vectors",
    output: "src/uid_engine/chains/{target}.yaml",
    math: "chain_writer.py -> schema.validate(target.yaml)",
    cost: "Handoff Latency: 0.002s (Zero Human)",
    color: "#d8b4fe",
    badge: "Zero-Human YAML Schema",
  },
  {
    id: "u7",
    hemisphere: "uid",
    num: 7,
    code: "07",
    title: "Epistemic Ingestion Vault",
    subtitle:
      "5-Source Biomedical Data Pipelines (PubMed, UniProt, KEGG, ChEMBL, AlphaFold)",
    desc: "Ingests structured biological data with exponential backoff retry wrappers (entrez_retry.py) and typed graph extraction (GraphML).",
    input:
      "Public Biomedical Databases (500+ Abstracts, Sequences, Structures)",
    output: "Hydrated Epistemic Knowledge Graph (.graphml)",
    math: "G = (V, E) with V ∈ {PROTEIN, CHEMICAL, PATHWAY}, E ∈ {CATALYZES, DEGRADES}",
    cost: "Cost: ~$0.10 / target (Free APIs)",
    color: "#a47bea",
    badge: "5 Data Sources",
  },
  {
    id: "u8",
    hemisphere: "uid",
    num: 8,
    code: "08",
    title: "Negative Space Topological Detector",
    subtitle: "O(1) Edge-Indexed Traversal Mapping Epistemic Voids",
    desc: "Traverses compiled YAML requirements against graph edges in O(1) time, mapping missing biological enzymes and structural tools as CRITICAL voids.",
    input: "Compiled YAML Chain + Knowledge Graph",
    output: "Ranked Epistemic Gaps (Negative Space Set)",
    math: "Gap(r) = True ⟺ ¬∃ v ∈ V, e ∈ E : Satisfies(v, e, r)",
    cost: "Complexity: O(1) Edge-Indexed",
    color: "#9383e2",
    badge: "O(1) Gap Traversal",
  },
  {
    id: "u9",
    hemisphere: "uid",
    num: 9,
    code: "09",
    title: "3D De Novo Spec Compiler",
    subtitle: "RDKit ETKDGv3 ML + MMFF94 Energy Minimization",
    desc: "Translates 1D topological SMILES strings into energy-minimized 3D Cartesian coordinates (.sdf) with explicit hydrogens for active-site pocket scaffolding.",
    input: "Target Molecule SMILES (e.g. Glucosepane / Lipofuscin)",
    output: "3D Cartesian Pocket Coordinates (.sdf + JSON spec)",
    math: "E_MMFF94(R) → min, ∇E = 0 with explicit Hydrogens",
    cost: "Engine: RDKit ETKDGv3 (Local CPU)",
    color: "#a47bea",
    badge: "RDKit 3D Conformer",
  },
  {
    id: "u10",
    hemisphere: "uid",
    num: 10,
    code: "10",
    title: "Generative Inference Orchestrator",
    subtitle: "ProteinMPNN (Catalytic Triad Masking) + ESM-3 Adapter",
    desc: "Generates de novo candidate amino acid sequences while locking reactive catalytic triad residues (Ser-His-Asp) in 3D Euclidean space to avoid non-functional hydrophobic mutations.",
    input: "3D Active-Site Coordinate Specs & Scaffolds",
    output: "24 De Novo Candidate Protein Sequences (.fasta)",
    math: "P(Sequence | Structure, Mask(Triad)) via Autoregressive Transformer",
    cost: "Framework: ESM-3 & ProteinMPNN",
    color: "#7e56c2",
    badge: "Masked Inverse Folding",
  },
  {
    id: "u11",
    hemisphere: "uid",
    num: 11,
    code: "11",
    title: "4-Gate In Silico Biophysical QC",
    subtitle:
      "pLDDT ≥ 80 | scRMSD ≤ 2.0 Å | Triad Exact Match | Kyte-Doolittle GRAVY ≤ 0.2",
    desc: "Sequential biophysical quality screen eliminating insoluble candidates and ensuring structural foldability without amyloid aggregation traps.",
    input: "24 Raw De Novo Sequences",
    output: "High-Confidence Validated Hits Ready for Wet-Lab Synthesis",
    math: "Pass ⟺ pLDDT ≥ 80 ∧ scRMSD ≤ 2.0Å ∧ Triad=Match ∧ GRAVY ≤ 0.2",
    cost: "Filters: 4 Sequential Gates",
    color: "#9383e2",
    badge: "4-Gate Biophysical QC",
  },
  {
    id: "u12",
    hemisphere: "uid",
    num: 12,
    code: "12",
    title: "Epistemic Loop Closure",
    subtitle: "Knowledge Graph Hypothesis Injection & State Transition",
    desc: "Injects verified candidates into the knowledge graph (NodeType.PROTEIN, EvidenceStatus.HYPOTHESIZED) and downgrades the CRITICAL gap to CANDIDATE_PENDING_SYNTHESIS.",
    input: "QC-Passed Validated Hit",
    output: "Updated GraphML + Interactive Cytoscape.js Dark-Mode Visualizer",
    math: "V ← V ∪ {Candidate}, E ← E ∪ {(Candidate, DEGRADES, Target)}, Gap.Priority ← LOW",
    cost: "Status: Closed-Loop Discovery",
    color: "#a47bea",
    badge: "Closed-Loop Discovery",
  },
];

export default function ProjectMangalFlowchart() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-play pulse simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % STAGES.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentStage = STAGES[activeStep];

  return (
    <div className="my-8 w-full rounded-2xl border border-[rgba(230,235,245,0.12)] bg-[#1e2129] p-4 font-sans text-[#dce0e8] shadow-xl sm:p-6">
      {/* Visualizer Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(230,235,245,0.10)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#a47bea] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#a47bea]"></span>
            </span>
            <span className="font-mono text-xs font-semibold tracking-wider text-[#a47bea] uppercase">
              Autonomous Discovery Compiler
            </span>
          </div>
          <h3 className="mt-1 text-lg font-bold text-white sm:text-xl">
            ⚡ Interactive Two-Hemisphere Cybernetic Pipeline
          </h3>
          <p className="mt-0.5 text-xs text-[#9ba0ad]">
            Continuous Live Dataflow Simulation from Cognitive Interrogation to
            Generative Synthesis
          </p>
        </div>

        {/* Simulation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 rounded-lg border border-[rgba(230,235,245,0.12)] bg-[#242831] px-3 py-1.5 font-mono text-xs text-[#dce0e8] transition-all hover:bg-[#282c35]"
            title={isPlaying ? "Pause Pulse" : "Resume Pulse"}
          >
            <span>{isPlaying ? "⏸ Pause Pulse" : "▶ Resume Pulse"}</span>
          </button>
          <button
            onClick={() => {
              setActiveStep(prev => (prev + 1) % STAGES.length);
              setIsPlaying(false);
            }}
            className="rounded-lg border border-[rgba(230,235,245,0.15)] bg-[#282c35] px-3 py-1.5 font-mono text-xs text-[#ffffff] transition-all hover:bg-[#343a46]"
          >
            Step ⏭
          </button>
        </div>
      </div>

      {/* Main Two-Hemisphere Grid */}
      <div className="relative grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Hemisphere 1: Project Mangal (Cognitive Cortex) */}
        <div className="relative overflow-hidden rounded-xl border border-[rgba(230,235,245,0.12)] bg-[#242831] p-4">
          <div className="mb-3 flex items-center justify-between border-b border-[rgba(230,235,245,0.10)] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">🧠</span>
              <span className="text-sm font-bold tracking-wide text-white">
                PROJECT MANGAL (Cognitive Cortex)
              </span>
            </div>
            <span className="rounded-full border border-[rgba(230,235,245,0.12)] bg-[#1e2129] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#a47bea]">
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
                  className={`relative cursor-pointer rounded-lg border p-3 transition-all ${
                    isCurrent
                      ? "border-[#a47bea] bg-[#282c35]"
                      : "border-[rgba(230,235,245,0.08)] bg-[#1e2129] hover:border-[rgba(230,235,245,0.2)] hover:bg-[#282c35]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`flex size-6 items-center justify-center rounded-md font-mono text-[11px] font-bold ${
                          isCurrent
                            ? "bg-[#a47bea] text-[#1e2129]"
                            : "bg-[#242831] text-[#dce0e8]"
                        }`}
                      >
                        {stage.code}
                      </span>
                      <span className="text-xs font-semibold text-white sm:text-sm">
                        {stage.title}
                      </span>
                    </div>
                    <span className="hidden font-mono text-[10px] text-[#9ba0ad] sm:inline">
                      {stage.badge}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-1 text-[11px] text-[#9ba0ad]">
                    {stage.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hemisphere 2: UID Engine (Physical Laboratory) */}
        <div className="relative overflow-hidden rounded-xl border border-[rgba(230,235,245,0.12)] bg-[#242831] p-4">
          <div className="mb-3 flex items-center justify-between border-b border-[rgba(230,235,245,0.10)] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">🔬</span>
              <span className="text-sm font-bold tracking-wide text-white">
                UID ENGINE (Physical Laboratory)
              </span>
            </div>
            <span className="rounded-full border border-[rgba(230,235,245,0.12)] bg-[#1e2129] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#a47bea]">
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
                  className={`relative cursor-pointer rounded-lg border p-3 transition-all ${
                    isCurrent
                      ? "border-[#a47bea] bg-[#282c35]"
                      : "border-[rgba(230,235,245,0.08)] bg-[#1e2129] hover:border-[rgba(230,235,245,0.2)] hover:bg-[#282c35]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`flex size-6 items-center justify-center rounded-md font-mono text-[11px] font-bold ${
                          isCurrent
                            ? "bg-[#a47bea] text-[#1e2129]"
                            : "bg-[#242831] text-[#dce0e8]"
                        }`}
                      >
                        {stage.code}
                      </span>
                      <span className="text-xs font-semibold text-white sm:text-sm">
                        {stage.title}
                      </span>
                    </div>
                    <span className="hidden font-mono text-[10px] text-[#9ba0ad] sm:inline">
                      {stage.badge}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-1 text-[11px] text-[#9ba0ad]">
                    {stage.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Zero-Human-Touch Cybernetic Handoff Banner */}
      <div className="my-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[rgba(230,235,245,0.12)] bg-[#242831] p-3.5 text-xs">
        <div className="flex items-center gap-2 text-[#dce0e8]">
          <span className="font-bold text-white">
            ⚡ Zero-Human-Touch Handoff:
          </span>
          <span>
            Project Mangal autonomously serializes YAML causal chains to{" "}
            <code className="rounded border border-[rgba(230,235,245,0.10)] bg-[#1e2129] px-1.5 py-0.5 font-mono text-[11px] text-[#a47bea]">
              src/uid_engine/chains/
            </code>
          </span>
        </div>
        <span className="rounded-md border border-[rgba(230,235,245,0.12)] bg-[#1e2129] px-2.5 py-1 font-mono text-[11px] font-semibold text-[#dce0e8]">
          Handoff Latency: 0.002s
        </span>
      </div>

      {/* Real-Time Module Inspector Card */}
      <div className="mt-4 rounded-xl border border-[rgba(230,235,245,0.12)] bg-[#242831] p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(230,235,245,0.10)] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="flex size-6 items-center justify-center rounded-md bg-[#a47bea] font-mono text-xs font-bold text-[#1e2129]">
              {currentStage.code}
            </span>
            <h4 className="text-base font-bold text-white sm:text-lg">
              {currentStage.title}
            </h4>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="font-semibold text-[#dce0e8]">
              {currentStage.cost}
            </span>
            <span className="rounded border border-[rgba(230,235,245,0.12)] bg-[#1e2129] px-2.5 py-0.5 text-[#dce0e8]">
              {currentStage.hemisphere === "mangal"
                ? "🧠 Mangal Cognitive Step"
                : "🔬 UID Physical Step"}
            </span>
          </div>
        </div>

        <p className="mb-4 text-xs leading-relaxed text-[#dce0e8] sm:text-sm">
          {currentStage.desc}
        </p>

        <div className="grid grid-cols-1 gap-3 font-mono text-xs md:grid-cols-3">
          <div className="rounded-lg border border-[rgba(230,235,245,0.08)] bg-[#1e2129] p-3">
            <span className="mb-1 block text-[10px] text-[#9ba0ad] uppercase">
              📥 Input:
            </span>
            <span className="text-[11px] leading-snug text-[#dce0e8]">
              {currentStage.input}
            </span>
          </div>

          <div className="rounded-lg border border-[rgba(230,235,245,0.08)] bg-[#1e2129] p-3">
            <span className="mb-1 block text-[10px] text-[#9ba0ad] uppercase">
              📤 Output:
            </span>
            <span className="text-[11px] leading-snug text-[#dce0e8]">
              {currentStage.output}
            </span>
          </div>

          <div className="rounded-lg border border-[rgba(230,235,245,0.08)] bg-[#1e2129] p-3">
            <span className="mb-1 block text-[10px] text-[#9ba0ad] uppercase">
              📐 Mathematical Rule:
            </span>
            <span className="text-[11px] leading-snug break-words text-[#a47bea]">
              {currentStage.math}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
