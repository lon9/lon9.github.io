import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'lon9'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `https://${username}.github.io/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
