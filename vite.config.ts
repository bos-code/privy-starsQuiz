import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
        categories: path.resolve(__dirname, "categories.html"),
        feedback: path.resolve(__dirname, "feedback.html"),
        leaderboard: path.resolve(__dirname, "leaderboard.html"),
        login: path.resolve(__dirname, "login.html"),
        navbar: path.resolve(__dirname, "navbar.html"),
        profile: path.resolve(__dirname, "profile.html"),
        settings: path.resolve(__dirname, "settings.html"),
        signup: path.resolve(__dirname, "signup.html"),
      },
    },
  },
});
