# Friction Hunter

**Engineering notes, practical experiments, and first-principles learning** by Thokchom Lolet Singh.

Friction Hunter is my technical writing and interactive learning site. It covers cloud infrastructure, automation, systems engineering, AI concepts, and how to understand difficult technologies beyond memorizing tutorials.

**Explore:** [Published site](https://thokchomlolet03-cpu.github.io/my-tech-blog/) · [My GitHub profile](https://github.com/thokchomlolet03-cpu) · [LinkedIn](https://www.linkedin.com/in/thokchom-lolet-singh-b77341b2/)

## What you'll find

- **Technical essays:** Architecture, reliability, networking, Linux, cloud, and engineering trade-offs.
- **First-principles tutorials:** Mental models grounded in concrete, testable examples.
- **Interactive learning material:** Visual explanations and small applications that make abstract concepts observable.
- **Terraform curriculum:** The [Terraform Mastery](https://github.com/thokchomlolet03-cpu/terraform-mastery) repository is the canonical source for its lesson materials. This website includes tooling that synchronizes curated content.

The purpose is to document what I learn, what I build, where experiments fail, and how my understanding changes—not to present every idea as production-tested.

## Technology

- **Website:** Astro, TypeScript, MDX, React, Tailwind CSS.
- **Content and search:** Markdown/MDX, Pagefind.
- **Quality tools:** Astro type checking, ESLint, Prettier.
- **Content synchronization:** Node.js scripts under `scripts/` for selected Terraform documentation and curriculum.

## Run locally

Requires **Node.js 22.12+** and npm.

```bash
git clone https://github.com/thokchomlolet03-cpu/my-tech-blog.git
cd my-tech-blog
npm ci
npm run dev
```

To check and build:

```bash
npm run lint
npm run format:check
npm run build
```

`npm run build` executes the repository's `prebuild` scripts, including Terraform curriculum/documentation synchronization. Those scripts may require access to upstream material; see `scripts/` for the exact inputs and behavior. The build also runs Astro checks and generates Pagefind search assets.

Configuration lives primarily in `astro-paper.config.ts`, `astro.config.ts`, and the site content under `src/content/`.

## Editorial standard

When describing technical work, I aim to distinguish:

- documented behavior from assumptions;
- runnable demonstrations from production deployment;
- generated or simulated results from observed measurements;
- current configurations from time-sensitive recommendations.

Corrections and well-supported challenges are welcome via GitHub issues.

## Origin and acknowledgements

This site is **adapted from [AstroPaper](https://github.com/satnaing/astro-paper)**, the open-source Astro blog theme created by **Sat Naing**. The original theme and its contributors deserve credit; this repository's [MIT license](LICENSE) preserves the original copyright notice. My writing, site-specific configuration, curricula, and integrations are developed on top of that foundation.

---

**Author:** [Thokchom Lolet Singh](https://github.com/thokchomlolet03-cpu)
