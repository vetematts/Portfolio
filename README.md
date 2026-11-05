# Matt Cicala — Portfolio

An independent portfolio built with Next.js, TypeScript and plain CSS. The original portfolio stays active at <https://vetematts.github.io/portfolio-og/> and is included in the project carousel.

## Design direction

A single-page portfolio with a dimensional project carousel and a living code-rain background. Copy is kept to a short introduction, factual project descriptions and contact links. The original MC monogram remains in the header and footer, with signature periwinkle `#9FB3EC`. Employment, education and résumé downloads are excluded.

Drag, swipe or use the arrow controls to move through CineCritic, Redlands Bonsai, Plex Toolkit and the first portfolio. The focused preview sits in front of tilted neighbouring previews, with a gentle pointer tilt, soft lighting and deep shadows. Each project has a short caption and links, without technology badge lists. Plex has an animated illustrative collection workflow using sample data; it does not connect to a library. The website previews are real screenshots, with links to the live projects.

Code rain spans the page in multiple sizes and speeds. Moving the pointer lights and bends nearby glyphs; clicking or tapping sends out a ripple. Atmospheric gradients and subtle motion add depth around the content.

The carousel uses screenshots. **Visit site** opens each independently hosted website in a new tab. Project links are configured with `url` in `src/data/projects.ts`.

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

### Favicon

`public/icon.svg` uses the original MC artwork in its correct proportions, centred on a square canvas with 2px vertical padding at 32px. `public/icon.png` is the matching 32px fallback. The root layout versions both URLs to refresh cached browser icons. This framing matches Matte Web's M-and-dot favicon while keeping the two marks distinct; the main MC artwork remains in `public/brand/mc.svg`.

### Link preview image

`public/social/preview.png` is the 1200 × 630 sharing image, with an editable SVG alongside it. The root layout supplies this image for Open Graph and large Twitter/X cards, using `https://matteoc.dev` for absolute links and the canonical URL. This works with the static export and does not require a runtime image service.

After replacing the PNG, commit and deploy it with the metadata change. LinkedIn may cache an earlier preview; use its [Post Inspector](https://www.linkedin.com/post-inspector/) to refresh the published URL before adding the link to Featured.

### Project previews

CineCritic, Redlands Bonsai and Juicy Golden use their published share images while they are inactive carousel cards, with local stills as fallbacks. Selected previews also keep this identifiable cover until playback begins. Only the selected card mounts the playable preview, a silent, curated recording. CineCritic shows a visible cursor circling a movie card to demonstrate its tilt, then opens the movie detail page. Redlands Bonsai scrolls from the homepage through meeting details to the moving club-photo strip, demonstrates dragging it, then returns to the top. Juicy Golden includes the hero film, scrolls to the team and advances its carousel twice before returning to the top. The sharing-image cover stays visible until the first video frame is ready, then blends into playback over 320 ms. On desktop, pointer exit pauses the recording and restores the sharing cover; returning resumes the recording. Mobile manual pause keeps the current frame. Reduced motion removes the blend. A matching first-frame poster remains beneath the cover as a video fallback. On desktop, leaving restores the cover over the paused frame. In the phone layout or on touch devices, the selected preview starts automatically once at least half of it is visible. A Play/Pause control remains available, and manual pause stays paused until replay or reselection. The video is fetched only when playback is requested; inactive cards mount no video. It also pauses offscreen, when the tab is hidden, or when site motion is paused; reduced motion prevents automatic playback but allows explicit playback. On media failure the still image remains. This is a recording, not an embedded website: Visit site opens the actual project. The JPEG/MP4 pairs are fixed assets; replace both together if the showcased design changes. Raw captures remain outside Git.

The first portfolio uses a fixed screenshot to preserve the earlier design. Its website link opens the original site.

There is no scheduled screenshot capture or automated media commit. Preview updates are reviewed and committed with other site changes. Previous screenshot versions remain in Git history; old Actions artifacts expire under their existing retention policy. Removing the workflow takes effect on GitHub after this change is pushed to the default branch.

### Portfolio files

- `src/data/projects.ts`: project descriptions, technology labels, links and preview assets.
- `src/app/page.tsx`: introduction, carousel and contact.
- `src/app/globals.css`: colour tokens, typography, layout and responsive rules.
- `src/components/ProjectCarousel.tsx`: swipe/drag gestures, carousel navigation, hover tilt and illustrative Plex workflow.
- `src/components/BackgroundRain.tsx`: interactive rain canvas, pointer lighting, click ripples, pause control and reduced-motion preference.
- `public/brand/mc.svg`: unmodified primary logo copied from the MC reference repo.
- `public/projects/`: real homepage screenshots captured during the design review.

The carousel supports keyboard arrows, Home/End and explicit previous/next buttons, with visible focus states. Inactive previews are hidden from keyboard and assistive-technology navigation; changes are announced through a status region. Background rain runs at a capped frame rate, pauses when the tab is hidden, has a pause control in the footer and is disabled for reduced motion. CSS transitions and smooth scrolling also respect reduced motion.

## Before publishing

Review personal text, project attribution and the sharing image before publishing. Canonical and sharing metadata use `https://matteoc.dev`. Project stories do not claim measured adoption or business outcomes.
