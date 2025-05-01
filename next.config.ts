// next.config.ts
import { join } from 'path';
import type { NextConfig } from 'next';
import type { Configuration } from 'webpack'; // ← import Webpack’s type

// Let TS infer excess props so we can add importGlob without complaints
const config = {
  images: {
    domains: ['github.com'],
  },
  // Properly type the config parameter instead of `any`
  webpack(webpackConfig: Configuration) {
    webpackConfig.resolve = {
      ...(webpackConfig.resolve || {}),
      alias: {
        ...(webpackConfig.resolve?.alias || {}),
        '@': join(__dirname, 'src'),
      },
    };
    return webpackConfig;
  },
};

export default config as NextConfig;
