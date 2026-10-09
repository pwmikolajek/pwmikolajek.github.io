import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono, Sora, Hanken_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { profile } from "@/content/profile";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const geistSans = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-mono",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sora",
  display: "swap",
  weight: ["500", "600", "700"],
});

const hanken = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-hanken",
  display: "swap",
  weight: ["400", "500", "600"],
});

const title = `${profile.name} — ${profile.tagline}`;
const description = profile.metaDescription;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: "/pm-logo-white.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#151515" },
    { media: "(prefers-color-scheme: light)", color: "#f5f5f4" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable} ${sora.variable} ${hanken.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
