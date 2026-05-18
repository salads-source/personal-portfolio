import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  title: `${profile.name} | Software Engineer`,
  description:
    "Portfolio of Ron Quah, a Singapore-based software engineer building backend, data platform, compliance, frontend, and machine learning systems.",
  keywords: [
    "Ron Quah",
    "Software Engineer",
    "NUS Computer Science",
    "Backend Engineer",
    "Data Platform",
    "Spring Boot",
    "Kafka",
    "Next.js",
    "Machine Learning"
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    title: `${profile.name} | Software Engineer`,
    description:
      "Backend, data platform, compliance, and ML systems with production-grade discipline.",
    type: "website",
    locale: "en_SG"
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080b0a" },
    { media: "(prefers-color-scheme: light)", color: "#f7f4e9" }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="ron-portfolio-theme-v3"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
