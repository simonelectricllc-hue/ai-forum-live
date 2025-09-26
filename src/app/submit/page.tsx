import { createPost } from '@/lib/store'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

export default function SubmitPage() {
  async function action(formData: FormData) {
    'use server'
    const schema = z.object({
      title: z.string().min(4).max(140),
      body: z.string().min(10).max(10000),
      author: z.string().optional(),
    })
    const data = schema.parse({
      title: String(formData.get('title') || ''),
      body: String(formData.get('body') || ''),
      author: String(formData.get('author') || ''),
    })
    await createPost(data)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Create post</h1>
      <form action={action} className="space-y-3 rounded-xl border bg-white p-4">
        <label className="block text-sm font-medium">Title</label>
        <input name="title" required className="w-full rounded-lg border p-2" placeholder="What do you want to discuss?" />
        <label className="block text-sm font-medium">Body</label>
        <textarea name="body" required className="w-full rounded-lg border p-2" rows={8} placeholder="Write the details…" />
        <label className="block text-sm font-medium">Your name (optional)</label>
        <input name="author" className="w-full rounded-lg border p-2" placeholder="e.g., Dina" />
        <button className="rounded-lg bg-black px-4 py-2 text-white">Publish</button>
      </form>
    </div>
  )
}
