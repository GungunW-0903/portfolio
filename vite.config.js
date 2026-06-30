import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// `base` is set to the repo name for GitHub Pages project sites
// (served at https://<user>.github.io/portfolio/), and left as '/' for local dev.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/portfolio/' : '/',
  plugins: [react(), tailwindcss()],
}))
