import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "AutoFlow - Visual Workflow Automation for Everyone",
  description: "Create powerful automations with intuitive drag-and-drop interface. Connect Gmail, Slack, Twitter, Google Sheets, and 50+ integrations. Premium features starting at ₹1,699/month.",
  keywords: "automation, workflow, zapier alternative, n8n, gmail automation, slack integration, indian automation platform, premium workflows",
  authors: [{ name: "Ayush Shah", url: "https://github.com/cancelledcoder" }],
  creator: "Ayush Shah",
  publisher: "AutoFlow",
  robots: "index, follow",
  openGraph: {
    title: "AutoFlow - Visual Workflow Automation for Everyone",
    description: "The most advanced visual automation platform built for Indian users. Connect all your favorite apps and automate repetitive tasks.",
    url: "https://autoflow.app",
    siteName: "AutoFlow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AutoFlow - Premium Automation Platform",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoFlow - Visual Workflow Automation",
    description: "Build powerful automations with 50+ integrations. Premium plans starting at ₹1,699/month.",
    images: ["/og-image.png"],
    creator: "@ayushshah30",
  },
  manifest: "/manifest.json",
  themeColor: "#6366f1",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="AutoFlow" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}