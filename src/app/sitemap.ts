import { MetadataRoute } from 'next'
import { listPosts } from '@/lib/store'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await listPosts()
  const base = 'http://localhost:3000' // change to your real domain after deploy
  return [
    { url: base, priority: 1, changeFrequency: 'hourly', lastModified: new Date() },
    ...posts.map(p => ({
      url: `${base}/p/${p.slug}`,
      lastModified: new Date(p.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]
}
