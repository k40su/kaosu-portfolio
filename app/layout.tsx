import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import { MotionProvider } from "@/components/site/motion-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  metadataBase: new URL("https://kaosu.dev"),
  title: "Ryder Jennewine",
  description:
    "Portfolio of Ryder (kaosu), a full-stack developer building for the web with a growing focus on security.",
  openGraph: {
    title: "Ryder Jennewine",
    description:
      "Portfolio of Ryder Jennewine (kaosu), a full-stack developer building for the web with a growing focus on security.",
    url: "/",
    siteName: "kaosu.dev",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn("scroll-smooth antialiased", "font-sans", inter.variable)}
    >
      <body>
        <ThemeProvider>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
