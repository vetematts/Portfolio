# Matt Cicala — Portfolio

An independent portfolio built with Next.js, TypeScript and plain CSS. The original course portfolio stays active at <https://vetematts.github.io/Portfolio/> and is linked from the footer.

## Design direction

An editorial, single-page portfolio with open project chapters. The original MC monogram is used in the header and footer, with signature periwinkle `#9FB3EC`. Sparse, slow code rain sits behind the whole page, independently of the logo. The introduction focuses on Matt and his work; employment, education and résumé downloads are excluded.

Project navigation follows the reading position. CineCritic and Redlands Bonsai have annotated homepage walkthroughs with clickable points and equivalent text controls. Each project's system view has selectable components and design decisions. Plex Toolkit has an interactive sample library: select films, choose a collection and see which items match. These local examples illustrate the projects; they do not embed live applications or connect to Plex.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open <http://localhost:3000>. To use another port:

```sh
npm run dev -- --hostname 127.0.0.1 --port 3010
```

## Validate and build

```sh
npm run typecheck
npm run build
```

The build exports a static site to `out/`. There are no server APIs, external fonts, analytics or GitHub API dependencies. The site currently expects a domain root; a GitHub Pages project subpath needs a base-path/asset-path pass before deployment. No deployment is configured yet.

## Edit content and branding

- `src/data/projects.ts`: project descriptions, technologies, system flow, decisions, walkthrough points and links.
- `src/app/page.tsx`: introduction, project index, about and contact.
- `src/app/globals.css`: colour tokens, typography, layout and responsive rules.
- `src/components/ProjectChapters.tsx`: project navigation, interface walkthroughs, system exploration and illustrative Plex interaction.
- `src/components/BackgroundRain.tsx`: ambient canvas, pause control, visibility handling and reduced-motion preference.
- `public/brand/mc.svg`: unmodified primary logo copied from the MC reference repo.
- `public/projects/`: real homepage screenshots captured during the design review.

Chapters are visible in the initial HTML. All interactions have keyboard controls and visible focus states. Background rain runs at a capped frame rate, pauses when the tab is hidden, has a pause control in the footer and is disabled for reduced motion. CSS transitions and smooth scrolling also respect reduced motion.

## Before publishing

Review personal copy and project attribution and choose the deployment domain. Then add domain-specific canonical/social metadata and a social preview image. Project stories do not claim measured adoption or business outcomes.
