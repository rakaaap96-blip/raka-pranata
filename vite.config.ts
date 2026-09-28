import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Vite already inlines images/fonts under 4 KB, but this project ships a
    // handful of very small webp avatars that were each costing a request.
    assetsInlineLimit: 2048,
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        /*
         * Function form, not the object form: the object form only matches the
         * bare module ids "react"/"react-dom", so `react-dom/client` (what the
         * app actually imports) plus `scheduler` fell through and ~180 kB of
         * React DOM ended up inside the entry chunk.
         *
         * Note there is deliberately NO react-icons chunk. react-icons is a
         * barrel, so pinning it to one chunk pulled all ~72 icons in the app -
         * including below-the-fold tech badges - into the eager bundle. Left
         * alone, Rollup puts each icon in the chunk that actually uses it, so
         * the first paint only downloads the Navbar/Hero icons.
         */
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) {
            return 'vendor-react'
          }
          if (id.includes('lenis')) return 'vendor-lenis'
        },
      },
    },
  },
})
