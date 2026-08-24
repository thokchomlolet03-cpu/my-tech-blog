import React, { useState } from "react";
import { OFFICIAL_TERRAFORM_DOCS } from "../data/officialDocsData";

export default function TerraformSplitPaneReference() {
  const [selectedDocId, setSelectedDocId] = useState(
    OFFICIAL_TERRAFORM_DOCS[0]?.id || "core_architecture"
  );
  const [activePane, setActivePane] = useState("split"); // "split" | "mechanics" | "official"
  const [copied, setCopied] = useState(false);

  const currentDoc =
    OFFICIAL_TERRAFORM_DOCS.find(d => d.id === selectedDocId) ||
    OFFICIAL_TERRAFORM_DOCS[0];

  const handleCopy = text => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getMechanicsExplanation = id => {
    switch (id) {
      case "core_architecture":
        return {
          title: "Core Architecture & Graph Walker Engine",
          points: [
            "Lexer/Parser pipeline builds an AST in memory using hashicorp/hcl/v2.",
            "Topological sorting generates a Directed Acyclic Graph (DAG) with explicit and implicit dependency edges.",
            "Worker goroutine pool (-parallelism=10) traverses the unblocked ready queue concurrently.",
            "Communicates with provider executables via gRPC Protocol v6 over Unix domain sockets.",
          ],
        };
      case "hcl_syntax_spec":
        return {
          title: "HCL Grammar & Native Structural Sub-languages",
          points: [
            "Structural language serializes bodies, blocks (type + labels), and attributes.",
            "Expression language evaluates references, arithmetic, and tuple/object constructors.",
            "Dynamic block evaluation resolves Cartesian matrices (setproduct) into deterministic for_each maps.",
            "try() and can() provide crash-proof evaluation guards during AST scope resolution.",
          ],
        };
      case "planning_behaviors":
        return {
          title: "3-Way Merge Algorithm (D × P × R)",
          points: [
            "Desired State (D) is compared against Prior State (P) and Live Reality (R).",
            "Evaluates 8 distinct state machine permutations to calculate planned mutations.",
            "Maps actions to Create (+), Update (~), Replace (-/+), or Destroy (-).",
            "Never executes mutations during plan phase; writes an immutable plan binary.",
          ],
        };
      case "resource_lifecycle":
        return {
          title: "Resource Lifecycle & Immutability Traps",
          points: [
            "Schema attributes with ForceNew=true trigger instant Destroy-then-Create (-/+).",
            "create_before_destroy=true inverts DAG edge sequence to prevent unplanned downtime.",
            "Non-atomic partial failures flag state nodes as 'tainted' for automatic recreation.",
            "moved {} blocks update the .tfstate address book without touching physical cloud infrastructure.",
          ],
        };
      case "debugging_tracing":
        return {
          title: "Engine Diagnostics & gRPC IPC Tracing",
          points: [
            "TF_LOG=TRACE captures raw Protocol Buffers exchanged over Unix domain sockets.",
            "Inspects provider discovery, version constraints, and cryptographic h1: lockfile hashes.",
            "Separates Terraform Core stdout from provider sub-process stderr logging.",
            "Enables delve remote debugging via 'providerserver.ServeOpts{Debug: true}'.",
          ],
        };
      default:
        return {
          title: "First-Principles Mechanical Reality",
          points: [
            "Deconstructs the tool from hardware interrupts to distributed consensus.",
          ],
        };
    }
  };

  const mechanics = getMechanicsExplanation(
    currentDoc?.id || "core_architecture"
  );

  if (!currentDoc) {
    return null;
  }

  return (
    <div className="not-prose my-8 rounded-2xl border border-gray-800 bg-gray-950 p-6 font-sans text-gray-100 shadow-2xl md:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-gray-800 pb-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-2.5 text-white shadow-lg shadow-emerald-500/20">
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold tracking-wider text-emerald-400 uppercase">
                Live-Sync Documentation System
              </span>
              <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400 uppercase">
                HashiCorp GitHub Sync
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              The Split-Pane Learning Reference
            </h3>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center self-start rounded-lg border border-gray-800 bg-gray-900 p-1 font-mono text-xs sm:self-auto">
          <button
            onClick={() => setActivePane("split")}
            className={`cursor-pointer rounded-md px-3 py-1.5 font-bold transition ${activePane === "split" ? "bg-emerald-500 text-black" : "text-gray-400 hover:text-white"}`}
          >
            Split View
          </button>
          <button
            onClick={() => setActivePane("mechanics")}
            className={`cursor-pointer rounded-md px-3 py-1.5 font-bold transition ${activePane === "mechanics" ? "bg-emerald-500 text-black" : "text-gray-400 hover:text-white"}`}
          >
            Mechanics Only
          </button>
          <button
            onClick={() => setActivePane("official")}
            className={`cursor-pointer rounded-md px-3 py-1.5 font-bold transition ${activePane === "official" ? "bg-emerald-500 text-black" : "text-gray-400 hover:text-white"}`}
          >
            Official Docs Only
          </button>
        </div>
      </div>

      {/* Doc Selector Pills */}
      <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
        {OFFICIAL_TERRAFORM_DOCS.map(doc => (
          <button
            key={doc.id}
            onClick={() => setSelectedDocId(doc.id)}
            className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap transition ${
              selectedDocId === doc.id
                ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/20"
                : "border border-gray-800 bg-gray-900 text-gray-400 hover:text-white"
            }`}
          >
            {doc.title}
          </button>
        ))}
      </div>

      {/* Split Pane Container */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pane 1: Engine Mechanics (First Principles) */}
        {(activePane === "split" || activePane === "mechanics") && (
          <div className="space-y-4 rounded-xl border border-gray-800 bg-gray-900/60 p-5">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-400 uppercase">
                <span>First-Principles Engine Mechanics</span>
              </div>
              <span className="rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300 uppercase">
                Core Deconstruction
              </span>
            </div>

            <h4 className="text-base font-extrabold text-white">
              {mechanics.title}
            </h4>

            <div className="space-y-2.5">
              {mechanics.points.map((point, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 text-xs leading-relaxed text-gray-300"
                >
                  <span className="shrink-0 font-mono text-emerald-400">▸</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pane 2: Live Official HashiCorp Docs */}
        {(activePane === "split" || activePane === "official") && (
          <div className="space-y-4 rounded-xl border border-gray-800 bg-gray-900/60 p-5">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-blue-400 uppercase">
                <span>Official HashiCorp Specification</span>
              </div>

              <a
                href={currentDoc.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 font-mono text-[10px] text-gray-400 transition hover:text-blue-400"
              >
                <span>GitHub Source &rarr;</span>
              </a>
            </div>

            <div className="flex items-center justify-between">
              <span className="line-clamp-1 text-xs font-bold text-white">
                {currentDoc.title}
              </span>
              <span className="shrink-0 font-mono text-[10px] text-gray-500">
                Repo: {currentDoc.repo}
              </span>
            </div>

            <p className="line-clamp-3 font-sans text-xs leading-relaxed text-gray-300">
              {currentDoc.summary}
            </p>

            <div className="pt-2">
              <div className="mb-1.5 flex items-center justify-between font-mono text-[11px] text-gray-400">
                <span>Official Code Extract / Spec</span>
                <button
                  onClick={() => handleCopy(currentDoc.fullContent)}
                  className="flex cursor-pointer items-center gap-1 text-[10px] text-gray-400 transition hover:text-emerald-400"
                >
                  <span>{copied ? "Copied Spec!" : "Copy Spec"}</span>
                </button>
              </div>

              <div className="max-h-48 overflow-y-auto rounded-lg border border-gray-800 bg-gray-950 p-3 font-mono text-xs leading-relaxed text-emerald-300">
                <pre>{currentDoc.fullContent.slice(0, 1200)}...</pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
