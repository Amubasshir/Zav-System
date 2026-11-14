import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";
import { site } from "@/lib/site";
import "./globals.css";

/* Self-hosted by next/font: no request to Google at runtime, no layout shift. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

/* Only used for small labels, so it is not preloaded ahead of the headline fonts. */
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "ZAV | Book more HVAC jobs. $199/month, no contract.",
    template: "%s | ZAV",
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.productName,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: site.productName,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#F3F4F1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${grotesk.variable} ${mono.variable}`}
    >
      <body className="flex min-h-dvh flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
