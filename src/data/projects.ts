export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  image?: string;
  imageAlt?: string;
  previewVideo?: string;
  shareImage?: string;
  shareImageAlt?: string;
  url?: string;
  refreshPreview?: boolean;
  source?: string;
  description: string;
  contribution?: string;
  technologies?: string[];
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
    previewVideo: "/projects/cinecritic.mp4",
    shareImage: "https://cinecritic-fawn.vercel.app/CineCritic.JPG",
    shareImageAlt: "CineCritic link preview",
    refreshPreview: false,
    url: "https://cinecritic.matteoc.dev",
    source: "https://github.com/vetematts/CineCritic",
    description: "A web app for browsing films and writing reviews.",
    contribution:
      "My work spans the interface and API, including responsive movie pages and film discovery.",
    technologies: ["React", "Node.js", "Express", "PostgreSQL"],
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
    description:
      "A website for Redlands Bonsai Society, with events, newsletters and membership information.",
    contribution:
      "I rebuilt the site with clearer navigation and a responsive layout, keeping the club’s identity and photography.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "juicy-golden",
    number: "03",
    name: "Juicy Golden",
    category: "Salon redesign",
    image: "/projects/juicy-golden.jpg",
    imageAlt:
      "Juicy Golden redesigned homepage with salon photography, gold branding and a clear booking link",
    previewVideo: "/projects/juicy-golden.mp4",
    shareImage:
      "https://vetematts.github.io/JuicyGolden/assets/share-preview.jpg",
    shareImageAlt:
      "Juicy Golden gold wordmark and brand symbols over the salon frontage",
    refreshPreview: false,
    url: "https://vetematts.github.io/JuicyGolden/",
    description:
      "An independent salon website redesign, with services, pricing and a direct booking link.",
    contribution:
      "I reworked the layout and mobile booking access around the salon’s existing lettering, photography and film.",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "plex-toolkit",
    number: "04",
    name: "Plex Toolkit",
    category: "Library tools",
    source: "https://github.com/vetematts/PlexToolkit",
    description: "Tools for managing Plex collections, metadata and artwork.",
  },
  {
    id: "earlier-portfolio",
    number: "05",
    name: "First portfolio",
    category: "Earlier work",
    image: "/projects/earlier-portfolio.jpg",
    imageAlt:
      "Matt’s first portfolio with a cream background, MC logo and illustrated portrait",
    url: "https://vetematts.github.io/portfolio-og/",
    refreshPreview: false,
    source: "https://github.com/vetematts/portfolio-og",
    description:
      "My original portfolio, built with HTML and CSS before this version.",
  },
];
