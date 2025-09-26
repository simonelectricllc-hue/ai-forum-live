import Link from 'next/link'
import { listPosts } from '@/lib/store'

export const revalidate = 0

export default async function Home() {
  const posts = await listPosts()
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Latest posts</h1>
      <ul className="space-y-3">
        {posts.map(p => (
          <li key={p.id} className="rounded-xl border bg-white p-4">
            <Link href={`/p/${p.slug}`} className="text-lg font-medium hover:underline">
              {p.title}
            </Link>
            <p className="mt-1 truncate text-sm text-gray-600">{p.body}</p>
            <p className="mt-2 text-xs text-gray-500">{new Date(p.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
