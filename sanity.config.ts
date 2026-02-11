import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { post, category, seo } from "./src/sanity/schemas";

export default defineConfig({
  name: "admizz-education",
  title: "Admizz Education",
  projectId: "vd27cmpc",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [post, category, seo],
  },
});
