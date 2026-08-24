import React, { useState } from "react";

const SCAFFOLD_TOPICS = [
  {
    id: "state_file",
    title: "1. The State File (.tfstate)",
    subtitle: "Mapping Logical Addresses to Physical Cloud IDs",
    anchor: {
      concept: "The Warehouse Inventory Ledger",
      analogy:
        "Think of the state file like an inventory ledger in a warehouse. It records what items you ordered on purchase receipts versus what is physically sitting on the warehouse shelves.",
      cognitiveBenefit:
        "Instantly explains why Terraform needs to remember existing resources instead of querying everything from scratch.",
    },
    shatter: {
      flaw: "A ledger only records static quantity counts. It has zero concept of topological dependency order.",
      breakdown:
        "If you delete a row in an accounting ledger, nothing physically collapses. In Terraform, if you destroy a subnet before removing the virtual machines inside it, the cloud API throws a DependencyViolation error. A ledger cannot resolve which resources must be torn down first.",
      dangerOfAnalogy:
        "Engineers who treat state as 'just a database' attempt manual SQL/JSON edits and corrupt the topological dependency graph.",
    },
    bareMetal: {
      firstPrinciple:
        "Serialized JSON Representation of a Directed Acyclic Graph (DAG)",
      mechanism:
        "The .tfstate file records monotonic serial counters, lineage UUIDs, and explicit provider-allocated physical IDs. When evaluated during the 3-Way Merge, the graph walker topologically sorts node dependencies to execute atomic HTTP CRUD calls in strict mathematical order.",
    },
  },
  {
    id: "reconciliation_engine",
    title: "2. The Reconciliation Engine",
    subtitle: "Plan vs Apply State Transitions",
    anchor: {
      concept: "The Bank Account Auditor",
      analogy:
        "Think of Terraform like an accountant comparing three documents: your monthly budget (Desired), your checkbook register (Prior), and your official bank statement (Live Reality).",
      cognitiveBenefit:
        "Gives beginners an intuitive scaffold for understanding why Terraform compares 3 different sources of truth.",
    },
    shatter: {
      flaw: "An accountant merely flags discrepancies on paper. Terraform actively mutates reality.",
      breakdown:
        "An auditor does not automatically withdraw money from your account or deposit missing funds. Terraform doesn't just produce a diff report; it dispatches raw TCP/TLS network sockets to cloud hypervisors to violently force Live Reality to match your code.",
      dangerOfAnalogy:
        "Engineers assume 'terraform plan' is safe because it's just an audit, forgetting that 'terraform apply' can execute irreversible physical resource destruction.",
    },
    bareMetal: {
      firstPrinciple: "Deterministic 3-Way Merge Algorithm (D × P × R)",
      mechanism:
        "Terraform evaluates an 8-state mathematical truth table across Desired State (D), Prior State (P), and Live Reality (R). It calculates planned mutation deltas and routes them to Go provider CRUD methods over gRPC IPC.",
    },
  },
  {
    id: "provider_plugins",
    title: "3. Provider Plugins & IPC",
    subtitle: "Core Engine to Cloud Control Plane Bridge",
    anchor: {
      concept: "The USB Peripheral Driver",
      analogy:
        "Think of a Terraform provider like a printer driver or USB mouse driver you plug into your operating system so it knows how to talk to external hardware.",
      cognitiveBenefit:
        "Explains why Terraform Core is cloud-agnostic and doesn't hardcode AWS or Azure APIs.",
    },
    shatter: {
      flaw: "Device drivers run inside the kernel/OS address space. Provider plugins are isolated operating system child processes.",
      breakdown:
        "If a printer driver crashes in kernel space, the entire OS experiences a kernel panic. In Terraform, Core spawns providers as standalone child processes communicating exclusively over local Unix domain sockets or named pipes.",
      dangerOfAnalogy:
        "Engineers assume providers share in-memory pointers with Terraform Core, failing to realize every schema and attribute must be serialized into Protocol Buffers over gRPC.",
    },
    bareMetal: {
      firstPrinciple: "gRPC Inter-Process Communication (Protocol v6)",
      mechanism:
        "Core executes fork() and execve() to launch the provider binary. The plugin writes a magic handshake cookie to stdout, opens a Unix domain socket (/tmp/tf-plugin-xxxx.sock), and processes protobuf RPC requests independently.",
    },
  },
  {
    id: "forcenew_trap",
    title: "4. The ForceNew Outage Trap",
    subtitle: "Resource Replacement vs In-Place Updates",
    anchor: {
      concept: "The Room Renovation",
      analogy:
        "Think of updating infrastructure like renovating a kitchen. You repaint the cabinets (in-place update) or replace the appliances to modernize the house.",
      cognitiveBenefit:
        "Explains how declarative code updates translate to infrastructure changes.",
    },
    shatter: {
      flaw: "Renovating a room doesn't require bulldozing the entire house to the ground first.",
      breakdown:
        "When a cloud attribute is immutable in the provider schema (ForceNew: true, such as changing an EC2 Subnet or RDS Storage Type), Terraform's default behavior is Destroy-then-Create (-/+). It destroys your live database before building the replacement.",
      dangerOfAnalogy:
        "Assuming an update will happen in-place leads to instant, catastrophic multi-hour unplanned production outages.",
    },
    bareMetal: {
      firstPrinciple: "Schema Immutability & Atomic Re-creation Lifecycle",
      mechanism:
        "If a plan modifier returns RequiresReplace(), Core flags the node for destruction. Engineers must explicitly declare 'lifecycle { create_before_destroy = true }' to invert the DAG sequence and provision the new asset before retiring the old.",
    },
  },
  {
    id: "state_locking",
    title: "5. Distributed State Locking",
    subtitle: "Multi-Engineer Concurrency & Mutexes",
    anchor: {
      concept: "The Bathroom Door Lock",
      analogy:
        "Think of state locking like locking a single-occupancy bathroom door. When you're inside, nobody else can enter until you turn the handle to unlock.",
      cognitiveBenefit:
        "Clearly illustrates why two engineers cannot apply changes at the exact same second.",
    },
    shatter: {
      flaw: "Physical locks rely on tangible presence. Distributed systems suffer from network partitions and split-brain states.",
      breakdown:
        "A bathroom lock cannot be bypassed by an expired network lease. In distributed cloud environments, clock drift, network timeouts, or crashed CI/CD runners can leave orphaned lock digests, risking race condition writes.",
      dangerOfAnalogy:
        "Engineers blindly run 'terraform force-unlock' without checking DynamoDB lock IDs, accidentally causing split-brain state corruption.",
    },
    bareMetal: {
      firstPrinciple: "Atomic Conditional Check Writes (attribute_not_exists)",
      mechanism:
        "Terraform uses distributed mutex algorithms (e.g. AWS DynamoDB PutItem with ConditionExpression: attribute_not_exists(LockID)). MD5 digests, ISO timestamps, and UUIDs guarantee serial linearizability across distributed runners.",
    },
  },
];

export default function TerraformScaffoldAndShatter() {
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(0); // 0: Anchor, 1: Shatter, 2: Bare Metal

  const currentTopic = SCAFFOLD_TOPICS[selectedTopicIndex];

  return (
    <div className="not-prose my-8 rounded-2xl border border-gray-800 bg-gray-950 p-6 font-sans text-gray-100 shadow-2xl md:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-gray-800 pb-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 p-2.5 text-white shadow-lg shadow-orange-500/20">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold tracking-wider text-amber-400 uppercase">
                Pedagogical Framework
              </span>
              <span className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-400 uppercase">
                Cognitive Load Theory
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              The "Scaffold & Shatter" Mental Model Engine
            </h3>
          </div>
        </div>
      </div>

      {/* Topic Selector Tabs */}
      <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
        {SCAFFOLD_TOPICS.map((topic, idx) => (
          <button
            key={topic.id}
            onClick={() => {
              setSelectedTopicIndex(idx);
              setActiveStep(0);
            }}
            className={`cursor-pointer rounded-lg px-3.5 py-2 text-xs font-bold whitespace-nowrap transition ${
              selectedTopicIndex === idx
                ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                : "border border-gray-800 bg-gray-900 text-gray-400 hover:text-white"
            }`}
          >
            {topic.title}
          </button>
        ))}
      </div>

      {/* 3-Step Interactive Progression Bar */}
      <div className="my-6 grid grid-cols-3 gap-2 rounded-xl border border-gray-800 bg-gray-900 p-1.5">
        <button
          onClick={() => setActiveStep(0)}
          className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition ${
            activeStep === 0
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <span>1. The Anchor (Analogy)</span>
        </button>

        <button
          onClick={() => setActiveStep(1)}
          className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition ${
            activeStep === 1
              ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <span>2. The Shatter (The Flaw)</span>
        </button>

        <button
          onClick={() => setActiveStep(2)}
          className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold transition ${
            activeStep === 2
              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <span>3. The Bare Metal (First Principle)</span>
        </button>
      </div>

      {/* Step Content Display */}
      <div className="space-y-4 rounded-xl border border-gray-800 bg-gray-900/60 p-6">
        {activeStep === 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-blue-400 uppercase">
              <span>
                Step 1: The Intuitive Anchor (Bypassing Working Memory Limits)
              </span>
            </div>

            <div className="space-y-2 rounded-xl border border-blue-900/40 bg-blue-950/30 p-4">
              <h4 className="text-base font-black text-blue-300">
                Mental Model: {currentTopic.anchor.concept}
              </h4>
              <p className="text-sm leading-relaxed text-gray-200 italic">
                "{currentTopic.anchor.analogy}"
              </p>
            </div>

            <div className="flex items-start gap-2 rounded-lg border border-gray-800 bg-gray-950/70 p-3 text-xs text-gray-400">
              <span>
                <strong>Why this works:</strong>{" "}
                {currentTopic.anchor.cognitiveBenefit}
              </span>
            </div>

            <button
              onClick={() => setActiveStep(1)}
              className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-red-500/30 bg-red-600/20 px-4 py-2 text-xs font-bold text-red-300 transition hover:bg-red-600/30"
            >
              <span>Now Shatter the Analogy &rarr;</span>
            </button>
          </div>
        )}

        {activeStep === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-red-400 uppercase">
              <span>Step 2: The Shatter (Destroying False Equivalence)</span>
            </div>

            <div className="space-y-2 rounded-xl border border-red-900/40 bg-red-950/30 p-4">
              <h4 className="text-base font-black text-red-300">
                Where the Analogy Breaks: {currentTopic.shatter.flaw}
              </h4>
              <p className="text-sm leading-relaxed text-gray-200">
                {currentTopic.shatter.breakdown}
              </p>
            </div>

            <div className="flex items-start gap-2 rounded-lg border border-red-900/50 bg-red-950/40 p-3 text-xs text-red-200">
              <span>
                <strong>The Dangerous Production Trap:</strong>{" "}
                {currentTopic.shatter.dangerOfAnalogy}
              </span>
            </div>

            <button
              onClick={() => setActiveStep(2)}
              className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500"
            >
              <span>Reveal the Bare Metal First Principle &rarr;</span>
            </button>
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-emerald-400 uppercase">
              <span>
                Step 3: The Bare Metal Ground Truth (Unshakeable First
                Principles)
              </span>
            </div>

            <div className="space-y-2 rounded-xl border border-emerald-900/40 bg-emerald-950/30 p-4">
              <h4 className="text-base font-black text-emerald-300">
                Mechanical Reality: {currentTopic.bareMetal.firstPrinciple}
              </h4>
              <p className="font-mono text-sm text-xs leading-relaxed text-gray-200">
                {currentTopic.bareMetal.mechanism}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-emerald-900/50 bg-emerald-950/40 p-3 text-xs text-emerald-300">
              <span>
                ✅ First-principles engineering mastery established. Zero
                reliance on leaky abstractions.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
