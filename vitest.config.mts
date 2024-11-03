import swc from 'unplugin-swc';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    deps: {
      interopDefault: true
    },
    environment: 'node',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html'],
      exclude: [...configDefaults.coverage.exclude, 'src/main.ts', 'changelog.config.js', 'commitlint.config.js', 'knexfile.ts', 'knex/migrations/*']
    },
    reporters: 'default',
    include: ['**/*.spec.ts'],
    alias: {
      '@src': './src',
      '@test': './test'
    },
    root: './'
  },
  resolve: {
    alias: {
      '@src': './src',
      '@test': './test'
    }
  },
  plugins: [swc.vite()]
});
