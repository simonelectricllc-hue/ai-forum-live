import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";

import { JSONLD } from "@/components/jsonld";
import { getPost, addComment } from "@/lib/store";

// make this route always render fresh (comments show right away)
export const revalidate = 0;

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const post = await (getPost as any)(params.slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: String(post.body || "").slice(0, 140),
  };
}

// server action to create a comment
async function commentAction(formData: FormData) {
  "use server";
  const slug = String(formData.get("slug") || "");
  const body = String(formData.get("body") || "");
  if (!slug || !body.trim()) return;

  await (addComment as any)(slug, body);
  revalidatePath(`/p/${slug}`);
}

export default async function PostPage({ params }: any) {
  const slug = String(params?.slug || "");
  const post = await (getPost as any)(slug);

  if (!post) notFound();

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    headline: post.title,
    datePublished: new Date(post.createdAt).toISOString(),
    commentCount: (post.comments || []).length,
  };

  return (
    <div className="mx-auto max-w-3xl p-4">
      <JSONLD data={jsonld} />

      <Link href="/" className="text-sm text-gray-500 hover:underline">
        ← Back to posts
      </Link>

      <article className="mt-3 rounded-xl border bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-semibold">{post.title}</h1>
        <p className="mt-2 whitespace-pre-wrap leading-7">{post.body}</p>
        <p className=
