import type { APIRoute } from "astro";
import { getPosts, postUrl } from "../lib/posts";

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts();
  const lines = [
    "# deventlab blog",
    "",
    "> Engineering notes from deventlab on distributed systems, Raft consensus and d-engine.",
    "",
    "## Posts",
    "",
    ...posts.map((p) => `- [${p.data.title}](${new URL(postUrl(p), site)}): ${p.data.excerpt.trim()}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
