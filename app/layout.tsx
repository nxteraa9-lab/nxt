import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CartProvider } from "@/features/cart/CartProvider";
import { AuthProvider } from "@/features/auth/AuthProvider";
import { ThemeProvider } from "@/features/theme/ThemeProvider";
import { WishlistProvider } from "@/features/wishlist/WishlistProvider";
import { ErrorTrackerProvider } from "@/components/ui/ErrorTrackerProvider";
import { Toaster } from "sonner";

const gaId = process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-H2HP3BGKNW";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://nxt-store.vercel.app"
  ),
  title: {
    default: "NXT | البراند المفضل للملابس العصرية",
    template: "%s | NXT Store",
  },
  description:
    "تسوق أحدث تشكيلات الملابس والستريت وير العصرية من براند NXT. اكتشف أفضل الهوديز، التيشيرتات، والبنطلونات المصممة بأعلى جودة وخامات ممتازة في مصر والوطن العربي.",
  keywords: [
    // 1. اسم البراند وتنويعاته (Brand Name Variations)
    "NXT",
    "NXT Store",
    "NXT Streetwear",
    "NXT Clothing",
    "NXT Fashion",
    "NXT Brand",
    "براند NXT",
    "براند نكست",
    "نكست",
    "متجر NXT",
    "براند ملابس NXT",

    // 2. ملابس + اسم البراند (Clothing + Brand)
    "ملابس NXT",
    "ملابس نكست",
    "براند ملابس نكست",
    "NXT streetwear",
    "هوديز NXT",
    "تيشيرتات NXT",
    "بنطلونات NXT",
    "سويت شيرت NXT",
    "NXT t-shirts",
    "NXT hoodies",
    "NXT pants",
    "NXT jackets",

    // 3. كلمات SEO موضة وستريت وير محلية وإقليمية (Local & Category SEO)
    "NXT Egypt",
    "NXT مصر",
    "براندات ستريت وير في مصر",
    "ملابس ستريت وير مصر",
    "Streetwear Egypt",
    "Fashion Brand Egypt",
    "ملابس شبابي عصرية",
    "أحدث صيحات الموضة NXT",
    "تسوق ملابس اونلاين مصر",
    "أونلاين شوبينج ملابس",
  ],
  authors: [{ name: "NXT Brand" }],
  creator: "NXT",
  publisher: "NXT Store",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "/",
    siteName: "NXT Store - براند NXT للملابس",
    title: "NXT | البراند المفضل للملابس والستريت وير العصرية",
    description:
      "تسوق أحدث تشكيلات الملابس والستريت وير من براند NXT. خامات ممتازة وتصاميم عصرية تناسب أسلوب حياتك.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "NXT Clothing Brand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NXT | البراند المفضل للملابس والستريت وير العصرية",
    description: "تسوق أحدث تشكيلات الملابس والستريت وير العصرية من براند NXT.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('nxt-theme');
                  var system = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && system)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Brand",
              "name": "NXT",
              "alternateName": ["نكست", "NXT Store", "NXT Streetwear", "ملابس NXT", "براند NXT"],
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://nxt-store.vercel.app",
              "logo": "/logo.png",
              "description": "براند NXT المتخصص في أفضل ملابس الستريت وير والعصرية في مصر والوطن العربي."
            })
          }}
        />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="font-sans antialiased bg-background text-foreground transition-colors duration-300">
        <ErrorTrackerProvider>
          <AuthProvider>
            <ThemeProvider>
              <CartProvider>
                <WishlistProvider>
                  {children}
                  <Toaster
                    position="bottom-right"
                    toastOptions={{
                      style: {
                        background: "#000",
                        color: "#fff",
                        borderRadius: "12px",
                        border: "none",
                      },
                    }}
                  />
                </WishlistProvider>
              </CartProvider>
            </ThemeProvider>
          </AuthProvider>
        </ErrorTrackerProvider>
      </body>
    </html>
  );
}
