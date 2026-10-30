
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Configuración de imágenes de Strapi */
  images: {
  remotePatterns: [
    {
      protocol: "http",
      hostname: "localhost",
      port: "1337",
      pathname: "/uploads/**",
    },
  ],
},

  experimental: {
    agentFeedback: true,
  },

  cacheComponents: true,
  partialPrefetching: true,

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
