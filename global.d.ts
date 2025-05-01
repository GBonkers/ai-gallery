// global.d.ts
export {}; // make this file a module

declare global {
  interface RequireContext {
    keys(): string[];
    <T = unknown>(path: string): T;
  }

  /** Teach TS about Webpack’s require.context API */
  function require(path: string): unknown;
  namespace require {
    function context(
      directory: string,
      useSubdirectories: boolean,
      filter: RegExp,
    ): RequireContext;
  }
}
