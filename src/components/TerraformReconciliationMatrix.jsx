import React, { useState } from "react";

export default function TerraformReconciliationMatrix() {
  const [desired, setDesired] = useState("present_v1");
  const [prior, setPrior] = useState("present_v1");
  const [reality, setReality] = useState("present_v1");

  // Calculate the Delta Matrix based on 3 vectors
  const calculateOutcome = () => {
    // Scenario 1: Brand New Resource
    if (desired !== "absent" && prior === "absent" && reality === "absent") {
      return {
        action: "CREATE",
        symbol: "+",
        symbolColor: "text-emerald-400 bg-emerald-500/20 border-emerald-500",
        apiCall: "HTTP POST /v1/resources (Create)",
        explanation:
          "Resource declared in code (D) but does not exist in state (P) or cloud reality (R). Terraform plans a brand-new creation.",
      };
    }

    // Scenario 2: Perfect Idempotent Match
    if (desired === prior && prior === reality && desired !== "absent") {
      return {
        action: "NO-OP (IDEMPOTENT)",
        symbol: " ",
        symbolColor: "text-blue-400 bg-blue-500/20 border-blue-500",
        apiCall: "None (Zero network calls)",
        explanation:
          "Target code matches recorded state and live cloud reality. Mathematical delta is 0.",
      };
    }

    // Scenario 3: Mutable In-Place Update
    if (
      desired === "present_v2" &&
      prior === "present_v1" &&
      reality === "present_v1"
    ) {
      return {
        action: "UPDATE IN-PLACE",
        symbol: "~",
        symbolColor: "text-amber-400 bg-amber-500/20 border-amber-500",
        apiCall: "HTTP PATCH /v1/resources/{id} (Update)",
        explanation:
          "Mutable attribute (like tags) modified in code. Terraform updates the cloud resource in-place while preserving physical ID.",
      };
    }

    // Scenario 4: Immutable Destructive Recreation (ForceNew)
    if (
      desired === "immutable_change" &&
      (prior !== "absent" || reality !== "absent")
    ) {
      return {
        action: "DESTROY AND RECREATE (-/+)",
        symbol: "-/+",
        symbolColor: "text-rose-400 bg-rose-500/20 border-rose-500",
        apiCall: "HTTP DELETE /resources/{id} THEN HTTP POST /resources",
        explanation:
          "CRITICAL: An immutable schema attribute (e.g. AMI or Subnet CIDR) changed. Provider schema has ForceNew=true, forcing a destructive replacement.",
      };
    }

    // Scenario 5: Clean Deletion
    if (desired === "absent" && prior !== "absent" && reality !== "absent") {
      return {
        action: "DESTROY",
        symbol: "-",
        symbolColor: "text-rose-400 bg-rose-500/20 border-rose-500",
        apiCall: "HTTP DELETE /v1/resources/{id} (Delete)",
        explanation:
          "Resource block was removed from .tf files. Terraform destroys the live cloud resource and purges it from state.",
      };
    }

    // Scenario 6: Out-of-band Cloud Drift (Live console change)
    if (
      desired === "present_v1" &&
      prior === "present_v1" &&
      reality === "present_v2"
    ) {
      return {
        action: "REVERT DRIFT TO TARGET",
        symbol: "~",
        symbolColor: "text-purple-400 bg-purple-500/20 border-purple-500",
        apiCall: "HTTP PATCH /v1/resources/{id} (Overwrites console tweak)",
        explanation:
          "Someone manually tweaked the cloud console out-of-band. Standard terraform plan proposes reverting reality back to the declared HCL code target.",
      };
    }

    // Scenario 7: Out-of-band Deletion (Self-Healing)
    if (desired !== "absent" && prior !== "absent" && reality === "absent") {
      return {
        action: "RECREATE (SELF-HEAL)",
        symbol: "+",
        symbolColor: "text-emerald-400 bg-emerald-500/20 border-emerald-500",
        apiCall: "HTTP POST /v1/resources (Create)",
        explanation:
          "Resource was accidentally deleted in the cloud console. Terraform detects missing reality during refresh and plans recreation.",
      };
    }

    return {
      action: "CUSTOM DELTA",
      symbol: "~",
      symbolColor: "text-skin-accent bg-skin-fill border-skin-line",
      apiCall: "Reconciliation evaluation",
      explanation:
        "Terraform computes the exact attribute delta between the three vectors.",
    };
  };

  const outcome = calculateOutcome();

  return (
    <div className="border-skin-line bg-skin-card my-8 rounded-2xl border p-6 font-mono text-sm shadow-xl">
      <div className="border-skin-line border-b pb-4">
        <span className="text-skin-accent text-xs font-semibold tracking-wider uppercase">
          Interactive Reconciliation Engine
        </span>
        <h3 className="text-skin-base mt-1 text-lg font-bold">
          The 3-Way State Merge Matrix Explorer
        </h3>
        <p className="text-skin-base mt-1 text-xs opacity-80">
          Toggle the three independent state vectors to see how the mathematical
          diffing engine determines CRUD API calls.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Vector 1: Desired State */}
        <div className="border-skin-line bg-skin-fill/50 rounded-xl border p-4">
          <div className="text-skin-accent mb-2 text-xs font-bold uppercase">
            Vector 1: Desired State (D)
          </div>
          <div className="text-skin-base mb-3 text-[11px] opacity-70">
            Your local *.tf files
          </div>
          <select
            value={desired}
            onChange={e => setDesired(e.target.value)}
            className="bg-skin-card border-skin-line text-skin-base focus:ring-skin-accent w-full rounded-lg border p-2 text-xs focus:ring-2"
          >
            <option value="present_v1">Present (Config v1.0)</option>
            <option value="present_v2">
              Present (Config v2.0 - Mutable Tag Edit)
            </option>
            <option value="immutable_change">
              Present (Immutable AMI / CIDR Edit)
            </option>
            <option value="absent">Absent (Block Deleted from .tf)</option>
          </select>
        </div>

        {/* Vector 2: Prior State */}
        <div className="border-skin-line bg-skin-fill/50 rounded-xl border p-4">
          <div className="mb-2 text-xs font-bold text-sky-400 uppercase">
            Vector 2: Prior State (P)
          </div>
          <div className="text-skin-base mb-3 text-[11px] opacity-70">
            terraform.tfstate JSON record
          </div>
          <select
            value={prior}
            onChange={e => setPrior(e.target.value)}
            className="bg-skin-card border-skin-line text-skin-base focus:ring-skin-accent w-full rounded-lg border p-2 text-xs focus:ring-2"
          >
            <option value="present_v1">Present (Recorded in state)</option>
            <option value="absent">Absent (Not in state / New)</option>
          </select>
        </div>

        {/* Vector 3: Live Reality */}
        <div className="border-skin-line bg-skin-fill/50 rounded-xl border p-4">
          <div className="mb-2 text-xs font-bold text-emerald-400 uppercase">
            Vector 3: Live Reality (R)
          </div>
          <div className="text-skin-base mb-3 text-[11px] opacity-70">
            Fetched via HTTP GET Refresh
          </div>
          <select
            value={reality}
            onChange={e => setReality(e.target.value)}
            className="bg-skin-card border-skin-line text-skin-base focus:ring-skin-accent w-full rounded-lg border p-2 text-xs focus:ring-2"
          >
            <option value="present_v1">Present (Matches v1.0)</option>
            <option value="present_v2">
              Present (Drifted in Cloud Console)
            </option>
            <option value="absent">Absent (Deleted in Cloud Console)</option>
          </select>
        </div>
      </div>

      {/* Calculated Output Matrix Card */}
      <div className="border-skin-line bg-skin-fill mt-6 rounded-xl border p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-xl border text-lg font-black ${outcome.symbolColor}`}
            >
              {outcome.symbol || "0"}
            </span>
            <div>
              <div className="text-skin-base text-xs font-bold tracking-wider uppercase opacity-70">
                Engine Action:
              </div>
              <div className="text-skin-base text-base font-bold">
                {outcome.action}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-skin-base text-xs font-bold tracking-wider uppercase opacity-70">
              API Call Dispatched:
            </div>
            <code className="text-skin-accent text-xs font-semibold">
              {outcome.apiCall}
            </code>
          </div>
        </div>

        <div className="border-skin-line/60 text-skin-base mt-4 border-t pt-3 text-xs leading-relaxed opacity-90">
          <span className="text-skin-accent font-bold">
            First-Principles Explanation:{" "}
          </span>
          {outcome.explanation}
        </div>
      </div>
    </div>
  );
}
