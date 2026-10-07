# Matt Cicala — Portfolio

An independent portfolio built with Next.js, TypeScript and plain CSS. The original course portfolio stays active at <https://vetematts.github.io/Portfolio/> and is linked from the footer.

## Design direction

A single-page portfolio with a dimensional project carousel and a living code-rain background. Copy is kept to a short introduction, factual project descriptions and contact links. The original MC monogram remains in the header and footer, with signature periwinkle `#9FB3EC`. Employment, education and résumé downloads are excluded.

Drag, swipe or use the arrow controls to move through CineCritic, Redlands Bonsai and Plex Toolkit. The focused preview sits in front of tilted neighbouring previews, with a gentle pointer tilt, soft lighting and deep shadows. The project story and links follow the selected preview. Plex has an animated illustrative collection workflow using sample data; it does not connect to a library. The website previews are real screenshots, with links to the live projects.

Code rain spans the page in multiple sizes and speeds. Moving the pointer lights and bends nearby glyphs; clicking or tapping sends out a ripple. Atmospheric gradients and subtle motion add depth around the content.

Choose **Try it** on CineCritic or Redlands Bonsai to browse the live website inside a preview panel. It fills the screen on phones, with persistent close and open-site controls. The embedded site loads only when opened and is unloaded on close. `previewUrl` in `src/data/projects.ts` points directly to the deployed site, while `url` remains the public project link; update both if hosting changes.

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

### Refresh project previews

Capture the current live websites at a consistent 1280 × 720 desktop size:

```sh
# Install the screenshot browser once after npm ci.
npx playwright install chromium

# Refresh both website previews.
npm run previews:refresh

# Or refresh just CineCritic after a redesign.
npm run previews:refresh -- cinecritic
```

The command reads URLs and image paths from `src/data/projects.ts`, follows redirects, and waits for the page fonts and visible images to load. CineCritic's movie posters must appear before capture; this allows time for its API to wake up. If a site fails to load, the current previews are retained. Readiness selectors live in `scripts/refresh-previews.ts`; update these if a redesign changes the relevant markup.

Review the images in the local carousel, then commit and push to `main` to publish them. Capture runs only when requested; it is not part of the Vercel build and does not commit or push. Plex Toolkit keeps its illustrative animated preview.

### Automatic preview refresh

The GitHub Actions workflow in `.github/workflows/refresh-previews.yml` captures both live websites every two weeks on alternate Thursdays at approximately 10:17 am Brisbane time, anchored to 1 October 2026 (then 15 October, 29 October, 12 November, and so on). A small weekly check skips the intervening Thursdays, keeping a true 14-day interval across month boundaries. It runs on GitHub, so your computer can be off. Commit and push the workflow to `main` to activate it.

For an immediate refresh after a redesign, open this repository's **Actions → Refresh project previews → Run workflow**. The workflow installs Chromium and runs the same capture command as the local script. If either site fails, the job fails without publishing replacements.

After successful captures, the workflow replaces the existing JPEGs and automatically commits and pushes changed images to `main` with the message `Refresh project previews`. Unchanged images do not create a commit. The connected Vercel Git integration then builds and publishes the portfolio, without a manual review step or additional deployment credentials. See [Vercel's Git deployment documentation](https://vercel.com/docs/deployments).

Runs also save a **project-previews** ZIP under **Artifacts**, retained for 45 days. These archives are outside the repository and expire automatically. The working tree keeps only the current screenshot files; earlier committed versions remain in Git history. If another commit reaches `main` during capture, the job's normal push fails safely; rerun it from the Actions tab. Branch rules must permit this workflow to push to `main`.

GitHub can delay scheduled runs. In public repositories, GitHub also disables schedules after 60 days without repository activity; re-enable the workflow from the Actions tab if that happens. See [GitHub's scheduling documentation](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule).

### Portfolio files

- `src/data/projects.ts`: project descriptions, technologies, supporting case-study notes and links.
- `src/app/page.tsx`: introduction, carousel and contact.
- `src/app/globals.css`: colour tokens, typography, layout and responsive rules.
- `src/components/ProjectCarousel.tsx`: swipe/drag gestures, carousel navigation, hover tilt and illustrative Plex workflow.
- `src/components/LiveProjectPreview.tsx`: on-demand live website panel, keyboard dismissal and focus restoration.
- `src/components/BackgroundRain.tsx`: interactive rain canvas, pointer lighting, click ripples, pause control and reduced-motion preference.
- `public/brand/mc.svg`: unmodified primary logo copied from the MC reference repo.
- `public/projects/`: real homepage screenshots captured during the design review.

The carousel supports keyboard arrows, Home/End and explicit previous/next buttons, with visible focus states. Inactive previews are hidden from keyboard and assistive-technology navigation; changes are announced through a status region. Background rain runs at a capped frame rate, pauses when the tab is hidden, has a pause control in the footer and is disabled for reduced motion. CSS transitions and smooth scrolling also respect reduced motion.

## Before publishing

Review personal copy and project attribution and choose the deployment domain. Then add domain-specific canonical/social metadata and a social preview image. Project stories do not claim measured adoption or business outcomes.
