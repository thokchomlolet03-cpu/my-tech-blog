import React, { useState, useEffect, useRef } from 'react';

// --- Static Biomedical Data for Interactive Simulation ---
const GRAPH_NODES = [
  { id: 'mol:glucosepane', name: 'Glucosepane Crosslink', type: 'MOLECULE', status: 'PROVEN', conf: 1.0, desc: 'Heterocyclic imidazole-lysine-arginine AGE crosslink stiffening arterial collagen.', color: '#38bdf8' },
  { id: 'protein:collagen_1', name: 'Collagen Type I (α1)', type: 'PROTEIN', status: 'PROVEN', conf: 1.0, desc: 'Major structural scaffold of arterial extracellular matrix.', color: '#a855f7' },
  { id: 'gap:crosslink_hydrolase', name: 'UNKNOWN: Crosslink Hydrolase', type: 'UNKNOWN', status: 'UNKNOWN', conf: 0.0, desc: 'CONSPICUOUS ABSENCE: No endogenous human enzyme cleaves mature glucosepane.', color: '#f43f5e' },
  { id: 'cand:denovo_hydrolase_1', name: 'De Novo Candidate #1 (v0.7)', type: 'PROTEIN', status: 'HYPOTHESIZED_IN_SILICO', conf: 0.85, desc: 'ESM-3 + ProteinMPNN generated hydrolase with locked His54-Asp112-Ser198 catalytic triad.', color: '#10b981' },
  { id: 'path:arterial_compliance', name: 'Arterial Compliance & Elasticity', type: 'PATHWAY', status: 'PROVEN', conf: 0.95, desc: 'Physiological end-state target: Restoration of vascular compliance.', color: '#34d399' },
  { id: 'decoy:hsa', name: 'Human Serum Albumin (HSA)', type: 'PROTEIN', status: 'PROVEN', conf: 1.0, desc: 'Plasma molecular sponge counter-screened to verify zero non-specific trapping.', color: '#64748b' },
  { id: 'decoy:elastin', name: 'Arterial Elastin', type: 'PROTEIN', status: 'PROVEN', conf: 1.0, desc: 'Vascular elastic fibers counter-screened to ensure zero off-target degradation.', color: '#64748b' }
];

const GRAPH_EDGES = [
  { source: 'mol:glucosepane', target: 'protein:collagen_1', label: 'CROSSLINKS', status: 'PROVEN' },
  { source: 'gap:crosslink_hydrolase', target: 'mol:glucosepane', label: 'REQUIRES_DEGRADATION', status: 'UNKNOWN' },
  { source: 'cand:denovo_hydrolase_1', target: 'mol:glucosepane', label: 'DEGRADES (In Silico)', status: 'HYPOTHESIZED_IN_SILICO' },
  { source: 'cand:denovo_hydrolase_1', target: 'path:arterial_compliance', label: 'RESTORES', status: 'HYPOTHESIZED_IN_SILICO' },
  { source: 'cand:denovo_hydrolase_1', target: 'decoy:hsa', label: 'OFF-TARGET (Selectivity >140x)', status: 'PROVEN' },
  { source: 'cand:denovo_hydrolase_1', target: 'decoy:elastin', label: 'OFF-TARGET (Selectivity >180x)', status: 'PROVEN' }
];

const TENSOR_OPTIONS = {
  archetypes: [
    { id: 'alien', name: 'Alien Archaeologist', desc: 'Analyzes crosslink as an alien physical artifact devoid of human medical dogma.' },
    { id: 'adversary', name: 'The Adversary', desc: 'Simulates active biological resistance and compensatory upregulation.' },
    { id: 'thermo', name: 'Thermodynamicist', desc: 'Examines purely non-equilibrium energy barriers and transition state enthalpy.' },
    { id: 'quantum', name: 'Quantum Enzymologist', desc: 'Models proton tunneling and heterocyclic orbital strain.' }
  ],
  elements: [
    { id: 'imidazole', name: 'Heterocyclic Imidazole Ring', desc: 'Core 7-membered crosslink junction between Lys and Arg.' },
    { id: 'collagen_triple', name: 'Collagen Triple Helix', desc: 'Crowded 2.9Å steric pocket surrounding the crosslink.' },
    { id: 'active_site', name: 'His-Asp-Ser Catalytic Pocket', desc: 'Target transition-state stabilization coordinates.' }
  ],
  operations: [
    { id: 'invert', name: 'Invert (Reverse Causal Order)', desc: 'Ask what condition makes crosslink self-cleaving under basal physiological pH.' },
    { id: 'subvert', name: 'Subvert (Constraint Substitution)', desc: 'Recruit native lysosomal proteases using a bispecific molecular glue.' },
    { id: 'eliminate', name: 'Eliminate (Precursor Scavenging)', desc: 'Neutralize dicarbonyl precursors before Schiff base maturation.' }
  ],
  scales: [
    { id: 'subangstrom', name: 'Sub-Ångström (0.1 Å)', desc: 'Electronic cloud orbital geometry.' },
    { id: 'supramolecular', name: 'Supramolecular (10–100 nm)', desc: 'Fibrillar collagen bundle architecture.' },
    { id: 'geologic', name: 'Lifespan Scale (100 Years)', desc: 'Cumulative non-enzymatic glycation drift over a century.' }
  ]
};

const DECOY_SCORES = [
  { name: 'Target: Glucosepane', deltaG: -9.2, type: 'target', selectivity: '1.0x (Baseline Target)' },
  { name: 'Decoy: Collagen I α1', deltaG: -5.8, type: 'decoy', selectivity: '142x Selectivity' },
  { name: 'Decoy: Collagen III', deltaG: -5.6, type: 'decoy', selectivity: '185x Selectivity' },
  { name: 'Decoy: Elastin', deltaG: -5.2, type: 'decoy', selectivity: '320x Selectivity' },
  { name: 'Decoy: Human Serum Albumin (HSA)', deltaG: -6.1, type: 'decoy', selectivity: '115x Selectivity' },
  { name: 'Decoy: Fibronectin', deltaG: -5.5, type: 'decoy', selectivity: '210x Selectivity' },
  { name: 'Decoy: BCL-xL (Platelet)', deltaG: -5.0, type: 'decoy', selectivity: '440x Selectivity' }
];

export default function EpistemicExplorer() {
  const [activeTab, setActiveTab] = useState('topology');
  const [selectedNode, setSelectedNode] = useState(GRAPH_NODES[2]); // Default: UNKNOWN gap
  const [showOnlyKnowns, setShowOnlyKnowns] = useState(false);
  const [renderMode, setRenderMode] = useState('plddt');
  const [isRotating, setIsRotating] = useState(true);
  const [rotAngle, setRotAngle] = useState(0);

  // 4D Tensor state
  const [selectedArchetype, setSelectedArchetype] = useState(TENSOR_OPTIONS.archetypes[0]);
  const [selectedElement, setSelectedElement] = useState(TENSOR_OPTIONS.elements[0]);
  const [selectedOperation, setSelectedOperation] = useState(TENSOR_OPTIONS.operations[0]);
  const [selectedScale, setSelectedScale] = useState(TENSOR_OPTIONS.scales[0]);

  // Canvas animation for 3D simulation
  const canvasRef = useRef(null);

  useEffect(() => {
    let animationFrame;
    if (isRotating && activeTab === 'macromolecule') {
      const animate = () => {
        setRotAngle(prev => (prev + 0.8) % 360);
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [isRotating, activeTab]);

  useEffect(() => {
    if (activeTab !== 'macromolecule' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw background grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const rad = (rotAngle * Math.PI) / 180;
    const centerX = width / 2;
    const centerY = height / 2;

    // Simulated 3D Ribbon Backbone & Atoms
    const points = [
      { x: -90, y: -40, z: -30, type: 'helix', plddt: 94, name: 'Trp24' },
      { x: -50, y: -70, z: 0, type: 'helix', plddt: 91, name: 'Leu38' },
      { x: -10, y: -45, z: 35, type: 'catalytic', plddt: 98, name: 'His54 (Triad)' },
      { x: 30, y: -10, z: 25, type: 'catalytic', plddt: 97, name: 'Asp112 (Triad)' },
      { x: 0, y: 30, z: 15, type: 'catalytic', plddt: 99, name: 'Ser198 (Triad)' },
      { x: 50, y: 60, z: -20, type: 'sheet', plddt: 88, name: 'Val214' },
      { x: 90, y: 30, z: -40, type: 'sheet', plddt: 82, name: 'Ile230' },
      { x: -20, y: 80, z: 10, type: 'loop', plddt: 68, name: 'Gly245 (Loop)' }
    ];

    // Project 3D to 2D
    const projected = points.map(p => {
      const rotX = p.x * Math.cos(rad) - p.z * Math.sin(rad);
      const rotZ = p.x * Math.sin(rad) + p.z * Math.cos(rad);
      const scale = 1.2 + rotZ / 250;
      return {
        ...p,
        projX: centerX + rotX * scale,
        projY: centerY + p.y * scale,
        rotZ,
        scale
      };
    });

    // Sort by Z for realistic depth
    projected.sort((a, b) => a.rotZ - b.rotZ);

    // Draw backbone connection ribbon
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = renderMode === 'plddt' ? '#38bdf8' : renderMode === 'triad' ? '#7e56c2' : '#10b981';
    for (let i = 0; i < projected.length - 1; i++) {
      ctx.moveTo(projected[i].projX, projected[i].projY);
      ctx.lineTo(projected[i + 1].projX, projected[i + 1].projY);
    }
    ctx.stroke();

    // Draw atoms / residues
    projected.forEach(p => {
      ctx.beginPath();
      let color = '#38bdf8';
      let radius = 10 * p.scale;

      if (renderMode === 'plddt') {
        color = p.plddt >= 90 ? '#2563eb' : p.plddt >= 70 ? '#38bdf8' : '#f59e0b';
      } else if (renderMode === 'triad') {
        if (p.type === 'catalytic') {
          color = '#f43f5e';
          radius = 16 * p.scale;
        } else {
          color = '#334155';
          radius = 7 * p.scale;
        }
      } else if (renderMode === 'gravy') {
        color = p.type === 'catalytic' ? '#fb923c' : '#0284c7'; // Hydrophobic core vs hydrophilic exterior
      } else if (renderMode === 'docking') {
        color = p.type === 'catalytic' ? '#10b981' : '#64748b';
      }

      ctx.arc(p.projX, p.projY, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#0f172a';
      ctx.stroke();

      // Residue label
      ctx.font = '10px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(p.name, p.projX + radius + 4, p.projY + 3);
    });

    // In Docking mode, render target Glucosepane ligand docked inside catalytic triad
    if (renderMode === 'docking') {
      const activeTriad = projected.filter(p => p.type === 'catalytic');
      const meanX = activeTriad.reduce((acc, p) => acc + p.projX, 0) / activeTriad.length;
      const meanY = activeTriad.reduce((acc, p) => acc + p.projY, 0) / activeTriad.length;

      ctx.beginPath();
      ctx.arc(meanX, meanY, 18, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(245, 158, 11, 0.35)';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#f59e0b';
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.font = 'bold 11px sans-serif';
      ctx.fillStyle = '#f59e0b';
      ctx.fillText('Glucosepane C18H34N6O6 (ΔG = -9.2 kcal/mol)', meanX - 110, meanY - 24);
    }
  }, [rotAngle, activeTab, renderMode]);

  const filteredNodes = showOnlyKnowns
    ? GRAPH_NODES.filter(n => n.type !== 'UNKNOWN' && n.status === 'PROVEN')
    : GRAPH_NODES;

  return (
    <div style={{
      background: '#090d16',
      border: '1px solid #1e293b',
      borderRadius: '16px',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#f8fafc',
      margin: '2rem 0',
      boxShadow: '0 20px 40px -15px rgba(0,0,0,0.7)'
    }}>
      {/* Header Bar */}
      <div style={{
        background: '#0f172a',
        borderBottom: '1px solid #1e293b',
        padding: '16px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              background: '#38bdf8',
              color: '#090d16',
              fontSize: '0.65rem',
              fontWeight: '800',
              padding: '2px 6px',
              borderRadius: '4px',
              textTransform: 'uppercase'
            }}>
              Interactive Lab
            </span>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700', color: '#f8fafc' }}>
              Scientific Epistemic Explorer
            </h3>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
            Multi-Perspective Inverse Design Analyzer & Biophysical Verification Suite
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', background: '#090d16', padding: '4px', borderRadius: '8px', border: '1px solid #1e293b' }}>
          {[
            { id: 'topology', label: '🌐 2D Epistemic Topology' },
            { id: 'macromolecule', label: '🧬 3D Candidate Structure' },
            { id: 'tensor', label: '🔬 4D Cognitive Tensor' },
            { id: 'qc', label: '🛡️ 6-Gate Safety QC' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? '#1e293b' : 'transparent',
                color: activeTab === tab.id ? '#38bdf8' : '#94a3b8',
                border: activeTab === tab.id ? '1px solid #38bdf8' : '1px solid transparent',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main View Area */}
      <div style={{ padding: '20px' }}>
        {/* --- TAB 1: 2D EPISTEMIC TOPOLOGY --- */}
        {activeTab === 'topology' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Toggle between <strong style={{ color: '#f43f5e' }}>Inverse Design (Epistemic Negative Space)</strong> and orthodox known literature:
              </div>
              <button
                onClick={() => setShowOnlyKnowns(!showOnlyKnowns)}
                style={{
                  background: showOnlyKnowns ? '#0284c7' : '#1e293b',
                  color: '#f8fafc',
                  border: '1px solid #38bdf8',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {showOnlyKnowns ? '👁️ Switch to Inverse Design View (Show Negative Space)' : '📖 Switch to Orthodox View (Knowns Only)'}
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
              {/* Interactive Node Graph Map */}
              <div style={{
                background: '#040711',
                border: '1px solid #1e293b',
                borderRadius: '10px',
                padding: '16px',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {filteredNodes.map(node => (
                    <div
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      style={{
                        background: selectedNode.id === node.id ? '#1e293b' : '#0f172a',
                        border: `2px ${node.type === 'UNKNOWN' ? 'dashed #f43f5e' : `solid ${node.color}`}`,
                        boxShadow: node.type === 'UNKNOWN' ? '0 0 12px rgba(244,63,94,0.4)' : 'none',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        flex: '1 1 45%'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.7rem', color: node.color, fontWeight: '700' }}>{node.type}</span>
                        <span style={{ fontSize: '0.65rem', background: '#1e293b', padding: '2px 6px', borderRadius: '4px', color: '#94a3b8' }}>
                          {node.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '700', marginTop: '4px', color: '#f8fafc' }}>
                        {node.name}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid #1e293b', paddingTop: '10px', fontSize: '0.75rem', color: '#64748b' }}>
                  Causal relations: <strong>{GRAPH_EDGES.length} Verified & Hypothesized Edges</strong> | O(1) Edge Type Index Active
                </div>
              </div>

              {/* Node Detail Inspector */}
              <div style={{
                background: '#0f172a',
                border: '1px solid #1e293b',
                borderRadius: '10px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: '700', textTransform: 'uppercase' }}>
                    Entity Inspector
                  </div>
                  <h4 style={{ margin: '6px 0 10px 0', fontSize: '1rem', color: selectedNode.color }}>
                    {selectedNode.name}
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: '1.5', marginBottom: '12px' }}>
                    {selectedNode.desc}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'grid', gap: '6px' }}>
                    <div><strong>Node ID:</strong> <code style={{ color: '#38bdf8' }}>{selectedNode.id}</code></div>
                    <div><strong>Evidence Status:</strong> <span style={{ color: '#10b981' }}>{selectedNode.status}</span></div>
                    <div><strong>Confidence:</strong> {selectedNode.conf * 100}%</div>
                  </div>
                </div>

                {selectedNode.type === 'UNKNOWN' && (
                  <div style={{
                    background: 'rgba(244,63,94,0.15)',
                    border: '1px solid #f43f5e',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '0.75rem',
                    color: '#fda4af',
                    marginTop: '12px'
                  }}>
                    ⚠️ <strong>NEGATIVE SPACE FLASHPOINT:</strong> This node represents an unbridged biological void ready for de novo generation.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: 3D MACROMOLECULAR CANDIDATE --- */}
        {activeTab === 'macromolecule' && (
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[
                  { id: 'plddt', label: '🔵 AlphaFold pLDDT Rainbow' },
                  { id: 'triad', label: '🔴 Catalytic Triad (His54-Asp112-Ser198)' },
                  { id: 'gravy', label: '🌊 GRAVY Hydropathy Surface' },
                  { id: 'docking', label: '🧪 Ligand Docking (ΔG = -9.2 kcal/mol)' }
                ].map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setRenderMode(mode.id)}
                    style={{
                      background: renderMode === mode.id ? '#1e293b' : '#0f172a',
                      color: renderMode === mode.id ? '#38bdf8' : '#94a3b8',
                      border: renderMode === mode.id ? '1px solid #38bdf8' : '1px solid #1e293b',
                      borderRadius: '6px',
                      padding: '6px 10px',
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsRotating(!isRotating)}
                style={{
                  background: '#1e293b',
                  color: '#f8fafc',
                  border: '1px solid #38bdf8',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {isRotating ? '⏸ Pause Spin' : '▶ Resume 3D Spin'}
              </button>
            </div>

            {/* 3D WebGL Canvas Simulation */}
            <div style={{ position: 'relative', width: '100%', height: '360px', background: '#020617', borderRadius: '10px', overflow: 'hidden', border: '1px solid #1e293b' }}>
              <canvas
                ref={canvasRef}
                width={800}
                height={360}
                style={{ width: '100%', height: '100%', display: 'block' }}
              />
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '14px',
                background: 'rgba(15,23,42,0.85)',
                backdropFilter: 'blur(8px)',
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid #1e293b',
                fontSize: '0.75rem'
              }}>
                Candidate: <strong>Glucosepane Hydrolase #1</strong> | pLDDT: <strong style={{ color: '#38bdf8' }}>88.4</strong> | scRMSD: <strong style={{ color: '#10b981' }}>1.14 Å</strong>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 3: 4D COGNITIVE HYPER-MATRIX --- */}
        {activeTab === 'tensor' && (
          <div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '16px' }}>
              Tune the 4 orthogonal axes of inquiry to eliminate human cognitive bias and observe how the question mutates:
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
              {/* Axis W: Archetype */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', padding: '12px' }}>
                <div style={{ fontSize: '0.7rem', color: '#a855f7', fontWeight: '800', textTransform: 'uppercase' }}>Axis W: Mindset</div>
                <select
                  value={selectedArchetype.id}
                  onChange={e => setSelectedArchetype(TENSOR_OPTIONS.archetypes.find(a => a.id === e.target.value))}
                  style={{ width: '100%', marginTop: '8px', background: '#090d16', color: '#f8fafc', border: '1px solid #334155', borderRadius: '6px', padding: '6px', fontSize: '0.75rem' }}
                >
                  {TENSOR_OPTIONS.archetypes.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '6px' }}>{selectedArchetype.desc}</div>
              </div>

              {/* Axis X: Element */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', padding: '12px' }}>
                <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: '800', textTransform: 'uppercase' }}>Axis X: Element</div>
                <select
                  value={selectedElement.id}
                  onChange={e => setSelectedElement(TENSOR_OPTIONS.elements.find(a => a.id === e.target.value))}
                  style={{ width: '100%', marginTop: '8px', background: '#090d16', color: '#f8fafc', border: '1px solid #334155', borderRadius: '6px', padding: '6px', fontSize: '0.75rem' }}
                >
                  {TENSOR_OPTIONS.elements.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '6px' }}>{selectedElement.desc}</div>
              </div>

              {/* Axis Y: Operation */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', padding: '12px' }}>
                <div style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: '800', textTransform: 'uppercase' }}>Axis Y: Operation</div>
                <select
                  value={selectedOperation.id}
                  onChange={e => setSelectedOperation(TENSOR_OPTIONS.operations.find(a => a.id === e.target.value))}
                  style={{ width: '100%', marginTop: '8px', background: '#090d16', color: '#f8fafc', border: '1px solid #334155', borderRadius: '6px', padding: '6px', fontSize: '0.75rem' }}
                >
                  {TENSOR_OPTIONS.operations.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '6px' }}>{selectedOperation.desc}</div>
              </div>

              {/* Axis Z: Scale */}
              <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', padding: '12px' }}>
                <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: '800', textTransform: 'uppercase' }}>Axis Z: Scale</div>
                <select
                  value={selectedScale.id}
                  onChange={e => setSelectedScale(TENSOR_OPTIONS.scales.find(a => a.id === e.target.value))}
                  style={{ width: '100%', marginTop: '8px', background: '#090d16', color: '#f8fafc', border: '1px solid #334155', borderRadius: '6px', padding: '6px', fontSize: '0.75rem' }}
                >
                  {TENSOR_OPTIONS.scales.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '6px' }}>{selectedScale.desc}</div>
              </div>
            </div>

            {/* Generated Vector Output Card */}
            <div style={{ background: '#040711', border: '1px solid #38bdf8', borderRadius: '10px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#38bdf8' }}>
                  SYNTHESIZED DIAGNOSTIC INQUIRY VECTOR
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ background: '#1e293b', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', color: '#f59e0b' }}>
                    Anomaly: <strong>0.88</strong>
                  </span>
                  <span style={{ background: '#1e293b', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', color: '#10b981' }}>
                    Leverage: <strong>0.94</strong>
                  </span>
                </div>
              </div>
              <div style={{ fontSize: '0.95rem', color: '#f8fafc', fontStyle: 'italic', lineHeight: '1.5' }}>
                "As <strong>{selectedArchetype.name}</strong>, what if we <strong>{selectedOperation.name}</strong> the <strong>{selectedElement.name}</strong> at the <strong>{selectedScale.name}</strong> to bypass endogenous human enzymatic deficiencies?"
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 4: 6-GATE SAFETY & QC DASHBOARD --- */}
        {activeTab === 'qc' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
              {[
                { gate: 'Gate 1: pLDDT Fold Confidence', val: '88.4', thresh: '≥ 80.0', status: 'PASS' },
                { gate: 'Gate 2: scRMSD Self-Consistency', val: '1.14 Å', thresh: '≤ 2.0 Å', status: 'PASS' },
                { gate: 'Gate 3: Catalytic Triad Exact Lock', val: '100% (His-Asp-Ser)', thresh: '100%', status: 'PASS' },
                { gate: 'Gate 4: GRAVY Hydropathy Solubility', val: '-0.14 (Soluble)', thresh: '≤ 0.20', status: 'PASS' },
                { gate: 'Gate 5: AutoDock Vina Binding ΔG', val: '-9.20 kcal/mol', thresh: '≤ -8.00 kcal/mol', status: 'PASS' },
                { gate: 'Gate 6: Off-Target Decoy Selectivity', val: '142x Selectivity', thresh: '≥ 100x vs HSA/Collagen', status: 'PASS' }
              ].map((g, idx) => (
                <div key={idx} style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', padding: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{g.gate}</span>
                    <span style={{ background: '#059669', color: '#ffffff', fontSize: '0.65rem', fontWeight: '800', padding: '2px 6px', borderRadius: '4px' }}>
                      {g.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#38bdf8', marginTop: '6px' }}>
                    {g.val}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Threshold: {g.thresh}</div>
                </div>
              ))}
            </div>

            {/* Decoy Comparative Selectivity Table */}
            <div style={{ background: '#040711', border: '1px solid #1e293b', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#38bdf8', marginBottom: '10px' }}>
                Gate 6 Multi-Target Off-Target Counter-Screening Profile
              </div>
              <div style={{ display: 'grid', gap: '8px' }}>
                {DECOY_SCORES.map((d, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', padding: '8px 12px', borderRadius: '6px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: d.type === 'target' ? '700' : '400', color: d.type === 'target' ? '#38bdf8' : '#cbd5e1' }}>
                      {d.name}
                    </span>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem' }}>
                      <span style={{ color: d.type === 'target' ? '#10b981' : '#94a3b8' }}>ΔG = <strong>{d.deltaG} kcal/mol</strong></span>
                      <span style={{ color: d.type === 'target' ? '#38bdf8' : '#f59e0b', fontWeight: '700' }}>{d.selectivity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
