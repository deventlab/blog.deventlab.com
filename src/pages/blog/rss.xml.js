import rss from "@astrojs/rss";
import { getPosts, postUrl } from "../../lib/posts";

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: "deventlab blog",
    description: "Engineering notes from deventlab on distributed systems and d-engine.",
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.excerpt,
      link: postUrl(p),
      categories: p.data.tags,
    })),
  });
}
