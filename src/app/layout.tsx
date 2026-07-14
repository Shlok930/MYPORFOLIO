import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces, Caveat } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shlok Pandey | Full Stack Developer & AI Enthusiast",
  description: "Portfolio of Shlok Pandey, a Full Stack Developer, Software Engineer, and AI Enthusiast building scalable products with Next.js, TypeScript, FastAPI, and Cloud technologies.",
  keywords: ["Shlok Pandey", "Software Engineer", "Full Stack Developer", "AI Developer", "Bhopal", "India", "Next.js Portfolio", "TrustShield", "AI Rake Optimizer", "OIST Bhopal"],
  authors: [{ name: "Shlok Pandey" }],
  creator: "Shlok Pandey",
  openGraph: {
    title: "Shlok Pandey | Full Stack Developer & AI Enthusiast",
    description: "Full Stack Engineer and AI Enthusiast building premium web experiences and scalable intelligent applications.",
    url: "https://shlokpandey.dev",
    siteName: "Shlok Pandey Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shlok Pandey | Full Stack Developer & AI Enthusiast",
    description: "Full Stack Engineer and AI Enthusiast building premium web experiences.",
    creator: "@shlok_pandey",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${plusJakartaSans.variable} ${fraunces.variable} ${caveat.variable} antialiased bg-luxury-bg text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
