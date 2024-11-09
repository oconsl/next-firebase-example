import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Toaster } from 'sonner'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Next Firebase Example",
  description: "Next.js + Firebase Example",
}

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-900 text-gray-100 min-h-screen antialiased`}
      >
        <Toaster position='top-center' theme='dark' />
        {children}
      </body>
    </html>
  )
}
