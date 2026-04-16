# whest-docs

Shared docs shell for `whest` and `whestbench`.

## Goals

- Keep the current `whest` GitHub Pages docs working unchanged during phase 1.
- Build a separate unified docs site in this repository.
- Treat `whest` and `whestbench` as source repos for product docs content and product-specific docs components.

## Ownership Model

- `whest` owns:
  - docs content in `website/content/docs`
  - product docs integration in `website/docs-kit`
- `whestbench` owns:
  - docs content in `docs/`
  - product docs integration in `docs-kit/`
- `whest-docs` owns:
  - shared layout
  - route planning
  - sync and deploy flow
  - future cross-product navigation and search

## Local Development

Three modes are supported:

1. `remote + remote`
   - no local overrides
   - run `npm run sync:sources`
2. `local + remote`
   - set one override path, for example `WHESTBENCH_PATH=/path/to/whestbench`
3. `local + local`
   - set both `WHEST_PATH` and `WHESTBENCH_PATH`

Then start the site:

```bash
npm install
npm run sync:sources
npm run prepare:content
npm run dev
```

## Source Selection

The source policy lives in [`config/sources.json`](/Users/mohanty/.codex/worktrees/2706/whest-docs/config/sources.json).

- Phase 1: both repos track `main`
- Later: switch `ref` values to tags or release pins without changing repo topology

## CI / Sync Flow

- Source repos should trigger this repo via repository dispatch after updates to `main`.
- The source workflows expect a token secret named `AICROWD_DOCS_DISPATCH_TOKEN` with permission to call repository dispatch on `AIcrowd/whest-docs`.
- This repo checks out both sources, prepares content, then builds and deploys the shared site.
- There is no automatic back-sync into `whest` or `whestbench`.
