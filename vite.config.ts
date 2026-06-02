import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

const tailwindPlugins = tailwindcss();

export default defineConfig({
  plugins: [react(), ...(Array.isArray(tailwindPlugins) ? tailwindPlugins : [tailwindPlugins])],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    // SECURITY: Disable source maps in production
    sourcemap: process.env.NODE_ENV === 'production' ? false : true,
    // SECURITY: Minify code to reduce size and obfuscate
    minify: 'terser' as const,
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
      },
    },
  },
  server: {
    // Disable file watching when DISABLE_HMR is true.
    hmr: process.env.DISABLE_HMR !== 'true',
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
});
