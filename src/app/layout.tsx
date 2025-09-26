import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AmplifAI - AI Lessons Learned Platform',
  description: 'Share and discover successful AI implementations across Amazon teams',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}