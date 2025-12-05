import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    open: "index.html", // <<< This decides the dev entry point
  },
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
        categories: path.resolve(__dirname, "categories.html"),
        profile: path.resolve(__dirname, "profile.html"),
        quiz: path.resolve(__dirname, "quiz.html"),
      },
    },
  },
});
