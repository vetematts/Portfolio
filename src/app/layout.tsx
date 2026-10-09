import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "Matt Cicala — Web developer";
const description =
  "Web developer drawn to simple interfaces and thoughtful systems.";
const sharingImage = {
  url: "/social/preview.png",
  width: 1200,
  height: 630,
  alt: "Matt Cicala’s portfolio, with a terminal name prompt and periwinkle code rain.",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://matteoc.dev"),
  title,
  description,
  alternates: { canonical: "/" },
  icons: { icon: "/icon.png" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Matt Cicala",
    type: "website",
    locale: "en_AU",
    images: [sharingImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [sharingImage],
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
