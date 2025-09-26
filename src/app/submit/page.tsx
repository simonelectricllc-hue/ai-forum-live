import Link from "next/link";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createPost } from "@/lib/store";

// simple validation
const schema = z.object({
  title: z.string().min(1).max(140),
  body: z.string().min(1).max(10000),
  author: z.string().optional(),
});

export default function SubmitPage() {
  // server action that creates the post then redirects to it
  async function action(formData: FormData) {
    "use server";
    const data = schema.parse({
      title: String(formData.get("title") || ""),
      body: String(formData.get("body") || ""),
      author: String(formData.get("author") || ""),
    });

    const post = await (createPost as any)(data);
    redirect(`/p/${post.slug}`);
  }

  return (
    <div className="mx-auto max-w-3xl p-4">
      <Link href="/" className="text-sm text-gray-500 hover:underline">
        ← Back to posts
      </Link>

      <h1 className="mt-3 text-2xl font-semibold">Create a post</h1>

      <form action={action} className="mt-4 space-y-3 rounded-xl border bg-white p-5 shadow-sm">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            required
            minLength={1}
            className="mt-1 w-full rounded-lg border p-2"
            placeholder="What’s the topic?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Body</label>
          <textarea
            name="body"
            required
            rows={8}
            className="mt-1 w-full rounded-lg border p-2"
            placeholder="Write your post…"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Author (optional)</label>
          <input
            name="author"
            className="mt-1 w-full rounded-lg border p-2"
            placeholder="Your name"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg border bg-black px-3 py-2 text-white hover:bg-gray-800"
        >
          Publish
        </button>
      </form>
    </div>
  );
}
