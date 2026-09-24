import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { PageLoadingProvider } from "@/components/PageLoadingContext";
import { seo, person } from "@/data/siteConfig";
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),

  title: {
    default: "Shreesha V Jain | Full Stack Developer & AI/ML Engineer",
    template: "%s | Shreesha V Jain",
  },

  verification: {
    google:  seo.googleVerification,
  },

  description:
    "I'm Shreesha V Jain, a Full Stack Developer & AI/ML Engineer building scalable web applications and intelligent systems with React, Next.js, TypeScript, Artificial Intelligence, and Machine Learning.",

  keywords: [
    "Shreesha V Jain",
    "Full Stack Developer Portfolio",
    "Next.js Developer",
    "React Developer",
    "NestJS Backend Developer",
    "TypeScript Engineer",
    "Web Application Developer",
    "MongoDB PostgreSQL Prisma",
    "API Development",
    "Software Engineer Portfolio",
  ],

  authors: [{  name: person.name }],
  creator: person.name,

  alternates: {
    canonical: seo.url,
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",

  openGraph: {
    title: "Shreesha V Jain | Full Stack Developer & AI/ML Engineer",
    description:
      "Full Stack Developer & AI/ML Engineer building scalable web applications and intelligent systems.",
    url: seo.url,
    siteName: seo.siteName,
    images: [
      {
        url: seo.ogImage,
        width: 1200,
        height: 630,
        alt: "Shreesha V Jain — Full Stack Developer & AI/ML Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shreesha V Jain | Full Stack Developer & AI/ML Engineer",
    description:
      "I build scalable web applications and work with Artificial Intelligence and Machine Learning.",
    ...(seo.twitterHandle ? { site: seo.twitterHandle, creator: seo.twitterHandle } : {}),
    images: [
      {
        url: seo.ogImage,
        width: 1200,
        height: 630,
        alt: "Shreesha V Jain — Full Stack Developer & AI/ML Engineer",
      },
    ],
  },

  applicationName: seo.siteName,
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="bg-page text-main antialiased">

        {/* Loader safety script */}
        <Script id="loader-safety-switch" strategy="afterInteractive">
          {`
            (function() {
              const hideLoader = () => {
                const loader = document.getElementById('initial-loader');
                if (loader) loader.classList.add('loaded');
              };
              if (document.readyState === 'complete') hideLoader();
              else window.addEventListener('load', hideLoader);
              setTimeout(hideLoader, 3000);
            })();
          `}
        </Script>

        {/* Loader */}
        <div id="initial-loader">
          <div className="loader-content">
            <div className="loader-typography">
              <span className="loader-name">SHREESHA V JAIN</span>
              <span className="loader-year">Portfolio 2026</span>
            </div>
            <div className="loader-circle-container">
              <svg className="loader-circle-svg" viewBox="0 0 48 48">
                <circle className="circle-bg" cx="24" cy="24" r="22" />
                <circle className="circle-progress" cx="24" cy="24" r="22" />
              </svg>
            </div>
          </div>
        </div>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PageLoadingProvider>
            {children}
            <ThemeToggle />
          </PageLoadingProvider>
        </ThemeProvider>

        {/* Vercel observability — production only */}
        <Analytics mode="production" />
        <SpeedInsights />
        <GoogleAnalytics gaId="G-42FRP71HTB" />
      </body>
    </html>
  );
}