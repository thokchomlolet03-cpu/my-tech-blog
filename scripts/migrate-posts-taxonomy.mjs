import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const POSTS_DIR = path.resolve(__dirname, "..", "src", "content", "posts");

const POST_TAXONOMY_MAP = {
  "true-mastery-of-terraform-first-principles-journey.mdx": {
    domain: "infrastructure",
    format: "journey",
    series: "true-mastery-of-terraform",
    seriesOrder: 0,
    seriesTotal: 12
  },
  "terraform-mastery-01-physical-and-os-foundations.md": {
    domain: "infrastructure",
    format: "breakdown",
    series: "true-mastery-of-terraform",
    seriesOrder: 1,
    seriesTotal: 12
  },
  "terraform-mastery-02-core-engine-ast-grpc.mdx": {
    domain: "infrastructure",
    format: "breakdown",
    series: "true-mastery-of-terraform",
    seriesOrder: 2,
    seriesTotal: 12
  },
  "terraform-mastery-03-reconciliation-3-way-merge.mdx": {
    domain: "infrastructure",
    format: "breakdown",
    series: "true-mastery-of-terraform",
    seriesOrder: 3,
    seriesTotal: 12
  },
  "terraform-mastery-04-hcl-grammar-cartesian-matrix.md": {
    domain: "infrastructure",
    format: "breakdown",
    series: "true-mastery-of-terraform",
    seriesOrder: 4,
    seriesTotal: 12
  },
  "terraform-mastery-05-state-locking-s3-dynamodb.md": {
    domain: "infrastructure",
    format: "breakdown",
    series: "true-mastery-of-terraform",
    seriesOrder: 5,
    seriesTotal: 12
  },
  "terraform-mastery-06-lifecycle-forcenew-outage-prevention.md": {
    domain: "infrastructure",
    format: "breakdown",
    series: "true-mastery-of-terraform",
    seriesOrder: 6,
    seriesTotal: 12
  },
  "terraform-mastery-07-state-manipulation-extreme-surgery.md": {
    domain: "infrastructure",
    format: "breakdown",
    series: "true-mastery-of-terraform",
    seriesOrder: 7,
    seriesTotal: 12
  },
  "terraform-mastery-08-production-testing-terragrunt.md": {
    domain: "infrastructure",
    format: "breakdown",
    series: "true-mastery-of-terraform",
    seriesOrder: 8,
    seriesTotal: 12
  },
  "terraform-mastery-09-associate-004-exam-drills.mdx": {
    domain: "infrastructure",
    format: "breakdown",
    series: "true-mastery-of-terraform",
    seriesOrder: 9,
    seriesTotal: 12
  },
  "terraform-mastery-10-hands-on-breakdown-labs.md": {
    domain: "infrastructure",
    format: "breakdown",
    series: "true-mastery-of-terraform",
    seriesOrder: 10,
    seriesTotal: 12
  },
  "terraform-mastery-11-custom-go-provider-development.md": {
    domain: "infrastructure",
    format: "breakdown",
    series: "true-mastery-of-terraform",
    seriesOrder: 11,
    seriesTotal: 12
  },
  "terraform-mastery-12-zero-cost-gcp-cloud-architecture.md": {
    domain: "infrastructure",
    format: "breakdown",
    series: "true-mastery-of-terraform",
    seriesOrder: 12,
    seriesTotal: 12
  },
  "project-mangal-autonomous-biomedical-discovery-compiler.mdx": {
    domain: "ai-systems",
    format: "blueprint"
  },
  "universal-inverse-design-engine-v06-autonomous-discovery-pipeline.mdx": {
    domain: "ai-systems",
    format: "blueprint"
  },
  "universal-inverse-design-master-system-architecture-report.mdx": {
    domain: "ai-systems",
    format: "blueprint"
  },
  "the-epistemic-conductor-universal-inverse-design-engine-architecture.mdx": {
    domain: "ai-systems",
    format: "blueprint"
  },
  "inverse-biology-glucosepane-epistemic-mapping-manifesto.mdx": {
    domain: "ai-systems",
    format: "breakdown"
  },
  "friction-hunter-autonomous-ai-engine.mdx": {
    domain: "ai-systems",
    format: "blueprint"
  },
  "the-token-cosmos-visualizing-llm-probabilities-at-edge.mdx": {
    domain: "systems",
    format: "blueprint"
  },
  "under-the-hood-of-in-browser-llms-diagnosing-webgpu-chat-state-machines.md": {
    domain: "systems",
    format: "breakdown"
  },
  "token-cosmos-v6-post-mortem.md": {
    domain: "systems",
    format: "field-note"
  },
  "zero-egress-prompt-linter-token-cosmos.mdx": {
    domain: "systems",
    format: "breakdown"
  },
  "fluent-in-code.mdx": {
    domain: "human",
    format: "field-note"
  }
};

async function migrateTaxonomy() {
  console.log("🚀 Starting Frontmatter Taxonomy Migration across all posts...");
  const files = await fs.readdir(POSTS_DIR);

  for (const file of files) {
    if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;

    const taxonomy = POST_TAXONOMY_MAP[file];
    if (!taxonomy) {
      console.warn(`⚠️ No mapping found for ${file}, skipping.`);
      continue;
    }

    const filePath = path.join(POSTS_DIR, file);
    const content = await fs.readFile(filePath, "utf-8");

    const frontmatterMatch = content.match(/^---([\s\S]*?)---/);
    if (!frontmatterMatch) {
      console.warn(`⚠️ No frontmatter found in ${file}`);
      continue;
    }

    let fmLines = frontmatterMatch[1].trim().split("\n");

    // Remove existing domain/format/series tags if any
    fmLines = fmLines.filter(
      (line) =>
        !line.startsWith("domain:") &&
        !line.startsWith("format:") &&
        !line.startsWith("series:") &&
        !line.startsWith("seriesOrder:") &&
        !line.startsWith("seriesTotal:")
    );

    // Append new taxonomy fields
    fmLines.push(`domain: "${taxonomy.domain}"`);
    fmLines.push(`format: "${taxonomy.format}"`);
    if (taxonomy.series) {
      fmLines.push(`series: "${taxonomy.series}"`);
      fmLines.push(`seriesOrder: ${taxonomy.seriesOrder}`);
      fmLines.push(`seriesTotal: ${taxonomy.seriesTotal}`);
    }

    const newFrontmatter = `---\n${fmLines.join("\n")}\n---`;
    const updatedContent = content.replace(/^---[\s\S]*?---/, newFrontmatter);

    await fs.writeFile(filePath, updatedContent, "utf-8");
    console.log(`  ✅ Updated [${taxonomy.domain} | ${taxonomy.format}]: ${file}`);
  }

  console.log("✨ Successfully migrated all 24 posts to 3-Tier Taxonomy!");
}

migrateTaxonomy().catch((err) => {
  console.error("Migration error:", err);
});
