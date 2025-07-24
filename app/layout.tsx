import "@/styles/globals.css";
import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";
import SignOutReloader from "@/components/signout-reloader";
import { getCurrentSession } from "@/actions/auth";
import { Toaster } from "@/components/ui/toaster";

import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const uncutsans = localFont({
  src: [
    {
      path: "../public/fonts/Uncut-Sans-Medium.woff2",
      weight: "500",
    },
    {
      path: "../public/fonts/Uncut-Sans-Semibold.woff2",
      weight: "600",
    },
    {
      path: "../public/fonts/Uncut-Sans-Bold.woff2",
      weight: "700",
    },
    {
      path: "../public/fonts/Uncut-Sans-BoldOblique.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-uncut-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wear to find | Sustainable Shopping",
  description:
    "Find the brands and products you need, with the values you love.",
  icons: {
    icon: '/favicon-16x16.png',
    shortcut: '/favicon-16x16.png',
    apple: '/favicon.png',
  },
  twitter: {
    card: "summary_large_image",
    site: "@wear_to_find",
    creator: "@wear_to_find",
  },
  openGraph: {
    title: "Wear to find | Sustainable Shopping",
    description:
      "Find the brands and products you need, with the values you love.",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();

  return (
    <html lang="en">
      <body
        className={`${inter.className} ${uncutsans.className} font-inter antialiased tracking-tight`}
      >
        <div className="flex flex-col min-h-screen overflow-hidden">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SignOutReloader session={session}>{children}</SignOutReloader>
            <Toaster />
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
