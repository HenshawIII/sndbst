/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/agent-tools",
        destination: "https://api.solanaagentkit.xyz/api/agent-tools",
      },
      {
        source: "/api/defi",
        destination: "https://api.solanaagentkit.xyz/api/defi",
      },
      {
        source: "/api/log-coingecko",
        destination: "https://api.solanaagentkit.xyz/api/log-coingecko",
      },
      {
        source: "/api/coingecko/:path*",
        destination: "https://api.coingecko.com/api/v3/:path*",
      },
      {
        source: "/api/jupag/:path*",
        destination: "https://tokens.jup.ag/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/coingecko/:path*',
        headers: [
          {
            key: 'x-cg-demo-api-key',
            value: 'CG-oSn1QEGnT1dixqQi3cTrRHDT',
          },
        ],
      },
      {
        source: '/api/jupag/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type',
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        url: require.resolve('url'),
        zlib: require.resolve('browserify-zlib'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        assert: require.resolve('assert'),
        os: require.resolve('os-browserify'),
        path: require.resolve('path-browserify'),
      };
    }
    return config;
  },
};

module.exports = nextConfig;