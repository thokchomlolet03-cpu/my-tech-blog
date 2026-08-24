---
title: "Post-Mortem: Overcoming WebGPU VRAM Exhaustion and Securing the Edge-AI Telemetry Pipeline"
pubDatetime: 2026-08-18T05:00:00Z
featured: true
draft: false
tags:
  - post-mortem
  - system-architecture
  - security
  - the-token-cosmos
category: ai-systems
series: token-cosmos
description: "A technical deep dive into the v6.0 architecture overhaul of The Token Cosmos, the root causes of our edge-AI VRAM failures, and how we secured a critical CI/CD telemetry vulnerability."
---

When we set out to build **The Token Cosmos v6.0**, the goal was clear: move AI inference completely to the edge using WebGPU and WebLLM, drastically reducing server costs while maintaining low latency.

However, scaling edge AI in the browser introduces a chaotic variable: the client's hardware. In this post-mortem, I break down how a series of memory pressure events led to silent UI lockups, and how an architectural oversight in our SDLC tracking dashboard exposed a GitHub Personal Access Token (PAT)—and exactly how we engineered our way out of it.

## The Incident: Silent VRAM Kills

During stress testing on mid-tier hardware, the React UI would periodically freeze in a perpetual "Generating..." state. The 152,000-point 3D terrain geometry would also aggressively cull and vanish at oblique camera angles.

### The Root Cause

The operating system was aggressively reclaiming GPU memory under heavy load. When the WebLLM engine lost context, it triggered a `device.lost` WebGPU promise that went unhandled in our `WebGPUInferenceWorker.ts`. The React main thread was left waiting for a WebWorker message that would never arrive.

Simultaneously, global viewport event listeners (like `[SPACE]` to focus) were polluting the text input fields, and WebGL's aggressive frustum culling was destroying our geometries when the default bounding box left the camera view.

### The Resolution

We implemented strict `AbortController` lifecycles to guarantee deterministic cancellation of GPU generation tasks.

```typescript
// frontend/src/engine/WebGPUInferenceWorker.ts
let activeAbortController: AbortController | null = null;

// Abort previous tasks before initiating a new one to prevent GPU race conditions
if (activeAbortController) {
  activeAbortController.abort();
}
activeAbortController = new AbortController();
```

We also trapped the `device.lost` promise to broadcast a fatal `ENGINE_ERROR` payload to the main thread, allowing the UI to degrade gracefully instead of freezing.

## The Security Vulnerability: Client-Side PATs

While tracking development velocity using DORA and SPACE metrics, we built a React dashboard (`tracker/`) that queried the GitHub API for workflow deployment logs.

### The Root Cause

To query the GitHub Actions API, the dashboard needed a GitHub token. Initially, this was injected via a `VITE_GITHUB_TOKEN` environment variable.

**This is a critical anti-pattern.** You cannot inject a secret token into a production client-side React application. Anyone inspecting the network tab or viewing the source could extract the PAT and gain unauthorized access to the repository.

### The Resolution: The Static CI Pivot

We immediately halted the rollout and completely eliminated the dashboard's API layer.

Instead of the client fetching data, we shifted the computation to the CI/CD pipeline. We wrote a Python script (`generate_sdlc_metrics.py`) that runs securely inside a scheduled GitHub Action (using the ephemeral `${{ secrets.GITHUB_TOKEN }}`).

This script bakes the metrics into a static `metrics.json` file, builds the Vite application, and pushes everything directly to GitHub Pages.

```yaml
- name: Generate Static SDLC Metrics
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  run: |
    python scripts/generate_sdlc_metrics.py
```

The React frontend is now completely stateless and secret-free, costing $0 to host and boasting an attack surface of zero.

## Lessons Learned

1. **Hardware is Hostile:** Edge AI must be built defensively. Always trap `device.lost` promises and use `AbortController` for deterministic teardown.
2. **Zero-Trust Frontend:** Never inject secrets into static bundles. If an API requires authentication, move the logic to a backend or a static CI/CD generation step.
3. **Automated Governance:** Moving our SDLC metrics to a completely automated, static pipeline ensures we always have eyes on our DORA metrics without relying on third-party SaaS tools or exposing credentials.

The Token Cosmos v6.0 architecture is now fundamentally hardened across the inference, rendering, and telemetry boundaries.
