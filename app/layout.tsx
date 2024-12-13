import './globals.css'
import { Inter } from 'next/font/google'

import { Toaster } from "@/components/ui/toaster"
import { Providers } from "@/components/providers"

// Use the Inter font from Google Fonts
const inter = Inter({ subsets: ['latin'] })

// Metadata for the application
export const metadata = {
  title: 'Finance Tracker',
  description: 'Track your income and expenses',
}

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Wrap the app with Providers for theme support */}
        <Providers attribute="class" defaultTheme="system" enableSystem>
            {children}
            {/* Add Toaster for displaying notifications */}
            <Toaster />
          </Providers>
      </body>
    </html>
  )
}

