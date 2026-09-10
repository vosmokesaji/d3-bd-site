/** Bindings used by the existing Worker and database adapter. */
declare module "cloudflare:workers" {
  export const env: { DB?: import("./runtime").D1Database };
}
