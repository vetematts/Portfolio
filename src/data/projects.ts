export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  image?: string;
  imageAlt?: string;
  url?: string;
  previewUrl?: string;
  refreshPreview?: boolean;
  source?: string;
  description: string;
  note?: string;
};

export const projects: Project[] = [
  {
    id: "cinecritic",
    number: "01",
    name: "CineCritic",
    category: "Film discovery",
    image: "/projects/cinecritic.jpg",
    imageAlt:
      "CineCritic homepage with a dark interface and rows of movie posters",
    url: "https://cinecritic.matteoc.dev",
    previewUrl: "https://cinecritic-fawn.vercel.app",
    source: "https://github.com/vetematts/CineCritic",
    description: "A web app for browsing films and writing reviews.",
    note: "The demo may take a moment to load.",
  },
  {
    id: "redlands-bonsai",
    number: "02",
    name: "Redlands Bonsai",
    category: "Club website",
    image: "/projects/bonsai.jpg",
    imageAlt:
      "Redlands Bonsai Society website with a warm cream layout, bonsai photography and event information",
    url: "https://redlandsbonsai.matteoc.dev",
    previewUrl: "https://redlands-bonsai-society.vercel.app",
    description:
      "A website for Redlands Bonsai Society, with events, newsletters and membership information.",
  },
  {
    id: "plex-toolkit",
    number: "03",
    name: "Plex Toolkit",
    category: "Library tools",
    source: "https://github.com/vetematts/PlexToolkit",
    description: "Tools for managing Plex collections, metadata and artwork.",
  },
  {
    id: "earlier-portfolio",
    number: "04",
    name: "First portfolio",
    category: "Earlier work",
    image: "/projects/earlier-portfolio.jpg",
    imageAlt:
      "Matt’s first portfolio with a cream background, MC logo and illustrated portrait",
    url: "https://vetematts.github.io/portfolio-og/",
    previewUrl: "https://vetematts.github.io/portfolio-og/",
    refreshPreview: false,
    source: "https://github.com/vetematts/portfolio-og",
    description:
      "My original portfolio, built with HTML and CSS before this version.",
  },
];
