import type { APIRoute } from "astro";
import { getPosts, postUrl } from "../lib/posts";

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts();
  const parts = posts.map(
    (p) => `# ${p.data.title}\n\nURL: ${new URL(postUrl(p), site)}\nDate: ${p.data.date.toISOString().slice(0, 10)}\n\n${p.body ?? ""}`,
  );
  return new Response(parts.join("\n\n---\n\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
