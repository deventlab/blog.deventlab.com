import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (ctx, next) => {
  if (ctx.url.pathname === "/") {
    return ctx.rewrite("/blog/");
  }
  return next();
});
