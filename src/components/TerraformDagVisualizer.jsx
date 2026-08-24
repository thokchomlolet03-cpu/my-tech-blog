import React, { useState } from "react";

export default function TerraformDagVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Step 0: Raw AST Parsed & Dependency Graph Constructed",
      description:
        "Terraform Core scans *.tf files for cross-attribute references and builds the Directed Acyclic Graph (DAG).",
      activeNodes: [],
      completedNodes: [],
      parallelThreads: 0,
      activeChannels: "None (Awaiting Graph Traversal)",
    },
    {
      title: "Step 1: Discover Nodes with In-Degree = 0 (Zero Dependencies)",
      description:
        "Topological Sort identifies nodes with zero incoming dependencies. They are dispatched concurrently to the worker pool.",
      activeNodes: [
        "aws_vpc.primary",
        "aws_s3_bucket.logs",
        "aws_kms_key.master",
      ],
      completedNodes: [],
      parallelThreads: 3,
      activeChannels:
        "Goroutine 1: aws_vpc | Goroutine 2: aws_s3 | Goroutine 3: aws_kms",
    },
    {
      title: "Step 2: Parent Nodes Complete & Export IDs via Channels",
      description:
        "VPC, S3, and KMS finish Create() API calls. Their allocated cloud IDs unblock downstream channels.",
      activeNodes: [
        "aws_subnet.public_1",
        "aws_subnet.public_2",
        "aws_iam_role.app",
      ],
      completedNodes: [
        "aws_vpc.primary",
        "aws_s3_bucket.logs",
        "aws_kms_key.master",
      ],
      parallelThreads: 3,
      activeChannels:
        "vpc.id -> channel (Unblocks Subnets) | kms.arn -> channel",
    },
    {
      title: "Step 3: Subnets Complete, Unblocking Compute & Database Tier",
      description:
        "With Subnet IDs populated, RDS Database and EC2 Instances are unblocked and dispatched in parallel.",
      activeNodes: ["aws_db_instance.db", "aws_instance.web"],
      completedNodes: [
        "aws_vpc.primary",
        "aws_s3_bucket.logs",
        "aws_kms_key.master",
        "aws_subnet.public_1",
        "aws_subnet.public_2",
        "aws_iam_role.app",
      ],
      parallelThreads: 2,
      activeChannels: "subnet_id & db_sg -> channel (Unblocks Compute & DB)",
    },
    {
      title: "Step 4: All Graph Nodes Evaluated & State Committed",
      description:
        "All resources provisioned successfully. Outputs exported and final terraform.tfstate written with incremented serial.",
      activeNodes: [],
      completedNodes: [
        "aws_vpc.primary",
        "aws_s3_bucket.logs",
        "aws_kms_key.master",
        "aws_subnet.public_1",
        "aws_subnet.public_2",
        "aws_iam_role.app",
        "aws_db_instance.db",
        "aws_instance.web",
      ],
      parallelThreads: 0,
      activeChannels: "All worker goroutines closed. State lock released.",
    },
  ];

  const graphNodes = [
    {
      id: "aws_vpc.primary",
      label: "aws_vpc.primary",
      tier: 0,
      type: "network",
    },
    {
      id: "aws_s3_bucket.logs",
      label: "aws_s3_bucket.logs",
      tier: 0,
      type: "storage",
    },
    {
      id: "aws_kms_key.master",
      label: "aws_kms_key.master",
      tier: 0,
      type: "security",
    },
    {
      id: "aws_subnet.public_1",
      label: "aws_subnet.public_1",
      tier: 1,
      type: "network",
      parent: "aws_vpc.primary",
    },
    {
      id: "aws_subnet.public_2",
      label: "aws_subnet.public_2",
      tier: 1,
      type: "network",
      parent: "aws_vpc.primary",
    },
    {
      id: "aws_iam_role.app",
      label: "aws_iam_role.app",
      tier: 1,
      type: "security",
    },
    {
      id: "aws_db_instance.db",
      label: "aws_db_instance.db",
      tier: 2,
      type: "database",
      parent: "aws_subnet.public_2",
    },
    {
      id: "aws_instance.web",
      label: "aws_instance.web",
      tier: 2,
      type: "compute",
      parent: "aws_subnet.public_1",
    },
  ];

  const activeStepData = steps[currentStep];

  return (
    <div className="border-skin-line bg-skin-card my-8 rounded-2xl border p-6 font-mono text-sm shadow-xl">
      <div className="border-skin-line flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        <div>
          <span className="text-skin-accent text-xs font-semibold tracking-wider uppercase">
            Interactive DAG Explorer
          </span>
          <h3 className="text-skin-base mt-1 text-lg font-bold">
            Directed Acyclic Graph & Topological Sort
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="bg-skin-card-muted text-skin-base hover:bg-skin-accent rounded-lg px-3 py-1.5 font-semibold transition hover:text-white disabled:opacity-30"
          >
            ◀ Previous
          </button>
          <span className="bg-skin-fill text-skin-accent rounded px-2 py-1 text-xs font-semibold">
            Step {currentStep} / {steps.length - 1}
          </span>
          <button
            onClick={() =>
              setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
            }
            disabled={currentStep === steps.length - 1}
            className="bg-skin-card-muted text-skin-base hover:bg-skin-accent rounded-lg px-3 py-1.5 font-semibold transition hover:text-white disabled:opacity-30"
          >
            Next ▶
          </button>
        </div>
      </div>

      <div className="bg-skin-fill/80 border-skin-line mt-4 rounded-xl border p-4">
        <h4 className="text-skin-accent text-base font-bold">
          {activeStepData.title}
        </h4>
        <p className="text-skin-base mt-1 text-xs leading-relaxed opacity-80">
          {activeStepData.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-skin-base font-semibold">
              Worker Threads (-parallelism):
            </span>
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-bold text-emerald-400">
              {activeStepData.parallelThreads} Active Goroutines
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-skin-base font-semibold">IPC Channels:</span>
            <span className="text-skin-accent max-w-xs truncate">
              {activeStepData.activeChannels}
            </span>
          </div>
        </div>
      </div>

      {/* DAG Visual Node Grid */}
      <div className="mt-6 space-y-4">
        <div className="text-skin-base text-xs font-semibold tracking-wider uppercase">
          Topological Tier Execution:
        </div>

        {[0, 1, 2].map(tierIdx => {
          const tierNodes = graphNodes.filter(n => n.tier === tierIdx);
          const tierNames = [
            "Tier 0 (Root Primitives)",
            "Tier 1 (Subnets & IAM)",
            "Tier 2 (Compute & Database)",
          ];

          return (
            <div
              key={tierIdx}
              className="border-skin-line/60 bg-skin-fill/40 rounded-xl border p-3"
            >
              <div className="text-skin-base mb-2 text-[11px] font-bold uppercase opacity-60">
                {tierNames[tierIdx]}
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {tierNodes.map(node => {
                  const isActive = activeStepData.activeNodes.includes(node.id);
                  const isDone = activeStepData.completedNodes.includes(
                    node.id
                  );

                  let badgeColor =
                    "border-skin-line bg-skin-card text-skin-base opacity-50";
                  let statusText = "WAITING";

                  if (isActive) {
                    badgeColor =
                      "border-amber-500 bg-amber-500/10 text-amber-300 ring-2 ring-amber-500/50 animate-pulse";
                    statusText = "EXECUTING (gRPC POST)";
                  } else if (isDone) {
                    badgeColor =
                      "border-emerald-500 bg-emerald-500/10 text-emerald-300";
                    statusText = "COMPLETED ✅";
                  }

                  return (
                    <div
                      key={node.id}
                      className={`rounded-lg border p-3 transition-all duration-300 ${badgeColor}`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="truncate">{node.label}</span>
                        <span className="text-[10px] uppercase">
                          {statusText}
                        </span>
                      </div>
                      {node.parent && (
                        <div className="mt-1 text-[10px] opacity-70">
                          Depends on:{" "}
                          <code className="text-skin-accent">
                            {node.parent}
                          </code>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
