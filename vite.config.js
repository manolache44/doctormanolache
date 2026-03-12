import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: [
        "index.html",
        "despre.html",
        "servicii.html",
        "contact.html",
        "programare.html",
        "dentist-fara-frica.html",
        "politica-cookies.html",
        "politica-confidentialitate.html",
      ],
    },
    outDir: "dist",
  },
});
