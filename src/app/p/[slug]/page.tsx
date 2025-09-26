import { notFound } from 'next/navigation'
import { getPostBySlug, listCommentsForPost, addComment } from '@/lib/store'
import { JSONLD } from '@/components/jsonld'

export const dynamic = 'force-dynamic'

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  if (!post) return notFound()
  const comments = await listCommentsForPost(post.id)

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'DiscussionForumPosting',
    headline: post.title,
    datePublished: new Date(post.createdAt).toISOString(),
    author: { '@type': 'Person', name: post.author || 'Anonymous' },
    articleBody: post.body,
    commentCount: comments.length,
  }

  return (
    <article className="space-y-6">
      <JSONLD data={ld} />
      <header>
        <h1 className="text-2xl font-semibold">{post.title}</h1>
        <p className="mt-2 text-sm text-gray-600">{new Date(post.createdAt).toLocaleString()}</p>
      </header>
      <div className="prose max-w-none">
        <p>{post.body}</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Comments ({comments.length})</h2>
        {comments.length === 0 && <p className="text-sm text-gray-600">Be the first to comment.</p>}
        <ul className="space-y-3">
          {comments.map(c => (
            <li key={c.id} className="rounded-xl border bg-white p-3">
              <p className="text-sm">{c.body}</p>
              <p className="mt-2 text-xs text-gray-500">By {c.author || 'Anonymous'} • {new Date(c.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </section>

      <CommentForm postId={post.id} />
    </article>
  )
}

function CommentForm({ postId }: { postId: string }) {
  async function action(formData: FormData) {
    'use server'
    const body = String(formData.get('body') || '').trim()
    const author = String(formData.get('author') || '').trim()
    if (body.length === 0) return
    await addComment({ postId, body, author })
  }

  return (
    <form action={action} className="mt-6 space-y-3 rounded-xl border bg-white p-4">
      <label className="block text-sm font-medium">Your name (optional)</label>
      <input name="author" className="w-full rounded-lg border p-2" placeholder="e.g., Dina" />
      <label className="block text-sm font-medium">Comment</label>
      <textarea name="body" required className="w-full rounded-lg border p-2" rows={4} placeholder="Share your thoughts…" />
      <button className="rounded-lg bg-black px-4 py-2 text-white">Post comment</button>
    </form>
  )
}
