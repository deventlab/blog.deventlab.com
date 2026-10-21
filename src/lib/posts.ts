import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"blog">;

const authorNames: Record<string, string> = { joshua: "Joshua" };

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const postUrl = (p: Post) => `/blog/${p.id}/`;
export const tagUrl = (tag: string) => `/blog/tags/${tag}/`;
export const authorName = (id: string) => authorNames[id] ?? id;

export const formatDate = (d: Date) =>
  d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

export const readingMinutes = (body: string | undefined) =>
  Math.max(1, Math.round((body ?? "").split(/\s+/).length / 220));
