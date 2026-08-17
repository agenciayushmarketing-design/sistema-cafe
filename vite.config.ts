import fs from "node:fs"
import path from "node:path"
import { defineConfig, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

/**
 * Gera um 404.html idêntico ao index.html.
 * Hospedagens estáticas (Vercel, GitHub Pages) servem esse arquivo quando a URL
 * não corresponde a um arquivo real — assim as rotas do app (/vendas,
 * /financeiro) continuam abrindo em link direto ou ao recarregar a página.
 */
function spaFallback(): Plugin {
  return {
    name: "spa-404-fallback",
    apply: "build",
    closeBundle() {
      const index = path.resolve(import.meta.dirname, "dist/index.html")
      if (fs.existsSync(index)) {
        fs.copyFileSync(index, path.resolve(import.meta.dirname, "dist/404.html"))
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), spaFallback()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
})
