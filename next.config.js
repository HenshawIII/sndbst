/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/jupag/:path*',
        destination: 'https://tokens.jup.ag/:path*',
      },
      {
        source: '/api/coingecko/:path*',
        destination: 'https://api.coingecko.com/api/v3/:path*?x_cg_demo_api_key=CG-oSn1QEGnT1dixqQi3cTrRHDT'
      },
    ];
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
