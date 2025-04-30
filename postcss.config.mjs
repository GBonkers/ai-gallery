// PostCSS configuration for Tailwind CSS and Autoprefixer

/**
 * @type {import('postcss').ProcessOptions}
 */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // PostCSS plugin for Tailwind v4
    autoprefixer: {}, // Adds vendor prefixes automatically
  },
};

export default config;
