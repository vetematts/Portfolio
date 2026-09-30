export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  line: string;
  image?: string;
  imageAlt?: string;
  url?: string;
  source?: string;
  stack: string[];
  problem: string;
  approach: string;
  decisions: { title: string; text: string }[];
  flow: { name: string; detail: string }[];
  note?: string;
};

export const projects: Project[] = [
  {
    id: "cinecritic",
    number: "01",
    name: "CineCritic",
    category: "Full-stack application",
    line: "Find your next film. Share your take.",
    image: "/projects/cinecritic.jpg",
    imageAlt:
      "CineCritic homepage with a dark interface and rows of movie posters",
    url: "https://cinecritic.matteoc.dev",
    source: "https://github.com/vetematts/CineCritic",
    stack: ["React", "Express", "PostgreSQL", "TMDB", "Docker", "Google Cloud"],
    problem:
      "Movie discovery and personal reviews belong together. CineCritic brings browsing, accounts and reviews into one application.",
    approach:
      "A React interface backed by an Express API, PostgreSQL and TMDB. JWT authentication supports accounts, while Docker and CI/CD support the deployment workflow.",
    decisions: [
      {
        title: "Let the films lead",
        text: "Movie artwork makes a useful starting point for discovery, with browsing and reviews built around it.",
      },
      {
        title: "Separate the responsibilities",
        text: "The interface, API and database have distinct roles, keeping the application easier to reason about.",
      },
      {
        title: "Build beyond localhost",
        text: "Containerisation and a CI/CD workflow make deployment part of the project, alongside the application itself.",
      },
    ],
    flow: [
      {
        name: "React",
        detail:
          "The React interface handles film browsing and review writing, connecting user actions with the application API.",
      },
      {
        name: "Express API",
        detail:
          "The Express API handles account and review requests, with JWT authentication supporting signed-in actions.",
      },
      {
        name: "PostgreSQL + TMDB",
        detail:
          "PostgreSQL stores accounts and reviews. TMDB supplies the movie information used for discovery.",
      },
    ],
    note: "The demo API uses free hosting and may take a moment to wake up.",
  },
  {
    id: "redlands-bonsai",
    number: "02",
    name: "Redlands Bonsai",
    category: "Community website",
    line: "A clearer home for a growing community.",
    image: "/projects/bonsai.jpg",
    imageAlt:
      "Redlands Bonsai Society website with a warm cream layout, bonsai photography and event information",
    url: "https://redlandsbonsai.matteoc.dev",
    stack: [
      "Next.js",
      "TypeScript",
      "File-driven content",
      "Calendar feeds",
      "Transactional email",
    ],
    problem:
      "A volunteer-run bonsai club needed a responsive replacement for its legacy website, with useful information for members and visitors.",
    approach:
      "A Next.js and TypeScript site with file-driven content, date-aware events, newsletters, calendar subscriptions and forms backed by API routes and transactional email.",
    decisions: [
      {
        title: "Keep the content practical",
        text: "Events, newsletters and club information take priority over decorative features.",
      },
      {
        title: "Avoid unnecessary infrastructure",
        text: "File-driven content removes the need for a separate CMS for this project.",
      },
      {
        title: "Meet people where they are",
        text: "Calendar subscriptions and email-backed forms extend the website into familiar everyday tools.",
      },
    ],
    flow: [
      {
        name: "Content files",
        detail:
          "Events, newsletters and club information live in content files, keeping updates independent of a separate CMS.",
      },
      {
        name: "Next.js",
        detail:
          "Next.js turns content into responsive pages and provides the API routes used by the website’s forms.",
      },
      {
        name: "Calendar + email",
        detail:
          "Calendar feeds let members follow events in their own calendars. Transactional email delivers form submissions.",
      },
    ],
  },
  {
    id: "plex-toolkit",
    number: "03",
    name: "Plex Toolkit",
    category: "Python automation",
    line: "Less repetition. A better organised library.",
    source: "https://github.com/vetematts/PlexToolkit",
    stack: ["Python", "Plex API", "CLI", "Testing", "Linting"],
    problem:
      "Building movie collections and keeping metadata and artwork consistent can become repetitive manual work.",
    approach:
      "A Python CLI that automates collection building, metadata matching and artwork standardisation, organised into reusable service modules with testing and linting workflows.",
    decisions: [
      {
        title: "Match with context",
        text: "Titles and release years help distinguish films when names alone are ambiguous.",
      },
      {
        title: "Respect existing edits",
        text: "Locked artwork and metadata deserve to stay under the library owner's control.",
      },
      {
        title: "Make the workflow reusable",
        text: "Service modules separate matching, collections and artwork concerns.",
      },
    ],
    flow: [
      {
        name: "Movie metadata",
        detail:
          "Movie titles, release years and collection information provide the context needed to identify library items.",
      },
      {
        name: "Library matching",
        detail:
          "Matching uses title and year context to identify corresponding Plex items, rather than relying on the title alone.",
      },
      {
        name: "Collections + artwork",
        detail:
          "Reusable services handle collection building and artwork standardisation, with existing locked edits kept under the library owner’s control.",
      },
    ],
  },
];
