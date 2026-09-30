# Matt Cicala — Portfolio

An independent portfolio built with Next.js, TypeScript and plain CSS. The original course portfolio stays active at <https://vetematts.github.io/Portfolio/> and is linked from the footer.

## Design direction

A single-page portfolio with a dimensional project carousel and a living code-rain background. The original MC monogram remains in the header and footer, with signature periwinkle `#9FB3EC`. Employment, education and résumé downloads are excluded.

Drag, swipe or use the arrow controls to move through CineCritic, Redlands Bonsai and Plex Toolkit. The focused preview sits in front of tilted neighbouring previews, with a gentle pointer tilt, soft lighting and deep shadows. The project story and links follow the selected preview. Plex has an animated illustrative collection workflow using sample data; it does not connect to a library. The website previews are real screenshots, with links to the live projects.

Code rain spans the page in multiple sizes and speeds. Moving the pointer lights and bends nearby glyphs; clicking or tapping sends out a ripple. Atmospheric gradients and subtle motion add depth around the content.

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

The build exports a static site to `out/`. There are no server APIs, external fonts, analytics or GitHub API dependencies. The site currently expects a domain root; a GitHub Pages project subpath needs a base-path/asset-path pass before deployment. Vercel is the chosen hosting direction. Connect the GitHub repository, verify a preview deployment, then attach the custom domain. No deployment is configured yet.

## Edit content and branding

- `src/data/projects.ts`: project descriptions, technologies, supporting case-study notes and links.
- `src/app/page.tsx`: introduction, carousel, about and contact.
- `src/app/globals.css`: colour tokens, typography, layout and responsive rules.
- `src/components/ProjectCarousel.tsx`: swipe/drag gestures, carousel navigation, hover tilt and illustrative Plex workflow.
- `src/components/BackgroundRain.tsx`: interactive rain canvas, pointer lighting, click ripples, pause control and reduced-motion preference.
- `public/brand/mc.svg`: unmodified primary logo copied from the MC reference repo.
- `public/projects/`: real homepage screenshots captured during the design review.

The carousel supports keyboard arrows, Home/End and explicit previous/next buttons, with visible focus states. Inactive previews are hidden from keyboard and assistive-technology navigation; changes are announced through a status region. Background rain runs at a capped frame rate, pauses when the tab is hidden, has a pause control in the footer and is disabled for reduced motion. CSS transitions and smooth scrolling also respect reduced motion.

## Before publishing

Review personal copy and project attribution and choose the deployment domain. Then add domain-specific canonical/social metadata and a social preview image. Project stories do not claim measured adoption or business outcomes.
