import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { postType } from "./schemaTypes/post";

export default defineConfig({
  name: "blog-guilherme-reis",
  title: "Blog — Guilherme Reis",
  projectId: "7ycqkqb2",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: [postType],
  },
});
