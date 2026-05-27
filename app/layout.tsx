import type { Metadata } from 'next'
import './globals.css'

const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'lon9'
const siteUrl = `https://${username}.github.io`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${username} — Software Engineer`,
    template: `%s | ${username}.github.io`,
  },
  description: `GitHub portfolio for ${username}: open-source projects, programming language statistics, and recent development activity.`,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'profile',
    url: siteUrl,
    siteName: `${username}.github.io`,
    title: `${username} — Software Engineer`,
    description: `GitHub portfolio for ${username}: open-source projects, programming language statistics, and recent development activity.`,
    images: [
      {
        url: `https://github.com/${username}.png`,
        width: 460,
        height: 460,
        alt: `${username} GitHub avatar`,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: `${username} — Software Engineer`,
    description: `GitHub portfolio for ${username}: open-source projects, programming language statistics, and recent development activity.`,
    images: [`https://github.com/${username}.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: { icon: '/favicon.ico' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: username,
    url: siteUrl,
    sameAs: [`https://github.com/${username}`],
    image: `https://github.com/${username}.png`,
  },
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-screen"
        style={{
          backgroundColor: '#050510',
          color: '#a0b8cc',
          fontFamily: '"JetBrains Mono", monospace',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </body>
    </html>
  )
}
