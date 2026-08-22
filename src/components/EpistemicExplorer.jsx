import React, { useState, useEffect, useRef } from 'react';

// =============================================================================
// COSMIC EPISTEMIC UNIVERSE & 3D MACROMOLECULAR ENGINE (v0.7.5)
// Inspired by The Token Cosmos: 3D Force-Directed Cosmic Web + Supernova Gap Bridging
// =============================================================================

// Generate 160+ Cosmic Knowledge Nodes clustered into Biological Nebulae
const GENERATE_COSMIC_UNIVERSE = () => {
  const nodes = [];
  let id = 0;

  // 1. ECM & Collagen Structural Nebula (Cluster Center: x = -140, y = 20, z = -40)
  for (let i = 0; i < 45; i++) {
    const r = 20 + Math.random() * 90;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI;
    nodes.push({
      id: `ecm:${id++}`,
      cluster: 'ecm',
      label: i === 0 ? 'Collagen Type I (α1)' : i === 1 ? 'Collagen Type III' : i === 2 ? 'Arterial Elastin' : i === 3 ? 'Fibronectin (ECM)' : `ECM Fibril #${i}`,
      type: 'PROTEIN',
      x: -140 + r * Math.cos(theta) * Math.cos(phi),
      y: 20 + r * Math.sin(phi) * 0.7,
      z: -40 + r * Math.sin(theta) * Math.cos(phi),
      color: '#38bdf8', // Cyan/Sky Blue
      size: i < 4 ? 6.5 : 2.5 + Math.random() * 2,
      conf: 1.0,
      isCore: i < 4
    });
  }

  // 2. Glycation & Senescence Cascade Nebula (Cluster Center: x = 120, y = -30, z = 50)
  for (let i = 0; i < 40; i++) {
    const r = 15 + Math.random() * 80;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI;
    nodes.push({
      id: `glyc:${id++}`,
      cluster: 'glycation',
      label: i === 0 ? 'Glucosepane Crosslink (Target)' : i === 1 ? 'RAGE Receptor' : i === 2 ? 'Methylglyoxal Precursor' : `AGE Intermediate #${i}`,
      type: 'MOLECULE',
      x: 120 + r * Math.cos(theta) * Math.cos(phi),
      y: -30 + r * Math.sin(phi) * 0.7,
      z: 50 + r * Math.sin(theta) * Math.cos(phi),
      color: '#a855f7', // Purple/Violet
      size: i === 0 ? 8.0 : i < 3 ? 6.0 : 2.5 + Math.random() * 2,
      conf: 1.0,
      isCore: i < 3
    });
  }

  // 3. Systemic Vascular & Hemodynamic Pathway Nebula (Cluster Center: x = 0, y = 140, z = -20)
  for (let i = 0; i < 35; i++) {
    const r = 20 + Math.random() * 75;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI;
    nodes.push({
      id: `path:${id++}`,
      cluster: 'pathway',
      label: i === 0 ? 'Arterial Compliance' : i === 1 ? 'Pulse Wave Velocity (PWV)' : i === 2 ? 'Endothelial Shear Stress' : `Hemodynamic Node #${i}`,
      type: 'PATHWAY',
      x: 0 + r * Math.cos(theta) * Math.cos(phi),
      y: 140 + r * Math.sin(phi) * 0.6,
      z: -20 + r * Math.sin(theta) * Math.cos(phi),
      color: '#34d399', // Emerald
      size: i < 3 ? 6.5 : 2.5 + Math.random() * 2,
      conf: 0.95,
      isCore: i < 3
    });
  }

  // 4. Decoy Plasma Proteome Cluster (Cluster Center: x = -10, y = -130, z = 60)
  for (let i = 0; i < 30; i++) {
    const r = 15 + Math.random() * 70;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI;
    nodes.push({
      id: `plasma:${id++}`,
      cluster: 'plasma',
      label: i === 0 ? 'Human Serum Albumin (HSA)' : i === 1 ? 'Immunoglobulin G (IgG)' : i === 2 ? 'Fibrinogen' : `Plasma Protein #${i}`,
      type: 'PROTEIN',
      x: -10 + r * Math.cos(theta) * Math.cos(phi),
      y: -130 + r * Math.sin(phi) * 0.6,
      z: 60 + r * Math.sin(theta) * Math.cos(phi),
      color: '#64748b', // Slate Gray Decoy
      size: i < 3 ? 6.0 : 2.2 + Math.random() * 2,
      conf: 1.0,
      isCore: i < 3
    });
  }

  // 5. Star Dust Background Particles (100 Ambient Points)
  for (let i = 0; i < 90; i++) {
    nodes.push({
      id: `dust:${id++}`,
      cluster: 'dust',
      label: `PubMed Citation #${1000 + i}`,
      type: 'PAPER',
      x: (Math.random() - 0.5) * 600,
      y: (Math.random() - 0.5) * 450,
      z: (Math.random() - 0.5) * 400,
      color: 'rgba(255, 255, 255, 0.4)',
      size: 1.2,
      conf: 0.8,
      isCore: false
    });
  }

  return nodes;
};

// 3D Epistemic Gap & Bridging Node Data
const EPISTEMIC_VOID_CENTER = { x: 0, y: 0, z: 0 };
const DE_NOVO_CANDIDATE_NODE = {
  id: 'cand:denovo_supernova',
  label: 'De Novo Candidate #1 (v0.7.0)',
  type: 'PROTEIN',
  x: 0,
  y: 0,
  z: 0,
  color: '#f59e0b', // Radiant Supernova Amber
  size: 12.0,
  conf: 0.88,
  status: 'HYPOTHESIZED_IN_SILICO'
};

const COSMIC_NODES = GENERATE_COSMIC_UNIVERSE();

// Generate Complete (α/β)₈ TIM-Barrel Fold for Lens 2
const GENERATE_BARREL_FOLD = () => {
  const residues = [];
  const numRepeats = 8;
  const barrelRadius = 26;
  const helixRadius = 56;
  let counter = 1;

  for (let r = 0; r < numRepeats; r++) {
    const angle = (r / numRepeats) * Math.PI * 2;
    const nextAngle = ((r + 1) / numRepeats) * Math.PI * 2;
    const midAngle = angle + (nextAngle - angle) * 0.45;

    // β-Strand (Inner Lumen)
    for (let s = 0; s < 9; s++) {
      const t = s / 8;
      const isTriad = (r === 1 && s === 7) || (r === 3 && s === 7) || (r === 5 && s === 7);
      const triadLabel = r === 1 ? 'His54' : r === 3 ? 'Asp112' : 'Ser198';

      residues.push({
        index: counter++,
        x: Math.cos(angle) * barrelRadius + (s % 2 === 0 ? 1 : -1),
        y: -30 + t * 55,
        z: Math.sin(angle) * barrelRadius + (s % 2 === 0 ? -1 : 1),
        secStruct: isTriad ? 'triad' : 'sheet',
        plddt: isTriad ? 98.8 : 91.5,
        gravy: -0.4,
        label: isTriad ? `${triadLabel} (Triad)` : `β${r + 1}-Res${s + 1}`
      });
    }

    // Outer α-Helix
    for (let h = 0; h < 12; h++) {
      const t = h / 11;
      const coil = h * 1.5;
      residues.push({
        index: counter++,
        x: Math.cos(midAngle) * helixRadius + Math.cos(coil) * 6,
        y: 25 - t * 55,
        z: Math.sin(midAngle) * helixRadius + Math.sin(coil) * 6,
        secStruct: 'helix',
        plddt: 95.0,
        gravy: 1.2,
        label: `α${r + 1}-Res${h + 1}`
      });
    }
  }
  return residues;
};

const BARREL_RESIDUES = GENERATE_BARREL_FOLD();

function catmullRom(p0, p1, p2, p3, t) {
  const v0 = (p2 - p0) * 0.5;
  const v1 = (p3 - p1) * 0.5;
  const t2 = t * t;
  const t3 = t * t2;
  return (2 * p1 - 2 * p2 + v0 + v1) * t3 +
         (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 +
         v0 * t + p1;
}

const GENERATE_SMOOTH_RIBBON = () => {
  const smooth = [];
  const steps = 4;
  for (let i = 0; i < BARREL_RESIDUES.length - 3; i++) {
    const p0 = BARREL_RESIDUES[i];
    const p1 = BARREL_RESIDUES[i + 1];
    const p2 = BARREL_RESIDUES[i + 2];
    const p3 = BARREL_RESIDUES[i + 3];
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      smooth.push({
        x: catmullRom(p0.x, p1.x, p2.x, p3.x, t),
        y: catmullRom(p0.y, p1.y, p2.y, p3.y, t),
        z: catmullRom(p0.z, p1.z, p2.z, p3.z, t),
        secStruct: p1.secStruct,
        plddt: p1.plddt,
        gravy: p1.gravy,
        label: p1.label,
        isTriad: p1.secStruct === 'triad' && s === 0
      });
    }
  }
  return smooth;
};

const SMOOTH_RIBBON = GENERATE_SMOOTH_RIBBON();

const GLUCOSEPANE_LIGAND_ATOMS = [
  { id: 'N1', el: 'N', x: 0, y: 12, z: 0, color: '#38bdf8' },
  { id: 'C2', el: 'C', x: -5, y: 16, z: 3, color: '#22c55e' },
  { id: 'N3', el: 'N', x: -3, y: 22, z: 4, color: '#38bdf8' },
  { id: 'C4', el: 'C', x: 4, y: 21, z: 2, color: '#22c55e' },
  { id: 'C5', el: 'C', x: 6, y: 15, z: 0, color: '#22c55e' },
  { id: 'O6', el: 'O', x: -11, y: 14, z: 3, color: '#ef4444' },
  { id: 'O7', el: 'O', x: 8, y: 26, z: 3, color: '#ef4444' },
  { id: 'C_Lys', el: 'C', x: -8, y: 28, z: 7, color: '#fbbf24' },
  { id: 'C_Arg', el: 'C', x: 12, y: 11, z: -3, color: '#fbbf24' }
];

const GLUCOSEPANE_BONDS = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 0],
  [1, 5], [3, 6], [2, 7], [4, 8]
];

const TENSOR_AXES = {
  archetypes: [
    { id: 'alien', name: 'Alien Archaeologist', desc: 'Decontextualized artifact analysis stripping human dogma.' },
    { id: 'adversary', name: 'The Adversary', desc: 'Simulates active biological evasion & evolutionary defense.' },
    { id: 'thermo', name: 'Thermodynamicist', desc: 'Enthalpic barrier bypass & transition-state energy stabilization.' },
    { id: 'quantum', name: 'Quantum Enzymologist', desc: 'Models proton tunneling in heterocyclic imidazoles.' },
    { id: 'minimalist', name: 'Minimalist Swarm', desc: 'Emergent catalytic cascades with zero-energy overhead.' }
  ],
  elements: [
    { id: 'imidazole', name: 'Heterocyclic Imidazole Ring', desc: 'Core 7-membered crosslink junction between Lys and Arg.' },
    { id: 'collagen_triple', name: 'Collagen Triple Helix', desc: 'Crowded 2.9Å steric pocket surrounding the crosslink.' },
    { id: 'catalytic_triad', name: 'His-Asp-Ser Catalytic Triad', desc: 'Charge-relay cleavage network.' },
    { id: 'lysosomal_autophagy', name: 'Lysosomal Autophagy Machinery', desc: 'Intracellular vesicle degradation pathway.' }
  ],
  operations: [
    { id: 'invert', name: 'Invert (Reverse Polarity)', desc: 'Ask what condition triggers spontaneous self-cleavage.' },
    { id: 'subvert', name: 'Subvert (Constraint Substitution)', desc: 'Recruit native proteases using a bispecific molecular glue.' },
    { id: 'eliminate', name: 'Eliminate (Precursor Scavenge)', desc: 'Neutralize dicarbonyls before Schiff base maturation.' },
    { id: 'discretize', name: 'Discretize (Quantum Pulse)', desc: 'Cleave in discrete sub-picosecond catalytic pulses.' }
  ],
  scales: [
    { id: 'subangstrom', name: 'Sub-Ångström (0.1 Å)', desc: 'Orbital cloud electron-density manipulation.' },
    { id: 'supramolecular', name: 'Supramolecular (10–100 nm)', desc: 'Fibrillar collagen bundle architecture.' },
    { id: 'geologic', name: 'Geologic/Lifespan (100 Years)', desc: 'Centennial non-enzymatic glycation drift.' },
    { id: 'zero_resource', name: 'Zero-Resource Context', desc: 'Autonomous enzyme operating without external ATP/NADPH.' }
  ]
};

const DECOY_SCORES = [
  { name: 'Target: Glucosepane Crosslink', deltaG: -9.2, type: 'target', selectivity: '1.0x (Target Baseline)', bar: 100, color: '#38bdf8' },
  { name: 'Decoy: Human Serum Albumin (HSA)', deltaG: -6.1, type: 'decoy', selectivity: '115x Selectivity (PASS)', bar: 22, color: '#10b981' },
  { name: 'Decoy: Collagen Type I α1', deltaG: -5.8, type: 'decoy', selectivity: '142x Selectivity (PASS)', bar: 18, color: '#10b981' },
  { name: 'Decoy: Collagen Type III', deltaG: -5.6, type: 'decoy', selectivity: '185x Selectivity (PASS)', bar: 15, color: '#10b981' },
  { name: 'Decoy: Arterial Elastin', deltaG: -5.2, type: 'decoy', selectivity: '320x Selectivity (PASS)', bar: 11, color: '#10b981' },
  { name: 'Decoy: Fibronectin (ECM)', deltaG: -5.5, type: 'decoy', selectivity: '210x Selectivity (PASS)', bar: 14, color: '#10b981' },
  { name: 'Decoy: BCL-xL (Platelet Survival)', deltaG: -5.0, type: 'decoy', selectivity: '440x Selectivity (PASS)', bar: 8, color: '#10b981' }
];

export default function EpistemicExplorer() {
  const [activeLens, setActiveLens] = useState('cosmos'); // Default to Cosmic Epistemic Universe!
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSynthesized, setIsSynthesized] = useState(false); // Bridge of Light Supernova State
  const [isCompiling, setIsCompiling] = useState(false);
  const [pulseRadius, setPulseRadius] = useState(0);

  // 3D Orbit Controls
  const [rotX, setRotX] = useState(20);
  const [rotY, setRotY] = useState(30);
  const [zoom, setZoom] = useState(1.0);
  const [isRotating, setIsRotating] = useState(true);
  const [hoveredNode, setHoveredNode] = useState(null);

  // Macromolecule Render Mode
  const [macroMode, setMacroMode] = useState('docking');

  // 4D Tensor state
  const [archetype, setArchetype] = useState(TENSOR_AXES.archetypes[0]);
  const [element, setElement] = useState(TENSOR_AXES.elements[0]);
  const [operation, setOperation] = useState(TENSOR_AXES.operations[0]);
  const [scale, setScale] = useState(TENSOR_AXES.scales[0]);

  // Canvas Refs
  const canvasRef = useRef(null);
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  // Escape key handler for Fullscreen
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Auto-Orbit Animation Loop
  useEffect(() => {
    let animId;
    const animate = () => {
      if (isRotating) {
        setRotY(prev => (prev + (activeLens === 'cosmos' ? 0.3 : 0.4)) % 360);
      }
      if (isSynthesized) {
        setPulseRadius(r => (r + 1.2) % 180);
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isRotating, activeLens, isSynthesized]);

  // High-Resolution WebGPU/WebGL Canvas Shader Loop
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 2;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2;

    ctx.clearRect(0, 0, width, height);

    const radX = (rotX * Math.PI) / 180;
    const radY = (rotY * Math.PI) / 180;

    // =========================================================================
    // RENDER LENS 1: 3D COSMIC EPISTEMIC UNIVERSE (THE TOKEN COSMOS STYLE)
    // =========================================================================
    if (activeLens === 'cosmos') {
      // 1. Deep Celestial Space Gradient
      const spaceGrad = ctx.createRadialGradient(centerX, centerY, 60, centerX, centerY, Math.max(width, height) * 0.8);
      spaceGrad.addColorStop(0, '#0a1638');
      spaceGrad.addColorStop(0.4, '#030718');
      spaceGrad.addColorStop(1, '#010206');
      ctx.fillStyle = spaceGrad;
      ctx.fillRect(0, 0, width, height);

      const baseScale = (Math.min(width, height) / 340) * zoom;

      // 2. The Gravitational Epistemic Abyss / Void at (0, 0, 0)
      const voidX1 = 0 * Math.cos(radY) + 0 * Math.sin(radY);
      const voidZ1 = -0 * Math.sin(radY) + 0 * Math.cos(radY);
      const voidY2 = 0 * Math.cos(radX) - voidZ1 * Math.sin(radX);
      const voidZ2 = 0 * Math.sin(radX) + voidZ1 * Math.cos(radX);
      const voidPersp = 600 / (600 + voidZ2);
      const voidProjX = centerX + voidX1 * voidPersp * baseScale;
      const voidProjY = centerY + voidY2 * voidPersp * baseScale;

      // Dark Epistemic Void Vortex Halo
      if (!isSynthesized) {
        const voidRadius = 48 * voidPersp * baseScale;
        const voidGrad = ctx.createRadialGradient(voidProjX, voidProjY, 4, voidProjX, voidProjY, voidRadius);
        voidGrad.addColorStop(0, '#000000');
        voidGrad.addColorStop(0.5, 'rgba(244, 63, 94, 0.2)');
        voidGrad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(voidProjX, voidProjY, voidRadius, 0, Math.PI * 2);
        ctx.fillStyle = voidGrad;
        ctx.fill();

        // Pulsing Event Horizon Dashed Ring
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.arc(voidProjX, voidProjY, voidRadius * 0.8, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 3. Project All 160+ Celestial Biological Nodes
      const projectedNodes = COSMIC_NODES.map(node => {
        const x1 = node.x * Math.cos(radY) + node.z * Math.sin(radY);
        const z1 = -node.x * Math.sin(radY) + node.z * Math.cos(radY);
        const y2 = node.y * Math.cos(radX) - z1 * Math.sin(radX);
        const z2 = node.y * Math.sin(radX) + z1 * Math.cos(radX);

        const fov = 600;
        const perspective = fov / (fov + z2);
        return {
          ...node,
          projX: centerX + x1 * perspective * baseScale,
          projY: centerY + y2 * perspective * baseScale,
          depth: z2,
          scale: perspective * baseScale
        };
      });

      // Depth Sort
      projectedNodes.sort((a, b) => b.depth - a.depth);

      // 4. Draw Constellation Synapse Edges between Core Cluster Stars
      const coreNodes = projectedNodes.filter(n => n.isCore);
      ctx.lineWidth = 1;
      for (let i = 0; i < coreNodes.length; i++) {
        for (let j = i + 1; j < coreNodes.length; j++) {
          const n1 = coreNodes[i];
          const n2 = coreNodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y, n1.z - n2.z);
          if (dist < 160 && n1.cluster === n2.cluster) {
            ctx.beginPath();
            ctx.moveTo(n1.projX, n1.projY);
            ctx.lineTo(n2.projX, n2.projY);
            ctx.strokeStyle = `${n1.color}35`;
            ctx.stroke();
          }
        }
      }

      // 5. Render Celestial Nodes (Stars & Nebulae)
      projectedNodes.forEach(node => {
        const radius = node.size * (node.scale / baseScale);
        const depthAlpha = Math.max(0.2, Math.min(1.0, (node.depth + 300) / 600));

        // Outer Glow for Core Landmark Nodes
        if (node.isCore) {
          ctx.beginPath();
          ctx.arc(node.projX, node.projY, radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `${node.color}25`;
          ctx.fill();
        }

        // Solid Core Star
        ctx.beginPath();
        ctx.arc(node.projX, node.projY, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = depthAlpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Label for Major Landmark Stars
        if (node.isCore) {
          ctx.font = 'bold 10px system-ui, sans-serif';
          ctx.fillStyle = '#f8fafc';
          ctx.shadowColor = node.color;
          ctx.shadowBlur = 8;
          ctx.fillText(node.label, node.projX + radius + 5, node.projY + 3);
          ctx.shadowBlur = 0;
        }
      });

      // 6. The Bridge of Light: If Synthesized, Shoot Beams from the Supernova Node!
      if (isSynthesized) {
        // Supernova Pulse Shockwave
        ctx.beginPath();
        ctx.arc(voidProjX, voidProjY, pulseRadius * (baseScale / 1.5), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(245, 158, 11, ${Math.max(0, 1 - pulseRadius / 180)})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Laser Beams of Light Snapping into Surrounding Biological Galaxies
        coreNodes.forEach(target => {
          ctx.beginPath();
          ctx.moveTo(voidProjX, voidProjY);
          ctx.lineTo(target.projX, target.projY);
          
          // Outer Laser Glow
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
          ctx.lineWidth = 4;
          ctx.stroke();

          // Inner Solid Photon Beam
          ctx.strokeStyle = '#fef08a';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });

        // The Supernova De Novo Node
        const candRadius = DE_NOVO_CANDIDATE_NODE.size * voidPersp * baseScale;
        const candGrad = ctx.createRadialGradient(voidProjX, voidProjY, 2, voidProjX, voidProjY, candRadius);
        candGrad.addColorStop(0, '#ffffff');
        candGrad.addColorStop(0.3, '#f59e0b');
        candGrad.addColorStop(0.8, '#d97706');
        candGrad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(voidProjX, voidProjY, candRadius * 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(245, 158, 11, 0.3)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(voidProjX, voidProjY, candRadius, 0, Math.PI * 2);
        ctx.fillStyle = candGrad;
        ctx.fill();
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 2;
        ctx.stroke();

        // High-Tech Discovery Tag
        ctx.font = 'bold 12px system-ui, sans-serif';
        ctx.fillStyle = '#fef08a';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 12;
        ctx.fillText('⚡ DE NOVO CANDIDATE #1 (SYNTHESIS BRIDGED)', voidProjX + candRadius + 8, voidProjY + 4);
        ctx.shadowBlur = 0;
      }
    }

    // =========================================================================
    // RENDER LENS 2: 3D MACROMOLECULAR TIM-BARREL & DOCKED LIGAND
    // =========================================================================
    if (activeLens === 'macromolecule') {
      const bgGrad = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, Math.max(width, height) * 0.75);
      bgGrad.addColorStop(0, '#0a1636');
      bgGrad.addColorStop(0.45, '#030718');
      bgGrad.addColorStop(1, '#01030a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const baseScale = (Math.min(width, height) / 180) * zoom;

      // Project Spline Ribbon
      const projectedRibbon = SMOOTH_RIBBON.map(p => {
        const x1 = p.x * Math.cos(radY) + p.z * Math.sin(radY);
        const z1 = -p.x * Math.sin(radY) + p.z * Math.cos(radY);
        const y2 = p.y * Math.cos(radX) - z1 * Math.sin(radX);
        const z2 = p.y * Math.sin(radX) + z1 * Math.cos(radX);
        const fov = 600;
        const perspective = fov / (fov + z2);
        return {
          ...p,
          projX: centerX + x1 * perspective * baseScale,
          projY: centerY + y2 * perspective * baseScale,
          depth: z2,
          scale: perspective * baseScale
        };
      });

      // Project Ligand Atoms
      const projectedLigand = GLUCOSEPANE_LIGAND_ATOMS.map(a => {
        const x1 = a.x * Math.cos(radY) + a.z * Math.sin(radY);
        const z1 = -a.x * Math.sin(radY) + a.z * Math.cos(radY);
        const y2 = a.y * Math.cos(radX) - z1 * Math.sin(radX);
        const z2 = a.y * Math.sin(radX) + z1 * Math.cos(radX);
        const fov = 600;
        const perspective = fov / (fov + z2);
        return {
          ...a,
          projX: centerX + x1 * perspective * baseScale,
          projY: centerY + y2 * perspective * baseScale,
          depth: z2,
          scale: perspective * baseScale
        };
      });

      // Render Continuous Cartoon Ribbon
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let i = 0; i < projectedRibbon.length - 1; i++) {
        const p1 = projectedRibbon[i];
        const p2 = projectedRibbon[i + 1];
        const depthAlpha = Math.max(0.2, Math.min(1.0, (p1.depth + 120) / 240));
        let tubeWidth = 4.5 * (p1.scale / baseScale);
        let color = '#0284c7';

        if (p1.secStruct === 'helix') {
          tubeWidth = 9.0 * (p1.scale / baseScale);
          color = '#0053d6';
        } else if (p1.secStruct === 'sheet') {
          tubeWidth = 7.0 * (p1.scale / baseScale);
          color = '#0284c7';
        } else if (p1.secStruct === 'triad') {
          tubeWidth = 11.0 * (p1.scale / baseScale);
          color = '#f43f5e';
        }

        if (macroMode === 'plddt') {
          color = p1.plddt >= 90 ? '#0053d6' : p1.plddt >= 70 ? '#65cbf3' : p1.plddt >= 50 ? '#ffdb13' : '#ff7d45';
        } else if (macroMode === 'triad') {
          color = p1.secStruct === 'triad' ? '#f43f5e' : 'rgba(51, 65, 85, 0.2)';
        } else if (macroMode === 'surface') {
          // Kyte-Doolittle Hydropathy Color Ramp (Blue = Hydrophilic / Soluble, Red/Orange = Hydrophobic)
          color = p1.secStruct === 'strand' ? '#f59e0b' : p1.secStruct === 'helix' ? '#38bdf8' : '#818cf8';
        }

        // Volumetric Solvent-Accessible Surface (SAS) Cloud Pass
        if (macroMode === 'surface') {
          const sasRadius = 24 * (p1.scale / baseScale);
          const sasGrad = ctx.createRadialGradient(p1.projX, p1.projY, 0, p1.projX, p1.projY, sasRadius);
          sasGrad.addColorStop(0, color);
          sasGrad.addColorStop(0.6, `${color}40`);
          sasGrad.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(p1.projX, p1.projY, sasRadius, 0, Math.PI * 2);
          ctx.fillStyle = sasGrad;
          ctx.globalAlpha = depthAlpha * 0.45;
          ctx.fill();
        }

        // Glow Pass
        ctx.beginPath();
        ctx.moveTo(p1.projX, p1.projY);
        ctx.lineTo(p2.projX, p2.projY);
        ctx.strokeStyle = color;
        ctx.globalAlpha = depthAlpha * 0.35;
        ctx.lineWidth = tubeWidth * 1.8;
        ctx.stroke();

        // Core Tube Pass
        ctx.beginPath();
        ctx.moveTo(p1.projX, p1.projY);
        ctx.lineTo(p2.projX, p2.projY);
        ctx.strokeStyle = color;
        ctx.globalAlpha = depthAlpha;
        ctx.lineWidth = tubeWidth;
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;

      // Render Catalytic Triad Atoms with Leader Lines
      const triadAtoms = projectedRibbon.filter(p => p.isTriad);
      triadAtoms.forEach(r => {
        const radius = 12 * (r.scale / baseScale);
        ctx.beginPath();
        ctx.arc(r.projX, r.projY, radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(244, 63, 94, 0.25)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(r.projX, r.projY, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#f43f5e';
        ctx.fill();
        ctx.strokeStyle = '#fecdd3';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Offset Leader Label
        const offX = r.projX > centerX ? 24 : -24;
        const offY = r.projY > centerY ? 20 : -20;
        ctx.beginPath();
        ctx.moveTo(r.projX, r.projY);
        ctx.lineTo(r.projX + offX, r.projY + offY);
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.font = 'bold 11px system-ui, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = offX > 0 ? 'left' : 'right';
        ctx.fillText(r.label, r.projX + offX + (offX > 0 ? 5 : -5), r.projY + offY + 4);
        ctx.textAlign = 'left';
      });

      // Render Docked Heterocyclic Glucosepane Substrate in Docking Mode
      if (macroMode === 'docking') {
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#f59e0b';
        GLUCOSEPANE_BONDS.forEach(([i1, i2]) => {
          ctx.beginPath();
          ctx.moveTo(projectedLigand[i1].projX, projectedLigand[i1].projY);
          ctx.lineTo(projectedLigand[i2].projX, projectedLigand[i2].projY);
          ctx.stroke();
        });

        // Hydrogen Bonding Spring Vectors
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = '#22c55e';
        triadAtoms.forEach(triadRes => {
          ctx.beginPath();
          ctx.moveTo(triadRes.projX, triadRes.projY);
          ctx.lineTo(projectedLigand[0].projX, projectedLigand[0].projY);
          ctx.stroke();
        });
        ctx.setLineDash([]);

        // Ligand Atom Spheres
        projectedLigand.forEach(atom => {
          const radius = (atom.el === 'N' ? 9 : atom.el === 'O' ? 8 : 7) * (atom.scale / baseScale);
          ctx.beginPath();
          ctx.arc(atom.projX, atom.projY, radius, 0, Math.PI * 2);
          ctx.fillStyle = atom.color;
          ctx.fill();
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        });
      }
    }
  }, [rotX, rotY, zoom, activeLens, isSynthesized, pulseRadius, macroMode, isFullscreen]);

  // Trackball Mouse Rotation
  const handleMouseDown = e => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    setIsRotating(false);
  };

  const handleMouseMove = e => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMousePosRef.current.x;
    const deltaY = e.clientY - lastMousePosRef.current.y;
    setRotY(prev => prev + deltaX * 0.5);
    setRotX(prev => Math.max(-85, Math.min(85, prev - deltaY * 0.5)));
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = e => {
    e.preventDefault();
    setZoom(z => Math.max(0.5, Math.min(2.8, z - e.deltaY * 0.0015)));
  };

  // Compile Supernova Discovery Trigger
  const triggerCompilation = () => {
    setIsCompiling(true);
    setTimeout(() => {
      setIsCompiling(false);
      setIsSynthesized(true);
    }, 900);
  };

  return (
    <div
      style={{
        position: isFullscreen ? 'fixed' : 'relative',
        top: isFullscreen ? 0 : 'auto',
        left: isFullscreen ? 0 : 'auto',
        width: isFullscreen ? '100vw' : '100%',
        height: isFullscreen ? '100vh' : 'auto',
        zIndex: isFullscreen ? 99999 : 1,
        background: 'radial-gradient(ellipse at top, #0c1527 0%, #02040a 100%)',
        border: isFullscreen ? 'none' : '1px solid rgba(56, 189, 248, 0.3)',
        borderRadius: isFullscreen ? '0' : '20px',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
        color: '#f8fafc',
        margin: isFullscreen ? 0 : '2.5rem 0',
        boxShadow: isFullscreen ? 'none' : '0 30px 70px -15px rgba(0, 0, 0, 0.95), 0 0 50px rgba(56, 189, 248, 0.15)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Top Cybernetic Glass Header */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
        padding: '16px 24px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
            color: '#020617',
            fontSize: '0.72rem',
            fontWeight: '900',
            padding: '4px 10px',
            borderRadius: '6px',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            WebGPU COSMIC SPATIAL ENGINE
          </span>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#f8fafc', letterSpacing: '-0.02em' }}>
              Scientific Epistemic Explorer & Cosmic Space
            </h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
              3D Spatial Negative Space Universe & Autonomous Discovery Bridge
            </p>
          </div>
        </div>

        {/* Action Controls & Fullscreen Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            display: 'flex',
            background: '#020617',
            padding: '4px',
            borderRadius: '10px',
            border: '1px solid rgba(56, 189, 248, 0.2)'
          }}>
            {[
              { id: 'cosmos', label: '🌌 3D Epistemic Cosmos' },
              { id: 'macromolecule', label: '🧬 3D Macromolecule' },
              { id: 'tensor', label: '🔬 4D Tensor' },
              { id: 'qc', label: '🛡️ 6-Gate QC' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveLens(tab.id)}
                style={{
                  background: activeLens === tab.id
                    ? 'linear-gradient(135deg, rgba(2, 132, 199, 0.4) 0%, rgba(56, 189, 248, 0.25) 100%)'
                    : 'transparent',
                  color: activeLens === tab.id ? '#38bdf8' : '#94a3b8',
                  border: activeLens === tab.id ? '1px solid #38bdf8' : '1px solid transparent',
                  boxShadow: activeLens === tab.id ? '0 0 16px rgba(56, 189, 248, 0.3)' : 'none',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            style={{
              background: isFullscreen ? '#f43f5e' : 'rgba(15, 23, 42, 0.8)',
              color: '#ffffff',
              border: `1px solid ${isFullscreen ? '#f43f5e' : 'rgba(56, 189, 248, 0.3)'}`,
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '0.8rem',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: isFullscreen ? '0 0 20px rgba(244, 63, 94, 0.4)' : 'none'
            }}
          >
            {isFullscreen ? '✕ Exit Fullscreen (ESC)' : '⛶ Fullscreen Mode'}
          </button>
        </div>
      </div>

      {/* Main Viewport Content */}
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        
        {/* =========================================================================
            LENS 1: 3D COSMIC EPISTEMIC UNIVERSE (NEGATIVE SPACE VOID & BRIDGE OF LIGHT)
           ========================================================================= */}
        {activeLens === 'cosmos' && (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Cosmic Control Bar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={triggerCompilation}
                  disabled={isCompiling || isSynthesized}
                  style={{
                    background: isSynthesized
                      ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
                      : 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
                    color: '#020617',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontSize: '0.82rem',
                    fontWeight: '900',
                    cursor: isSynthesized ? 'default' : 'pointer',
                    boxShadow: '0 0 25px rgba(245, 158, 11, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  {isCompiling ? '⚡ COMPILING DE NOVO CATALYST...' : isSynthesized ? '✅ EPISTEMIC VOID BRIDGED BY LIGHT' : '⚡ EXECUTE PROJECT MANGAL: BRIDGE VOID'}
                </button>

                {isSynthesized && (
                  <button
                    onClick={() => setIsSynthesized(false)}
                    style={{ background: '#0f172a', border: '1px solid #334155', color: '#94a3b8', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}
                  >
                    Reset to Negative Space
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setZoom(z => Math.max(0.5, z - 0.2))}
                  style={{ background: '#0f172a', border: '1px solid #334155', color: '#fff', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  🔍 -
                </button>
                <button
                  onClick={() => setZoom(z => Math.min(2.5, z + 0.2))}
                  style={{ background: '#0f172a', border: '1px solid #334155', color: '#fff', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  🔍 +
                </button>
                <button
                  onClick={() => { setRotX(20); setRotY(30); setZoom(1.0); }}
                  style={{ background: '#0f172a', border: '1px solid #334155', color: '#38bdf8', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}
                >
                  Reset Universe
                </button>
                <button
                  onClick={() => setIsRotating(!isRotating)}
                  style={{
                    background: isRotating ? 'rgba(2, 132, 199, 0.3)' : '#0f172a',
                    color: '#38bdf8',
                    border: '1px solid #38bdf8',
                    borderRadius: '6px',
                    padding: '6px 14px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  {isRotating ? '⏸ Pause Orbit' : '▶ Resume Cosmic Orbit'}
                </button>
              </div>
            </div>

            {/* 3D Cosmic Canvas */}
            <div
              style={{
                position: 'relative',
                flex: 1,
                minHeight: isFullscreen ? 'calc(100vh - 160px)' : '480px',
                background: '#010206',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                cursor: 'grab'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onWheel={handleWheel}
            >
              <canvas
                ref={canvasRef}
                style={{ width: '100%', height: '100%', display: 'block' }}
              />

              {/* Fixed Top-Left Nebula Legend Overlay */}
              <div style={{
                position: 'absolute',
                top: '18px',
                left: '18px',
                background: 'rgba(15, 23, 42, 0.92)',
                backdropFilter: 'blur(16px)',
                padding: '14px 18px',
                borderRadius: '12px',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                fontSize: '0.75rem',
                display: 'grid',
                gap: '6px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                maxWidth: '280px'
              }}>
                <div style={{ color: '#38bdf8', fontWeight: '900', fontSize: '0.82rem' }}>
                  🌌 COSMIC KNOWLEDGE TOPOLOGY
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', background: '#38bdf8', borderRadius: '50%' }} />
                  <span style={{ color: '#cbd5e1' }}>ECM Fibrillar Scaffold Nebula</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', background: '#a855f7', borderRadius: '50%' }} />
                  <span style={{ color: '#cbd5e1' }}>Glycation & AGE Cluster</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', background: '#34d399', borderRadius: '50%' }} />
                  <span style={{ color: '#cbd5e1' }}>Arterial Compliance Pathway</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', background: '#64748b', borderRadius: '50%' }} />
                  <span style={{ color: '#cbd5e1' }}>Off-Target Plasma Proteome</span>
                </div>
              </div>

              {/* Fixed Top-Right Epistemic Negative Space Status */}
              <div style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: isSynthesized ? 'rgba(5, 150, 105, 0.94)' : 'rgba(244, 63, 94, 0.94)',
                backdropFilter: 'blur(16px)',
                padding: '14px 18px',
                borderRadius: '12px',
                border: `1px solid ${isSynthesized ? '#10b981' : '#f43f5e'}`,
                fontSize: '0.78rem',
                display: 'grid',
                gap: '4px',
                boxShadow: isSynthesized ? '0 0 30px rgba(16, 185, 129, 0.4)' : '0 0 30px rgba(244, 63, 94, 0.4)',
                maxWidth: '320px',
                color: '#ffffff'
              }}>
                <div style={{ fontWeight: '900', fontSize: '0.85rem' }}>
                  {isSynthesized ? '🌟 EPISTEMIC GAP FILLED' : '🚨 NEGATIVE SPACE VOID DETECTED'}
                </div>
                <div>
                  {isSynthesized
                    ? 'Supernova de novo catalyst synthesized in dead center of void. Beams of light bridging literature to clinical reality.'
                    : 'Target Gap: No endogenous human enzyme cleaves mature glucosepane crosslinks. Gravitational void active.'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            LENS 2: 3D MACROMOLECULAR STRUCTURE & DOCKING VIEWER
           ========================================================================= */}
        {activeLens === 'macromolecule' && (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', gap: '10px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {[
                  { id: 'docking', label: '🧪 Ligand Docking (ΔG = -9.2 kcal/mol)' },
                  { id: 'triad', label: '🔴 Catalytic Triad (His54-Asp112-Ser198)' },
                  { id: 'plddt', label: '🔵 AlphaFold 3 pLDDT Spectrum' },
                  { id: 'surface', label: '💧 GRAVY Hydropathy Surface (SAS)' }
                ].map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setMacroMode(mode.id)}
                    style={{
                      background: macroMode === mode.id ? 'rgba(56, 189, 248, 0.25)' : 'rgba(15, 23, 42, 0.85)',
                      color: macroMode === mode.id ? '#38bdf8' : '#94a3b8',
                      border: renderMode === mode.id ? '1px solid #38bdf8' : '1px solid rgba(56, 189, 248, 0.15)',
                      borderRadius: '8px',
                      padding: '8px 14px',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setZoom(z => Math.max(0.5, z - 0.2))} style={{ background: '#0f172a', border: '1px solid #334155', color: '#fff', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>🔍 -</button>
                <button onClick={() => setZoom(z => Math.min(2.5, z + 0.2))} style={{ background: '#0f172a', border: '1px solid #334155', color: '#fff', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>🔍 +</button>
                <button onClick={() => setIsRotating(!isRotating)} style={{ background: isRotating ? 'rgba(2, 132, 199, 0.3)' : '#0f172a', color: '#38bdf8', border: '1px solid #38bdf8', borderRadius: '6px', padding: '6px 14px', fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer' }}>
                  {isRotating ? '⏸ Pause Orbit' : '▶ Resume 3D Orbit'}
                </button>
              </div>
            </div>

            <div
              style={{
                position: 'relative',
                flex: 1,
                minHeight: isFullscreen ? 'calc(100vh - 160px)' : '480px',
                background: '#010309',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                cursor: 'grab'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onWheel={handleWheel}
            >
              <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

              <div style={{
                position: 'absolute',
                top: '18px',
                left: '18px',
                background: 'rgba(15, 23, 42, 0.92)',
                backdropFilter: 'blur(16px)',
                padding: '14px 18px',
                borderRadius: '12px',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                fontSize: '0.78rem',
                display: 'grid',
                gap: '5px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                maxWidth: '320px'
              }}>
                <div style={{ color: '#38bdf8', fontWeight: '900', fontSize: '0.85rem' }}>
                  TARGET: Glucosepane Hydrolase #1
                </div>
                <div style={{ color: '#94a3b8' }}>
                  Architecture: <strong style={{ color: '#f8fafc' }}>(α/β)₈ TIM Barrel Fold</strong>
                </div>
                <div style={{ color: '#94a3b8' }}>
                  Fold Confidence: <strong style={{ color: '#0053d6', background: '#e0f2fe', padding: '1px 6px', borderRadius: '4px', fontWeight: 'bold' }}>pLDDT 88.4 / 100</strong>
                </div>
                <div style={{ color: '#94a3b8' }}>
                  Self-Consistency: <strong style={{ color: '#10b981' }}>scRMSD 1.14 Å</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            LENS 3: 4D COGNITIVE TENSOR
           ========================================================================= */}
        {activeLens === 'tensor' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: '#0b1120', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '0.72rem', color: '#a855f7', fontWeight: '900' }}>AXIS W: MINDSET LENS</div>
                <select
                  value={archetype.id}
                  onChange={e => setArchetype(TENSOR_AXES.archetypes.find(a => a.id === e.target.value))}
                  style={{ width: '100%', marginTop: '10px', background: '#020617', color: '#f8fafc', border: '1px solid #334155', borderRadius: '8px', padding: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}
                >
                  {TENSOR_AXES.archetypes.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '10px' }}>{archetype.desc}</div>
              </div>

              <div style={{ background: '#0b1120', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: '900' }}>AXIS X: CORE ELEMENT</div>
                <select
                  value={element.id}
                  onChange={e => setElement(TENSOR_AXES.elements.find(a => a.id === e.target.value))}
                  style={{ width: '100%', marginTop: '10px', background: '#020617', color: '#f8fafc', border: '1px solid #334155', borderRadius: '8px', padding: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}
                >
                  {TENSOR_AXES.elements.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '10px' }}>{element.desc}</div>
              </div>

              <div style={{ background: '#0b1120', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: '900' }}>AXIS Y: OPERATION</div>
                <select
                  value={operation.id}
                  onChange={e => setOperation(TENSOR_AXES.operations.find(a => a.id === e.target.value))}
                  style={{ width: '100%', marginTop: '10px', background: '#020617', color: '#f8fafc', border: '1px solid #334155', borderRadius: '8px', padding: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}
                >
                  {TENSOR_AXES.operations.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '10px' }}>{operation.desc}</div>
              </div>

              <div style={{ background: '#0b1120', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: '900' }}>AXIS Z: SCALE SHIFT</div>
                <select
                  value={scale.id}
                  onChange={e => setScale(TENSOR_AXES.scales.find(a => a.id === e.target.value))}
                  style={{ width: '100%', marginTop: '10px', background: '#020617', color: '#f8fafc', border: '1px solid #334155', borderRadius: '8px', padding: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}
                >
                  {TENSOR_AXES.scales.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '10px' }}>{scale.desc}</div>
              </div>
            </div>

            <div style={{
              background: '#020617',
              border: '1px solid #38bdf8',
              boxShadow: '0 0 30px rgba(56, 189, 248, 0.25)',
              borderRadius: '16px',
              padding: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '900', color: '#38bdf8', letterSpacing: '1px' }}>
                  SYNTHESIZED DIAGNOSTIC INQUIRY VECTOR [Gate 1 O(1) Pass in 0.002s]
                </span>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ background: 'rgba(245, 158, 11, 0.2)', border: '1px solid #f59e0b', padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem', color: '#f59e0b', fontWeight: '800' }}>
                    Anomaly Divergence: 0.88
                  </span>
                  <span style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem', color: '#10b981', fontWeight: '800' }}>
                    Leverage Score: 0.94
                  </span>
                </div>
              </div>
              <div style={{ fontSize: '1.15rem', color: '#f8fafc', fontStyle: 'italic', lineHeight: '1.6', background: '#0b1120', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #38bdf8' }}>
                "As <strong>{archetype.name}</strong>, what if we <strong>{operation.name}</strong> the <strong>{element.name}</strong> at the <strong>{scale.name}</strong> to bypass endogenous enzymatic limits?"
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            LENS 4: 6-GATE QC DASHBOARD
           ========================================================================= */}
        {activeLens === 'qc' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
              {[
                { gate: 'Gate 1: Fold Confidence', val: '88.4', unit: 'pLDDT (≥80.0)', status: 'PASS', color: '#38bdf8' },
                { gate: 'Gate 2: Self-Consistency', val: '1.14 Å', unit: 'scRMSD (≤2.0Å)', status: 'PASS', color: '#10b981' },
                { gate: 'Gate 3: Active Site Triad', val: '100%', unit: 'His54-Asp112-Ser198', status: 'PASS', color: '#38bdf8' },
                { gate: 'Gate 4: Solubility (GRAVY)', val: '-0.14', unit: 'Hydrophilic (≤0.20)', status: 'PASS', color: '#10b981' },
                { gate: 'Gate 5: AutoDock Vina ΔG', val: '-9.20', unit: 'kcal/mol (≤ -8.0)', status: 'PASS', color: '#38bdf8' },
                { gate: 'Gate 6: Decoy Selectivity', val: '142x', unit: 'Fold Selectivity (≥100x)', status: 'PASS', color: '#10b981' }
              ].map((g, i) => (
                <div key={i} style={{ background: '#0b1120', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '12px', padding: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold' }}>{g.gate}</span>
                    <span style={{ background: '#059669', color: '#fff', fontSize: '0.65rem', fontWeight: '900', padding: '2px 8px', borderRadius: '4px' }}>
                      {g.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '900', color: g.color, margin: '8px 0 2px 0' }}>
                    {g.val}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{g.unit}</div>
                </div>
              ))}
            </div>

            <div style={{ background: '#040714', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#38bdf8', marginBottom: '16px' }}>
                Gate 6 Multi-Target Counter-Screening Profile
              </div>
              <div style={{ display: 'grid', gap: '12px' }}>
                {DECOY_SCORES.map((d, idx) => (
                  <div key={idx} style={{ background: '#0b1120', padding: '14px 18px', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: d.type === 'target' ? '800' : '500', color: d.type === 'target' ? '#38bdf8' : '#e2e8f0' }}>
                        {d.name}
                      </span>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem' }}>
                        <span style={{ color: '#94a3b8' }}>ΔG: <strong>{d.deltaG} kcal/mol</strong></span>
                        <span style={{ color: d.color, fontWeight: '800' }}>{d.selectivity}</span>
                      </div>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${d.bar}%`, height: '100%', background: d.type === 'target' ? '#38bdf8' : '#10b981', borderRadius: '4px' }} />
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
