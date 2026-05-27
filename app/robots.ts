import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'lon9'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `https://${username}.github.io/sitemap.xml`,
  }
}
