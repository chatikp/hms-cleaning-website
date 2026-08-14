import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'
import path from 'path'

const routes = [
  '/',
  '/services',
  '/services/residential-cleaning',
  '/services/commercial-cleaning',
  '/services/deep-cleaning',
  '/services/move-in-move-out-cleaning',
  '/services/window-cleaning',
  '/services/airbnb-cleaning',
  '/services/home-reset',
  '/services/clean-air-refresh',
  '/services/home-care-check',
  '/gallery',
  '/testimonials',
  '/about',
  '/faq',
  '/blog',
  '/blog/10-daily-habits-that-keep-your-home-clean',
  '/blog/removing-pet-hair-and-odor-guide',
  '/blog/ultimate-move-out-cleaning-checklist',
  '/blog/how-often-should-you-deep-clean-your-home',
  '/blog/eco-friendly-cleaning-products-guide',
  '/blog/preparing-office-for-commercial-cleaning',
  '/booking',
  '/quote',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
]

export default defineConfig({
  server: {
    port: Number(process.env.PORT) || 5173,
  },
  plugins: [
    react(),
    sitemap({
      hostname: 'https://www.harrellmaintenancesolutions.com',
      dynamicRoutes: routes,
      changefreq: 'weekly',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
