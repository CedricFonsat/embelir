import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'
import generateSitemap from 'vite-plugin-pages-sitemap'

export default defineConfig({
  plugins: [
    react(),
    Pages({
      dirs: 'src/pages',
      onRoutesGenerated: routes => (generateSitemap({ routes })),
    })
  ],
})
