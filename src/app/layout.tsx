import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Custom fonts - using relative paths
const graffity = localFont({
  src: '../assets/fonts/graffity-fc-svg.otf',
  variable: '--font-graffity',
  display: 'swap',
  weight: '400',
});

const graffityFill = localFont({
  src: '../assets/fonts/graffity-fill.otf',
  variable: '--font-graffity-fill',
  display: 'swap',
  weight: '400',
});

const test = localFont({
  src: '../assets/fonts/test.otf',
  variable: '--font-test',
  display: 'swap',
  weight: '400',
});

const NeueMetanaNext = localFont({
  src: '../assets/fonts/NeueMetanaNext-SemiBold.otf',
  variable: '--font-neuemetana',
  display: 'swap',
  weight: '600',
});

export const metadata: Metadata = {
  title: "TheFold - Creative Agency",
  description: "Interactive creative agency portfolio with stunning 3D experiences",
  keywords: "creative agency, web design, 3D, interactive, portfolio",
  authors: [{ name: "TheFold Agency" }],
  openGraph: {
    title: "TheFold - Creative Agency",
    description: "Interactive creative agency portfolio with stunning 3D experiences",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${graffity.variable} ${graffityFill.variable} ${test.variable} ${NeueMetanaNext.variable} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}