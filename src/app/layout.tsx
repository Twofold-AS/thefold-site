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

// Fix 1: Ensure correct path and add display swap
const graffity = localFont({
  src: '/public/assets/fonts/graffity-fc-svg.otf',
  variable: '--font-graffity',
  display: 'swap',
  weight: '400',
});

const graffityFill = localFont({
  src: '/public/assets/fonts/graffity-fill.otf',
  variable: '--font-graffity-fill',
  display: 'swap',
  weight: '400',
});

const test = localFont({
  src: '/public/assets/fonts/test.otf',
  variable: '--font-test',
  display: 'swap',
  weight: '400',
});

const NeueMetanaNext = localFont({
  src: '/public/assets/fonts/NeueMetanaNext-SemiBold.otf',
  variable: '--font-neuemetana',
  display: 'swap',
  weight: '400',
});

export const metadata: Metadata = {
  title: "Thefold site",
  description: "Interactive creative agency portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${graffity.variable} ${graffityFill.variable} ${test.variable} ${NeueMetanaNext.variable} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}