import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    lib:{
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'Primer-components',
      fileName: (format) => `primer-components.${format}.js`,
    }
  },
});
