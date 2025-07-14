import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "vee-anti.xyz | veeAnti's Digital Archive",
  description:
    "Personal blog and project archive of veeAnti - Android development, software engineering, and digital experiments",
  keywords: ["veeAnti", "Android", "Software", "Development", "Blog", "Projects"],
  authors: [{ name: "veeAnti" }],
  creator: "veeAnti",
  publisher: "veeAnti",
  robots: "index, follow",
  openGraph: {
    title: "vee-anti.xyz | veeAnti's Digital Archive",
    description: "Personal blog and project archive of veeAnti",
    url: "https://vee-anti.xyz",
    siteName: "vee-anti.xyz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "vee-anti.xyz | veeAnti's Digital Archive",
    description: "Personal blog and project archive of veeAnti",
    creator: "@veeAnti",
  },
    generator: 'Lou'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
