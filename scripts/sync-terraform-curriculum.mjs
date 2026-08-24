import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.resolve(SCRIPT_DIR, "..");
const DEFAULT_CURRICULUM_ROOT = path.join(
  SITE_ROOT,
  "curriculum",
  "terraform-mastery"
);
const CURRICULUM_ROOT = path.resolve(
  process.env.TERRAFORM_MASTERY_ROOT || DEFAULT_CURRICULUM_ROOT
);
const POSTS_DIR = path.join(SITE_ROOT, "src", "content", "posts");
const PUBLICATION_METADATA_PATH = path.join(
  SITE_ROOT,
  "curriculum",
  "terraform-mastery.publication.json"
);
const CHECK_ONLY = process.argv.includes("--check");
const SOURCE_REPOSITORY =
  "https://github.com/thokchomlolet03-cpu/terraform-mastery";

const modules = [
  {
    order: 1,
    slug: "terraform-mastery-01-physical-and-os-foundations",
    title: "Module 01: Automation and Control-Plane Foundations",
    description:
      "Build an accurate first-principles model of automation, cloud control planes, and infrastructure-as-code design boundaries.",
    paths: ["01_Foundations_The_Physical_and_OS_Reality/*.md"],
  },
  {
    order: 2,
    slug: "terraform-mastery-02-core-engine-ast-grpc",
    title: "Module 02: Terraform Core Architecture and Internals",
    description:
      "Trace configuration loading, graph construction, provider plugins, RPC boundaries, and Terraform's local artifacts.",
    paths: ["02_Terraform_Core_Architecture_and_Internals/*.md"],
  },
  {
    order: 3,
    slug: "terraform-mastery-03-reconciliation-3-way-merge",
    title: "Module 03: Planning, Provider Lifecycle, and Execution",
    description:
      "Reconstruct Terraform planning from configuration, prior state, remote reality, provider lifecycle contracts, and DAG execution.",
    paths: ["03_The_Reconciliation_Engine_and_State_Machine/*.md"],
  },
  {
    order: 4,
    slug: "terraform-mastery-04-hcl-grammar-cartesian-matrix",
    title: "Module 04: Language, Identity, Types, and Expressions",
    description:
      "Understand HCL structure, resource identity, meta-arguments, variable precedence, validation, and safe collection transformations.",
    paths: ["04_HCL_Language_Grammar_and_Expressions/*.md"],
  },
  {
    order: 5,
    slug: "terraform-mastery-05-state-locking-s3-dynamodb",
    title: "Module 05: State, Locking, Drift, and Sensitive Data",
    description:
      "Learn state as an identity ledger, backend locking as concurrency control, refresh and drift mechanics, and state security.",
    paths: ["05_State_Management_Locking_and_Drift/*.md"],
  },
  {
    order: 6,
    slug: "terraform-mastery-06-lifecycle-forcenew-outage-prevention",
    title: "Module 06: Lifecycle, Replacement, and Failure Prevention",
    description:
      "Reason about replacement order, lifecycle rules, partial failures, tainting, explicit dependencies, and outage prevention.",
    paths: [
      "06_Lifecycle_Rules_Edge_Cases_and_Failure_Prevention/*.md",
    ],
  },
  {
    order: 7,
    slug: "terraform-mastery-07-state-manipulation-extreme-surgery",
    title: "Module 07: State Operations, Refactoring, Import, and Recovery",
    description:
      "Practice safe state inspection, declarative moves, imports, binding repair, and disaster recovery without normalizing unsafe surgery.",
    paths: ["07_State_Manipulation_and_Safe_Refactoring/*.md"],
  },
  {
    order: 8,
    slug: "terraform-mastery-08-production-testing-terragrunt",
    title: "Module 08: Production Architecture and Enterprise Design",
    description:
      "Design bounded state, reusable modules, CI/CD gates, policy controls, native tests, multi-region providers, and orchestration layers.",
    paths: ["08_Production_Architecture_and_Enterprise_Design/*.md"],
  },
  {
    order: 9,
    slug: "terraform-mastery-09-associate-004-exam-drills",
    title: "Module 09: HashiCorp Terraform Associate 004 Mastery",
    description:
      "Prepare for the Associate 004 exam through operational mental models, scenario drills, retrieval practice, and validation questions.",
    paths: ["09_Exam_Mastery_HashiCorp_Certified_Associate_004/*.md"],
  },
  {
    order: 10,
    slug: "terraform-mastery-10-hands-on-breakdown-labs",
    title: "Module 10: Hands-On Breakdown Labs",
    description:
      "Run five safe break-and-learn labs covering local resources, module DAGs, state locking, refactoring, and layered architecture.",
    paths: [
      "10_Hands_On_Breakdown_Labs/lab_01_core_primitive_and_trace/README.md",
      "10_Hands_On_Breakdown_Labs/lab_02_modular_dag_and_graph_visualization/README.md",
      "10_Hands_On_Breakdown_Labs/lab_03_remote_state_and_concurrency_locking/README.md",
      "10_Hands_On_Breakdown_Labs/lab_04_break_it_to_learn_it/README.md",
      "10_Hands_On_Breakdown_Labs/lab_05_production_multi_tier_architecture/README.md",
    ],
  },
  {
    order: 11,
    slug: "terraform-mastery-11-custom-go-provider-development",
    title: "Module 11: Custom Provider Development",
    description:
      "Understand the provider protocol boundary and implement, test, and safely develop a custom provider with the Terraform Plugin Framework.",
    paths: ["11_Peak_Mastery_Custom_Provider_Development/*.md"],
  },
  {
    order: 12,
    slug: "terraform-mastery-12-zero-cost-gcp-cloud-architecture",
    title: "Module 12: Cost-Aware Cloud Hosting and Global Access",
    description:
      "Compare static hosting and cloud runtime costs, use free allowances cautiously, and test GCP configuration without creating resources.",
    paths: ["12_Zero_Cost_Cloud_Architecture_and_Global_Access/*.md"],
  },
];

function git(...args) {
  return execFileSync("git", ["-C", CURRICULUM_ROOT, ...args], {
    encoding: "utf8",
  }).trim();
}

async function resolveSourceMetadata() {
  try {
    return {
      revision: git("rev-parse", "HEAD"),
      modifiedAt: git("show", "-s", "--format=%cI", "HEAD"),
      fromGit: true,
    };
  } catch {
    const metadata = JSON.parse(
      await fs.readFile(PUBLICATION_METADATA_PATH, "utf8")
    );

    if (!/^[0-9a-f]{40}$/.test(metadata.revision)) {
      throw new Error("invalid revision in curriculum publication metadata");
    }
    if (Number.isNaN(Date.parse(metadata.modifiedAt))) {
      throw new Error("invalid modifiedAt in curriculum publication metadata");
    }

    return { ...metadata, fromGit: false };
  }
}

async function synchronizeSourceMetadata({ revision, modifiedAt, fromGit }) {
  if (!fromGit) return;

  const expected = `${JSON.stringify({ revision, modifiedAt }, null, 2)}\n`;
  let actual = "";
  try {
    actual = await fs.readFile(PUBLICATION_METADATA_PATH, "utf8");
  } catch {
    // A missing publication manifest is stale.
  }

  if (actual === expected) return;
  if (CHECK_ONLY) {
    throw new Error("curriculum publication metadata is stale");
  }
  await fs.writeFile(PUBLICATION_METADATA_PATH, expected, "utf8");
}

async function expandPath(pattern) {
  if (!pattern.endsWith("/*.md")) return [pattern];

  const directory = pattern.slice(0, -"/*.md".length);
  const entries = await fs.readdir(path.join(CURRICULUM_ROOT, directory), {
    withFileTypes: true,
  });

  return entries
    .filter(entry => entry.isFile() && entry.name.endsWith(".md"))
    .map(entry => path.posix.join(directory, entry.name))
    .sort();
}

function shiftHeadings(markdown) {
  let inFence = false;

  return markdown
    .split("\n")
    .map(line => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;
      return line.replace(/^(#{1,5})\s/, "#$1 ");
    })
    .join("\n");
}

function rewriteRelativeLinks(markdown, sourcePath, revision) {
  const sourceDirectory = path.posix.dirname(sourcePath);

  return markdown.replace(/(!?\[[^\]]*\])\(([^)]+)\)/g, (match, label, href) => {
    const destination = href.trim();
    if (
      /^(?:[a-z]+:|#|\/)/i.test(destination) ||
      destination.startsWith("<")
    ) {
      return match;
    }

    const [filePart, anchor = ""] = destination.split("#", 2);
    const resolved = path.posix.normalize(path.posix.join(sourceDirectory, filePart));
    const sourceUrl = `${SOURCE_REPOSITORY}/blob/${revision}/${resolved}${anchor ? `#${anchor}` : ""}`;
    return `${label}(${sourceUrl})`;
  });
}

function frontmatter(module, revision, modifiedAt, sourcePaths, checksum) {
  return `---
author: Lolet Thokchom
pubDatetime: 2026-08-23T20:${String(module.order).padStart(2, "0")}:00Z
modDatetime: ${modifiedAt}
title: "${module.title}"
featured: false
draft: false
tags:
  - terraform
  - devops
  - iac
  - system-architecture
description: "${module.description}"
domain: "infrastructure"
format: "breakdown"
series: "true-mastery-of-terraform"
seriesOrder: ${module.order}
seriesTotal: 12
generated: true
sourceRepository: "${SOURCE_REPOSITORY}"
sourceRevision: "${revision}"
sourcePaths:
${sourcePaths.map(sourcePath => `  - "${sourcePath}"`).join("\n")}
sourceChecksum: "${checksum}"
---`;
}

async function renderModule(module, revision, modifiedAt) {
  const sourcePaths = (
    await Promise.all(module.paths.map(pattern => expandPath(pattern)))
  ).flat();
  const sections = [];
  const lessonLinks = [];

  for (const sourcePath of sourcePaths) {
    const absolutePath = path.join(CURRICULUM_ROOT, sourcePath);
    const original = (await fs.readFile(absolutePath, "utf8")).trim();
    const firstHeading = original.match(/^#\s+(.+)$/m)?.[1] ?? sourcePath;
    const anchor = firstHeading
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    lessonLinks.push(`- [${firstHeading}](#${anchor})`);

    const normalized = rewriteRelativeLinks(
      shiftHeadings(original),
      sourcePath,
      revision
    );
    const sourceUrl = `${SOURCE_REPOSITORY}/blob/${revision}/${sourcePath}`;
    sections.push(`${normalized}\n\n[View this lesson in the canonical curriculum source](${sourceUrl})`);
  }

  const joinedSource = sourcePaths
    .map(sourcePath => `${sourcePath}\n`)
    .join("") + sections.join("\n\n---\n\n");
  const checksum = createHash("sha256").update(joinedSource).digest("hex");

  return `${frontmatter(module, revision, modifiedAt, sourcePaths, checksum)}

<!-- AUTO-GENERATED by scripts/sync-terraform-curriculum.mjs. Edit the canonical curriculum, not this file. -->

> [!NOTE]
> This page is generated from the reviewed Terraform Mastery curriculum at commit [\`${revision.slice(0, 12)}\`](${SOURCE_REPOSITORY}/commit/${revision}). The source repository is authoritative.

## Lessons in this module

${lessonLinks.join("\n")}

---

${sections.join("\n\n---\n\n")}
`;
}

async function main() {
  await fs.access(path.join(CURRICULUM_ROOT, "docs", "REWRITE_STATUS.md"));
  const metadata = await resolveSourceMetadata();
  const { revision, modifiedAt } = metadata;
  await synchronizeSourceMetadata(metadata);
  const stale = [];

  for (const module of modules) {
    const targetPath = path.join(POSTS_DIR, `${module.slug}.md`);
    const expected = await renderModule(module, revision, modifiedAt);
    let actual = "";
    try {
      actual = await fs.readFile(targetPath, "utf8");
    } catch {
      // A missing generated page is stale and will be written outside check mode.
    }

    if (actual === expected) continue;
    stale.push(path.relative(SITE_ROOT, targetPath));
    if (!CHECK_ONLY) await fs.writeFile(targetPath, expected, "utf8");
  }

  if (CHECK_ONLY && stale.length > 0) {
    console.error("Terraform curriculum publication is stale:");
    stale.forEach(file => console.error(`  - ${file}`));
    console.error("Run: pnpm run sync:curriculum");
    process.exit(1);
  }

  if (stale.length === 0) {
    console.log(`Terraform curriculum is current at ${revision.slice(0, 12)}.`);
  } else {
    console.log(
      `Synchronized ${stale.length} module pages from Terraform Mastery ${revision.slice(0, 12)}.`
    );
  }
}

main().catch(error => {
  console.error(`Terraform curriculum sync failed: ${error.message}`);
  process.exit(1);
});
