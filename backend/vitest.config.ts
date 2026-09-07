import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    root: './',
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: '../coverage',
      include: ['src/**/*.ts'],
    },
  },
  plugins: [
    // NestJS DI reads constructor param types from decorator metadata. Vitest's
    // default esbuild transform doesn't emit it, so run the sources through SWC.
    swc.vite({
      jsc: {
        parser: { syntax: 'typescript', decorators: true },
        transform: { legacyDecorator: true, decoratorMetadata: true },
      },
    }),
  ],
});
