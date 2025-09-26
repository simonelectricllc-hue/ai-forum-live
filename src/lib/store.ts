import slugify from 'slugify'

export type Post = { id:string; slug:string; title:string; body:string; author?:string; createdAt:number }
export type Comment = { id:string; postId:string; body:string; author?:string; createdAt:number }

let POSTS: Post[] = [
  { id:'1', slug:'welcome-to-ai-forum', title:'Welcome to the AI Forum MVP', body:'This is a minimal, crawlable forum. Create a post, add comments, and ship.', author:'System', createdAt:Date.now() },
]
let COMMENTS: Comment[] = []

export async function listPosts() { return POSTS.sort((a,b)=>b.createdAt-a.createdAt) }
export async function getPostBySlug(slug:string) { return POSTS.find(p=>p.slug===slug) || null }
export async function createPost(input:{title:string; body:string; author?:string}) {
  const slug = `${slugify(input.title,{lower:true,strict:true})}-${Math.random().toString(36).slice(2,6)}`
  const post: Post = { id: crypto.randomUUID(), slug, title: input.title, body: input.body, author: input.author, createdAt: Date.now() }
  POSTS.push(post); return post
}
export async function listCommentsForPost(postId:string) { return COMMENTS.filter(c=>c.postId===postId).sort((a,b)=>a.createdAt-b.createdAt) }
export async function addComment(input:{postId:string; body:string; author?:string}) {
  const c: Comment = { id: crypto.randomUUID(), postId: input.postId, body: input.body, author: input.author, createdAt: Date.now() }
  COMMENTS.push(c); return c
}
