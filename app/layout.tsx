import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import localFont from "next/font/local";
import { ClerkProvider } from '@clerk/nextjs'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
// @ts-ignore
import "./globals.css";

const font = Nunito({ subsets: ["latin"], variable: "--font-nunito" });

// UI / buttons / menus font
const ui = localFont({
  src: [
    { path: "../fonts/menus/Elza/Elza/Elza Text/ElzaTextTrial-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/menus/Elza/Elza/Elza Text/ElzaTextTrial-Medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/menus/Elza/Elza/Elza Text/ElzaTextTrial-Semibold.otf", weight: "600", style: "normal" },
    { path: "../fonts/menus/Elza/Elza/Elza Text/ElzaTextTrial-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-ui",
});

// Logo / display font
const kalice = localFont({
  src: [
    { path: "../fonts/logo/font/Kalice-Trial-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/logo/font/Kalice-Trial-Italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/logo/font/Kalice-Trial-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/logo/font/Kalice-Trial-MediumItalic.woff2", weight: "500", style: "italic" },
  ],
  variable: "--font-kalice",
});

// Body / text content font
const sentinel = localFont({
  src: [
    { path: "../fonts/text_content/Sentinel-Font-Family/WOFF2/Sentinel-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/text_content/Sentinel-Font-Family/WOFF2/Sentinel-Light-Italic.woff2", weight: "300", style: "italic" },
    { path: "../fonts/text_content/Sentinel-Font-Family/WOFF2/Sentinel-Book.woff2", weight: "400", style: "normal" },
    { path: "../fonts/text_content/Sentinel-Font-Family/WOFF2/Sentinel-Book-Italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/text_content/Sentinel-Font-Family/WOFF2/Sentinel-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/text_content/Sentinel-Font-Family/WOFF2/Sentinel-Medium-Italic.woff2", weight: "500", style: "italic" },
    { path: "../fonts/text_content/Sentinel-Font-Family/WOFF2/Sentinel-Semi-Bold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/text_content/Sentinel-Font-Family/WOFF2/Sentinel-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/text_content/Sentinel-Font-Family/WOFF2/Sentinel-Bold-Italic.woff2", weight: "700", style: "italic" },
    { path: "../fonts/text_content/Sentinel-Font-Family/WOFF2/Sentinel-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-sentinel",
});

// Metadata global aplikasi
export const metadata: Metadata = {
  title: "Kronika",
  description: "Game Edukasi Sejarah Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${font.variable} ${kalice.variable} ${sentinel.variable} ${ui.variable}`}>
        <body className={`font-sentinel antialiased`}>
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          {children}
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
