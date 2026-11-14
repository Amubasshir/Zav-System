import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    agentFeedback: true,
    // inlineCss was tested and left off: it more than doubled the HTML
    // (18 KB to 46 KB gzipped) because the CSS is inlined twice, which costs
    // as much as the two small stylesheet requests it removes.
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        // CSS Modules must skip this rule: "as: *.css" would turn them into
        // global CSS and every styles.x import would be undefined.
        condition: { not: { path: /\.module\.css$/ } },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
