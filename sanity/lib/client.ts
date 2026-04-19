import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "7ycqkqb2",
  dataset: "production",
  apiVersion: "2025-04-19",
  useCdn: true,
});

// Query: buscar todos os posts ordenados por data
export const ALL_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  category,
  excerpt,
  publishedAt,
  readTime
}`;

// Query: buscar um post pelo slug
export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  excerpt,
  publishedAt,
  readTime,
  body
}`;

// Query: buscar todos os slugs (para generateStaticParams)
export const ALL_SLUGS_QUERY = `*[_type == "post"] { "slug": slug.current }`;
