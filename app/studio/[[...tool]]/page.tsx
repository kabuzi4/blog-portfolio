"use client";

import { NextStudio } from "next-sanity/studio";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { postType } from "@/sanity/schemaTypes/post";

const config = defineConfig({
  name: "blog-guilherme-reis",
  title: "Blog — Guilherme Reis",
  projectId: "7ycqkqb2",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: [postType],
  },
  basePath: "/studio",
});

export default function StudioPage() {
  return <NextStudio config={config} />;
}