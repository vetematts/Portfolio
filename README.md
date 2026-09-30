# Matt Cicala — Portfolio

A new, independent portfolio built with Next.js, TypeScript and plain CSS. The original course portfolio stays active at <https://vetematts.github.io/Portfolio/> and is linked from the footer.

## Design direction

Project Chapters: an editorial, single-page portfolio with expandable project stories rather than a card grid. Charcoal surfaces, the original MC monogram and signature periwinkle `#9FB3EC` establish the visual identity. The optional code rain is a small interaction inside the hero monogram, adapted from the GitHub profile artwork.

Each project includes a preview, a system overview, design decisions and links to the available live application or source. The Plex interaction uses fixed sample data to illustrate collection matching; it does not run Plex Toolkit or connect to a library.

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

The production build exports a static site to `out/`. There are no server APIs, external fonts, analytics or GitHub API dependencies. The site currently expects to be hosted at a domain root; a GitHub Pages project subpath needs a base-path/asset-path pass before deployment. No deployment is configured yet.

## Edit content and branding

- `src/data/projects.ts`: project descriptions, stack, flow, decisions and links.
- `src/app/page.tsx`: introduction, experience, education, skills and contact.
- `src/app/globals.css`: colour tokens, typography, layout and responsive rules.
- `src/components/ProjectChapters.tsx`: chapter controls, preview views and illustrative Plex interaction.
- `src/components/BrandSignal.tsx`: optional code rain, visibility handling and reduced-motion preference.
- `public/brand/mc.svg`: unmodified primary logo copied from the MC reference repo.
- `public/brand/code-rain.svg`: local periwinkle derivative of the GitHub profile rain asset; the source repo is unchanged.
- `public/projects/`: real homepage screenshots captured during the design review.
- `public/matthew-cicala-resume.pdf`: supplied résumé, available to view or download.

Native disclosures keep project content accessible without JavaScript. Buttons, links and disclosure summaries work by keyboard. Rain starts off, stops when the tab is hidden, is unmounted outside the visible hero, and is disabled for reduced motion. CSS transitions and smooth scrolling also respect reduced motion.

## Before publishing

Review personal copy and project attribution, confirm the current résumé and employment dates, and choose the deployment domain. Then add domain-specific canonical/social metadata and a social preview image. Project case-study copy is a first editorial pass grounded in the supplied résumé and project documentation; it does not claim measured adoption or business outcomes.
