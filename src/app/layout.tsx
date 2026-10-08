import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matt Cicala — Web developer",
  description:
    "Web developer drawn to simple interfaces and thoughtful systems.",
  icons: { icon: "/icon.png" },
  openGraph: {
    title: "Matt Cicala — Web developer",
    description:
      "Web developer drawn to simple interfaces and thoughtful systems.",
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
