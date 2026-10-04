// Merge jest-dom's matchers (toBeInTheDocument, etc.) into vitest's Assertion
// type. The runtime matchers are registered in setupTests.ts; this only adds
// the types. vitest 5 dropped the implicit jest type bridge, and jest-dom's own
// `/vitest` augmentation resolves `vitest` from the hoisted root where the
// package isn't installed, so declare the augmentation here, next to the tests,
// where `vitest` resolves to the copy they actually use.
/* eslint-disable @typescript-eslint/no-empty-object-type -- the augmentation interfaces must be empty; they only pull in the matcher members */
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

declare module 'vitest' {
  interface Assertion<T = unknown> extends TestingLibraryMatchers<unknown, T> {}
  interface AsymmetricMatchersContaining
    extends TestingLibraryMatchers<unknown, unknown> {}
}
