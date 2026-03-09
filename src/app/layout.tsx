import type { Metadata } from "next";
import { Fraunces, Inter, Manrope } from "next/font/google";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import { Providers } from "./providers";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const displayFont = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      th: "/",
    },
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
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
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    email: "support@electricshop.example",
    telephone: "+66-2-123-4567",
  };

  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body
        className={`${displayFont.variable} ${bodyFont.variable} antialiased`}
      >
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
        <Providers>
          <div className="app-bg flex min-h-screen flex-col relative w-full overflow-hidden">
            <Navbar />
            <div className="flex-1 w-full relative z-10">{children}</div>
            <div className="w-full relative z-20 mt-auto">
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
