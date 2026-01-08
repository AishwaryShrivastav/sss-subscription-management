import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sanathana Sarathi Hindi - Subscription Management',
  description: 'Subscription Management System for Sanathana Sarathi Hindi Magazine',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

