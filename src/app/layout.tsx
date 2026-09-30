import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matt Cicala — Full-stack developer",
  description:
    "Brisbane-based full-stack developer building clear interfaces and practical systems. Explore CineCritic, Redlands Bonsai and Plex Toolkit.",
  icons: { icon: "/icon.png" },
  openGraph: {
    title: "Matt Cicala — Full-stack developer",
    description: "Clear interfaces. Thoughtful systems. Useful software.",
    type: "website",
    locale: "en_AU",
  },
};

export const viewport: Viewport = {
  themeColor: "#10131b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}
